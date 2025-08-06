'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  MessageSquare,
  Download,
  Eye,
  Star,
  Calendar
} from 'lucide-react'

const monthlyData = [
  { month: 'Jan', submissions: 65, publications: 45, reviews: 78, users: 120 },
  { month: 'Feb', submissions: 72, publications: 52, reviews: 85, users: 135 },
  { month: 'Mar', submissions: 68, publications: 48, reviews: 82, users: 142 },
  { month: 'Apr', submissions: 85, publications: 61, reviews: 95, users: 158 },
  { month: 'May', submissions: 78, publications: 55, reviews: 88, users: 165 },
  { month: 'Jun', submissions: 92, publications: 68, reviews: 102, users: 180 },
  { month: 'Jul', submissions: 88, publications: 62, reviews: 95, users: 195 },
  { month: 'Aug', submissions: 95, publications: 70, reviews: 108, users: 210 },
]

const statusDistribution = [
  { name: 'Under Review', value: 45, color: '#3B82F6' },
  { name: 'Accepted', value: 30, color: '#10B981' },
  { name: 'Revision Requested', value: 15, color: '#F59E0B' },
  { name: 'Rejected', value: 10, color: '#EF4444' },
]

const topJournals = [
  { name: 'Journal of Medical AI', submissions: 45, publications: 32, impact: 4.2 },
  { name: 'Computing Research Quarterly', submissions: 38, publications: 28, impact: 3.8 },
  { name: 'Environmental Science Today', submissions: 32, publications: 24, impact: 3.5 },
  { name: 'Financial Technology Review', submissions: 28, publications: 20, impact: 3.2 },
  { name: 'Educational Technology Journal', submissions: 25, publications: 18, impact: 3.0 },
]

const reviewMetrics = [
  { metric: 'Average Review Time', value: '12.5 days', change: '+2.1%', trend: 'up' },
  { metric: 'Review Completion Rate', value: '87.3%', change: '+5.2%', trend: 'up' },
  { metric: 'Average Rating', value: '4.2/5.0', change: '+0.3', trend: 'up' },
  { metric: 'Reviewer Satisfaction', value: '92.1%', change: '+1.8%', trend: 'up' },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your publishing platform</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Last 30 days</Badge>
          <Badge variant="outline">Export Report</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-600">+12.5% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Publications</p>
                <p className="text-2xl font-bold">892</p>
                <p className="text-xs text-green-600">+8.3% from last month</p>
              </div>
              <Download className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">456</p>
                <p className="text-xs text-green-600">+15.2% from last month</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviews Completed</p>
                <p className="text-2xl font-bold">1,567</p>
                <p className="text-xs text-green-600">+6.7% from last month</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Monthly submissions, publications, and reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="submissions" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="publications" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="reviews" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Paper Status Distribution</CardTitle>
            <CardDescription>Current status of all papers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Review Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Review Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for the review process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {reviewMetrics.map((metric) => (
              <div key={metric.metric} className="text-center">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.metric}</div>
                <div className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Journals */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Journals</CardTitle>
          <CardDescription>Journals with highest submission and publication rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topJournals.map((journal, index) => (
              <div key={journal.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{journal.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {journal.submissions} submissions • {journal.publications} publications
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{journal.impact}</span>
                  </div>
                  <Badge variant="outline">Impact Factor</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly user registration and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest submissions and publications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">New paper submitted: "AI in Healthcare"</p>
                <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • 2 hours ago</p>
              </div>
              <Badge variant="outline">Submitted</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Review completed: "Quantum Computing"</p>
                <p className="text-sm text-muted-foreground">Prof. David Kim • 4 hours ago</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Paper published: "Blockchain in Finance"</p>
                <p className="text-sm text-muted-foreground">Prof. Alex Thompson • 1 day ago</p>
              </div>
              <Badge variant="outline">Published</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 