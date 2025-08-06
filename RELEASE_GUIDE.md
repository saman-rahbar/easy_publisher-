# 📦 Release Guide - Scholarly Publisher

This guide will help you create GitHub releases with downloadable installers.

## 🚀 Quick Start

### **Option 1: Automatic Build (Recommended)**

1. **Fix Node.js version** (if needed):
   ```bash
   ./fix-node-version.sh
   ```

2. **Build installers locally**:
   ```bash
   ./create-release.sh
   ```

3. **Create GitHub Release**:
   - Go to: https://github.com/saman-rahbar/easy_publisher-/releases
   - Click "Create a new release"
   - **Tag**: `v1.0.0`
   - **Title**: `Scholarly Publisher v1.0.0`
   - **Description**: Copy from the template below
   - **Upload files**: Drag installer files from `electron/dist/`
   - Click "Publish release"

### **Option 2: GitHub Actions (Automatic)**

1. **Create release on GitHub**:
   - Go to: https://github.com/saman-rahbar/easy_publisher-/releases
   - Click "Create a new release"
   - **Tag**: `v1.0.0`
   - **Title**: `Scholarly Publisher v1.0.0`
   - **Description**: Copy from the template below
   - **Publish release** (don't upload files manually)

2. **Wait for GitHub Actions**:
   - GitHub Actions will automatically build installers
   - Installers will be attached to the release
   - Download links will be available

## 📋 Release Description Template

```markdown
# Scholarly Publisher v1.0.0

## 📦 Installers

Download the installer for your platform:

- **macOS**: `.dmg` file (drag to Applications)
- **Windows**: `.exe` installer
- **Linux**: `.AppImage` file

## 🚀 Features

- 📄 Paper submission and management
- 👥 User management with roles
- 📊 Analytics dashboard
- 🔍 Advanced search and filtering
- 📱 Responsive design

## 💡 Installation

1. Download the installer for your platform
2. Run the installer
3. Launch the app from your Applications/Programs menu

## 🔧 System Requirements

- macOS 10.14+ / Windows 10+ / Linux (Ubuntu 18.04+)
- 4GB RAM minimum
- 500MB free disk space

## 🆘 Support

If you encounter any issues, please:
1. Check the [GitHub Issues](https://github.com/saman-rahbar/easy_publisher-/issues)
2. Create a new issue with details about your problem

## 📝 License

MIT License - see [LICENSE](https://github.com/saman-rahbar/easy_publisher-/blob/main/LICENSE) file
```

## 🔧 Troubleshooting

### **Build Errors**

If you get build errors:

1. **Check Node.js version**:
   ```bash
   node --version
   # Should be v18.17.0 or higher
   ```

2. **Fix Node.js if needed**:
   ```bash
   ./fix-node-version.sh
   ```

3. **Clean and rebuild**:
   ```bash
   rm -rf node_modules electron/node_modules
   npm install
   cd electron && npm install && cd ..
   ./create-release.sh
   ```

### **GitHub Actions Issues**

If GitHub Actions fails:

1. **Check the Actions tab** on GitHub
2. **Look for specific error messages**
3. **Common issues**:
   - Node.js version mismatch
   - Missing dependencies
   - Icon conversion errors

### **Download Links Not Working**

If download links show "Not Found":

1. **Make sure you created a release** with the correct tag
2. **Check that installer files were uploaded** to the release
3. **Verify the file names** match the download links:
   - `scholarly-publisher-mac.dmg`
   - `scholarly-publisher-win.exe`
   - `scholarly-publisher-linux.AppImage`

## 📁 File Structure

After building, you should have:

```
electron/dist/
├── Scholarly Publisher-1.0.0.dmg          # macOS
├── Scholarly Publisher Setup 1.0.0.exe     # Windows
└── scholarly-publisher_1.0.0_linux.AppImage # Linux
```

## 🎯 Next Steps

1. **Test installers** on target platforms
2. **Create release** on GitHub
3. **Share download links** with users
4. **Monitor for issues** and feedback
5. **Create new releases** for updates

## 💡 Tips

- **Version numbers**: Use semantic versioning (v1.0.0, v1.0.1, etc.)
- **Release notes**: Always include what's new/fixed
- **Testing**: Test installers before releasing
- **Backup**: Keep local copies of installers 