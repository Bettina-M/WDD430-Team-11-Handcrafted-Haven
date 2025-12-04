Write-Host "Creating multiple products for marketplace..." -ForegroundColor Cyan
Write-Host ""

$products = @(
    @{
        name = "Simple Pearl Necklace"
        description = "Elegant simple pearl necklace for everyday wear. Made with faux pearls and lobster clasp."
        price = 10.00
        category = "Jewelry"
        sellerId = "674f1234567890abcdef1240"
        sellerName = "Pearl Artisan"
        images = @("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400")
        stock = 20
    },
    @{
        name = "Handwoven Basket"
        description = "Traditional handwoven basket perfect for storage or decoration."
        price = 35.00
        category = "Home Decor"
        sellerId = "674f1234567890abcdef1241"
        sellerName = "Weave Masters"
        images = @("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400")
        stock = 15
    },
    @{
        name = "Ceramic Vase Set"
        description = "Beautiful set of 3 ceramic vases in different sizes."
        price = 48.50
        category = "Home Decor"
        sellerId = "674f1234567890abcdef1242"
        sellerName = "Clay Studio"
        images = @("https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400")
        stock = 10
    },
    @{
        name = "Leather Wallet"
        description = "Handcrafted genuine leather wallet with multiple card slots."
        price = 42.00
        category = "Accessories"
        sellerId = "674f1234567890abcdef1243"
        sellerName = "Leather Craft Co"
        images = @("https://images.unsplash.com/photo-1627123424574-724758594e93?w=400")
        stock = 25
    },
    @{
        name = "Cotton Tote Bag"
        description = "Eco-friendly handmade cotton tote bag with unique print."
        price = 18.00
        category = "Accessories"
        sellerId = "674f1234567890abcdef1244"
        sellerName = "Eco Bags"
        images = @("https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400")
        stock = 30
    },
    @{
        name = "Beaded Bracelet"
        description = "Colorful beaded bracelet with adjustable clasp."
        price = 12.50
        category = "Jewelry"
        sellerId = "674f1234567890abcdef1245"
        sellerName = "Bead Art"
        images = @("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400")
        stock = 40
    }
)

$successCount = 0
$failCount = 0

foreach ($prod in $products) {
    try {
        $json = $prod | ConvertTo-Json -Depth 5
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $json -ContentType "application/json" -ErrorAction Stop
        
        if ($response.success) {
            Write-Host "[OK] $($prod.name)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "[FAIL] $($prod.name) - $($response.error)" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "[ERROR] $($prod.name) - $_" -ForegroundColor Red
        $failCount++
    }
    Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Created: $successCount products" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "Failed: $failCount products" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Visit your marketplace:" -ForegroundColor Yellow
Write-Host "http://localhost:3000/marketplace" -ForegroundColor Cyan
