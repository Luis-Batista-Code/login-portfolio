// src/authentic/authStorage.ts

export interface User {
  username: string;
  email: string;
  password: string;
}

export function getUsers(): User[] {
  const usersString = localStorage.getItem('users');
  return usersString ? JSON.parse(usersString) : [];
}

export function saveUser(user: User) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export function userExists(username: string, email: string): boolean {
  const users = getUsers();
  return users.some(u => u.username === username || u.email === email);
}
