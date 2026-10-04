import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage/HomePage';
import MapExplorer from './pages/MapExplorer/MapExplorer';
import LocationDetail from './pages/LocationDetail/LocationDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<MapExplorer />} />
          <Route path="/location/:id" element={<LocationDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
