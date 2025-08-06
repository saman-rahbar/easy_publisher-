'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Mail,
  Building,
  Calendar,
  Shield
} from 'lucide-react'

const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'AUTHOR',
    institution: 'Stanford University',
    department: 'Computer Science',
    status: 'active',
    joinedAt: '2023-01-15',
    papers: 12,
    reviews: 8,
  },
  {
    id: '2',
    name: 'Prof. David Kim',
    email: 'david.kim@mit.edu',
    role: 'REVIEWER',
    institution: 'MIT',
    department: 'Electrical Engineering',
    status: 'active',
    joinedAt: '2023-02-20',
    papers: 5,
    reviews: 25,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@berkeley.edu',
    role: 'EDITOR',
    institution: 'UC Berkeley',
    department: 'Environmental Science',
    status: 'active',
    joinedAt: '2023-03-10',
    papers: 8,
    reviews: 15,
  },
  {
    id: '4',
    name: 'Prof. Alex Thompson',
    email: 'alex.thompson@harvard.edu',
    role: 'AUTHOR',
    institution: 'Harvard University',
    department: 'Finance',
    status: 'inactive',
    joinedAt: '2023-01-05',
    papers: 3,
    reviews: 2,
  },
  {
    id: '5',
    name: 'Dr. Maria Garcia',
    email: 'maria.garcia@ucla.edu',
    role: 'REVIEWER',
    institution: 'UCLA',
    department: 'Education',
    status: 'active',
    joinedAt: '2023-04-15',
    papers: 2,
    reviews: 18,
  },
  {
    id: '6',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@caltech.edu',
    role: 'EDITOR',
    institution: 'Caltech',
    department: 'Physics',
    status: 'active',
    joinedAt: '2023-02-08',
    papers: 15,
    reviews: 32,
  },
]

const roleColors = {
  AUTHOR: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  REVIEWER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  EDITOR: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const roleLabels = {
  AUTHOR: 'Author',
  REVIEWER: 'Reviewer',
  EDITOR: 'Editor',
  ADMIN: 'Admin',
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage platform users and their roles</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Authors</p>
                <p className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'AUTHOR').length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviewers</p>
                <p className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'REVIEWER').length}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Editors</p>
                <p className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'EDITOR').length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="ALL">All Roles</option>
                <option value="AUTHOR">Authors</option>
                <option value="REVIEWER">Reviewers</option>
                <option value="EDITOR">Editors</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="ALL">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                        {roleLabels[user.role as keyof typeof roleLabels]}
                      </Badge>
                      <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {user.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {user.joinedAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{user.papers} papers</span>
                      <span>{user.reviews} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || roleFilter !== 'ALL' || statusFilter !== 'ALL'
                  ? 'Try adjusting your search or filters'
                  : 'No users have been added yet'
                }
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 