# Modern Developer Portfolio & GitHub Pages Showcase 🚀

A sleek, responsive, and performance-optimized personal developer portfolio built with semantic HTML5, modern CSS3 (with Dark & Light mode toggle and glassmorphism styling), and interactive vanilla JavaScript.

Ready to deploy to **GitHub Pages** for 100% free hosting.

---

## ✨ Features

- 🌓 **Dark & Light Mode**: Auto-detects system preferences and persists the user's choice in `localStorage`.
- 📱 **Fully Responsive**: Mobile-first layout with smooth slide-out drawer menu.
- ⚡ **Zero Heavy Frameworks**: Blazing fast load times with vanilla HTML/CSS/JS and Lucide SVG icons.
- 🎯 **Interactive Project Filter**: Filter projects by categories (Full Stack, Frontend, Tools & APIs).
- 📜 **Scroll-Spy & Smooth Navigation**: Navbar dynamically highlights active sections as you scroll.
- 🤖 **VS Code & AI Companion Ready**: Pre-configured `.vscode` settings for GitHub Copilot, Continue, and Live Server.
- 👤 **Bonus Profile README**: Includes a pre-built GitHub Profile README template for your `github.com/<username>/<username>` repository.

---

## 📁 Project Structure

```text
developer-portfolio/
├── index.html             # Main portfolio webpage
├── style.css              # Modern CSS variables, glassmorphism, responsive styles
├── script.js              # Theme switcher, scroll spy, filters, mobile menu
├── VSCODE_AI_GUIDE.md     # Guide for setting up AI assistant in VS Code
├── profile-readme/
│   └── README.md          # Ready-to-use GitHub profile README with stats & badges
└── .vscode/
    ├── extensions.json    # Recommended VS Code extensions (Copilot, Continue, Live Server)
    └── settings.json      # Workspace auto-format and live preview settings
```

---

## 🚀 How to Run Locally

### Using VS Code Live Server
1. Open this folder in VS Code.
2. Open `index.html`.
3. Click **"Go Live"** at the bottom-right corner of VS Code.

### Using Python Terminal Server
```bash
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🌐 How to Push to GitHub & Deploy to GitHub Pages (Free)

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `developer-portfolio` or `<your-username>.github.io`).
3. Set the repository to **Public**.
4. Leave *"Add a README file"* **unchecked** (we already have one).
5. Click **Create repository**.

### Step 2: Push Your Code from Terminal
In your terminal, navigate to this project folder:
```bash
cd /Users/nirmaladhau/.gemini/antigravity/scratch/developer-portfolio

# Initialize Git
git init
git add .
git commit -m "feat: initial developer portfolio and AI setup"

# Link to your new GitHub repository (replace with your GitHub URL)
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# Push to GitHub!
git push -u origin main
```

### Step 3: Turn on GitHub Pages (Instant Free Hosting!)
1. Open your repository page on GitHub.
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Within 1 minute, your portfolio will be live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/` 🎉
