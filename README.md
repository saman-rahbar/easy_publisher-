# 🎓 Scholarly Publishing Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20Run%20Locally-blue?style=for-the-badge&logo=github)](https://github.com/saman-rahbar/easy_publisher-)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **A modern, comprehensive scholarly publishing platform with beautiful UI/UX that rivals and improves upon the PKP platform.**

## 🚀 Live Demo

**[Click here to run locally!](https://github.com/saman-rahbar/easy_publisher-)**

> **Note**: To run the demo locally, follow the installation instructions below.

Experience the platform with interactive features:
- ✨ **Real-time paper submissions**
- 📊 **Interactive analytics dashboard**
- 👥 **User management system**
- 🔍 **Advanced search and filtering**
- 📱 **Responsive design**

## ✨ Features

### 🎯 Core Publishing Features
- **Paper Submission & Management** - Complete workflow from draft to publication
- **Peer Review System** - Automated review assignment and tracking
- **Editorial Dashboard** - Comprehensive management tools
- **User Role Management** - Authors, Reviewers, Editors, Admins
- **Real-time Notifications** - Status updates and alerts

### 🎨 Modern UI/UX
- **Beautiful Design** - Clean, professional interface
- **Dark/Light Mode** - Automatic theme switching
- **Responsive Layout** - Works on all devices
- **Interactive Charts** - Data visualization with Recharts
- **Accessible Components** - WCAG compliant

### 🔧 Technical Excellence
- **Next.js 14** - Latest React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Prisma ORM** - Database management
- **NextAuth.js** - Authentication system
- **Real-time Updates** - Live notifications

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0.4 | React framework |
| **TypeScript** | 5.3.3 | Type safety |
| **Tailwind CSS** | 3.3.6 | Styling |
| **Prisma** | 5.7.1 | Database ORM |
| **NextAuth.js** | 4.24.5 | Authentication |
| **Recharts** | 2.8.0 | Data visualization |
| **Radix UI** | Latest | Accessible components |
| **Zod** | 3.22.4 | Schema validation |

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.17.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saman-rahbar/easy_publisher-.git
   cd easy_publisher-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Platform Screenshots

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Beautiful+Landing+Page)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Interactive+Dashboard)

### 📝 Paper Management
![Paper Management](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Paper+Management+System)

### 👥 User Management
![User Management](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=User+Management+Interface)

## 🎯 Key Features Demo

### 📄 Paper Submission Workflow
1. **Author submits paper** → Upload PDF, add metadata
2. **Editor reviews** → Assign reviewers, track progress
3. **Reviewers evaluate** → Provide feedback and ratings
4. **Editor makes decision** → Accept, reject, or request revisions
5. **Publication** → Final formatting and publishing

### 📊 Analytics Dashboard
- **Real-time metrics** - Submissions, publications, reviews
- **Interactive charts** - Monthly trends, status distribution
- **Performance insights** - Review times, acceptance rates
- **User activity** - Registration, engagement metrics

### 👥 User Management
- **Role-based access** - Different permissions per role
- **Profile management** - Edit personal information
- **Activity tracking** - View submission and review history
- **Communication** - Internal messaging system

## 🏗️ Project Structure

```
scholarly-publishing-poc/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── providers.tsx     # Context providers
├── lib/                  # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🔐 Authentication

The platform supports multiple user roles:

- **Authors** - Submit and manage papers
- **Reviewers** - Evaluate submissions
- **Editors** - Manage submissions and make decisions
- **Admins** - Platform administration

## 📊 Database Schema

```sql
-- Core entities
User (id, name, email, role, institution)
Paper (id, title, abstract, status, authorId)
Submission (id, paperId, journalId, status)
Review (id, paperId, reviewerId, rating, comments)
Journal (id, title, description, editorId)
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login to Vercel**: `vercel login`
3. **Deploy**: `vercel --yes`
4. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL` (use Vercel Postgres or external database)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your Vercel deployment URL)

### Quick Start (Local Demo):
```bash
# Clone and run in one command
git clone https://github.com/saman-rahbar/easy_publisher-.git
cd easy_publisher-
./demo.sh
```

### Manual Deployment Steps:
```bash
# 1. Clone the repository
git clone https://github.com/saman-rahbar/easy_publisher-.git
cd easy_publisher-

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp env.example .env.local
# Edit .env.local with your configuration

# 4. Set up database
npx prisma db push

# 5. Start development server
npm run dev
```

### Other Platforms
- **Netlify** - Static hosting
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PKP (Public Knowledge Project)** - Inspiration for scholarly publishing
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

## 📞 Support

- **Email**: support@scholarlyplatform.com
- **Documentation**: [docs.scholarlyplatform.com](https://docs.scholarlyplatform.com)
- **Issues**: [GitHub Issues](https://github.com/saman-rahbar/easy_publisher-/issues)

---

<div align="center">

**Built with ❤️ for the academic community**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20Run%20Locally-blue?style=for-the-badge&logo=github)](https://github.com/saman-rahbar/easy_publisher-)

</div> 