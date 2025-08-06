'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare
} from 'lucide-react'

const demoFeatures = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Paper Submission',
    description: 'Upload papers with drag-and-drop interface',
    status: 'Live',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'User Management',
    description: 'Role-based access control system',
    status: 'Live',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Analytics Dashboard',
    description: 'Real-time metrics and insights',
    status: 'Live',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Review System',
    description: 'Peer review workflow management',
    status: 'Live',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: 'Platform Settings',
    description: 'Comprehensive configuration options',
    status: 'Live',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
]

const demoStats = [
  { label: 'Papers Submitted', value: '1,234', change: '+12%' },
  { label: 'Active Users', value: '456', change: '+8%' },
  { label: 'Reviews Completed', value: '789', change: '+15%' },
  { label: 'Publications', value: '567', change: '+6%' }
]

export function DemoBanner() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl">Interactive Demo</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Experience the platform with real interactive features. Click the buttons below to explore different aspects of the system.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Demo Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {demoStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-green-600">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-blue-600">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <Badge className={feature.color}>{feature.status}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <Button size="sm" className="w-full">
                    Try Feature <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-5 w-5 mr-2" />
              Start Full Demo
            </Button>
            <Button size="lg" variant="outline">
              <Users className="h-5 w-5 mr-2" />
              View User Roles
            </Button>
            <Button size="lg" variant="outline">
              <BarChart3 className="h-5 w-5 mr-2" />
              Explore Analytics
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Submit Paper
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Review Assignment
              </Button>
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Platform Settings
              </Button>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Demo Mode Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This is a fully functional demo with sample data. All features are interactive and showcase the real platform capabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 