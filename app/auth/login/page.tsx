'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { findMockUserByEmail, validateMockPassword, createMockSession } from '@/lib/mock-auth-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, GraduationCap } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      // Always use client-side authentication for demo
      const user = findMockUserByEmail(data.email)
      if (user && validateMockPassword(data.password)) {
        createMockSession(user)
        toast.success('Logged in successfully!')
        router.push('/dashboard')
      } else {
        // Check if it's a demo user
        const demoUsers = ['admin@demo.com', 'editor@demo.com', 'reviewer@demo.com']
        if (demoUsers.includes(data.email)) {
          // Create a demo user session
          const demoUser = {
            id: Date.now().toString(),
            email: data.email,
            name: data.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            role: data.email.includes('admin') ? 'admin' : data.email.includes('editor') ? 'editor' : 'reviewer'
          }
          createMockSession(demoUser)
          toast.success('Logged in successfully with demo account!')
          router.push('/dashboard')
        } else {
          toast.error('Invalid email or password. Try: admin@demo.com, editor@demo.com, or reviewer@demo.com')
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your scholarly publishing account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Information */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Demo Accounts
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
              Try these demo accounts (any password works):
            </p>
            <div className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
              <div>• <strong>admin@demo.com</strong> - Administrator</div>
              <div>• <strong>editor@demo.com</strong> - Editor</div>
              <div>• <strong>reviewer@demo.com</strong> - Reviewer</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 