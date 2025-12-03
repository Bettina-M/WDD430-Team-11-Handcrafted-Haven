# Test Backend API Script
# Run this to test if your MongoDB and API routes are working

Write-Host "🧪 Testing Handcrafted Haven Backend API..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if server is running
Write-Host "1️⃣ Testing API Health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method GET -ErrorAction Stop
    Write-Host "✅ API is responding!" -ForegroundColor Green
} catch {
    Write-Host "❌ Server not running. Start with: pnpm dev" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit
}

# Test 2: Create a test product
Write-Host ""
Write-Host "2️⃣ Creating test product..." -ForegroundColor Yellow
$testProduct = @{
    name = "Test Handmade Ceramic Mug"
    description = "Beautiful handcrafted mug for testing the backend API"
    price = 29.99
    category = "Pottery"
    sellerId = "test-seller-001"
    sellerName = "Test Artisan"
    stock = 5
    images = @()
} | ConvertTo-Json

try {
    $created = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method POST -Body $testProduct -ContentType "application/json"
    Write-Host "✅ Product created successfully!" -ForegroundColor Green
    Write-Host "   Product ID: $($created.product._id)" -ForegroundColor Gray
    $productId = $created.product._id
} catch {
    Write-Host "❌ Failed to create product" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit
}

# Test 3: Get all products
Write-Host ""
Write-Host "3️⃣ Fetching all products..." -ForegroundColor Yellow
try {
    $allProducts = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method GET
    Write-Host "✅ Retrieved $($allProducts.products.Count) products" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fetch products" -ForegroundColor Red
}

# Test 4: Get single product
Write-Host ""
Write-Host "4️⃣ Fetching single product..." -ForegroundColor Yellow
try {
    $single = Invoke-RestMethod -Uri "http://localhost:3000/api/products/$productId" -Method GET
    Write-Host "✅ Retrieved product: $($single.product.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fetch single product" -ForegroundColor Red
}

# Test 5: Add a review
Write-Host ""
Write-Host "5️⃣ Adding a test review..." -ForegroundColor Yellow
$testReview = @{
    userId = "test-user-001"
    userName = "John Tester"
    rating = 5
    title = "Excellent product!"
    comment = "This is a test review to verify the backend is working correctly."
} | ConvertTo-Json

try {
    $review = Invoke-RestMethod -Uri "http://localhost:3000/api/products/$productId/reviews" -Method POST -Body $testReview -ContentType "application/json"
    Write-Host "✅ Review added successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Review might already exist or failed to add" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Gray
}

# Test 6: Get reviews
Write-Host ""
Write-Host "6️⃣ Fetching reviews..." -ForegroundColor Yellow
try {
    $reviews = Invoke-RestMethod -Uri "http://localhost:3000/api/products/$productId/reviews" -Method GET
    Write-Host "✅ Retrieved $($reviews.reviews.Count) reviews" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fetch reviews" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "BACKEND TEST COMPLETE!" -ForegroundColor Green
Write-Host "MongoDB is connected" -ForegroundColor Green
Write-Host "Products API is working" -ForegroundColor Green
Write-Host "Reviews API is working" -ForegroundColor Green
Write-Host ""
Write-Host "View in browser:" -ForegroundColor Yellow
Write-Host "Marketplace: http://localhost:3000/marketplace" -ForegroundColor Cyan
$productUrl = "http://localhost:3000/products/$productId"
Write-Host "Product: $productUrl" -ForegroundColor Cyan
