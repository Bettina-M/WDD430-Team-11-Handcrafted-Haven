import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';


// Define query interface
interface ProductQuery {
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  $or?: Array<{
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }>;
}

// Define sort interface
interface SortOptions {
  [key: string]: 1 | -1;
}
// GET all products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    // Build query
    const query: ProductQuery = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort
    const sortOptions: SortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const products = await Product.find(query).sort(sortOptions);

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, price, category, images, sellerId, sellerName, stock } = body;

    // Validate required fields
    if (!name || !description || !price || !category || !sellerId || !sellerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: images || [],
      sellerId,
      sellerName,
      stock: stock || 0,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: unknown) {  //here i changed to unknown because any was giving was giving type errors
    console.error('Error creating product:', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}


