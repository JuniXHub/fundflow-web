"use client";

import React from "react";

const Auth = () => {
  const handleOauth = async (event) => {
    event.preventDefault();
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;
  };

  return (
    <div className="font-roboto bg-f8fafb">
      <div className="p-28">
        <div className="flex items-center gap-10">
          <div className="md:w-1/2">
            <span className="block text-center my-4 text-muted">
              Sign in with
            </span>
            <div className="social-login text-center">
              <button
                onClick={handleOauth}
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-20 py-5 rounded-md shadow-md"
              >
                Google
              </button>
            </div>
          </div>
          <div className="md:w-1/2 contents">
            <div className="form-block bg-white p-6 shadow-md rounded-md">
              <div className="flex flex-col gap-5">
                <h3>
                  Sign In to <strong>FundFlow</strong>
                </h3>
                <p className="mb-4">
                  Our platform provides a secure and efficient way to access
                  your account. Sign in quickly using your preferred third-party
                  services for a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
