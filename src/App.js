import React, { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('myShopCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem('myShopCart', JSON.stringify(cart));
  }, [cart]);

  // Specific Names linked with Keywords for matching images
  const products = [
    // Electronics
    { id: 1, name: "Apple iPhone 15", price: 79900, category: "Electronics", keyword: "iphone" },
    { id: 2, name: "MacBook Air Laptop", price: 114900, category: "Electronics", keyword: "laptop" },
    { id: 3, name: "Sony Wireless Headphones", price: 15000, category: "Electronics", keyword: "headphones" },
    { id: 4, name: "Samsung Galaxy Watch", price: 22000, category: "Electronics", keyword: "smartwatch" },
    { id: 5, name: "Canon Professional Camera", price: 55000, category: "Electronics", keyword: "camera" },
    { id: 6, name: "iPad Pro Tablet", price: 85000, category: "Electronics", keyword: "tablet" },
    { id: 7, name: "Gaming Console", price: 45000, category: "Electronics", keyword: "ps5" },
    { id: 8, name: "Bluetooth Speaker", price: 5000, category: "Electronics", keyword: "speaker" },

    // Fashion
    { id: 9, name: "Nike Sports Shoes", price: 8500, category: "Fashion", keyword: "shoes" },
    { id: 10, name: "Levi's Denim Jeans", price: 3200, category: "Fashion", keyword: "jeans" },
    { id: 11, name: "Casual Cotton T-Shirt", price: 999, category: "Fashion", keyword: "tshirt" },
    { id: 12, name: "Warm Winter Jacket", price: 4500, category: "Fashion", keyword: "jacket" },
    { id: 13, name: "Ray-Ban Sunglasses", price: 12000, category: "Fashion", keyword: "sunglasses" },
    { id: 14, name: "Leather Handbag", price: 3500, category: "Fashion", keyword: "handbag" },
    { id: 15, name: "Wrist Watch", price: 6000, category: "Fashion", keyword: "watch" },

    // Sports
    { id: 16, name: "Cricket Bat", price: 4500, category: "Sports", keyword: "cricket,bat" },
    { id: 17, name: "Premium Football", price: 1200, category: "Sports", keyword: "soccerball" },
    { id: 18, name: "Badminton Racket", price: 2500, category: "Sports", keyword: "badminton" },
    { id: 19, name: "Adjustable Dumbbells", price: 3000, category: "Sports", keyword: "dumbbells" },
    { id: 20, name: "Professional Yoga Mat", price: 800, category: "Sports", keyword: "yogamat" },
    { id: 21, name: "Basketball", price: 1500, category: "Sports", keyword: "basketball" },

    // Home & Kitchen
    { id: 22, name: "Modern Coffee Table", price: 5000, category: "Home", keyword: "table" },
    { id: 23, name: "Comfortable Sofa", price: 25000, category: "Home", keyword: "sofa" },
    { id: 24, name: "LED Desk Lamp", price: 1200, category: "Home", keyword: "lamp" },
    { id: 25, name: "Wall Hanging Clock", price: 700, category: "Home", keyword: "clock" },
    { id: 26, name: "Dining Chair", price: 3500, category: "Home", keyword: "chair" },
    { id: 27, name: "Non-Stick Frying Pan", price: 1500, category: "Home", keyword: "pan" },

    // Books
    { id: 28, name: "Atomic Habits - James Clear", price: 450, category: "Books", keyword: "book,habits" },
    { id: 29, name: "The Alchemist - Paulo Coelho", price: 300, category: "Books", keyword: "book,alchemist" },
    { id: 30, name: "Harry Potter Collection", price: 1500, category: "Books", keyword: "harrypotter" }
    
    // You can continue to add more objects here...
  ];

  const categories = ["All", "Electronics", "Fashion", "Sports", "Home", "Books"];

  const filteredProducts = products.filter(p => {
    return (category === "All" || p.category === category) &&
           p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const addToCart = (p) => setCart([...cart, { ...p, cartId: Date.now() }]);
  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial' }}>
      <header style={{ backgroundColor: '#131921', color: 'white', padding: '15px 40px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ margin: 0 }}>telugu-mart</h2> 
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '40%', padding: '10px', borderRadius: '5px', border: 'none', outline: 'none' }}
          />
          <div style={{ fontWeight: 'bold' }}>🛒 Cart: {cart.length} | Total: ₹{totalPrice}</div>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#232f3e', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setCategory(cat)}
            style={{ 
              padding: '8px 15px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              backgroundColor: category === cat ? '#febd69' : 'white', fontWeight: 'bold'
            }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', padding: '20px', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(p => (
            <div key={p.id} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              {/* Dynamic Image fetching based on keyword */}
              <img 
                src={`https://loremflickr.com/320/240/${p.keyword}?lock=${p.id}`} 
                alt={p.name} 
                style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '5px' }} 
              />
              <h4 style={{ margin: '10px 0', fontSize: '0.85rem', height: '35px' }}>{p.name}</h4>
              <p style={{ color: '#B12704', fontWeight: 'bold' }}>₹{p.price}</p>
              <button onClick={() => addToCart(p)} style={{ cursor: 'pointer', backgroundColor: '#ffd814', border: 'none', padding: '8px', width: '100%', borderRadius: '20px', fontWeight: 'bold' }}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '280px', height: 'fit-content', position: 'sticky', top: '140px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>Order Summary</h3>
          <hr />
          {cart.length === 0 ? <p>empty cart</p> : (
            <>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                    <span>{item.name}</span>
                    <div>
                      <span style={{ marginRight: '10px' }}>₹{item.price}</span>
                      <button onClick={() => removeFromCart(item.cartId)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ textAlign: 'center', marginTop: '15px' }}>Total: ₹{totalPrice}</h4>
              <button style={{ width: '100%', padding: '12px', backgroundColor: '#ffa41c', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Checkout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;