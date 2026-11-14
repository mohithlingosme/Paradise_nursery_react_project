import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice.jsx';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const isAdded = useSelector((state) => state.cart.items.some((item) => item.id === plant.id));
  const imageSrc = `${import.meta.env.BASE_URL}${plant.image}`;

  return (
    <article className="plant-card">
      <div className="plant-image-wrap">
        <img className="plant-image" src={imageSrc} alt={`${plant.name} houseplant illustration`} loading="lazy" />
        <span className="plant-category-pill">{plant.category}</span>
      </div>
      <div className="plant-card-content">
        <div className="plant-title-row">
          <h3>{plant.name}</h3>
          <span className="plant-price">{currency.format(plant.price)}</span>
        </div>
        <p>{plant.description}</p>
        <button
          className={`button button-full ${isAdded ? 'button-added' : 'button-primary'}`}
          type="button"
          disabled={isAdded}
          onClick={() => dispatch(addItem(plant))}
        >
          {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
