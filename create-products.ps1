Write-Host "Creating sample products..." -ForegroundColor Cyan

$product1 = '{"name":"Handcrafted Wooden Bowl","description":"Beautiful handmade wooden bowl, perfect for serving salads or fruits.","price":45.99,"category":"Home Decor","sellerId":"674f1234567890abcdef1234","sellerName":"Wood Artisan Co","images":["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400"],"stock":15}'

$product2 = '{"name":"Ceramic Coffee Mug Set","description":"Set of 4 artisan ceramic mugs with unique glazing.","price":38.50,"category":"Kitchenware","sellerId":"674f1234567890abcdef1235","sellerName":"Clay Studio","images":["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400"],"stock":20}'

$product3 = '{"name":"Knitted Wool Blanket","description":"Cozy hand-knitted blanket made from 100% merino wool.","price":89.99,"category":"Textiles","sellerId":"674f1234567890abcdef1236","sellerName":"Yarn Needle","images":["https://images.unsplash.com/photo-1595857019474-1f8e9f4b2f4f?w=400"],"stock":8}'

try {
    $r1 = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $product1 -ContentType "application/json"
    Write-Host "Created: Handcrafted Wooden Bowl" -ForegroundColor Green
} catch { Write-Host "Error 1: $_" -ForegroundColor Red }

try {
    $r2 = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $product2 -ContentType "application/json"
    Write-Host "Created: Ceramic Coffee Mug Set" -ForegroundColor Green
} catch { Write-Host "Error 2: $_" -ForegroundColor Red }

try {
    $r3 = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method Post -Body $product3 -ContentType "application/json"
    Write-Host "Created: Knitted Wool Blanket" -ForegroundColor Green
} catch { Write-Host "Error 3: $_" -ForegroundColor Red }

Write-Host "Done! Visit http://localhost:3000/marketplace" -ForegroundColor Yellow
