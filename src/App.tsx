import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { PointsProvider } from './contexts/PointsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Tests from './pages/Tests';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';
import Classes from './pages/Classes';
import Profile from './pages/Profile';
import QuickPractice from './pages/practice/QuickPractice';

export default function App() {
  return (
    <LanguageProvider>
      <PointsProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lectures" element={<Classes />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/practice/quick" element={<QuickPractice />} />
            </Routes>
          </div>
        </Router>
      </PointsProvider>
    </LanguageProvider>
  );
}