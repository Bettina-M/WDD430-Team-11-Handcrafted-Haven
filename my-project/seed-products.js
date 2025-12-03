// Sample script to seed products into the database
// Run this after MongoDB is set up

const sampleProducts = [
  {
    name: "Handcrafted Ceramic Vase",
    description: "Beautiful blue and white ceramic vase with intricate hand-painted patterns. Perfect for fresh flowers or as a standalone decorative piece.",
    price: 45.99,
    category: "Pottery",
    sellerId: "seller1",
    sellerName: "Maria Ceramics",
    stock: 8,
    images: []
  },
  {
    name: "Wooden Cutting Board",
    description: "Premium walnut cutting board with juice groove. Food-safe finish. Each piece has unique wood grain patterns.",
    price: 68.50,
    category: "Woodwork",
    sellerId: "seller2",
    sellerName: "John's Woodshop",
    stock: 12,
    images: []
  },
  {
    name: "Silver Handmade Earrings",
    description: "Elegant sterling silver drop earrings with turquoise stones. Hypoallergenic and perfect for sensitive ears.",
    price: 32.00,
    category: "Jewelry",
    sellerId: "seller3",
    sellerName: "Emma's Jewelry",
    stock: 15,
    images: []
  },
  {
    name: "Knitted Wool Blanket",
    description: "Cozy hand-knitted blanket made from 100% merino wool. Available in cream color. Perfect for cold evenings.",
    price: 120.00,
    category: "Textiles",
    sellerId: "seller1",
    sellerName: "Cozy Knits Co",
    stock: 5,
    images: []
  },
  {
    name: "Macrame Wall Hanging",
    description: "Bohemian-style macrame wall art handwoven with natural cotton cord. Adds texture and warmth to any space.",
    price: 55.00,
    category: "Home Decor",
    sellerId: "seller4",
    sellerName: "Boho Creations",
    stock: 10,
    images: []
  },
  {
    name: "Watercolor Landscape Painting",
    description: "Original watercolor painting of mountain landscape. Signed by artist. Includes certificate of authenticity.",
    price: 250.00,
    category: "Art",
    sellerId: "seller5",
    sellerName: "Sarah's Art Studio",
    stock: 1,
    images: []
  },
  {
    name: "Hand-carved Wooden Bowl",
    description: "Beautiful hand-carved cherry wood bowl. Perfect for serving salads or fruit. Finished with food-safe oil.",
    price: 85.00,
    category: "Woodwork",
    sellerId: "seller2",
    sellerName: "John's Woodshop",
    stock: 6,
    images: []
  },
  {
    name: "Beaded Bracelet Set",
    description: "Set of three handmade beaded bracelets with natural stones. Adjustable size. Comes in a gift box.",
    price: 28.99,
    category: "Jewelry",
    sellerId: "seller3",
    sellerName: "Emma's Jewelry",
    stock: 20,
    images: []
  }
];

// Instructions to seed data:
// 1. Make sure your dev server is running (pnpm dev)
// 2. Open browser console on http://localhost:3000
// 3. Copy and paste the following code:

/*
const sampleProducts = [
  // Copy the array above
];

async function seedProducts() {
  for (const product of sampleProducts) {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      console.log('Created:', data.product.name);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  console.log('Seeding complete!');
}

seedProducts();
*/

console.log('Sample products ready for seeding');
console.log('Total products:', sampleProducts.length);
