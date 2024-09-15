"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";

const Header = () => {
  const auth = useAuth();

  return (
    <header>
      {auth.token ? (
        <Link href="/" onClick={auth.logout}>
          Logout
        </Link>
      ) : (
        <Link href="/"></Link>
      )}
    </header>
  );
};

export default Header;
