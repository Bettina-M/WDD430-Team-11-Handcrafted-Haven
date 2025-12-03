import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';


interface SortOptions {
  [key: string]: 1 | -1;
}

// GET reviews for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const sortOptions: SortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const reviews = await Review.find({ productId: id }).sort(sortOptions);

    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST create new review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();
    const { userId, userName, rating, title, comment, images } = body;

    // Validate required fields
    if (!userId || !userName || !rating || !title || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId: id,
      userId,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 409 }
      );
    }

    // Create review
    const review = await Review.create({
      productId: id,
      userId,
      userName,
      rating,
      title,
      comment,
      images: images || [],
    });

    // Update product rating
    await updateProductRating(id);

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating review:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to create review';
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Helper function to update product rating
async function updateProductRating(productId: string) {
  const reviews = await Review.find({ productId });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  await Product.findByIdAndUpdate(productId, {
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalReviews,
  });
}
