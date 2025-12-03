# Product Reviews & Ratings System with Database

## 🎯 What Was Built

A complete product marketplace with reviews and ratings system, backed by MongoDB database:

### ✅ Database Layer
- **MongoDB Connection**: Persistent database connection with connection pooling
- **User Model**: Store authenticated users with roles (buyer/seller/admin)
- **Product Model**: Complete product information with ratings aggregation
- **Review Model**: Customer reviews with star ratings and comments

### ✅ Backend API
- **Product Routes**:
  - `GET /api/products` - List all products with filters and sorting
  - `POST /api/products` - Create new product
  - `GET /api/products/[id]` - Get single product
  - `PUT /api/products/[id]` - Update product
  - `DELETE /api/products/[id]` - Delete product

- **Review Routes**:
  - `GET /api/products/[productId]/reviews` - Get all reviews for a product
  - `POST /api/products/[productId]/reviews` - Create review (auto-updates product rating)
  - `PUT /api/products/[productId]/reviews/[reviewId]` - Update review
  - `DELETE /api/products/[productId]/reviews/[reviewId]` - Delete review

### ✅ Frontend UI
- **Marketplace Page**: Browse products with filters, search, and sorting
- **Product Detail Page**: View product details with reviews and ratings
- **Review System**: 
  - Write reviews with 1-5 star ratings
  - Add review title and detailed comments
  - View all customer reviews
  - Automatic average rating calculation

## 📦 Files Created

```
my-project/
├── src/
│   ├── lib/
│   │   └── mongodb.ts                                    # MongoDB connection
│   ├── models/
│   │   ├── User.ts                                       # User schema
│   │   ├── Product.ts                                    # Product schema
│   │   └── Review.ts                                     # Review schema
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.ts                              # Products CRUD
│   │   │       ├── [id]/
│   │   │       │   └── route.ts                          # Single product
│   │   │       └── [productId]/
│   │   │           └── reviews/
│   │   │               ├── route.ts                      # Reviews list/create
│   │   │               └── [reviewId]/
│   │   │                   └── route.ts                  # Review update/delete
│   │   ├── marketplace/
│   │   │   ├── page.tsx                                  # Product listing page
│   │   │   └── marketplace.module.css
│   │   └── products/
│   │       └── [id]/
│   │           ├── page.tsx                              # Product detail + reviews
│   │           └── product.module.css
└── .env.local                                            # MongoDB URI config
```

## 🚀 Setup Instructions

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Run the installer and keep default settings
   - MongoDB service will start automatically

2. **Verify MongoDB is Running**
   ```powershell
   # Check if MongoDB service is running
   Get-Service MongoDB
   
   # Or connect using mongo shell
   mongosh
   ```

3. **Your `.env.local` is already configured for local MongoDB:**
   ```
   MONGODB_URI=mongodb://localhost:27017/handcrafted-haven
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update `.env.local`**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/handcrafted-haven?retryWrites=true&w=majority
   ```
   Replace `username`, `password`, and `cluster` with your actual values

## 🧪 Testing the System

### 1. Start Your Dev Server
```powershell
cd my-project
pnpm dev
```

### 2. Create Sample Products

Use this API call or create a simple form:

```javascript
// POST /api/products
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Handmade Ceramic Mug',
    description: 'Beautiful handcrafted ceramic mug with unique glaze patterns.',
    price: 24.99,
    category: 'Pottery',
    sellerId: 'user-id-here',
    sellerName: 'Jane Artisan',
    stock: 10,
    images: []
  })
})
```

Or use this PowerShell command:
```powershell
$body = @{
    name = "Handmade Ceramic Mug"
    description = "Beautiful handcrafted ceramic mug with unique glaze patterns."
    price = 24.99
    category = "Pottery"
    sellerId = "user123"
    sellerName = "Jane Artisan"
    stock = 10
    images = @()
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method POST -Body $body -ContentType "application/json"
```

### 3. Browse the Marketplace
- Go to: http://localhost:3000/marketplace
- You'll see your products listed
- Click on a product to view details

