import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
  return (
    <LanguageProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <WelcomeModal />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:type/:id" element={<Detail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SearchProvider>
    </LanguageProvider>
  );
}

export default App;
