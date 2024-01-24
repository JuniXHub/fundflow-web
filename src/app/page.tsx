"use client";
import { GET_HELLO } from "@/graphql/entities/test/getHello";
import { client } from "@/lib/apollo-wrapper";
import { useQuery } from "@apollo/client";

function Home() {
  const handleRefreshToken = () => {
    client().query({ query: GET_HELLO });
  };
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <button
        onClick={handleRefreshToken}
        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-20 py-5 rounded-md shadow-md h-20 justify-center self-center"
      >
        Send simple request
      </button>
      <p className="p-24 text-9xl">Home Page</p>
    </main>
  );
}

export default Home;
