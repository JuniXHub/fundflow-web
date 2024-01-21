"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const accessToken = getCookie("access_token");

    useEffect(() => {
      if (!accessToken) {
        redirect("/auth");
      }
    }, [accessToken]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
