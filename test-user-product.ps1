Write-Host "Testing: User creates a product..." -ForegroundColor Cyan
Write-Host ""

# Simulating a user creating a product
$newProduct = @{
    name = "User Created Handmade Scarf"
    description = "Beautiful handmade scarf created by a marketplace user. Soft and warm for winter."
    price = 28.50
    category = "Textiles"
    sellerId = "user12345"
    sellerName = "Sarah's Crafts"
    images = @("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400")
    stock = 12
} | ConvertTo-Json

try {
    Write-Host "Creating product via API..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $newProduct -ContentType "application/json"
    
    if ($response.success) {
        Write-Host ""
        Write-Host "SUCCESS! Product created by user" -ForegroundColor Green
        Write-Host "Product ID: $($response.product._id)" -ForegroundColor Cyan
        Write-Host "Product Name: $($response.product.name)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Verifying it appears in marketplace..." -ForegroundColor Yellow
        
        Start-Sleep -Seconds 1
        
        # Fetch all products to verify
        $allProducts = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Get
        $found = $allProducts.products | Where-Object { $_._id -eq $response.product._id }
        
        if ($found) {
            Write-Host ""
            Write-Host "CONFIRMED! Product is now in marketplace" -ForegroundColor Green
            Write-Host "Total products in marketplace: $($allProducts.products.Count)" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "View it here:" -ForegroundColor Yellow
            Write-Host "http://localhost:3000/marketplace" -ForegroundColor Cyan
            Write-Host "http://localhost:3000/products/$($response.product._id)" -ForegroundColor Cyan
        }
    } else {
        Write-Host "Failed: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
