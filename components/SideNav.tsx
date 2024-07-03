import Image from "next/image";
import React from "react";
import NavLinks from "./NavLinks";
import { getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";


const SideNav = async () => {
  const {getUser ,isAuthenticated} =  getKindeServerSession();
  const user =await getUser()
  

  return (
    <aside className="hidden md:block sticky top-0 h-screen overflow-y-auto bg-black w-64">
      <div className="mx-2 bg-slate-500 h-full">
        <div className="flex flex-col justify-between items-center">
          <div className="flex pt-14">
            <Image
              src={user?.picture ?? '/avatar.jpg'}
              alt="Avatar Image"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-1.5 justify-center items-center space-x-3">
              <p className="text-xs font-bold uppercase">`&{user?.given_name} ${user?.family_name}`</p>
              <p className="text-xs font-semibold">{user?.email}</p>
            </div>
          </div>
          <div className="pt-44">
            <NavLinks />
          </div>
          <div className="my-40">
            <LogoutLink>
              <Button>Log Out</Button>
            </LogoutLink>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
