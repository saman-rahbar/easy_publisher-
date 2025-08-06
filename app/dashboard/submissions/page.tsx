'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react'

const mockSubmissions = [
  {
    id: '1',
    paperTitle: 'Machine Learning Applications in Healthcare',
    author: 'Dr. Sarah Johnson',
    journal: 'Journal of Medical AI',
    status: 'UNDER_REVIEW',
    submittedAt: '2024-01-15',
    reviewers: 2,
    averageRating: 4.2,
    abstract: 'This paper explores the use of machine learning algorithms in healthcare diagnostics...',
  },
  {
    id: '2',
    paperTitle: 'Quantum Computing in Cryptography',
    author: 'Prof. David Kim',
    journal: 'Computing Research Quarterly',
    status: 'ACCEPTED',
    submittedAt: '2024-01-10',
    reviewers: 3,
    averageRating: 4.8,
    abstract: 'An analysis of quantum computing implications for modern cryptographic systems...',
  },
  {
    id: '3',
    paperTitle: 'Sustainable Energy Solutions',
    author: 'Dr. Emily Rodriguez',
    journal: 'Environmental Science Today',
    status: 'REVISION_REQUESTED',
    submittedAt: '2024-01-05',
    reviewers: 2,
    averageRating: 3.5,
    abstract: 'Comprehensive review of renewable energy technologies and their implementation...',
  },
  {
    id: '4',
    paperTitle: 'Blockchain Technology in Finance',
    author: 'Prof. Alex Thompson',
    journal: 'Financial Technology Review',
    status: 'PUBLISHED',
    submittedAt: '2024-01-01',
    reviewers: 3,
    averageRating: 4.5,
    abstract: 'Analysis of blockchain applications in financial services and banking...',
  },
  {
    id: '5',
    paperTitle: 'AI in Education: A Comprehensive Review',
    author: 'Dr. Maria Garcia',
    journal: 'Educational Technology Journal',
    status: 'SUBMITTED',
    submittedAt: '2024-01-20',
    reviewers: 0,
    averageRating: null,
    abstract: 'A comprehensive review of artificial intelligence applications in educational settings...',
  },
]

const statusColors = {
  SUBMITTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  REVISION_REQUESTED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  ACCEPTED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  PUBLISHED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

const statusLabels = {
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  REVISION_REQUESTED: 'Revision Requested',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  PUBLISHED: 'Published',
}

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = submission.paperTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.journal.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || submission.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground">Manage paper submissions and editorial decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Assign Reviewers
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Submission
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">{mockSubmissions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">{mockSubmissions.filter(s => s.status === 'UNDER_REVIEW').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">{mockSubmissions.filter(s => s.status === 'ACCEPTED').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{mockSubmissions.filter(s => s.status === 'PUBLISHED').length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
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
                  placeholder="Search submissions by title, author, or journal..."
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
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="REVISION_REQUESTED">Revision Requested</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="grid gap-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{submission.paperTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {submission.abstract}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {submission.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {submission.journal}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {submission.submittedAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {submission.reviewers} reviewers
                        </div>
                        {submission.averageRating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-600">★</span>
                            {submission.averageRating.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={`ml-4 ${statusColors[submission.status as keyof typeof statusColors]}`}>
                      {statusLabels[submission.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filters'
                : 'No submissions have been made yet'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 