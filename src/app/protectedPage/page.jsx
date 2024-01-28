"use client";

import { logout } from "@/actions/auth";
import { useTypedDispatch } from "@/store/store";
import ROUTES from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedPage = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push(ROUTES.auth);
  };

  return (
    <div className="font-roboto bg-f8fafb flex flex-col">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-20 py-5 rounded-md shadow-md h-20 justify-center self-center"
      >
        Logout
      </button>
      <div className="p-28 font-bold text-9xl text-center">
        Protected Page Content
      </div>
    </div>
  );
};

export default ProtectedPage;
