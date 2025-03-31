#!/bin/bash

# Emirati Career Journey Platform Deployment Script
# This script prepares the application for deployment

# Exit on error
set -e

# Display banner
echo "=================================================="
echo "  Emirati Career Journey Platform Deployment Tool  "
echo "=================================================="
echo ""

# Check if running with correct permissions
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Function to display progress
progress() {
  echo ""
  echo ">> $1"
  echo "------------------------------------------------"
}

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check environment
progress "Checking environment"

# Check Node.js
if command_exists node; then
  NODE_VERSION=$(node -v)
  echo "✓ Node.js is installed: $NODE_VERSION"
else
  echo "✗ Node.js is not installed. Please install Node.js v16 or higher."
  exit 1
fi

# Check npm
if command_exists npm; then
  NPM_VERSION=$(npm -v)
  echo "✓ npm is installed: $NPM_VERSION"
else
  echo "✗ npm is not installed. Please install npm."
  exit 1
fi

# Check if nginx is installed (for production deployment)
if command_exists nginx; then
  NGINX_VERSION=$(nginx -v 2>&1)
  echo "✓ Nginx is installed: $NGINX_VERSION"
else
  echo "! Nginx is not installed. It will be required for production deployment."
fi

# Check if PM2 is installed (for production deployment)
if command_exists pm2; then
  PM2_VERSION=$(pm2 -v)
  echo "✓ PM2 is installed: $PM2_VERSION"
else
  echo "! PM2 is not installed. It will be required for production deployment."
fi

# Prepare deployment directory
progress "Preparing deployment directory"
DEPLOY_DIR="/opt/emirati-career-platform"

# Create deployment directory if it doesn't exist
if [ ! -d "$DEPLOY_DIR" ]; then
  mkdir -p "$DEPLOY_DIR"
  echo "✓ Created deployment directory: $DEPLOY_DIR"
else
  echo "✓ Deployment directory already exists: $DEPLOY_DIR"
fi

# Set proper permissions
chown -R $(whoami):$(whoami) "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"
echo "✓ Set proper permissions on deployment directory"

