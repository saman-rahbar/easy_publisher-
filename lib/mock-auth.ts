// Mock authentication for demo purposes
export const mockUsers = [
  {
    id: '1',
    email: 'admin@demo.com',
    password: '$2a$10$demo.hash.for.admin',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'editor@demo.com',
    password: '$2a$10$demo.hash.for.editor',
    name: 'Editor User',
    role: 'editor'
  },
  {
    id: '3',
    email: 'reviewer@demo.com',
    password: '$2a$10$demo.hash.for.reviewer',
    name: 'Reviewer User',
    role: 'reviewer'
  }
]

export const findUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email === email)
}

export const validatePassword = (password: string) => {
  // For demo purposes, accept any password
  return true
} 