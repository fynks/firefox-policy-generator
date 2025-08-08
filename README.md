# Firefox Policy Generator

A comprehensive, free-to-use web application for generating Firefox `policies.json` files. Perfect for IT administrators and organizations who need to configure Firefox browser settings at scale with enterprise-grade security and compliance.

## 🚀 Features

- **Enterprise-Ready Configuration** - Complete Firefox policy management for organizations
- **Modern Security Policies** - Latest Firefox security features and privacy controls
- **User-Friendly Interface** - Intuitive GUI with detailed explanations for each setting
- **Real-Time Policy Generation** - Instant preview and validation of policy configurations
- **Cross-Platform Support** - Deployment instructions for Windows, macOS, and Linux
- **Compliance-Focused** - Built-in security best practices and regulatory compliance helpers
- **No Dependencies** - Pure HTML/CSS/JavaScript, works offline

## 🛡️ Why Use Firefox Policies?

### For IT Administrators
- **Centralized Control**: Deploy consistent browser configurations across your entire organization
- **Security Compliance**: Meet regulatory requirements with enterprise-grade security settings
- **User Experience**: Reduce support tickets by preconfiguring optimal browser settings
- **Network Management**: Control proxy settings, extension installations, and network behaviors

### Key Benefits
- **Zero-Touch Deployment**: Users get properly configured browsers without manual setup
- **Regulatory Compliance**: GDPR, HIPAA, and SOC2 compliance-ready configurations
- **Security Hardening**: Disable risky features and enable advanced security protections
- **Cost Reduction**: Reduce IT support overhead and improve productivity

## � What You Can Configure

### 🔒 Security & Privacy
- **Enhanced Tracking Protection** - Block trackers, cryptominers, and fingerprinting
- **DNS over HTTPS** - Secure DNS resolution with Cloudflare, Quad9, or custom providers
- **Content Blocking** - Advanced protection against malicious downloads and websites
- **WebRTC Control** - Prevent IP leaks and manage real-time communications
- **Password Management** - Control built-in password manager and reveal features
- **Form History** - Manage form data retention and autocomplete behavior

### 🎛️ User Interface & Experience
- **Interface Customization** - Control toolbars, menus, and developer tools access
- **Homepage & New Tabs** - Set organizational homepages and new tab behaviors
- **Private Browsing** - Enable or disable incognito mode access
- **Bookmarks Management** - Control default bookmarks and toolbar visibility

### 🔌 Extensions & Add-ons
- **Pre-installed Security Extensions** - Deploy uBlock Origin, Bitwarden, and containers
- **Extension Management** - Control user installation permissions and recommendations
- **Automatic Updates** - Manage extension and browser update policies

### 🔍 Search & Network
- **Search Engine Management** - Configure default engines and privacy-focused alternatives
- **Proxy Configuration** - Enterprise proxy settings and network routing
- **Certificate Management** - Custom CA certificates and security policies

### � Data & Telemetry
- **Telemetry Control** - Disable data collection and usage reporting
- **Firefox Sync** - Manage account integration and cloud synchronization
- **Studies & Experiments** - Control Mozilla research participation

## 📦 Quick Start

### Option 1: Use Online (Recommended)
Visit [firefox-policy-generator.pages.dev](https://firefox-policy-generator.pages.dev) to use the tool directly in your browser.

### Option 2: Run Locally
```bash
git clone https://github.com/your-username/firefox-policy-generator.git
cd firefox-policy-generator
# Open index.html in your web browser
```

## 🎯 How to Use

### Step 1: Configure Your Policies
1. **Review Security Settings** - Enable recommended security policies for your organization
2. **Customize Privacy Options** - Configure data collection and tracking protection
3. **Set Up Extensions** - Choose security extensions for automatic deployment
4. **Configure Network Settings** - Set up proxy and DNS policies as needed

### Step 2: Generate & Download
1. **Real-time Preview** - See your policy configuration update automatically
2. **Download JSON** - Get your complete `policies.json` file
3. **Validation** - Built-in validation ensures policy compliance

### Step 3: Deploy Policies

#### Windows Deployment
```powershell
# Copy policies.json to Firefox installation directory
Copy-Item "policies.json" "C:\Program Files\Mozilla Firefox\distribution\"
```

#### macOS Deployment
```bash
# Copy to Firefox application bundle
sudo cp policies.json "/Applications/Firefox.app/Contents/Resources/distribution/"
```

#### Linux Deployment
```bash
# System-wide deployment
sudo cp policies.json "/usr/lib/firefox/distribution/"
# Or user-specific
mkdir -p ~/.mozilla/firefox/distribution/
cp policies.json ~/.mozilla/firefox/distribution/
```

### Step 4: Verify Deployment
1. **Restart Firefox** - Changes take effect after browser restart
2. **Check about:policies** - Verify policies are loaded correctly
3. **Test Configuration** - Ensure all settings work as expected

## 🏢 Enterprise Use Cases

### Healthcare Organizations
- HIPAA compliance with strict privacy controls
- Disable data collection and external communications
- Pre-install security extensions and configure secure DNS

### Financial Services
- SOC2 compliance-ready configurations
- Disable developer tools and private browsing
- Enable enhanced tracking protection and content blocking

### Educational Institutions
- Student-safe browsing configurations
- Controlled extension installations
- Custom homepage and search engine settings

### Government Agencies
- Security-hardened browser configurations
- Compliance with federal security standards
- Controlled network access and proxy settings

## 🔧 Technical Details

### Browser Compatibility
- **Firefox 78 ESR+** - All enterprise features supported
- **Firefox 91 ESR+** - Recommended for latest security features
- **Firefox 115 ESR** - Current long-term support release

### Policy Format
- Standard Mozilla policies.json format
- Compatible with Firefox Group Policy templates
- Supports all documented Mozilla policy options

### Integration Options
- **Group Policy (Windows)** - Deploy via Active Directory
- **SCCM/Intune** - Microsoft System Center integration
- **Puppet/Ansible** - Configuration management tools
- **Manual Deployment** - Direct file placement

## 📋 Security Best Practices

### Recommended Security Baseline
1. ✅ Enable Enhanced Tracking Protection (Strict)
2. ✅ Disable Telemetry and Studies
3. ✅ Configure DNS over HTTPS
4. ✅ Install uBlock Origin extension
5. ✅ Disable Developer Tools access
6. ✅ Enable automatic security updates

### Privacy-First Configuration
1. ✅ Disable sponsored suggestions and content
2. ✅ Block form history and password reveals
3. ✅ Disable Firefox Accounts integration
4. ✅ Configure privacy-focused search engines
5. ✅ Enable strict content blocking

## 📚 Resources

- [Mozilla Policy Templates](https://github.com/mozilla/policy-templates) - Official policy documentation
- [Firefox ESR Release Notes](https://www.mozilla.org/en-US/firefox/organizations/) - Enterprise release information
- [Group Policy Templates](https://github.com/mozilla/policy-templates/releases) - Windows ADMX files

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/your-username/firefox-policy-generator.git
cd firefox-policy-generator
# No build process required - open index.html in browser
```

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/firefox-policy-generator/issues)
- **Documentation**: [Wiki](https://github.com/your-username/firefox-policy-generator/wiki)
- **Community**: [Discussions](https://github.com/your-username/firefox-policy-generator/discussions)

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📚 Related Resources

- [Mozilla Firefox Policy Documentation](https://github.com/mozilla/policy-templates)
- [Firefox Enterprise Guide](https://support.mozilla.org/en-US/kb/customizing-firefox-using-policiesjson)