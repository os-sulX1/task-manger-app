import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


import Image from "next/image";

const Home = async()=> {

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-black w-full" style={{ backgroundImage: 'url(/empty.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50 z-0"/>
      <div className="relative w-full max-w-7xl py-8 text-center z-10 bg-white/75 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
        <Image src={'/logo.png'} height={300} width={300} alt="Logo " className="text-center" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" >
          The easiest way to add tasks
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Make an account and start managing your tasks in less than a minute.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LoginLink>Sign in</LoginLink>
          <RegisterLink>Sign up</RegisterLink>
        </div>
      </div>
    </div>
  );
}
export default Home