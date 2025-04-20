# AI Code Review

A web-based code review tool built with Next.js, TypeScript, and Tailwind CSS.

## Features

- In-browser code editor using Monaco Editor.
- Real-time code compilation and execution via Piston API.
- AI-powered code analysis and feedback using Grok and Replicate APIs.

## Getting Started

### Installation

```bash
git clone https://github.com/vanshanand34/AI-Code-Review.git
cd code-mentor-ai
npm install
```

Create a .env.local file in the root directory and add the following:​

```
NEXT_PUBLIC_GROK_API_KEY=your_grok_api_key
NEXT_PUBLIC_REPLICATE_API_KEY=your_replicate_api_key
NEXT_PUBLIC_PISTON_API_URL=https://emkc.org/api/v2/piston
```

