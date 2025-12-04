# Script to seed sample products into the database

Write-Host "Creating sample products..." -ForegroundColor Cyan

$products = @(
    @{
        name = "Handcrafted Wooden Bowl"
        description = "Beautiful handmade wooden bowl, perfect for serving salads or fruits. Made from sustainable oak wood."
        price = 45.99
        category = "Home Decor"
        sellerId = "674f1234567890abcdef1234"
        sellerName = "Wood Artisan Co"
        images = @("https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400")
        stock = 15
    },
    @{
        name = "Ceramic Coffee Mug Set"
        description = "Set of 4 artisan ceramic mugs with unique glazing. Microwave and dishwasher safe."
        price = 38.50
        category = "Kitchenware"
        sellerId = "674f1234567890abcdef1235"
        sellerName = "Clay & Fire Studio"
        images = @("https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400")
        stock = 20
    },
    @{
        name = "Knitted Wool Blanket"
        description = "Cozy hand-knitted blanket made from 100% merino wool. Perfect for cold winter nights."
        price = 89.99
        category = "Textiles"
        sellerId = "674f1234567890abcdef1236"
        sellerName = "Yarn & Needle"
        images = @("https://images.unsplash.com/photo-1595857019474-1f8e9f4b2f4f?w=400")
        stock = 8
    },
    @{
        name = "Leather Journal"
        description = "Handbound leather journal with recycled paper. 200 pages of premium quality paper."
        price = 32.00
        category = "Stationery"
        sellerId = "674f1234567890abcdef1237"
        sellerName = "Leather & Pages"
        images = @("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400")
        stock = 25
    },
    @{
        name = "Macrame Wall Hanging"
        description = "Bohemian style macrame wall art. Hand-knotted with natural cotton rope."
        price = 54.99
        category = "Home Decor"
        sellerId = "674f1234567890abcdef1238"
        sellerName = "Knot & Weave"
        images = @("https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=400")
        stock = 12
    },
    @{
        name = "Scented Soy Candle Set"
        description = "Set of 3 hand-poured soy candles with essential oils. Lavender, Vanilla, and Eucalyptus scents."
        price = 27.50
        category = "Home Decor"
        sellerId = "674f1234567890abcdef1239"
        sellerName = "Glow & Scent"
        images = @("https://images.unsplash.com/photo-1602874801006-c20bf581d19a?w=400")
        stock = 30
    }
)

$createdCount = 0
foreach ($product in $products) {
    try {
        $json = $product | ConvertTo-Json -Depth 5
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $json -ContentType "application/json"
        
        if ($response.success) {
            Write-Host "✓ Created: $($product.name)" -ForegroundColor Green
            $createdCount++
        } else {
            Write-Host "✗ Failed: $($product.name) - $($response.error)" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ Error creating $($product.name): $_" -ForegroundColor Red
    }
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "Created $createdCount out of $($products.Count) products" -ForegroundColor Green
Write-Host "Visit: http://localhost:3000/marketplace" -ForegroundColor Yellow
