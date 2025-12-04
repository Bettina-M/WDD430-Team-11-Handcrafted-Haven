Write-Host "Adding Pearl Necklace to database..." -ForegroundColor Cyan

$product = @{
    name = "Simple Pearl Necklace"
    description = "Elegant simple pearl necklace for everyday wear."
    price = 10.00
    category = "Jewelry"
    sellerId = "674f1234567890abcdef1240"
    sellerName = "Pearl Artisan"
    images = @("https://example.com/necklace1.jpg")
    stock = 20
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $product -ContentType "application/json"
    
    if ($response.success) {
        Write-Host "Product added successfully!" -ForegroundColor Green
        Write-Host "Product ID: $($response.product._id)" -ForegroundColor Cyan
        Write-Host "Visit marketplace: http://localhost:3000/marketplace" -ForegroundColor Yellow
    } else {
        Write-Host "Failed to add product: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "Make sure server is running with: cd my-project; pnpm dev" -ForegroundColor Yellow
}
