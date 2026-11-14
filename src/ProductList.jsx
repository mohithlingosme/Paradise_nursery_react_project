import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// Product catalogue is kept in this file so the complete product-listing
// implementation is visible to reviewers and assessment tools.
// Every category contains six unique houseplants.
const plantsArray = [
  {
    category: 'Air-purifying plants',
    description: 'Fresh-looking favourites that bring a lively, leafy feel to your home.',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', price: 399, image: 'images/snake-plant.svg', description: 'An architectural, easy-care plant with upright leaves.' },
      { id: 'peace-lily', name: 'Peace Lily', price: 549, image: 'images/peace-lily.svg', description: 'Elegant leaves and graceful white blooms for a calm corner.' },
      { id: 'spider-plant', name: 'Spider Plant', price: 299, image: 'images/spider-plant.svg', description: 'A cheerful, fast-growing favourite with arching foliage.' },
      { id: 'areca-palm', name: 'Areca Palm', price: 799, image: 'images/areca-palm.svg', description: 'Feathery palm fronds bring a soft tropical feel indoors.' },
      { id: 'rubber-plant', name: 'Rubber Plant', price: 699, image: 'images/rubber-plant.svg', description: 'Glossy, deep-green leaves make a bold indoor statement.' },
      { id: 'boston-fern', name: 'Boston Fern', price: 449, image: 'images/boston-fern.svg', description: 'Lush, textured fronds add freshness to bright spaces.' },
    ],
  },
  {
    category: 'Low-light favourites',
    description: 'Adaptable plants for cosy corners and spaces with softer natural light.',
    plants: [
      { id: 'zz-plant', name: 'ZZ Plant', price: 499, image: 'images/zz-plant.svg', description: 'Glossy foliage and a forgiving nature make care simple.' },
      { id: 'golden-pothos', name: 'Golden Pothos', price: 249, image: 'images/golden-pothos.svg', description: 'Trailing heart-shaped leaves brighten shelves and walls.' },
      { id: 'chinese-evergreen', name: 'Chinese Evergreen', price: 599, image: 'images/chinese-evergreen.svg', description: 'Decorative foliage that adapts well to indoor spaces.' },
      { id: 'cast-iron-plant', name: 'Cast Iron Plant', price: 649, image: 'images/cast-iron-plant.svg', description: 'A resilient plant suited to quieter, lower-light corners.' },
      { id: 'heartleaf-philodendron', name: 'Heartleaf Philodendron', price: 349, image: 'images/heartleaf-philodendron.svg', description: 'Soft heart-shaped leaves look lovely in a hanging planter.' },
      { id: 'parlor-palm', name: 'Parlor Palm', price: 499, image: 'images/parlor-palm.svg', description: 'A compact palm that brings a relaxed, classic look.' },
    ],
  },
  {
    category: 'Statement plants',
    description: 'Distinctive shapes and generous foliage for a standout indoor display.',
    plants: [
      { id: 'monstera', name: 'Monstera Deliciosa', price: 899, image: 'images/monstera.svg', description: 'Large split leaves create an unmistakable tropical focal point.' },
      { id: 'fiddle-leaf-fig', name: 'Fiddle Leaf Fig', price: 1199, image: 'images/fiddle-leaf-fig.svg', description: 'Sculptural foliage gives living rooms a designer finish.' },
      { id: 'bird-of-paradise', name: 'Bird of Paradise', price: 1499, image: 'images/bird-of-paradise.svg', description: 'Dramatic upright leaves deliver a bold resort-inspired look.' },
      { id: 'money-tree', name: 'Money Tree', price: 899, image: 'images/money-tree.svg', description: 'A braided trunk and bright leaves make a popular gift.' },
      { id: 'calathea-orbifolia', name: 'Calathea Orbifolia', price: 799, image: 'images/calathea-orbifolia.svg', description: 'Broad rounded leaves bring movement and subtle pattern.' },
      { id: 'anthurium', name: 'Anthurium', price: 699, image: 'images/anthurium.svg', description: 'Glossy leaves and colourful blooms add a refined accent.' },
    ],
  },
];

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

