# Vercel Deployment Guide for Digital Football Paradise

This guide provides detailed instructions for deploying the Digital Football Paradise platform using Vercel.

## Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- Your GitHub repository at https://github.com/mcflier/football-paradise.git

## Step 1: Connect Your GitHub Repository to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select "GitHub" and authorize Vercel to access your repositories
4. Find and select the "football-paradise" repository

## Step 2: Configure the Project

Vercel will automatically detect that it's a Next.js project. You'll need to configure the following environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `DISCORD_CLIENT_ID` | 1356803483700953228 | Your Discord application client ID |
| `DISCORD_CLIENT_SECRET` | Your secret | Your Discord application client secret |
| `NEXTAUTH_SECRET` | Generate a random string | Used for encrypting session data |
| `NEXTAUTH_URL` | Your Vercel URL (after deployment) | The base URL of your application |
| `NEXT_PUBLIC_API_URL` | Your backend API URL | Where your FastAPI backend is hosted |

## Step 3: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Once complete, you'll receive a deployment URL (e.g., https://football-paradise.vercel.app)

## Step 4: Update NEXTAUTH_URL

After deployment:
1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Update the `NEXTAUTH_URL` environment variable with your actual deployment URL
4. Click "Save" and redeploy the application for the changes to take effect

## Step 5: Configure Discord OAuth Redirect

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Navigate to the "OAuth2" section
4. Add a new redirect URL: `https://your-vercel-url.vercel.app/api/auth/callback/discord`
5. Save changes

## Backend Deployment Options

### Option 1: AWS Lambda (via Zappa)

1. Install AWS CLI and configure your credentials
2. Navigate to the backend directory
3. Update `zappa_settings.json` with your configuration
4. Run `zappa deploy production`
5. Update the `NEXT_PUBLIC_API_URL` in your Vercel project to point to your AWS Lambda endpoint

### Option 2: Vercel Serverless Functions

1. Adapt the backend code to use Vercel's serverless functions
2. Create API routes in the `pages/api` directory
3. This allows you to host both frontend and backend on Vercel

### Option 3: Traditional Hosting

1. Deploy the FastAPI backend on a VPS or cloud service (DigitalOcean, Heroku, etc.)
2. Set up a domain or use the provided URL
3. Update the `NEXT_PUBLIC_API_URL` in your Vercel project accordingly

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Verify that your Discord OAuth credentials are correct
   - Ensure the redirect URL in Discord Developer Portal matches your Vercel URL

2. **API Connection Issues**:
   - Check that your backend is properly deployed and accessible
   - Verify that `NEXT_PUBLIC_API_URL` is correctly set in Vercel

3. **Build Failures**:
   - Check the build logs in Vercel for specific errors
   - Ensure all dependencies are properly installed

## Continuous Deployment

Vercel automatically deploys changes when you push to your GitHub repository. To take advantage of this:

1. Make changes to your code locally
2. Commit and push to GitHub
3. Vercel will automatically build and deploy the new version

## Custom Domains

To use a custom domain with your Vercel deployment:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your domain and follow the instructions to configure DNS settings

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring:

1. Go to your project dashboard in Vercel
2. Navigate to the "Analytics" tab to view performance metrics
3. Use the "Logs" tab to troubleshoot issues

## Support

If you encounter any issues with your Vercel deployment, you can:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Visit the [Vercel support forum](https://github.com/vercel/vercel/discussions)
3. Contact Vercel support directly through their website
