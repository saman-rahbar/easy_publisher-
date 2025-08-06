'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Calendar,
  User
} from 'lucide-react'

const mockPapers = [
  {
    id: '1',
    title: 'Machine Learning Applications in Healthcare',
    abstract: 'This paper explores the use of machine learning algorithms in healthcare diagnostics...',
    keywords: 'machine learning, healthcare, diagnostics, AI',
    authors: 'Dr. Sarah Johnson, Prof. Michael Chen',
    status: 'UNDER_REVIEW',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    journal: 'Journal of Medical AI',
  },
  {
    id: '2',
    title: 'Quantum Computing in Cryptography',
    abstract: 'An analysis of quantum computing implications for modern cryptographic systems...',
    keywords: 'quantum computing, cryptography, security',
    authors: 'Prof. David Kim',
    status: 'ACCEPTED',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    journal: 'Computing Research Quarterly',
  },
  {
    id: '3',
    title: 'Sustainable Energy Solutions',
    abstract: 'Comprehensive review of renewable energy technologies and their implementation...',
    keywords: 'renewable energy, sustainability, green technology',
    authors: 'Dr. Emily Rodriguez',
    status: 'REVISION_REQUESTED',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    journal: 'Environmental Science Today',
  },
  {
    id: '4',
    title: 'Blockchain Technology in Finance',
    abstract: 'Analysis of blockchain applications in financial services and banking...',
    keywords: 'blockchain, finance, banking, cryptocurrency',
    authors: 'Prof. Alex Thompson',
    status: 'PUBLISHED',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12',
    journal: 'Financial Technology Review',
  },
]

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  SUBMITTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  REVISION_REQUESTED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  ACCEPTED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  PUBLISHED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

const statusLabels = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  REVISION_REQUESTED: 'Revision Requested',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  PUBLISHED: 'Published',
}

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredPapers = mockPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.keywords.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || paper.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Papers</h1>
          <p className="text-muted-foreground">Manage your research papers and submissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Paper
        </Button>
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
                  placeholder="Search papers by title, authors, or keywords..."
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
                <option value="DRAFT">Draft</option>
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

      {/* Papers List */}
      <div className="grid gap-4">
        {filteredPapers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {paper.abstract}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {paper.authors}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {paper.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {paper.journal}
                        </div>
                      </div>
                    </div>
                    <Badge className={`ml-4 ${statusColors[paper.status as keyof typeof statusColors]}`}>
                      {statusLabels[paper.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.split(', ').map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No papers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first paper'
              }
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Paper
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 