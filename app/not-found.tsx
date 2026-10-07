import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-5 bg-[#0b0b0b] text-white">
      <p className="text-[40px] font-extrabold uppercase">Page not found</p>
      <Link href="/" className="text-[18px] text-[#d92525] underline underline-offset-4 hover:no-underline">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
