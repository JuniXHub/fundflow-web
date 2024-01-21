"use client";
import { GET_HELLO } from "@/graphql/entities/test/getHello";
import { useQuery } from "@apollo/client";
import { getCookie } from "cookies-next";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-9xl">
      Home Page
    </main>
  );
}

export default Home;
