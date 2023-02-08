import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a href="/items">Items</a>
            </li>
          </ul>
        </div>
        <Link className="btn-ghost btn text-xl normal-case" href="/">
          ReviewPlatform
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/items">Items</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <p>{session && <span>{session.user?.name}</span>}</p>
        <button
          className="btn ml-2"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
