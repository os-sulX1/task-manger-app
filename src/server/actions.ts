// src/server/actions.js
"use server";
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';



import { tasksItem } from '@/src/db/schema';
import { database } from "@/src/db/database";
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { signOut } from '@/auth'



import { signIn } from '@/auth'

export async function handleSignIn() {
  await signIn('google');
}

export async function handleSignOut() {
  await signOut();
}

export const getTaskBySearch = async({title}: {title:string})=>{
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
   const data =await database.select().from(tasksItem).where(and(eq(tasksItem.status,title) , eq(tasksItem.userId,user.id)))
   revalidatePath('/')
   return data
}
export const getAllTasks = async()=>{
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
 // const data =await database.query.tasksItem.findMany()
 const data =await database.select().from(tasksItem).where(eq(tasksItem.userId,user.id))
  revalidatePath('/dashboard/all-tasks')
  return data
}







export async function addTask(values) {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }

  await database.insert(tasksItem).values({
    id:uuidv4(),
    title: values.title,
    userId:user.id,
    status: 'incomplete',
    description: values.description,
  });
  revalidatePath('/dashboard/all-tasks')
}

export async function editTask(values: Item, taskId: string) {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
  await database
    .update(tasksItem)
    .set({
      title: values.title,
      description: values.description,
      status: 'incomplete',
    })
    .where(eq(tasksItem.id, taskId)); // Ensure correct reference to the column
    revalidatePath('/dashboard/all-tasks')
  }

export const updateStatus = async (taskId, status) => {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
  if (status === 'complete') {
    await database.update(tasksItem).set({
      status: 'incomplete'
    }).where(eq(tasksItem.id , taskId));
  } else if (status === 'incomplete') {
    await database.update(tasksItem).set({
      status: 'complete'
    }).where(eq(tasksItem.id, taskId));
  } else if (status === 'all'){
    return
  }else {
    throw new Error(`Invalid status: ${status}. Status must be either'all', 'complete' or 'incomplete'.`);
  }
  revalidatePath('/dashboard/all-tasks')
  console.log(`Task ${taskId} status updated successfully to ${status === 'complete' ? 'incomplete' : 'complete'}`);
};


export async function deleteTask(taskId: string) {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
  await database
  
    .delete(tasksItem)
    //.where(eq(tasksItem.id, taskId)); // Ensure correct reference to the column
    .where(and(eq(tasksItem.id,user.id),eq(tasksItem.id,taskId)))
    revalidatePath('/dashboard/all-tasks')
  }

export async function getTaskById({taskId}: {taskId:string}) {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
  const task = await database.select().from(tasksItem).where(eq(tasksItem.id,taskId))
  revalidatePath('/dashboard/all-tasks')
  return task;
}





export async function getUser() {
  const session = await auth()
  if(!session){
    throw new Error ('Unauthorized')
   }
   const user =session.user

   if(!user  ||  !user.id){
    throw new Error ('Unauthorized')
   }
 
  // Ensure session and session.user are defined before accessing session.user.i

  return user;
}
