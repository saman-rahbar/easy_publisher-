# Scholarly Publishing Platform

A modern, comprehensive scholarly publishing platform built with Next.js 14, TypeScript, and Tailwind CSS. This platform provides all the essential features for academic publishing with a beautiful, user-friendly interface.

## 🚀 Features

### Core Publishing Features
- **Paper Submission**: Drag-and-drop file uploads with automated formatting checks
- **Peer Review System**: Anonymous reviewing with scoring and feedback
- **Journal Management**: Create and manage multiple journals
- **User Management**: Role-based access control (Authors, Reviewers, Editors, Admins)
- **Paper Tracking**: Real-time status updates and progress tracking
- **Analytics Dashboard**: Comprehensive metrics and reporting

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Beautiful Charts**: Interactive analytics with Recharts
- **Real-time Notifications**: Toast notifications and badge indicators
- **Accessible**: WCAG compliant with keyboard navigation

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Form Validation**: Zod schema validation with React Hook Form

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: SQLite (Prisma ORM)
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd scholarly-publishing-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The platform uses a comprehensive database schema with the following main entities:

- **Users**: Authors, reviewers, editors, and administrators
- **Papers**: Research papers with metadata and content
- **Journals**: Publication venues with editorial teams
- **Submissions**: Paper submissions to specific journals
- **Reviews**: Peer review assignments and feedback
- **Notifications**: System notifications for users

## 🎯 Key Pages

### Public Pages
- **Landing Page** (`/`): Modern homepage with feature showcase
- **Sign Up** (`/auth/signup`): User registration with role selection
- **Sign In** (`/auth/login`): User authentication

### Dashboard Pages
- **Dashboard** (`/dashboard`): Overview with analytics and recent activity
- **My Papers** (`/dashboard/papers`): Author's paper management
- **Submissions** (`/dashboard/submissions`): Editorial submission management
- **Reviews** (`/dashboard/reviews`): Peer review assignments
- **Analytics** (`/dashboard/analytics`): Detailed metrics and reports
- **Users** (`/dashboard/users`): User management for admins
- **Settings** (`/dashboard/settings`): Platform configuration

## 🎨 Design System

The platform uses a comprehensive design system with:

- **Color Palette**: Semantic colors for different states and actions
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable UI components with variants
- **Spacing**: Consistent spacing scale using Tailwind's spacing system
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### Project Structure

```
scholarly-publishing-poc/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── providers.tsx     # Context providers
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build plugin
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Containerized deployment
- **AWS/GCP**: Custom server deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PKP (Public Knowledge Project)**: Inspiration from the original OJS platform
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives

## 📞 Support

For support, email support@yourplatform.com or join our Slack channel.

---

Built with ❤️ for the academic community 