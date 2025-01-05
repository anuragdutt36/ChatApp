import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };
  return (
    <div className="border border-y-green-950 border-x-green-950 sm:w-[250px] md:h-[550px] sm:h-[650px] lg:min-w-[300px] lg:h-[650px] p-4 flex flex-col">
      <div className="text-3xl font-medium text-left text-white p-3 py-5">
        Chats
      </div>
      <form
        onSubmit={searchSubmitHandler}
        className="w-full relative"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border text-base rounded-2xl px-5 block w-full p-3 border-green-950 text-zinc-100 placeholder:text-zinc-300"
          type="text"
          placeholder="Search"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4 text-zinc-300" 
        >
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>

      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button
          onClick={logoutHandler}
          className="rounded-xl btn btn-sm bg-zinc-900 text-zinc-100 hover:border-green-950 border"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
