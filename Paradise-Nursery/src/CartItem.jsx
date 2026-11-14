import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar.jsx';
import { removeItem, updateQuantity } from './CartSlice.jsx';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app-page">
      <Navbar />
      <main className="cart-page page-shell">
        <section className="cart-heading">
          <div>
            <p className="eyebrow">Your green corner</p>
            <h1>Shopping cart</h1>
            <p>Take a look at the plants you have picked.</p>
          </div>
          <div className="cart-heading-count"><strong>{totalItems}</strong><span>{totalItems === 1 ? 'plant' : 'plants'} in your cart</span></div>
        </section>

        {items.length === 0 ? (
          <section className="empty-cart">
            <div className="empty-cart-icon" aria-hidden="true">✿</div>
            <h2>Your cart is ready to grow.</h2>
            <p>You haven’t added any plants yet. Explore the collection and find your first favourite.</p>
            <Link className="button button-primary" to="/plants">Explore plants</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-lines" aria-label="Cart items">
              {items.map((item) => (
                <article className="cart-line" key={item.id}>
                  <img className="cart-line-image" src={`${import.meta.env.BASE_URL}${item.image}`} alt={`${item.name} houseplant illustration`} />
                  <div className="cart-line-details">
                    <span className="cart-line-category">{item.category}</span>
                    <h2>{item.name}</h2>
                    <span className="unit-price">Unit price: {currency.format(item.price)}</span>
                    <button className="text-button delete-button" type="button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <div className="line-subtotal"><span>Subtotal</span><strong>{currency.format(item.price * item.quantity)}</strong></div>
                </article>
              ))}
              <Link className="continue-link" to="/plants">← Continue shopping</Link>
            </section>

            <aside className="order-summary">
              <p className="eyebrow">Order overview</p>
              <h2>Order summary</h2>
              <div className="summary-row"><span>Total plants</span><strong>{totalItems}</strong></div>
              <div className="summary-row"><span>Items subtotal</span><strong>{currency.format(totalCost)}</strong></div>
              <div className="summary-row summary-total"><span>Total</span><strong>{currency.format(totalCost)}</strong></div>
              <p className="summary-note">Delivery and taxes, if applicable, will be calculated at checkout.</p>
              <button className="button button-primary button-full checkout-button" type="button" onClick={() => setCheckoutMessage('Checkout is coming soon. Your plants are safely saved in this cart.')}>Proceed to checkout</button>
              {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
            </aside>
          </div>
        )}
      </main>
      <footer className="site-footer"><span>Paradise Nursery</span><span>Thank you for shopping small and growing green.</span></footer>
    </div>
  );
}
