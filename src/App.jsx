import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import Top10Page from './pages/Top10Page';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main style={{ minHeight: '60vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anasayfa" element={<HomePage />} />
            <Route path="/top10" element={<Top10Page />} />
            <Route path="/bize-ulasin" element={<ContactPage />} />
            <Route path="/company/:slug" element={<BusinessDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
