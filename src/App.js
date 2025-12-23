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

  // Items based on your list + added some more to reach 50
  const products = [
    // Home & Kitchen
    { id: 1, name: "Ceramic Tea Cup", price: 250, category: "Home", keyword: "teacup" },
    { id: 2, name: "Dinner Plates Set", price: 1200, category: "Home", keyword: "plates" },
    { id: 3, name: "Automatic Dish Washer", price: 35000, category: "Home", keyword: "dishwasher" },
    { id: 4, name: "Coffee Mug", price: 150, category: "Home", keyword: "mug" },
    { id: 5, name: "Plastic Bucket", price: 300, category: "Home", keyword: "bucket" },
    { id: 6, name: "Non-stick Cookware", price: 2500, category: "Home", keyword: "cookware" },
    { id: 7, name: "Electric Kettle", price: 1800, category: "Home", keyword: "kettle" },
    { id: 8, name: "Curtains Set", price: 1200, category: "Home", keyword: "curtains" },

    // Fashion
    { id: 9, name: "Cotton T-shirt", price: 599, category: "Fashion", keyword: "tshirt" },
    { id: 10, name: "Formal Shirt", price: 1200, category: "Fashion", keyword: "shirt" },
    { id: 11, name: "Sports Shoes", price: 2500, category: "Fashion", keyword: "shoes" },
    { id: 12, name: "Denim Pants", price: 1800, category: "Fashion", keyword: "jeans" },
    { id: 13, name: "Designer Lehenga", price: 8500, category: "Fashion", keyword: "lehenga" },
    { id: 14, name: "Gold Jewellery Set", price: 45000, category: "Fashion", keyword: "jewellery" },
    { id: 15, name: "Silk Saree", price: 5000, category: "Fashion", keyword: "saree" },
    { id: 16, name: "Winter Jacket", price: 3200, category: "Fashion", keyword: "jacket" },
    { id: 17, name: "Leather Belt", price: 800, category: "Fashion", keyword: "belt" },
    { id: 18, name: "Sunglasses", price: 1500, category: "Fashion", keyword: "sunglasses" },

    // Electronics
    { id: 19, name: "Wireless Earphones", price: 1999, category: "Electronics", keyword: "earbuds" },
    { id: 20, name: "Music System Set", price: 12000, category: "Electronics", keyword: "speakers" },
    { id: 21, name: "Smart Phone", price: 25000, category: "Electronics", keyword: "smartphone" },
    { id: 22, name: "Bluetooth Headset", price: 3500, category: "Electronics", keyword: "headset" },
    { id: 23, name: "Power Bank", price: 1500, category: "Electronics", keyword: "powerbank" },
    { id: 24, name: "Smart Watch", price: 4500, category: "Electronics", keyword: "smartwatch" },
    { id: 25, name: "Laptop", price: 65000, category: "Electronics", keyword: "laptop" },
    { id: 26, name: "Digital Camera", price: 42000, category: "Electronics", keyword: "camera" },

    // Stationaries & Books
    { id: 27, name: "Parker Pen", price: 500, category: "Books", keyword: "pen" },
    { id: 28, name: "Note Books Set", price: 400, category: "Books", keyword: "notebook" },
    { id: 29, name: "Novel: The Alchemist", price: 350, category: "Books", keyword: "book" },
    { id: 30, name: "Geometry Box", price: 250, category: "Books", keyword: "geometrybox" },
    { id: 31, name: "Color Pencils", price: 150, category: "Books", keyword: "pencils" },

    // Groceries (Added to make it 50)
    { id: 32, name: "Basmati Rice 5kg", price: 650, category: "Groceries", keyword: "rice" },
    { id: 33, name: "Cooking Oil 1L", price: 180, category: "Groceries", keyword: "oil" },
    { id: 34, name: "Biscuits Pack", price: 50, category: "Groceries", keyword: "biscuits" },
    { id: 35, name: "Organic Honey", price: 250, category: "Groceries", keyword: "honey" },
    { id: 36, name: "Tea Powder", price: 300, category: "Groceries", keyword: "teapowder" },
    { id: 37, name: "Fruit Jam", price: 120, category: "Groceries", keyword: "jam" },

    // Sports (Added to make it 50)
    { id: 38, name: "Cricket Bat", price: 3500, category: "Sports", keyword: "cricket" },
    { id: 39, name: "Football", price: 999, category: "Sports", keyword: "football" },
    { id: 40, name: "Yoga Mat", price: 750, category: "Sports", keyword: "yogamat" },
    { id: 41, name: "Badminton Racket", price: 1500, category: "Sports", keyword: "badminton" },
    { id: 42, name: "Gym Dumbbells", price: 2000, category: "Sports", keyword: "dumbbells" },
    { id: 43, name: "Tennis Ball Pack", price: 300, category: "Sports", keyword: "tennisball" },

    // More Furniture/Home
    { id: 44, name: "Wall Clock", price: 600, category: "Home", keyword: "wallclock" },
    { id: 45, name: "Table Lamp", price: 1100, category: "Home", keyword: "lamp" },
    { id: 46, name: "Bed Sheet", price: 900, category: "Home", keyword: "bedsheet" },
    { id: 47, name: "Sofa Cushion", price: 400, category: "Home", keyword: "cushion" },
    { id: 48, name: "Flower Vase", price: 800, category: "Home", keyword: "vase" },
    { id: 49, name: "Towel Set", price: 500, category: "Home", keyword: "towel" },
    { id: 50, name: "Door Mat", price: 200, category: "Home", keyword: "doormat" }
  ];

  const categories = ["All", "Home", "Fashion", "Electronics", "Books", "Groceries", "Sports"];

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
              <img 
                src={`https://loremflickr.com/320/240/${p.keyword}?lock=${p.id}`} 
                alt={p.name} 
                style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '5px' }} 
              />
              <h4 style={{ margin: '10px 0', fontSize: '0.85rem', height: '35px', overflow: 'hidden' }}>{p.name}</h4>
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