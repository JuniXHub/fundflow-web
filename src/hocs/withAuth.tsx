"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";
import ROUTES from "@/utils/routes";

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const accessToken = getCookie("access_token");

    useEffect(() => {
      if (!accessToken) {
        redirect(ROUTES.auth);
      }
    }, [accessToken]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
