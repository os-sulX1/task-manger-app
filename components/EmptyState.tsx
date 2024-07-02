import Image from 'next/image'
import React from 'react'
import AddTaskDialog from './AddTaskDialog'

function EmptyState() {
  return (
    <div className="w-full flex flex-col items-center j">
    <Image
      alt="an Image of a picture and directory icon "
      height={"300"}
      width={"150"}
      sizes="100vw"
      className=" w-72 h-80   cover "
      src={"/empty.jpg"}
    />
    <p className=" text-4xl font-bold text-center pt-3">
      You have no Task , add now{" "}
    </p>
    <div className="text-center mt-7">
      {" "}
      <AddTaskDialog />
    </div>
  </div>
  )
}

export default EmptyState