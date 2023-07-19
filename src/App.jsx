import React, { useState, useEffect } from "react";
import RecordCard from "./components/RecordCard";

const localStorage = window.localStorage;

const dataParser = () => {
  const data = JSON.parse(localStorage.getItem("costList") ?? "[]");
  return data.map((d) => {
    d.timestamp = new Date(d.timestamp);
    return d;
  });
};

const App = () => {
  const [count, setCount] = useState(0);
  const [cType, setCType] = useState("expense");
  const [item, setItem] = useState("");
  const [costList, setCostList] = useState(dataParser());

  const itemsList = {
    expense: ["早餐", "午餐", "晚餐", "油錢"],
    income: ["薪水"],
  };

  const [total, setTotal] = useState(0);

  const addRecord = () => {
    if (!count) return;

    const data = {
      type: cType,
      item: item,
      amount: Number(count),
      timestamp: new Date(),
    };
    setCostList([...costList, data]);

    localStorage.setItem("costList", JSON.stringify(costList));

    setCount(0);
    setItem("");
    setCType("expense");
    // setCostList([costList, data].flat());
  };

  // 只要畫面 render 就跑
  useEffect(() => {
    console.log("歡迎來這裡");
  });

  // 只有第一次載入畫面時跑
  useEffect(() => {
    console.log("AAAA");
  }, []);

  // watch "costList"
  useEffect(() => {
    const temp = costList
      .map((c) => (c.type === "expense" ? -c.amount : c.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotal(temp);
  }, [costList]);

  return (
    <div className="flex flex-col space-y-3 p-5">
      <div className="flex space-x-3">
        <select
          className="border"
          onInput={(event) => setCType(event.target.value)}
        >
          <option value="expense" selected={cType === "expense"}>
            支出
          </option>
          <option value="income" selected={cType === "income"}>
            收入
          </option>
        </select>
        <input
          type="text"
          className="border outline-none"
          value={item}
          onInput={(event) => setItem(event.target.value)}
          list="itemsList"
        />
        <datalist id="itemsList">
          {itemsList[cType].map((it) => (
            <option key={`option-${it}`} value={it} />
          ))}
        </datalist>

        <input
          type="number"
          className="border outline-none"
          value={count}
          onInput={(event) => setCount(event.target.value)}
        />
        <button
          className="rounded-md bg-gray-200 px-2 py-1"
          onClick={() => addRecord()}
        >
          紀錄
        </button>
      </div>
      <div>
        <div className="flex text-center">
          <div className="flex-1">類型</div>
          <div className="flex-1">品項</div>
          <div className="flex-1">金額</div>
          <div className="flex-1">時間</div>
        </div>
        {costList.map((c) => {
          return <RecordCard key={c.timestamp.getTime()} {...c} />;
        })}
        <div className="mt-5 flex border-t pt-2 text-center">
          <div className="flex-1"></div>
          <div className="flex-1 text-right">本月總結</div>
          <div className="flex-1">{total}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
