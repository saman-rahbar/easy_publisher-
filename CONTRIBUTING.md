# Contributing to Scholarly Publishing Platform

Thank you for your interest in contributing to our scholarly publishing platform! This document provides guidelines for contributing to this project.

## 🤝 How to Contribute

### 🐛 Reporting Bugs

1. **Check existing issues** - Search the [issues page](https://github.com/saman-rahbar/easy_publisher-/issues) to see if the bug has already been reported
2. **Create a new issue** - Use the bug report template and include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/device information

### 💡 Suggesting Features

1. **Check existing feature requests** - Search existing issues first
2. **Create a feature request** - Use the feature request template and include:
   - Clear description of the feature
   - Use cases and benefits
   - Mockups or examples (if applicable)

### 🔧 Code Contributions

#### Prerequisites
- Node.js >= 18.17.0
- npm or yarn
- Git

#### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/easy_publisher-.git
   cd easy_publisher-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

#### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Describe your changes clearly
   - Link any related issues

## 📋 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Add proper type annotations
- Use interfaces for object shapes

### React/Next.js
- Use functional components with hooks
- Follow Next.js 13+ App Router patterns
- Use proper error boundaries

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design

### Database
- Use Prisma for database operations
- Add proper migrations for schema changes
- Include seed data for new features

## 🧪 Testing

- Add unit tests for new features
- Ensure all existing tests pass
- Test on multiple browsers/devices

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update API documentation if needed

## 🚀 Deployment

- Ensure the app builds successfully
- Test the demo deployment
- Update environment variables if needed

## 📝 Commit Message Format

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🎯 Areas for Contribution

### High Priority
- [ ] Additional user roles and permissions
- [ ] Enhanced paper review workflow
- [ ] Advanced analytics and reporting
- [ ] Email notifications system
- [ ] Mobile app optimization

### Medium Priority
- [ ] Multi-language support
- [ ] Advanced search functionality
- [ ] PDF generation and export
- [ ] Integration with external services
- [ ] Performance optimizations

### Low Priority
- [ ] Additional themes
- [ ] More chart types
- [ ] Social features
- [ ] API documentation
- [ ] Developer tools

## 🏆 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

## 📞 Questions?

If you have questions about contributing:
- Open a [discussion](https://github.com/saman-rahbar/easy_publisher-/discussions)
- Check existing issues and discussions
- Review the documentation

Thank you for contributing to open source! 🌟 