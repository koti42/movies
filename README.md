# MemoFlix 🎬

A modern, Netflix-inspired movie and TV show discovery application built with React, Vite, and Tailwind CSS. Powered by The Movie Database (TMDB) API.

![MemoFlix](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)

## ✨ Features

- 🎥 **Browse Movies & TV Shows** - Explore trending, popular, top-rated, and upcoming content
- 🔍 **Advanced Search** - Search for movies and TV shows with real-time results
- 📜 **Recent Searches** - Track your search history with localStorage persistence
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Netflix-like Dark Theme** - Sleek dark mode with glassmorphism effects
- 🎬 **Detailed Pages** - View comprehensive information including cast, trailers, and recommendations
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Smooth Animations** - Hover effects, transitions, and micro-interactions
- 📊 **Pagination** - Navigate through extensive content libraries
- 🎭 **Video Trailers** - Watch YouTube trailers directly in the app

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movies
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
movies/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with search
│   │   ├── Footer.jsx       # Footer with links
│   │   ├── Hero.jsx         # Auto-rotating hero banner
│   │   ├── MovieCard.jsx    # Movie/TV show card
│   │   ├── MovieRow.jsx     # Horizontal scrolling row
│   │   └── Skeleton.jsx     # Loading skeletons
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage with hero and rows
│   │   ├── Movies.jsx       # Movies catalog
│   │   ├── TVShows.jsx      # TV shows catalog
│   │   ├── Popular.jsx      # Trending content
│   │   ├── Search.jsx       # Search results
│   │   └── Detail.jsx       # Movie/TV show details
│   ├── context/             # React context
│   │   └── SearchContext.jsx # Recent searches management
│   ├── services/            # API services
│   │   └── api.js           # TMDB API integration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies
```

## 🎨 Design Principles

- **Netflix-like Aesthetics**: Dark background (#141414) with light text (#e5e5e5)
- **Glassmorphism**: Backdrop blur effects for modern UI elements
- **Smooth Transitions**: All interactions have smooth animations
- **Responsive**: Mobile-first design that scales beautifully
- **High-Quality Images**: Uses TMDB's 'original' size for hero sections, 'w500' for cards

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **TMDB API** - Movie and TV show data

## 📡 API Integration

This project uses The Movie Database (TMDB) API. The following endpoints are integrated:

- Trending movies and TV shows
- Popular content
- Top-rated content
- Now playing movies
- Upcoming movies
- Search (multi, movies, TV shows)
- Movie/TV show details with credits, videos, and recommendations
- Genre listings

## 🎯 Key Features Breakdown

### Home Page
- Auto-rotating hero banner with top trending content
- Multiple content rows: Trending, Popular, Now Playing, Top Rated
- Smooth horizontal scrolling with navigation arrows

### Search Page
- Real-time search results
- Recent searches with localStorage persistence
- Ability to remove individual searches or clear all
- Pagination for extensive results

### Detail Page
- Full-screen hero with backdrop image
- Movie/TV show information (rating, runtime, genres)
- Cast members with profile images
- YouTube trailer integration
- Similar and recommended content

### Movies & TV Shows Pages
- Category tabs (Popular, Top Rated, Now Playing, Upcoming)
- Grid layout with responsive columns
- Advanced pagination with page numbers

## 🎨 Custom Styling

The app uses custom Tailwind utilities:
- `.glass-effect` - Glassmorphism effect
- `.skeleton` - Loading animation
- `.hover-scale` - Smooth scale on hover
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.text-shadow` - Text shadow for readability

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Future Enhancements

- User authentication
- Watchlist functionality
- Personalized recommendations
- Filter by genre
- Sort options
- Dark/Light theme toggle
- Share functionality
- Reviews and ratings

## 📄 License

This project is for educational purposes. All movie data and images are provided by TMDB.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://react.dev/) for the UI library
- [Vite](https://vitejs.dev/) for the build tool

---

**Note**: This product uses the TMDB API but is not endorsed or certified by TMDB.
