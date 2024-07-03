'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid'; // Correctly import uuidv4

const prisma = new PrismaClient();

// Function to get tasks by status
export const getTaskBySearch = async ({ title }) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  const data = await prisma.task.findMany({
    where: {
      AND: [
        { status: title },
        { userId: user.id }
      ]
    }
  });
  revalidatePath('/')

  return data;
}

// Function to get all tasks for a user
export const getAllTasks = async () => {
  try {
   const user =await getUser()
   if(!user) throw new Error('You are currently not authorized')
    const data = await prisma.task.findMany({
      where: {
        userId: user.id
      }
    });
    revalidatePath('/')
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Propagate the error for higher-level handling
  }
}

// Function to add a new task
export async function addTask(values) {
  const user =await getUser()
   if(!user) throw new Error('You are currently not authorized')

  // Debugging: Ensure the user exists in the User table
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) {
    throw new Error(`User with ID ${user.id} does not exist in the User table.`);
  }

  const newTask = await prisma.task.create({
    data: {
      id: uuidv4(),
      title: values.title,
      userId: user.id,
      status: 'incomplete',
      description: values.description,
    }
  });

  revalidatePath('/')

  return newTask;
}

// Function to edit a task
export async function editTask(values, taskId) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId
    },
    data: {
      title: values.title,
      description: values.description,
      status: 'incomplete'
    }
  });
  revalidatePath('/')

  return updatedTask;
}

// Function to update task status
export const updateStatus = async (taskId, status) => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  let updatedTask;
  if (status === 'complete') {
    updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: 'incomplete' }
    });
  } else if (status === 'incomplete') {
    updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: 'complete' }
    });
  } else if (status === 'all') {
    return; // Not sure what you intend for this case
  } else {
    throw new Error(`Invalid status: ${status}. Status must be either 'all', 'complete' or 'incomplete'.`);
  }
  revalidatePath('/')

  return updatedTask;
}

// Function to delete a task
export async function deleteTask(taskId) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  await prisma.task.deleteMany({
    where: {
      AND: [
        { userId: user.id },
        { id: taskId }
      ]
    }
  });
  revalidatePath('/')

  return true; // Assuming success
}

// Function to get a task by ID
export async function getTaskById({ taskId }) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    }
  });
  revalidatePath('/')

  return task;
}

// Function to get user details and ensure they are in the database
export async function getUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!isAuthenticated || !user || !user.id || !user.email) {
    throw new Error('Unauthorized');
  }

  let existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) {
    console.log(`User with ID ${user.id} does not exist in the User table. Adding user...`);

    try {
      existingUser = await prisma.user.create({
        data: {
          id: user.id,
          name: `${user.given_name}  ${user.family_name}`,
          email: user.email,
          image:user.picture,
          // Add other fields as necessary
        },
      });
      console.log(`User with ID ${user.id} has been added to the User table.`);
    } catch (error) {
      console.error(`Error adding user with ID ${user.id}:`, error);
      throw new Error('Error adding user to the database');
    }
  }

  return existingUser;
}
