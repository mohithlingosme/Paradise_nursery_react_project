import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Paradise Nursery home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 42 42" role="img"><path d="M21 35V17M21 23C9 23 5 16 6 7c10 0 16 4 15 16ZM21 18C20 8 27 3 37 4c0 10-5 16-16 17Z"/><path d="M12 34h18"/></svg>
        </span>
        <span className="brand-copy"><strong>paradise nursery</strong><small>BRING NATURE HOME</small></span>
      </Link>

      <p className="header-tagline">Find your little piece of green.</p>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className="cart-nav-link">
          <span>Cart</span>
          <span className="cart-count" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}
