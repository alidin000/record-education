import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Teachers from './pages/Teachers';
import Achievements from './pages/Achievements';
import Reviews from './pages/Reviews';
import News from './pages/News';
import Contacts from './pages/Contacts';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/news" element={<News />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
