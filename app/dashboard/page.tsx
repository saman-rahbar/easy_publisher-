'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Download,
  MessageSquare
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { getMockSession } from '@/lib/mock-auth-client'
import { paperActions, navigationActions } from '@/lib/actions'

const stats = [
  { name: 'Total Papers', value: '1,234', change: '+12%', changeType: 'positive', icon: FileText },
  { name: 'Active Users', value: '456', change: '+8%', changeType: 'positive', icon: Users },
  { name: 'Submissions', value: '89', change: '+23%', changeType: 'positive', icon: TrendingUp },
  { name: 'Pending Reviews', value: '34', change: '-5%', changeType: 'negative', icon: Clock },
]

const recentPapers = [
  {
    id: 1,
    title: 'Machine Learning Applications in Healthcare',
    author: 'Dr. Sarah Johnson',
    status: 'Under Review',
    date: '2024-01-15',
    journal: 'Journal of Medical AI',
  },
  {
    id: 2,
    title: 'Quantum Computing in Cryptography',
    author: 'Prof. Michael Chen',
    status: 'Accepted',
    date: '2024-01-14',
    journal: 'Computing Research Quarterly',
  },
  {
    id: 3,
    title: 'Sustainable Energy Solutions',
    author: 'Dr. Emily Rodriguez',
    status: 'Revision Requested',
    date: '2024-01-13',
    journal: 'Environmental Science Today',
  },
  {
    id: 4,
    title: 'Blockchain Technology in Finance',
    author: 'Prof. David Kim',
    status: 'Published',
    date: '2024-01-12',
    journal: 'Financial Technology Review',
  },
]

const chartData = [
  { month: 'Jan', submissions: 65, publications: 45, reviews: 78 },
  { month: 'Feb', submissions: 72, publications: 52, reviews: 85 },
  { month: 'Mar', submissions: 68, publications: 48, reviews: 82 },
  { month: 'Apr', submissions: 85, publications: 61, reviews: 95 },
  { month: 'May', submissions: 78, publications: 55, reviews: 88 },
  { month: 'Jun', submissions: 92, publications: 68, reviews: 102 },
]

const pieData = [
  { name: 'Under Review', value: 45, color: '#3B82F6' },
  { name: 'Accepted', value: 30, color: '#10B981' },
  { name: 'Revision Requested', value: 15, color: '#F59E0B' },
  { name: 'Rejected', value: 10, color: '#EF4444' },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for session in demo mode
    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      const session = getMockSession()
      if (!session) {
        router.push('/auth/login')
        return
      }
      setUser(session.user)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{user ? `, ${user.name}` : ''}! Here's what's happening with your publishing platform.
          </p>
        </div>
        <Button 
          className="btn-primary"
          onClick={() => paperActions.submitNewPaper()}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Submission
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Submissions & Publications</CardTitle>
            <CardDescription>Monthly trends in submissions and publications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="submissions" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="publications" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Paper Status Distribution</CardTitle>
            <CardDescription>Current status of all papers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Papers */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Recent Papers</CardTitle>
          <CardDescription>Latest submissions and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPapers.map((paper) => (
              <div key={paper.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <div className="flex-1">
                  <h3 className="font-semibold">{paper.title}</h3>
                  <p className="text-sm text-muted-foreground">{paper.author} • {paper.journal}</p>
                  <p className="text-xs text-muted-foreground">{paper.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      paper.status === 'Accepted' ? 'default' :
                      paper.status === 'Under Review' ? 'secondary' :
                      paper.status === 'Revision Requested' ? 'outline' :
                      'default'
                    }
                    className={
                      paper.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      paper.status === 'Under Review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      paper.status === 'Revision Requested' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }
                  >
                    {paper.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => paperActions.viewPaper(paper.id.toString())}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => paperActions.downloadPaper(paper.id.toString())}
                      className="hover:bg-green-100 dark:hover:bg-green-900/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigationActions.goToReviews()}
                      className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submit Paper
            </CardTitle>
            <CardDescription>Upload your research paper for review</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full btn-primary"
              onClick={() => paperActions.submitNewPaper()}
            >
              Start Submission
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Review Papers
            </CardTitle>
            <CardDescription>Review papers assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigationActions.goToReviews()}
            >
              View Assignments
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>View detailed analytics and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigationActions.goToAnalytics()}
            >
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 