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
  Save,
  RefreshCw,
  Download,
  Upload,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { settingsActions, authActions } from '@/lib/actions'

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

  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSaveSettings = () => {
    settingsActions.saveSettings({
      notifications,
      platformSettings,
      securitySettings
    })
  }

  const handleResetSettings = () => {
    settingsActions.resetSettings()
  }

  const handleBackupData = () => {
    settingsActions.backupData()
  }

  const handleRestoreData = () => {
    settingsActions.restoreData()
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      return
    }
    authActions.changePassword()
  }

  const handleEnableTwoFactor = () => {
    authActions.enableTwoFactor()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleResetSettings}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button 
            className="btn-primary"
            onClick={handleSaveSettings}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notification Settings */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <input
                  id="email-notifications"
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <input
                  id="push-notifications"
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <input
                  id="sms-notifications"
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="paper-updates">Paper Updates</Label>
                <input
                  id="paper-updates"
                  type="checkbox"
                  checked={notifications.paperUpdates}
                  onChange={(e) => setNotifications({...notifications, paperUpdates: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="review-requests">Review Requests</Label>
                <input
                  id="review-requests"
                  type="checkbox"
                  checked={notifications.reviewRequests}
                  onChange={(e) => setNotifications({...notifications, reviewRequests: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="publication-alerts">Publication Alerts</Label>
                <input
                  id="publication-alerts"
                  type="checkbox"
                  checked={notifications.publicationAlerts}
                  onChange={(e) => setNotifications({...notifications, publicationAlerts: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Settings */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Platform Configuration
            </CardTitle>
            <CardDescription>Configure platform-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={platformSettings.siteName}
                onChange={(e) => setPlatformSettings({...platformSettings, siteName: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <Input
                id="site-description"
                value={platformSettings.siteDescription}
                onChange={(e) => setPlatformSettings({...platformSettings, siteDescription: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={platformSettings.contactEmail}
                onChange={(e) => setPlatformSettings({...platformSettings, contactEmail: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-file-size">Maximum File Size</Label>
              <Input
                id="max-file-size"
                value={platformSettings.maxFileSize}
                onChange={(e) => setPlatformSettings({...platformSettings, maxFileSize: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="allowed-file-types">Allowed File Types</Label>
              <Input
                id="allowed-file-types"
                value={platformSettings.allowedFileTypes}
                onChange={(e) => setPlatformSettings({...platformSettings, allowedFileTypes: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="review-deadline">Review Deadline (days)</Label>
              <Input
                id="review-deadline"
                type="number"
                value={platformSettings.reviewDeadline}
                onChange={(e) => setPlatformSettings({...platformSettings, reviewDeadline: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="auto-archive">Auto Archive (days)</Label>
              <Input
                id="auto-archive"
                type="number"
                value={platformSettings.autoArchive}
                onChange={(e) => setPlatformSettings({...platformSettings, autoArchive: e.target.value})}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Configure security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <input
                id="two-factor"
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Input
                id="password-expiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="login-attempts">Max Login Attempts</Label>
              <Input
                id="login-attempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
                className="mt-1"
              />
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleEnableTwoFactor}
            >
              <Lock className="mr-2 h-4 w-4" />
              Enable Two-Factor Auth
            </Button>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative mt-1">
                <Input
                  id="current-password"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              className="w-full btn-primary"
              onClick={handleChangePassword}
            >
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Backup and restore platform data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleBackupData}
            >
              <Download className="mr-2 h-4 w-4" />
              Create Backup
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleRestoreData}
            >
              <Upload className="mr-2 h-4 w-4" />
              Restore Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 