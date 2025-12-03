import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';

// PUT update review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> } //added Promise type
) {
  try {
    await connectDB();

    const { id, reviewId } = await params; // Destructure after awaiting

    const body = await request.json();

    const review = await Review.findOneAndUpdate(
      { _id:reviewId, productId:id },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update product rating
    await updateProductRating(id);

    return NextResponse.json({ success: true, review }, { status: 200 });
  } /*catch (error: any) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update review' },
      { status: 500 }
    );
  }*/
 catch (error: unknown) {
  console.error('Error updating review:', error);
  
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Failed to update review';
  
  return NextResponse.json(
    { success: false, error: errorMessage },
    { status: 500 }
  );
}
}

// DELETE review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
) {
  try {
    await connectDB();

    const { id, reviewId } = await params;

    const review = await Review.findOneAndDelete({
      _id: reviewId, // Use destructured reviewId
      productId: id, // Use destructured id
    });

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update product rating
   await updateProductRating(id);

    return NextResponse.json(
      { success: true, message: 'Review deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
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
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
  });
}
