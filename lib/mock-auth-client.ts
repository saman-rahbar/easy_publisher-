// Client-side mock authentication for static export
export interface MockUser {
  id: string
  email: string
  name: string
  role: string
  institution?: string
  department?: string
}

// Mock users storage (in localStorage for persistence)
const MOCK_USERS_KEY = 'scholarly_publisher_mock_users'

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    institution: 'Demo University',
    department: 'Computer Science'
  },
  {
    id: '2',
    email: 'editor@demo.com',
    name: 'Editor User',
    role: 'editor',
    institution: 'Demo University',
    department: 'Physics'
  },
  {
    id: '3',
    email: 'reviewer@demo.com',
    name: 'Reviewer User',
    role: 'reviewer',
    institution: 'Demo University',
    department: 'Mathematics'
  }
]

// Initialize mock users in localStorage
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(MOCK_USERS_KEY)
  if (!stored) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(mockUsers))
  }
}

export const getMockUsers = (): MockUser[] => {
  if (typeof window === 'undefined') return mockUsers
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY)
    return stored ? JSON.parse(stored) : mockUsers
  } catch {
    return mockUsers
  }
}

export const addMockUser = (user: Omit<MockUser, 'id'>): MockUser => {
  const users = getMockUsers()
  const newUser: MockUser = {
    ...user,
    id: Date.now().toString()
  }
  users.push(newUser)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
  }
  
  return newUser
}

export const findMockUserByEmail = (email: string): MockUser | undefined => {
  const users = getMockUsers()
  return users.find(user => user.email === email)
}

export const validateMockPassword = (password: string): boolean => {
  // In demo mode, accept any password
  return true
}

// Mock session management
export const createMockSession = (user: MockUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('scholarly_publisher_session', JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }))
  }
}

export const getMockSession = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('scholarly_publisher_session')
    if (!stored) return null
    
    const session = JSON.parse(stored)
    if (session.expires < Date.now()) {
      localStorage.removeItem('scholarly_publisher_session')
      return null
    }
    
    return session
  } catch {
    return null
  }
}

export const clearMockSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('scholarly_publisher_session')
  }
} 