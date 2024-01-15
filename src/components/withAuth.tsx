"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const isAuthenticated = true;

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/auth");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
