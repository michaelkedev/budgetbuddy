import React, { useState } from "react";
import clsx from "clsx";

const RecordCard = (props) => {
  const { type, item, amount, timestamp } = props;

  const dateFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  };

  return (
    <div className="flex py-1 text-center">
      <div
        className={clsx([
          "flex-1",
          type === "expense" ? "text-red-500" : "text-green-500",
        ])}
      >
        {type === "expense" ? "支出" : "收入"}
      </div>
      <div className="flex-1">{item}</div>
      <div className="flex-1">{amount}</div>
      <div className="flex-1">{dateFormat(timestamp)}</div>
    </div>
  );
};

export default RecordCard;
