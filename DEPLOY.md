# How to Deploy Your Portfolio

This guide will help you put your website on the internet using **GitHub Pages** (free hosting).

## Prerequisites
- A GitHub account.
- Git installed on your computer.

## Step 1: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right -> **New repository**.
3. Name it exactly: `your-username.github.io` (e.g., `safaafaraji.github.io`).
   - *Note: If you use this specific name, your site will be available at that exact URL.*
4. Make it **Public**.
5. Do **not** initialize with README/gitignore yet.
6. Click **Create repository**.

## Step 2: Push Your Code
Open your terminal in the portfolio folder (`/Users/safaafaraji/portfolio`) and run these commands one by one:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all your files
git add .

# 3. Commit your changes
git commit -m "Initial portfolio release"

# 4. Link to your GitHub repo (Replace URL with YOUR repo URL)
git remote add origin https://github.com/safaafaraji/safaafaraji.github.io.git
# Note: If it says 'remote origin already exists', ignore or use 'git remote set-url origin ...'

# 5. Push code to the cloud
git branch -M main
git push -u origin main
```

## Step 3: Activate GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (sidebar).
3. Under **Build and deployment** / **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and `/ (root)`.
5. Click **Save**.

## Verification
Wait about 1-2 minutes. GitHub will show a message:  
✅ **"Your site is live at https://safaafaraji.github.io/"**

Click the link to verify your deployed site!
