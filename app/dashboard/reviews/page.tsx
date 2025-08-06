'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Star
} from 'lucide-react'

const mockReviews = [
  {
    id: '1',
    paperTitle: 'Machine Learning Applications in Healthcare',
    author: 'Dr. Sarah Johnson',
    journal: 'Journal of Medical AI',
    status: 'IN_PROGRESS',
    assignedAt: '2024-01-15',
    dueDate: '2024-01-25',
    rating: null,
    comments: null,
    abstract: 'This paper explores the use of machine learning algorithms in healthcare diagnostics...',
  },
  {
    id: '2',
    paperTitle: 'Quantum Computing in Cryptography',
    author: 'Prof. David Kim',
    journal: 'Computing Research Quarterly',
    status: 'COMPLETED',
    assignedAt: '2024-01-10',
    dueDate: '2024-01-20',
    rating: 4.5,
    comments: 'Excellent research with clear methodology and significant contributions to the field.',
    abstract: 'An analysis of quantum computing implications for modern cryptographic systems...',
  },
  {
    id: '3',
    paperTitle: 'Sustainable Energy Solutions',
    author: 'Dr. Emily Rodriguez',
    journal: 'Environmental Science Today',
    status: 'PENDING',
    assignedAt: '2024-01-20',
    dueDate: '2024-01-30',
    rating: null,
    comments: null,
    abstract: 'Comprehensive review of renewable energy technologies and their implementation...',
  },
  {
    id: '4',
    paperTitle: 'Blockchain Technology in Finance',
    author: 'Prof. Alex Thompson',
    journal: 'Financial Technology Review',
    status: 'COMPLETED',
    assignedAt: '2024-01-05',
    dueDate: '2024-01-15',
    rating: 3.8,
    comments: 'Good overview but could benefit from more recent case studies and practical applications.',
    abstract: 'Analysis of blockchain applications in financial services and banking...',
  },
  {
    id: '5',
    paperTitle: 'AI in Education: A Comprehensive Review',
    author: 'Dr. Maria Garcia',
    journal: 'Educational Technology Journal',
    status: 'DECLINED',
    assignedAt: '2024-01-18',
    dueDate: '2024-01-28',
    rating: null,
    comments: 'Declined due to conflict of interest with the author.',
    abstract: 'A comprehensive review of artificial intelligence applications in educational settings...',
  },
]

const statusColors = {
  PENDING: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  DECLINED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const statusLabels = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  DECLINED: 'Declined',
}

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.paperTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.journal.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || review.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">Manage your peer review assignments</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Start Review
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                <p className="text-2xl font-bold">{mockReviews.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{mockReviews.filter(r => r.status === 'IN_PROGRESS').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{mockReviews.filter(r => r.status === 'COMPLETED').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{mockReviews.filter(r => r.status === 'PENDING').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
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
                  placeholder="Search reviews by paper title, author, or journal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="DECLINED">Declined</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="grid gap-4">
        {filteredReviews.map((review) => {
          const daysUntilDue = getDaysUntilDue(review.dueDate)
          const isOverdue = daysUntilDue < 0
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

          return (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{review.paperTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {review.abstract}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {review.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {review.journal}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {review.dueDate}
                          </div>
                          {review.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {review.rating.toFixed(1)}
                            </div>
                          )}
                        </div>
                        
                        {/* Due date warning */}
                        {(isOverdue || isDueSoon) && (
                          <div className={`mt-2 p-2 rounded-md text-sm ${
                            isOverdue 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {isOverdue 
                              ? `Overdue by ${Math.abs(daysUntilDue)} days`
                              : `Due in ${daysUntilDue} days`
                            }
                          </div>
                        )}
                      </div>
                      <Badge className={`ml-4 ${statusColors[review.status as keyof typeof statusColors]}`}>
                        {statusLabels[review.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    
                    {review.comments && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">
                          <strong>Your Comments:</strong> {review.comments}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredReviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filters'
                : 'No review assignments have been made yet'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 