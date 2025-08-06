'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Edit,
  Eye,
  Download,
  Send,
  Filter,
  SortAsc,
  SortDesc,
  User,
  Calendar,
  Building
} from 'lucide-react'
import { reviewActions } from '@/lib/actions'

interface Review {
  id: string
  paperId: string
  paperTitle: string
  authors: string[]
  journal: string
  status: 'assigned' | 'in_progress' | 'completed' | 'overdue'
  assignedDate: string
  dueDate: string
  completedDate?: string
  score?: number
  comments?: string
  recommendation?: 'accept' | 'minor_revision' | 'major_revision' | 'reject'
  priority: 'high' | 'medium' | 'low'
}

const mockReviews: Review[] = [
  {
    id: '1',
    paperId: 'paper-1',
    paperTitle: 'Machine Learning Approaches for Scholarly Publishing',
    authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
    journal: 'Journal of Academic Publishing',
    status: 'in_progress',
    assignedDate: '2024-01-15',
    dueDate: '2024-01-30',
    priority: 'high',
    score: 4.2,
    comments: 'Strong methodology and clear presentation. Minor revisions needed for clarity.',
    recommendation: 'minor_revision'
  },
  {
    id: '2',
    paperId: 'paper-2',
    paperTitle: 'LaTeX-Based Manuscript Preparation System',
    authors: ['Dr. Emily Rodriguez'],
    journal: 'Computing Research Quarterly',
    status: 'assigned',
    assignedDate: '2024-01-20',
    dueDate: '2024-02-05',
    priority: 'medium'
  },
  {
    id: '3',
    paperId: 'paper-3',
    paperTitle: 'Peer Review Quality Assessment Framework',
    authors: ['Prof. David Kim', 'Dr. Lisa Wang'],
    journal: 'Academic Review Journal',
    status: 'completed',
    assignedDate: '2024-01-10',
    dueDate: '2024-01-25',
    completedDate: '2024-01-22',
    priority: 'high',
    score: 3.8,
    comments: 'Good framework but needs more empirical validation.',
    recommendation: 'major_revision'
  },
  {
    id: '4',
    paperId: 'paper-4',
    paperTitle: 'Blockchain Technology in Academic Publishing',
    authors: ['Prof. Alex Thompson'],
    journal: 'Technology Review',
    status: 'overdue',
    assignedDate: '2024-01-05',
    dueDate: '2024-01-20',
    priority: 'low'
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = statusFilter === 'ALL' || review.status === statusFilter
    const matchesPriority = priorityFilter === 'ALL' || review.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.dueDate).getTime()
        bValue = new Date(b.dueDate).getTime()
        break
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder]
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder]
        break
      case 'title':
        aValue = a.paperTitle.toLowerCase()
        bValue = b.paperTitle.toLowerCase()
        break
      default:
        return 0
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleStartReview = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId)
    if (review) {
      setSelectedReview(review)
      setShowReviewForm(true)
      reviewActions.startReview(reviewId)
    }
  }

  const handleSubmitReview = (reviewId: string, reviewData: any) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, ...reviewData, status: 'completed' as const, completedDate: new Date().toISOString() }
        : review
    )
    setReviews(updatedReviews)
    setShowReviewForm(false)
    setSelectedReview(null)
    reviewActions.submitReview(reviewId)
  }

  const handleViewPaper = (paperId: string) => {
    reviewActions.viewPaper(paperId)
  }

  const handleDownloadPaper = (paperId: string) => {
    reviewActions.downloadPaper(paperId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'assigned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getRecommendationColor = (recommendation?: string) => {
    switch (recommendation) {
      case 'accept': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'minor_revision': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'major_revision': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'reject': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Review Assignments</h1>
          <p className="text-muted-foreground">Manage your peer review assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {reviews.filter(r => r.status === 'assigned' || r.status === 'in_progress').length} Active Reviews
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{reviews.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{reviews.filter(r => r.status === 'in_progress').length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{reviews.filter(r => r.status === 'completed').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{reviews.filter(r => isOverdue(r.dueDate)).length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Sorting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="ALL">All Status</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <Label htmlFor="priority-filter">Priority</Label>
              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="ALL">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sort-by">Sort By</Label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="date">Due Date</option>
                <option value="priority">Priority</option>
                <option value="title">Paper Title</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sort-order">Order</Label>
              <div className="flex mt-1">
                <Button
                  variant={sortOrder === 'desc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('desc')}
                  className="flex-1 rounded-r-none"
                >
                  <SortDesc className="h-4 w-4" />
                </Button>
                <Button
                  variant={sortOrder === 'asc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('asc')}
                  className="flex-1 rounded-l-none"
                >
                  <SortAsc className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Review Assignments ({sortedReviews.length})</CardTitle>
          <CardDescription>Your peer review assignments and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{review.paperTitle}</h3>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(review.priority)}>
                        {review.priority} Priority
                      </Badge>
                      {isOverdue(review.dueDate) && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Overdue
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {review.authors.join(', ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {review.journal}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(review.dueDate).toLocaleDateString()}
                      </span>
                      {review.score && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Score: {review.score}/5
                        </span>
                      )}
                    </div>
                    
                    {review.comments && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {review.comments}
                      </p>
                    )}
                    
                    {review.recommendation && (
                      <Badge className={getRecommendationColor(review.recommendation)}>
                        {review.recommendation.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewPaper(review.paperId)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownloadPaper(review.paperId)}
                      className="hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {review.status === 'assigned' && (
                      <Button 
                        size="sm"
                        onClick={() => handleStartReview(review.id)}
                        className="btn-primary"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Start Review
                      </Button>
                    )}
                    {review.status === 'in_progress' && (
                      <Button 
                        size="sm"
                        onClick={() => handleStartReview(review.id)}
                        className="btn-primary"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Continue Review
                      </Button>
                    )}
                    {review.status === 'completed' && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartReview(review.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {sortedReviews.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No review assignments</h3>
                <p className="text-muted-foreground mb-4">
                  {statusFilter !== 'ALL' || priorityFilter !== 'ALL'
                    ? 'Try adjusting your filters'
                    : 'You have no review assignments at this time'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Form Modal */}
      {showReviewForm && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Review: {selectedReview.paperTitle}</CardTitle>
              <CardDescription>Provide your review and recommendation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="score">Overall Score (1-5)</Label>
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReview(prev => prev ? { ...prev, score: star } : prev)}
                      className={selectedReview.score && selectedReview.score >= star ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      <Star className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="recommendation">Recommendation</Label>
                <select
                  id="recommendation"
                  value={selectedReview.recommendation || ''}
                  onChange={(e) => setSelectedReview(prev => prev ? { ...prev, recommendation: e.target.value as any } : prev)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="">Select recommendation</option>
                  <option value="accept">Accept</option>
                  <option value="minor_revision">Minor Revision</option>
                  <option value="major_revision">Major Revision</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="comments">Review Comments</Label>
                <textarea
                  id="comments"
                  value={selectedReview.comments || ''}
                  onChange={(e) => setSelectedReview(prev => prev ? { ...prev, comments: e.target.value } : prev)}
                  className="w-full mt-1 h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                  placeholder="Provide detailed feedback and comments..."
                />
              </div>
              
              <div className="flex items-center gap-2 pt-4">
                <Button 
                  className="btn-primary"
                  onClick={() => handleSubmitReview(selectedReview.id, selectedReview)}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 