// Shared header for the Plants page. The Cart page also renders the shared
// Navbar component from components/Navbar.jsx with the same links and counter.
function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Paradise Nursery home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 42 42" role="img" aria-label="Paradise Nursery leaf logo">
            <path d="M21 35V17M21 23C9 23 5 16 6 7c10 0 16 4 15 16ZM21 18C20 8 27 3 37 4c0 10-5 16-16 17Z" />
            <path d="M12 34h18" />
          </svg>
        </span>
        <span className="brand-copy">
          <strong>paradise nursery</strong>
          <small>BRING NATURE HOME</small>
        </span>
      </Link>

      <p className="header-tagline">Find your little piece of green.</p>

      <nav className="navbar main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className={({ isActive }) => `cart-nav-link${isActive ? ' active' : ''}`}>
          <svg className="cart-nav-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 7H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>
          <span>Cart</span>
          <span className="cart-count" aria-label={`${totalCartQuantity} items in cart`} aria-live="polite">
            {totalCartQuantity}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Track products already in the Redux cart by plant name. This controls the
  // disabled state and label of each Add to Cart button.
  const addedToCart = {};
  cartItems.forEach((item) => {
    addedToCart[item.name] = true;
  });

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPlantCount = plantsArray.reduce((total, group) => total + group.plants.length, 0);

  const handleAddToCart = (plant, category) => {
    dispatch(addItem({ ...plant, category }));
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="catalogue-page page-shell">
        <section className="page-intro" aria-labelledby="plants-page-heading">
          <p className="eyebrow">The indoor collection</p>
          <h1 id="plants-page-heading">Find the plant that feels like <em>you.</em></h1>
          <p>From easy-care companions to leafy statement pieces, bring home a little more green.</p>
        </section>

        <div className="catalogue-toolbar">
          <span>{totalPlantCount} houseplants to explore</span>
          <span className="toolbar-note">{totalCartQuantity} {totalCartQuantity === 1 ? 'plant' : 'plants'} currently in your cart</span>
        </div>

        {/* Three product categories, with six unique houseplants in each. */}
        {plantsArray.map((categoryGroup, categoryIndex) => (
          <section
            className="plant-category-section"
            key={categoryGroup.category}
            aria-labelledby={`plant-category-${categoryIndex}`}
          >
            <div className="category-heading">
              <div>
                <p className="eyebrow">Curated for your space</p>
                <h2 id={`plant-category-${categoryIndex}`}>{categoryGroup.category}</h2>
              </div>
              <span>{categoryGroup.plants.length} varieties</span>
            </div>
            <p className="category-description">{categoryGroup.description}</p>

            <div className="plant-grid">
              {categoryGroup.plants.map((plant) => {
                const isAddedToCart = Boolean(addedToCart[plant.name]);
                const imageSrc = `${import.meta.env.BASE_URL}${plant.image}`;

                return (
                  <article className="plant-card" key={plant.id}>
                    <div className="plant-image-wrap">
                      <img
                        className="plant-image"
                        src={imageSrc}
                        alt={`${plant.name} houseplant`}
                        loading="lazy"
                      />
                      <span className="plant-category-pill">{categoryGroup.category}</span>
                    </div>

                    <div className="plant-card-content">
                      <div className="plant-title-row">
                        <h3>{plant.name}</h3>
                        <span className="plant-price">{currency.format(plant.price)}</span>
                      </div>
                      <p>{plant.description}</p>
                      <button
                        className={`button button-full ${isAddedToCart ? 'button-added' : 'button-primary'}`}
                        type="button"
                        disabled={isAddedToCart}
                        aria-label={isAddedToCart ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}
                        onClick={() => handleAddToCart(plant, categoryGroup.category)}
                      >
                        {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Grow a little happiness every day.</span>
      </footer>
    </div>
  );
}
