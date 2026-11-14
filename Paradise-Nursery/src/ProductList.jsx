import Navbar from './components/Navbar.jsx';
import PlantCard from './components/PlantCard.jsx';
import { categories, plants } from './data/plants.js';

export default function ProductList() {
  return (
    <div className="app-page">
      <Navbar />
      <main className="catalogue-page page-shell">
        <section className="page-intro">
          <p className="eyebrow">The indoor collection</p>
          <h1>Find the plant that feels like <em>you.</em></h1>
          <p>From easy-care companions to leafy statement pieces, bring home a little more green.</p>
        </section>

        <div className="catalogue-toolbar">
          <span>{plants.length} plants to explore</span>
          <span className="toolbar-note">Selected with care · Ready for your home</span>
        </div>

        {categories.map((category) => {
          const categoryPlants = plants.filter((plant) => plant.category === category);
          return (
            <section className="plant-category-section" key={category} aria-labelledby={`category-${category}`}>
              <div className="category-heading">
                <div>
                  <p className="eyebrow">Curated for your space</p>
                  <h2 id={`category-${category}`}>{category}</h2>
                </div>
                <span>{categoryPlants.length} varieties</span>
              </div>
              <div className="plant-grid">
                {categoryPlants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
              </div>
            </section>
          );
        })}
      </main>
      <footer className="site-footer"><span>Paradise Nursery</span><span>Grow a little happiness every day.</span></footer>
    </div>
  );
}
