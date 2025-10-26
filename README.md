# MyPortfolio - Tirdesh Pettugani

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Interactive Terminal Interface** - Chat-based navigation and commands
- **Dark/Light Theme** - Seamless theme switching
- **Interactive Games** - Memory game and quiz to learn about me
- **Project Showcase** - Filterable and searchable project gallery
- **Skill Visualization** - Interactive and informative skill displays
- **Responsive Design** - Mobile-first, fully responsive layout
- **3D Elements** - Three.js powered visualizations
- **Google Analytics** - Track visitor engagement
- **Form Submission** - Contact form integration

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **3D Graphics:** Three.js, @react-three/fiber
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Analytics:** Google Analytics 4
- **Forms:** React Hook Form, Yup/Zod validation

## 📦 Installation

```bash
# Navigate to the app directory
cd app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
app/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── content/        # Data and content
│   ├── providers/      # Context providers
│   ├── utils/          # Utility functions
│   └── assets/         # Static assets
├── public/             # Public files
└── dist/               # Build output
```

## 🎨 Pages

- **Home** - Interactive terminal interface
- **About** - Education, experience timeline with games
- **Projects** - Portfolio projects with filtering
- **Skills** - Technical skills visualization
- **Contact** - Contact form with Google Forms integration

## 🔧 Configuration

Update Google Analytics ID in `src/utils/analytics.ts`:
```typescript
ReactGA.initialize("YOUR_GA_ID");
```

Update contact form endpoint in `src/pages/Contact.tsx` if needed.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Tirdesh Pettugani**
- Portfolio: [Your Website]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
