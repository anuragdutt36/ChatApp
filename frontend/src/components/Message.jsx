import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime";
import "../index.css"

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const formattedTime = extractTime(message.createdAt);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${
        message?.senderId === authUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          message?.senderId !== authUser?._id ? "bg-slate-100 text-slate-800" : "bg-green-800 text-zinc-100"
        } `}
      >
        {message?.message}
      </div>
      <div className="chat-end opacity-50 text-xs font-mono flex gap-1 items-center text-zinc-300">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
