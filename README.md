# OTT Test Case Generator (V3)

A premium, AI-powered dashboard for generating enterprise-grade test coverage for OTT platforms (SonyLIV, Netflix, etc.).
Built with **Next.js 14**, **TailwindCSS**, and **Google Gemini Pro**.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=OTT+Tester+Dashboard)

## Features

- **\uD83E\uDDE0 Real Intelligence**: Generates infinite test scenarios using Google Gemini Pro.
- **\uD83D\uDCCA Dashboard Interface**: Professional split-view layout with Sidebar navigation.
- **\uD83D\uDCC2 File Integration**: Drag & Drop PRDs/Docs to generate context-aware coverage.
- **\uD83D\uDCE5 Export**: Download test plans as CSV for Jira/Excel import.
- **\uD83D\uDD12 Secure**: BYOK (Bring Your Own Key) architecture. API usage is client-side only; keys are stored in your browser's Local Storage.

## Getting Started

### Prerequisites
- Node.js 18+ installed.
- A free [Google Gemini API Key](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository** (or navigate to folder):
    ```bash
    cd ott_tester
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open Browser**:
    Visit [http://localhost:3000](http://localhost:3000).

## How to Use

1.  **Configure AI**:
    - Click **Settings** in the sidebar.
    - Paste your Gemini API Key.
    - Click **Save**.

2.  **Generate Coverage**:
    - Enter a feature description (e.g., *"Ad Insertion flows for Live Cricket"*).
    - (Optional) Drag & drop a requirement document (PDF/Text).
    - Click **Generate Coverage**.

3.  **Analyze & Export**:
    - Switch tabs to view **Test Cases**, **User Scenarios**, and **Test Plan**.
    - Click **Export** to download the CSV.

## Deployment

### Vercel (Recommended)
This app is optimized for Vercel.

1.  Push code to GitHub/GitLab.
2.  Import project in Vercel.
3.  **No Environment Variables needed** (API Key is handled client-side).
4.  Click **Deploy**.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + Framer Motion
- **Icons**: Lucide React
- **AI**: Google Generative AI SDK

---
*Created by [Your Name/Antigravity]*
