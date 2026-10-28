# 🤖 VS Code AI Companion & Setup Guide

This guide walks you through setting up an AI coding assistant inside Visual Studio Code to code alongside you with ChatGPT!

---

## 1. Open This Project in VS Code

You can open this project in VS Code in either of two easy ways:

### Option A: From VS Code directly
1. Open **Visual Studio Code** from your Applications or Spotlight (`Cmd + Space` -> type `Visual Studio Code`).
2. Click **File** > **Open Folder...** (or press `Cmd + O`).
3. Navigate to:
   `/Users/nirmaladhau/.gemini/antigravity/scratch/developer-portfolio`
4. Click **Open**.

### Option B: From the Terminal
In your terminal, run:
```bash
cd /Users/nirmaladhau/.gemini/antigravity/scratch/developer-portfolio
"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" .
```

> **Pro-Tip: Enable the `code` shortcut in your Mac Terminal:**
> 1. In VS Code, press `Cmd + Shift + P` to open the Command Palette.
> 2. Type: `Shell Command: Install 'code' command in PATH`.
> 3. Press Enter! Now you can simply type `code .` in any folder to open VS Code!

---

## 2. Install Your AI Companion (Alongside ChatGPT)

When you open this folder in VS Code, a notification will pop up in the bottom-right corner saying:
> *"This workspace has extension recommendations."* -> Click **Install All**.

If you'd like to install them manually, press `Cmd + Shift + X` (Extensions tab) and search for:

### 🌟 Option 1: GitHub Copilot & Copilot Chat (Most Popular)
- **Extension names**: `GitHub Copilot` and `GitHub Copilot Chat`
- **What it does**:
  - Provides real-time AI code completions as you type (inline ghost text).
  - Dedicated Chat panel (`Cmd + Shift + I` or click the Copilot icon in the sidebar) where you can ask questions, generate components, explain code, or fix bugs.
- **Activation**:
  1. Install the extension.
  2. Click **Sign in to GitHub** when prompted.

### ⚡ Option 2: Continue.dev (Open-Source AI Companion with ChatGPT / OpenAI)
- **Extension name**: `Continue - Leading open-source AI code assistant`
- **What it does**:
  - Connects directly to OpenAI (ChatGPT API), Anthropic Claude, or local offline models.
  - Highlights any block of code and press `Cmd + I` to edit with AI, or `Cmd + L` to chat about the file.
- **Activation**:
  1. Click the Continue icon on the left sidebar.
  2. Select your provider (e.g. OpenAI / ChatGPT or free local models).

### 🚀 Option 3: Codeium (100% Free AI Code Completion)
- **Extension name**: `Codeium: AI Coding Autocomplete and Chat`
- **What it does**:
  - Completely free unlimited AI autocomplete and sidebar chat.

---

## 3. Preview Your Portfolio Live (1 Click)

1. Open `index.html` inside VS Code.
2. In the bottom-right status bar of VS Code, click **"Go Live"** (from the Live Server extension).
3. Your browser will immediately open `http://127.0.0.1:5500/index.html`.
4. Any changes you make and save in `index.html`, `style.css`, or `script.js` will automatically reload in real time!
