# Vercel Deployment Guide

This project is now configured to deploy on Vercel. Follow these steps:

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [Supabase project](https://supabase.com) with your database
3. A [Resend account](https://resend.com) for email sending

## Step-by-Step Setup

### 1. Prepare Your Repository

Push your code to GitHub, GitLab, or Bitbucket:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Create Vercel Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will auto-detect it as a Vite project

### 3. Configure Environment Variables

In your Vercel project settings, add these environment variables:

**From your Supabase project:**
- `SUPABASE_URL`: Found in Settings > API > Project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Found in Settings > API > Service role key

**From Resend:**
- `RESEND_API_KEY`: Your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies (`bun install`)
- Build the project (`bun run build`)
- Start the server (automatically runs `start` script)

## Verification

After deployment:

1. Visit your Vercel URL
2. Test the form submission
3. Check that:
   - Application data saves to Supabase
   - Confirmation emails are sent via Resend
   - No Lovable-specific errors appear

## Troubleshooting

### Build Fails with "Command not found: bun"

Vercel automatically uses the package manager from your `package.json` `"type": "module"`. If issues occur:

1. Add a `.nvmrc` file:
```
20
```

2. Ensure `bun` is available in the build environment. Vercel supports bun natively.

### Emails Not Sending

- Verify `RESEND_API_KEY` is set correctly in Vercel project settings
- Check Resend dashboard for delivery logs
- Ensure you're using a domain verified with Resend (default domain is `onboarding@resend.dev`)

### Database Connection Errors

- Confirm `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
- Check Supabase dashboard to ensure your table exists
- Verify RLS policies allow service role access

## Local Testing Before Deploy

Test locally with environment variables set:

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local

# Build and preview
bun run build
bun run start
```

Visit `http://localhost:3000` to test.

## Reverting to Lovable Cloud

If you need to go back, restore from git:

```bash
git revert <commit-hash>  # Revert the Vercel changes
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Supabase JavaScript Guide](https://supabase.com/docs/reference/javascript)
- [Resend Email API](https://resend.com/docs/api-reference/emails/send)
