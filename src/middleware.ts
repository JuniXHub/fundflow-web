import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get a cookie
  // if (request.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.rewrite(new URL("/home", request.url));
  // }

  const token = request.cookies.get("access_token");
  console.log("request.url", request.url);
  // if (!token) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }
  // Get all cookies
  // const allCookies = request.cookies.getAll();
  // console.log("allCookies", allCookies);

  // To change a cookie, first create a response
  const response = NextResponse.next();

  // Set a cookie
  // response.cookies.set("myCookieName", "some-value");

  // Setting a cookie with additional options
  // response.cookies.set({
  //   name: "myCookieName",
  //   value: "some-value",
  //   httpOnly: true,
  // });

  // Delete a cookie
  // response.cookies.delete("myCookieName");

  return response;
}
