import './App.css';
import Header from './components/Header';
import ShareNote from './pages/ShareNote';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import ShortUrlHandler from './pages/ShortUrlHandler';

function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<ShareNote />} />
          <Route path="/:shortUrl" element={<ShortUrlHandler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
