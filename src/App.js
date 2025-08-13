
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [components, setComponents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ECOMMERCE_ID = '689c2b8b996a695b4ae8c4d5';
    const API_BASE_URL = 'http://localhost:5000';

    if (!ECOMMERCE_ID || ECOMMERCE_ID === 'undefined') {
      setError('E-commerce ID is not configured.');
      setLoading(false);
      return;
    }

    axios.get(`${API_BASE_URL}/api/ecommerce/${ECOMMERCE_ID}/components`)
      .then(response => {
        setComponents(JSON.parse(response.data.components));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching components:", err);
        setError('Failed to load store configuration.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading your store...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!components) return <div>Store configuration could not be loaded.</div>;

  const { shopName, shopDescription, products, design } = components;

  return (
    <div style={{ fontFamily: 'sans-serif', background: design.backgroundColor, color: design.textColor, padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: design.primaryColor, margin: 0 }}>{shopName}</h1>
        <p>{shopDescription}</p>
      </header>
      <main>
        <h2>Our Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: design.borderRadius, padding: '1rem' }}>
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><b>${product.price.toFixed(2)}</b></p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;
