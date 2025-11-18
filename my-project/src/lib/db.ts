import { User } from './auth';

// In-memory database for demonstration
// In production, use a real database like PostgreSQL, MongoDB, etc.
const users: User[] = [];

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find(user => user.email === email);
}

export async function createUser(user: User): Promise<User> {
  users.push(user);
  return user;
}

export async function getAllUsers(): Promise<User[]> {
  return users;
}