# Copy application files
progress "Copying application files"
cp -r ./* "$DEPLOY_DIR/"
echo "✓ Copied application files to deployment directory"

# Install dependencies
progress "Installing dependencies"
cd "$DEPLOY_DIR"
npm install --production
echo "✓ Installed production dependencies"

# Build application
progress "Building application"
npm run build
echo "✓ Built application"

# Configure environment
progress "Configuring environment"
if [ ! -f "$DEPLOY_DIR/.env.production" ]; then
  cp "$DEPLOY_DIR/.env.example" "$DEPLOY_DIR/.env.production"
  echo "! Created default .env.production file. Please update with your production settings."
else
  echo "✓ .env.production file already exists"
fi

# Configure Nginx (for production deployment)
progress "Configuring Nginx"
NGINX_CONF="/etc/nginx/sites-available/emirati-career-platform"
NGINX_ENABLED="/etc/nginx/sites-enabled/emirati-career-platform"

# Create Nginx configuration if it doesn't exist
if [ ! -f "$NGINX_CONF" ]; then
  cat > "$NGINX_CONF" << EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
    gzip_types
        application/javascript
        application/json
        application/x-javascript
        application/xml
        application/xml+rss
        text/css
        text/javascript
        text/plain
        text/xml;

    # Serve pre-compressed files if available
    gzip_static on;
}
EOF
  echo "✓ Created Nginx configuration file"
  echo "! Please update the server_name in $NGINX_CONF with your actual domain"
else
  echo "✓ Nginx configuration file already exists"
fi

# Enable Nginx site if not already enabled
if [ ! -f "$NGINX_ENABLED" ]; then
  ln -s "$NGINX_CONF" "$NGINX_ENABLED"
  echo "✓ Enabled Nginx site"
else
  echo "✓ Nginx site already enabled"
fi

# Configure PM2 (for production deployment)
progress "Configuring PM2"
PM2_CONF="$DEPLOY_DIR/ecosystem.config.js"

# Create PM2 configuration if it doesn't exist
if [ ! -f "$PM2_CONF" ]; then
  cat > "$PM2_CONF" << EOF
module.exports = {
  apps: [{
    name: 'emirati-career-platform',
    script: 'npm',
    args: 'start',
    cwd: '$DEPLOY_DIR',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF
  echo "✓ Created PM2 configuration file"
else
  echo "✓ PM2 configuration file already exists"
fi

# Create deployment instructions
progress "Creating deployment instructions"
INSTRUCTIONS_FILE="$DEPLOY_DIR/DEPLOYMENT.md"

cat > "$INSTRUCTIONS_FILE" << EOF
# Emirati Career Journey Platform Deployment Instructions

## Local Deployment (Windows)

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Installation Steps
1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-org/emirati-career-platform.git
   cd emirati-career-platform
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create environment configuration:
   - Copy \`.env.example\` to \`.env.local\`
   - Update environment variables with your API keys and configuration

4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Access the application:
   - Open browser to \`http://localhost:3000\`

## Production Deployment (Ubuntu Cloud)

### Prerequisites
- Ubuntu 20.04 LTS or newer
- Node.js (v16+)
- npm or yarn
- Nginx
- PM2 (for process management)
- SSL certificate

### Deployment Steps
1. Prepare the server:
   \`\`\`
   sudo apt update
   sudo apt install -y nodejs npm nginx
   sudo npm install -g pm2
   \`\`\`

2. Run the deployment script:
   \`\`\`
   sudo ./deploy.sh
   \`\`\`

3. Update environment variables:
   - Edit \`.env.production\` with your production settings
   - Ensure all API keys and secrets are properly set

4. Update Nginx configuration:
   - Edit \`/etc/nginx/sites-available/emirati-career-platform\`
   - Set your domain name in the \`server_name\` directive
   - Restart Nginx: \`sudo systemctl restart nginx\`

5. Set up SSL with Let's Encrypt:
   \`\`\`
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   \`\`\`

6. Start the application with PM2:
   \`\`\`
   cd /opt/emirati-career-platform
   pm2 start ecosystem.config.js
   \`\`\`

7. Set up automatic startup:
   \`\`\`
   pm2 startup
   pm2 save
   \`\`\`

8. Test the deployment:
   - Verify the application is accessible via your domain
   - Test all major functionality
   - Check for any console errors or performance issues

## Maintenance

### Updating the Application
1. Pull the latest code:
   \`\`\`
   cd /opt/emirati-career-platform
   git pull
   \`\`\`

2. Install dependencies and rebuild:
   \`\`\`
   npm install --production
   npm run build
   \`\`\`

3. Restart the application:
   \`\`\`
   pm2 restart emirati-career-platform
   \`\`\`

### Backup Procedure
1. Back up the database:
   - Follow Supabase backup procedures for your database

2. Back up application files:
   \`\`\`
   sudo tar -czvf /backup/emirati-career-platform-\$(date +%Y%m%d).tar.gz /opt/emirati-career-platform
   \`\`\`

### Monitoring
- Check application logs: \`pm2 logs emirati-career-platform\`
- Monitor application status: \`pm2 status\`
- Check Nginx logs: \`sudo tail -f /var/log/nginx/error.log\`

## Troubleshooting

### Common Issues

1. **Application not starting**
   - Check logs: \`pm2 logs emirati-career-platform\`
   - Verify environment variables in \`.env.production\`
   - Ensure Node.js version is compatible

2. **Nginx returning 502 Bad Gateway**
   - Verify application is running: \`pm2 status\`
   - Check Nginx configuration
   - Ensure ports are correctly configured

3. **SSL certificate issues**
   - Renew certificate: \`sudo certbot renew\`
   - Check certificate status: \`sudo certbot certificates\`

For more detailed troubleshooting, refer to the full platform documentation.
EOF

echo "✓ Created deployment instructions"

# Create Windows deployment package
progress "Creating Windows deployment package"
WINDOWS_PACKAGE="$DEPLOY_DIR/emirati-career-platform-windows.zip"

# Create a temporary directory for Windows package
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/emirati-career-platform"

# Copy necessary files
cp -r ./* "$TEMP_DIR/emirati-career-platform/"
rm -rf "$TEMP_DIR/emirati-career-platform/node_modules"
rm -rf "$TEMP_DIR/emirati-career-platform/.git"

# Create Windows batch file for easy startup
cat > "$TEMP_DIR/emirati-career-platform/start.bat" << EOF
@echo off
echo Starting Emirati Career Journey Platform...
echo.
echo Step 1: Installing dependencies (this may take a few minutes)...
call npm install
echo.
echo Step 2: Starting development server...
call npm run dev
echo.
echo If the browser doesn't open automatically, please visit:
echo http://localhost:3000
EOF

# Create Windows README
cat > "$TEMP_DIR/emirati-career-platform/README_WINDOWS.md" << EOF
# Emirati Career Journey Platform - Windows Setup

## Prerequisites
- Node.js (v16+): Download from https://nodejs.org/
- npm (comes with Node.js)
- Git (optional): Download from https://git-scm.com/

## Quick Start
1. Double-click the \`start.bat\` file in this directory
2. Wait for the installation and startup process to complete
3. The application will be available at http://localhost:3000

## Manual Setup
If the quick start doesn't work, follow these steps:

1. Open Command Prompt as Administrator
2. Navigate to this directory:
   \`\`\`
   cd path\to\emirati-career-platform
   \`\`\`
3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`
5. Open your browser and go to http://localhost:3000

## Configuration
- Copy \`.env.example\` to \`.env.local\`
- Update the environment variables with your API keys and settings

## Troubleshooting
- If you encounter any issues, please refer to the documentation in the \`docs\` folder
- For Node.js issues, ensure you have the correct version installed (v16+)
- For npm errors, try running \`npm cache clean --force\` before reinstalling

## Support
For additional help, contact support@emiraticareerplatform.ae
EOF

# Create zip package
cd "$TEMP_DIR"
zip -r "$WINDOWS_PACKAGE" "emirati-career-platform"
cd - > /dev/null

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "✓ Created Windows deployment package: $WINDOWS_PACKAGE"

# Final instructions
progress "Deployment preparation complete"
echo ""
echo "The Emirati Career Journey Platform has been prepared for deployment."
echo ""
echo "Windows Deployment Package:"
echo "  $WINDOWS_PACKAGE"
echo ""
echo "Ubuntu Deployment:"
echo "  Deployment directory: $DEPLOY_DIR"
echo "  Nginx configuration: $NGINX_CONF"
echo "  PM2 configuration: $PM2_CONF"
echo ""
echo "Next Steps:"
echo "1. Review and update the environment configuration in .env.production"
echo "2. Update the Nginx configuration with your domain name"
echo "3. Set up SSL certificates for secure access"
echo "4. Start the application using PM2"
echo ""
echo "For detailed instructions, see: $INSTRUCTIONS_FILE"
echo ""
echo "=================================================="
