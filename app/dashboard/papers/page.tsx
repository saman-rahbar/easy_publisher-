'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  FileText, 
  Search, 
  Plus, 
  ExternalLink, 
  Download,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Calendar,
  User,
  Building,
  Globe,
  BookOpen,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { paperActions } from '@/lib/actions'

interface Paper {
  id: string
  title: string
  authors: string[]
  abstract: string
  doi?: string
  url?: string
  source: 'google_scholar' | 'arxiv' | 'manual' | 'latex_draft'
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
  journal?: string
  year?: number
  citations?: number
  keywords: string[]
  createdAt: string
  updatedAt: string
  latexFile?: string
  pdfFile?: string
}

const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches for Scholarly Publishing',
    authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
    abstract: 'This paper explores the application of machine learning techniques to improve the efficiency and quality of scholarly publishing workflows...',
    doi: '10.1000/example.2024.001',
    url: 'https://scholar.google.com/scholar?q=machine+learning+scholarly+publishing',
    source: 'google_scholar',
    status: 'accepted',
    journal: 'Journal of Academic Publishing',
    year: 2024,
    citations: 15,
    keywords: ['machine learning', 'scholarly publishing', 'automation'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'LaTeX-Based Manuscript Preparation System',
    authors: ['Dr. Emily Rodriguez'],
    abstract: 'A comprehensive system for preparing academic manuscripts using LaTeX with integrated compilation and preview capabilities...',
    source: 'latex_draft',
    status: 'draft',
    keywords: ['latex', 'manuscript', 'academic writing'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    latexFile: 'manuscript.tex'
  },
  {
    id: '3',
    title: 'Peer Review Quality Assessment Framework',
    authors: ['Prof. David Kim', 'Dr. Lisa Wang'],
    abstract: 'A novel framework for assessing and improving the quality of peer review processes in academic publishing...',
    doi: '10.1000/example.2024.002',
    url: 'https://arxiv.org/abs/2024.00123',
    source: 'arxiv',
    status: 'under_review',
    journal: 'Computing Research Repository',
    year: 2024,
    citations: 8,
    keywords: ['peer review', 'quality assessment', 'academic publishing'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  }
]

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>(mockPapers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sourceFilter, setSourceFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'citations'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Paper[]>([])

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'ALL' || paper.status === statusFilter
    const matchesSource = sourceFilter === 'ALL' || paper.source === sourceFilter
    
    return matchesSearch && matchesStatus && matchesSource
  })

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.updatedAt).getTime()
        bValue = new Date(b.updatedAt).getTime()
        break
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'citations':
        aValue = a.citations || 0
        bValue = b.citations || 0
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

  const handleSearchExternal = async () => {
    if (!searchTerm.trim()) return
    
    setIsSearching(true)
    try {
      // Simulate external search
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockSearchResults: Paper[] = [
        {
          id: `search-${Date.now()}`,
          title: `Search result for: ${searchTerm}`,
          authors: ['Author 1', 'Author 2'],
          abstract: `This is a search result for "${searchTerm}" from external sources...`,
          source: 'google_scholar',
          status: 'draft',
          keywords: [searchTerm.toLowerCase()],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      
      setSearchResults(mockSearchResults)
      paperActions.searchExternalPapers(searchTerm)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddPaper = (paper: Paper) => {
    const newPaper = {
      ...paper,
      id: Date.now().toString(),
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setPapers(prev => [newPaper, ...prev])
    paperActions.addPaper(newPaper)
  }

  const handleDeletePaper = (paperId: string) => {
    if (confirm('Are you sure you want to delete this paper?')) {
      setPapers(prev => prev.filter(p => p.id !== paperId))
      paperActions.deletePaper(paperId)
    }
  }

  const handleEditPaper = (paperId: string) => {
    paperActions.editPaper(paperId)
  }

  const handleViewPaper = (paperId: string) => {
    paperActions.viewPaper(paperId)
  }

  const handleDownloadPaper = (paperId: string) => {
    paperActions.downloadPaper(paperId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'under_review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'submitted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google_scholar': return <Globe className="h-4 w-4" />
      case 'arxiv': return <BookOpen className="h-4 w-4" />
      case 'latex_draft': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">My Papers</h1>
          <p className="text-muted-foreground">Manage your research papers and manuscripts</p>
        </div>
        <Button 
          className="btn-primary"
          onClick={() => paperActions.createNewPaper()}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Paper
        </Button>
      </div>

      {/* Search Section */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search External Sources
          </CardTitle>
          <CardDescription>Search Google Scholar, arXiv, and other academic databases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search papers by title, author, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchExternal()}
              />
            </div>
            <Button 
              onClick={handleSearchExternal}
              disabled={isSearching || !searchTerm.trim()}
              className="btn-primary"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">Search Results</h4>
              {searchResults.map((paper) => (
                <div key={paper.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium">{paper.title}</h5>
                    <p className="text-sm text-muted-foreground">{paper.authors.join(', ')}</p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleAddPaper(paper)}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Add to Library
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <Label htmlFor="source-filter">Source</Label>
              <select
                id="source-filter"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="ALL">All Sources</option>
                <option value="google_scholar">Google Scholar</option>
                <option value="arxiv">arXiv</option>
                <option value="latex_draft">LaTeX Draft</option>
                <option value="manual">Manual Entry</option>
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
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="citations">Citations</option>
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

      {/* Papers List */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Paper Library ({sortedPapers.length})</CardTitle>
          <CardDescription>Your research papers and manuscripts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedPapers.map((paper) => (
              <div key={paper.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{paper.title}</h3>
                      <Badge className={getStatusColor(paper.status)}>
                        {paper.status.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {getSourceIcon(paper.source)}
                        <span className="text-xs">{paper.source.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {paper.authors.join(', ')}
                      </span>
                      {paper.journal && (
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {paper.journal}
                        </span>
                      )}
                      {paper.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {paper.year}
                        </span>
                      )}
                      {paper.citations && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {paper.citations} citations
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {paper.abstract}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {paper.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewPaper(paper.id)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditPaper(paper.id)}
                      className="hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {paper.pdfFile && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownloadPaper(paper.id)}
                        className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {paper.url && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open(paper.url, '_blank')}
                        className="hover:bg-orange-100 dark:hover:bg-orange-900/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeletePaper(paper.id)}
                      className="text-destructive hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {sortedPapers.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No papers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'ALL' || sourceFilter !== 'ALL'
                    ? 'Try adjusting your search or filters'
                    : 'Start by adding your first paper'
                  }
                </p>
                <Button 
                  className="btn-primary"
                  onClick={() => paperActions.createNewPaper()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Paper
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 