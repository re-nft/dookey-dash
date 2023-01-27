import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const WaitingRoom: NextPage = () => {
  return (
    <div className="w-full flex flex-col h-full items-center gap-6">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-4xl text-center font-bold">
          Available Server Passes
        </h1>
        <span>Users requesting Sewer Pass delegation</span>
      </div>

      <Link href="/register">
        <button className="button-standard capitalize w-max">
          I Want to Play
        </button>
      </Link>
      <div className="flex flex-col rounded-md bg-gray-400 w-full flex-1"></div>
    </div>
  );
};

export default WaitingRoom;