### 4. Add Reviews
- On a product page, click "Write a Review"
- Log in first (required)
- Fill in rating, title, and comment
- Submit to see it appear instantly
- Product rating updates automatically

## 🎨 Features Explained

### Star Rating System
- ⭐⭐⭐⭐⭐ (5 stars = Excellent)
- Calculates average automatically
- Updates in real-time when reviews are added

### Filters & Search
- **Category Filter**: Jewelry, Pottery, Textiles, Woodwork, Home Decor, Art
- **Search**: Search by product name or description
- **Sort Options**: Newest, Price, Rating, Name
- **Order**: Ascending or Descending

### Review Features
- One review per user per product (prevents duplicates)
- Edit and delete reviews
- Helpful counter (for future implementation)
- Review timestamps

### Product Features
- Multiple images support (placeholder ready)
- Stock tracking
- Seller attribution
- Category tagging

## 📊 Database Schema

### Product
```typescript
{
  name: string
  description: string
  price: number
  category: enum
  images: string[]
  sellerId: ObjectId
  sellerName: string
  stock: number
  averageRating: number (auto-calculated)
  totalReviews: number (auto-calculated)
  timestamps: true
}
```

### Review
```typescript
{
  productId: ObjectId
  userId: ObjectId
  userName: string
  rating: 1-5
  title: string
  comment: string
  images: string[]
  helpful: number
  timestamps: true
}
```

## 🔧 API Usage Examples

### Create Product
```javascript
POST /api/products
{
  "name": "Wooden Jewelry Box",
  "description": "Handcrafted wooden jewelry box with intricate carvings",
  "price": 89.99,
  "category": "Woodwork",
  "sellerId": "seller-id",
  "sellerName": "John Carpenter",
  "stock": 5
}
```

### Get Products with Filters
```javascript
GET /api/products?category=Pottery&sortBy=averageRating&order=desc
```

### Add Review
```javascript
POST /api/products/{productId}/reviews
{
  "userId": "user-id",
  "userName": "Sarah Smith",
  "rating": 5,
  "title": "Amazing quality!",
  "comment": "This product exceeded my expectations. Highly recommend!"
}
```

## 🎯 Next Steps

1. **Image Upload**: Integrate Cloudinary or AWS S3 for product images
2. **Pagination**: Add pagination for products and reviews
3. **User Reviews**: Show user's own reviews in dashboard
4. **Seller Dashboard**: Create interface for sellers to manage products
5. **Shopping Cart**: Build cart and checkout system
6. **Order Management**: Track orders and purchases
7. **Review Images**: Allow users to upload photos with reviews
8. **Helpful Votes**: Let users mark reviews as helpful
9. **Review Verification**: Mark verified purchases
10. **Moderation**: Add admin tools to moderate reviews

## ⚠️ Important Notes

### Current Setup
- Uses MongoDB for persistent data storage
- All data is preserved between server restarts
- Automatic connection pooling for better performance
- Indexes added for query optimization

### Production Checklist
- [ ] Use MongoDB Atlas or managed MongoDB service
- [ ] Add proper authentication middleware
- [ ] Implement rate limiting on review submission
- [ ] Add input validation and sanitization
- [ ] Enable review moderation
- [ ] Add image optimization
- [ ] Implement caching (Redis)
- [ ] Add comprehensive error logging
- [ ] Set up database backups
- [ ] Configure database indexes properly

## 🐛 Troubleshooting

**"Failed to connect to MongoDB"**
- Make sure MongoDB is running: `Get-Service MongoDB`
- Start MongoDB: `Start-Service MongoDB`
- Or use MongoDB Atlas connection string

**"Cannot POST /api/products"**
- Check that your dev server is running
- Verify the MongoDB connection in terminal logs

**"You have already reviewed this product"**
- Each user can only review a product once
- Delete existing review first to submit a new one

**Products not showing in marketplace**
- Create some sample products first using the API
- Check browser console for errors

## 📚 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Your product reviews and ratings system is ready to use!** 🎉
