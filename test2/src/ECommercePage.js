import React, { useState } from 'react';

const productsData = [
  { id: 1, name: 'Product 1', category: 'Clothing', price: 29.99 },
  { id: 2, name: 'Product 2', category: 'Electronics', price: 49.99 },
  { id: 3, name: 'Product 3', category: 'Clothing', price: 19.99 },
  // Add more products as needed
];


// ProductList component
const ProductList = ({ products }) => {
  return (
    <div className="row container text-center">
      {products.map((product) => (
        <div key={product.id} className="col mb-4">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-3">{product.name}</h5>
              <p className="card-text mb-3">{product.category}</p>
              <p className="card-text mt-auto">${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// FilterSidebar component
const FilterSidebar = ({ categories, onFilterChange, onSortChange, onPriceChange }) => {
  return (
    <div className="col-md-3">
      <h4 className="mb-4">Filters</h4>
      <div className="mb-4">
        <h5>Categories</h5>
        {categories.map((category) => (
          <div key={category} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              onChange={() => onFilterChange(category)}
            />
            <label className="form-check-label" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h5>Price Range</h5>
        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          onChange={(e) => onPriceChange(e.target.value)}
        />
      </div>
      <div>
        <h5>Sort by</h5>
        <select className="form-select" onChange={(e) => onSortChange(e.target.value)}>
          <option value="price-asc">Price - Low to High</option>
          <option value="price-desc">Price - High to Low</option>
        </select>
      </div>
    </div>
  );
};


const ECommercePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategories, setSelectedCategories] = useState([]);
 
  const categories = Array.from(new Set(productsData.map((product) => product.category)));

  const handleFilterChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    const updatedProducts =
      updatedCategories.length === 0
        ? productsData
        : productsData.filter((product) => updatedCategories.includes(product.category));

    setFilteredProducts(updatedProducts);
  };

  const handleSortChange = (option) => {

    const sortedProducts = [...filteredProducts];

    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const handlePriceChange = (value) => {

    const filteredByPrice = productsData.filter((product) => product.price <= value);
    setFilteredProducts(filteredByPrice);
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My ECommerce Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row py-4">
        <div className="col-md-3">
          <FilterSidebar
            categories={categories}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="col-md-9">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ECommercePage;
