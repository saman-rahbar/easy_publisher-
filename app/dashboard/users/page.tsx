'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Users, 
  Shield, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar
} from 'lucide-react'
import { userActions } from '@/lib/actions'

const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'AUTHOR',
    status: 'Active',
    institution: 'Stanford University',
    department: 'Computer Science',
    papers: 12,
    reviews: 8,
    lastActive: '2024-01-15'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@research.org',
    role: 'REVIEWER',
    status: 'Active',
    institution: 'MIT',
    department: 'Physics',
    papers: 8,
    reviews: 15,
    lastActive: '2024-01-14'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@college.edu',
    role: 'EDITOR',
    status: 'Active',
    institution: 'Harvard University',
    department: 'Biology',
    papers: 5,
    reviews: 22,
    lastActive: '2024-01-13'
  },
  {
    id: '4',
    name: 'Prof. David Kim',
    email: 'david.kim@institute.edu',
    role: 'AUTHOR',
    status: 'Inactive',
    institution: 'Caltech',
    department: 'Mathematics',
    papers: 3,
    reviews: 5,
    lastActive: '2024-01-10'
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    email: 'lisa.wang@university.edu',
    role: 'REVIEWER',
    status: 'Active',
    institution: 'UC Berkeley',
    department: 'Chemistry',
    papers: 7,
    reviews: 18,
    lastActive: '2024-01-12'
  }
]

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
          <h1 className="text-3xl font-bold text-gradient">Users</h1>
          <p className="text-muted-foreground">Manage platform users and their roles</p>
        </div>
        <Button 
          className="btn-primary"
          onClick={() => userActions.addUser()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
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
        <Card className="card-hover">
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
        <Card className="card-hover">
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
        <Card className="card-hover">
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
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>Find specific users or filter by role and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Label htmlFor="role-filter">Role</Label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="ALL">All Roles</option>
                <option value="AUTHOR">Authors</option>
                <option value="REVIEWER">Reviewers</option>
                <option value="EDITOR">Editors</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm('')
                  setRoleFilter('ALL')
                  setStatusFilter('ALL')
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{user.name}</h3>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={
                          user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }
                      >
                        {user.status}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={
                          user.role === 'AUTHOR' ? 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300' :
                          user.role === 'REVIEWER' ? 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-300' :
                          'border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300'
                        }
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {user.institution}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{user.papers} papers</span>
                      <span>{user.reviews} reviews</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Last active: {user.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => userActions.viewUser(user.id)}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => userActions.editUser(user.id)}
                    className="hover:bg-green-100 dark:hover:bg-green-900/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => userActions.deleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

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
                <Button 
                  className="btn-primary"
                  onClick={() => userActions.addUser()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 