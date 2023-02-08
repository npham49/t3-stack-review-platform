import type { NextPage } from "next";
import Link from "next/link";
import { api } from "../../utils/api";

const items: NextPage = () => {
  const { data: itemEntries, isLoading } = api.item.getAllItems.useQuery();
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <main className="to-primary-accent flex min-h-screen flex-col bg-gradient-to-b from-primary pt-28">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/items/new">Add a new item</Link>
            <h1 className="text-6xl font-bold text-white">List of items</h1>
            <p className="text-center text-2xl text-white">
              {itemEntries?.map((item,index) => (
                <div key={index}>{item.name}</div>
              ))}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default items;