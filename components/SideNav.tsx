import Image from "next/image";
import React from "react";
import { auth } from "@/auth";
import { SignIn } from "./SignIn";
import SignOut from "./SignOut";
import NavLinks from "./NavLinks";

const SideNav = async () => {
  const session = await auth();

  return (
    <aside className="hidden md:block sticky top-0 h-screen overflow-y-auto bg-black w-64">
      <div className="mx-2 bg-slate-500 h-full">
        <div className="flex flex-col justify-between items-center">
          <div className="flex pt-14">
            <Image
              src={session?.user?.image ?? '/avatar.jpg'}
              alt="Avatar Image"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-1.5 justify-center items-center space-x-3">
              <p className="text-xs font-bold uppercase">{session?.user?.name}</p>
              <p className="text-xs font-semibold">{session?.user?.email}</p>
            </div>
          </div>
          <div className="pt-44">
            <NavLinks />
          </div>
          <div className="my-40">
            {session?.user ? <SignOut /> : <SignIn  />}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
