import withAuth from "@/components/withAuth";
import React from "react";

const ProtectedPage = () => {
  return (
    <div className="font-roboto bg-f8fafb flex">
      <div className="p-28 font-bold text-9xl text-center">
        Protected Page Content
      </div>
    </div>
  );
};

export default withAuth(ProtectedPage);
