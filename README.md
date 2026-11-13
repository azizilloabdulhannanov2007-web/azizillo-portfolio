# Abdulhannonov Azizillo — Personal Portfolio

Modern, minimalist personal portfolio website built with pure HTML5, CSS3 and JavaScript.

## Features

- 5 pages: Home, About, Projects, Resume, Contact
- Responsive design (mobile, tablet, desktop)
- Dark / Light theme
- 4 languages: EN, RU, UZ, KY
- Contact form delivered to Telegram via a Vercel Serverless Function

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Git / Git Bash
- Vercel (deployment)

No frameworks, no Bootstrap, no Tailwind.

## Color Palette (Purple Haze)

| Color         | HEX       | Usage                             |
| ------------- | --------- | --------------------------------- |
| Deep Night    | `#0E0B1D` | Dark theme background             |
| Dark Violet   | `#2A1E4D` | Cards, header                     |
| Royal Purple  | `#5A3B8C` | Buttons, primary accent           |
| Soft Violet   | `#8B7CC7` | Hover, secondary accent           |
| Lavender Mist | `#C9C2E3` | Text on dark, background on light |
| Slate Purple  | `#3A3A52` | Borders, muted text               |

## Project Structure

```
portfolio/
├── index.html
├── about.html
├── projects.html
├── resume.html
├── contact.html
├── css/
├── js/
│   └── translations/
├── api/
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── documents/
├── .gitignore
└── README.md
```

## Run Locally

Open `index.html` in VS Code with the Live Server extension.

## Live Demo

https://your-project.vercel.app

## Deployment

The site is deployed on Vercel. Every `git push` to `main` triggers a new deployment.

## Environment Variables (for Telegram)

Set these in the Vercel dashboard. Never commit them.

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Roadmap

1. Planning & Architecture
2. UI & Design System
3. Main Pages Development
4. JavaScript & Functionality
5. Testing & Deployment

## Author

Abdulhannonov Azizillo
