'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DemoBanner } from '@/components/demo-banner'
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
  MessageSquare,
  Eye,
  Zap,
  Globe,
  Shield
} from 'lucide-react'

const demoSteps = [
  {
    step: 1,
    title: 'Paper Submission',
    description: 'Experience our intuitive paper submission system with drag-and-drop uploads and automated formatting checks.',
    icon: <FileText className="h-8 w-8" />,
    color: 'bg-blue-500',
    features: ['Drag & Drop Upload', 'Format Validation', 'Metadata Entry', 'Progress Tracking']
  },
  {
    step: 2,
    title: 'Peer Review System',
    description: 'See how our streamlined review process works with anonymous reviewing and comprehensive feedback.',
    icon: <MessageSquare className="h-8 w-8" />,
    color: 'bg-green-500',
    features: ['Anonymous Reviews', 'Scoring System', 'Feedback Management', 'Review Assignment']
  },
  {
    step: 3,
    title: 'Editorial Dashboard',
    description: 'Explore the comprehensive editorial tools for managing submissions and making publication decisions.',
    icon: <Users className="h-8 w-8" />,
    color: 'bg-purple-500',
    features: ['Submission Management', 'Review Assignment', 'Decision Making', 'Workflow Tracking']
  },
  {
    step: 4,
    title: 'Analytics & Insights',
    description: 'Discover real-time analytics and performance metrics for your publishing operations.',
    icon: <BarChart3 className="h-8 w-8" />,
    color: 'bg-orange-500',
    features: ['Real-time Metrics', 'Performance Analytics', 'Trend Analysis', 'Custom Reports']
  }
]

const demoFeatures = [
  {
    title: 'User Management',
    description: 'Role-based access control with different permissions for authors, reviewers, editors, and admins.',
    icon: <Users className="h-6 w-6" />,
    status: 'Live'
  },
  {
    title: 'Paper Tracking',
    description: 'Real-time status updates and progress tracking throughout the publication process.',
    icon: <FileText className="h-6 w-6" />,
    status: 'Live'
  },
  {
    title: 'Review System',
    description: 'Comprehensive peer review workflow with scoring, feedback, and decision management.',
    icon: <MessageSquare className="h-6 w-6" />,
    status: 'Live'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Interactive charts and metrics for monitoring platform performance and user activity.',
    icon: <BarChart3 className="h-6 w-6" />,
    status: 'Live'
  },
  {
    title: 'Settings & Configuration',
    description: 'Comprehensive platform settings for customization and administrative control.',
    icon: <Settings className="h-6 w-6" />,
    status: 'Live'
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with data protection and compliance standards.',
    icon: <Shield className="h-6 w-6" />,
    status: 'Live'
  }
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 Interactive Demo
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Experience the
              <br />
              <span className="text-4xl md:text-6xl">Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Take a guided tour through our comprehensive scholarly publishing platform. 
              Explore real features with sample data and interactive demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  <Play className="mr-2 h-5 w-5" />
                  Start Full Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/auth/signup">
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <DemoBanner />
      </section>

      {/* Guided Tour */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Guided Platform Tour</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow our step-by-step guide to explore all the key features of the platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {demoSteps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center text-white`}>
                      {step.icon}
                    </div>
                    <div>
                      <Badge variant="secondary">Step {step.step}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    Try This Feature <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">All Features Available</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature in our platform is fully functional and ready for production use.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-blue-600">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Feature
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Demo Statistics</h2>
            <p className="text-xl text-blue-100">
              Real data showing the platform's capabilities
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,234</div>
              <div className="text-blue-100">Sample Papers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">456</div>
              <div className="text-blue-100">Demo Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">789</div>
              <div className="text-blue-100">Reviews Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">567</div>
              <div className="text-blue-100">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create your account and start using the platform with real data and full functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/signup">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">
                <Globe className="mr-2 h-5 w-5" />
                Explore Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 