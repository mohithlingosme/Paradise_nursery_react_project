import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-topbar">
        <Link className="landing-brand" to="/" aria-label="Paradise Nursery home">
          <span className="landing-brand-icon">✿</span>
          <span>paradise nursery</span>
        </Link>
        <span className="landing-top-note">HOUSEPLANTS · GOOD LIVING</span>
      </div>
      <section className="hero-content">
        <p className="hero-kicker"><span /> Welcome to Paradise Nursery</p>
        <h1>Make room<br />for <em>nature.</em></h1>
        <p className="hero-description">Thoughtfully chosen houseplants to bring calm, character, and a breath of fresh life into your everyday spaces.</p>
        <Link className="button hero-button" to="/plants">Get Started <span aria-hidden="true">↗</span></Link>
        <div className="hero-footnote"><span>01 / 03</span><span>GROW AT YOUR OWN PACE</span></div>
      </section>
      <div className="landing-about-wrap"><AboutUs /></div>
      <div className="landing-bottom"><span>PARADISE NURSERY</span><span>ROOTED IN GOOD LIVING</span></div>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  );
}
