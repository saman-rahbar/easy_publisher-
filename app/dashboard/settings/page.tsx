'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Database,
  Mail,
  Key,
  User,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    paperUpdates: true,
    reviewRequests: true,
    publicationAlerts: true,
  })

  const [platformSettings, setPlatformSettings] = useState({
    siteName: 'Scholarly Publishing Platform',
    siteDescription: 'Modern academic publishing platform',
    contactEmail: 'admin@publishingplatform.com',
    maxFileSize: '10MB',
    allowedFileTypes: 'PDF, DOC, DOCX',
    reviewDeadline: '30',
    autoArchive: '90',
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordExpiry: '90',
    loginAttempts: '5',
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Platform Settings
          </CardTitle>
          <CardDescription>Configure basic platform information and behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={platformSettings.siteName}
                onChange={(e) => setPlatformSettings({...platformSettings, siteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={platformSettings.contactEmail}
                onChange={(e) => setPlatformSettings({...platformSettings, contactEmail: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              value={platformSettings.siteDescription}
              onChange={(e) => setPlatformSettings({...platformSettings, siteDescription: e.target.value})}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size</Label>
              <Input
                id="maxFileSize"
                value={platformSettings.maxFileSize}
                onChange={(e) => setPlatformSettings({...platformSettings, maxFileSize: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewDeadline">Review Deadline (days)</Label>
              <Input
                id="reviewDeadline"
                type="number"
                value={platformSettings.reviewDeadline}
                onChange={(e) => setPlatformSettings({...platformSettings, reviewDeadline: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoArchive">Auto Archive (days)</Label>
              <Input
                id="autoArchive"
                type="number"
                value={platformSettings.autoArchive}
                onChange={(e) => setPlatformSettings({...platformSettings, autoArchive: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="email">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="push"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="push">Push Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sms"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="sms">SMS Notifications</Label>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Notification Types</h4>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="paperUpdates"
                  checked={notifications.paperUpdates}
                  onChange={(e) => setNotifications({...notifications, paperUpdates: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="paperUpdates">Paper Status Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reviewRequests"
                  checked={notifications.reviewRequests}
                  onChange={(e) => setNotifications({...notifications, reviewRequests: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="reviewRequests">Review Requests</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="publicationAlerts"
                  checked={notifications.publicationAlerts}
                  onChange={(e) => setNotifications({...notifications, publicationAlerts: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="publicationAlerts">Publication Alerts</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure security and authentication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Settings
          </CardTitle>
          <CardDescription>Database configuration and maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium">Database Type</Label>
              <p className="text-sm text-muted-foreground">SQLite (Development)</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Database Size</Label>
              <p className="text-sm text-muted-foreground">2.4 MB</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Backup Database
            </Button>
            <Button variant="outline" size="sm">
              Optimize Database
            </Button>
            <Button variant="outline" size="sm">
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>Configure email server settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input id="smtpHost" placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input id="smtpPort" placeholder="587" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input id="smtpUser" placeholder="your-email@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPass">SMTP Password</Label>
              <Input id="smtpPass" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button variant="outline" size="sm">
            Test Email Configuration
          </Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>API keys and external service configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input id="apiKey" type="password" value="sk-••••••••••••••••••••••••••••••••" />
              <Button variant="outline" size="sm">Generate New</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input id="webhookUrl" placeholder="https://your-domain.com/webhook" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Test Webhook
            </Button>
            <Button variant="outline" size="sm">
              View API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 