"use client";

import { logout } from "@/actions/auth";
import withAuth from "@/hocs/withAuth";
import { useTypedDispatch } from "@/store/store";
import React from "react";

const ProtectedPage = () => {
  const dispatch = useTypedDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="font-roboto bg-f8fafb flex">
      <button onClick={handleLogout}>Logout</button>
      <div className="p-28 font-bold text-9xl text-center">
        Protected Page Content
      </div>
    </div>
  );
};

export default withAuth(ProtectedPage);
