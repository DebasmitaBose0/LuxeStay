// Email service for sending review confirmations
export async function sendReviewEmail(data: {
  name: string;
  email: string;
  review: string;
  rating: string;
}) {
  try {
    // In a real application, this would call your backend API
    // For now, we'll simulate sending an email by logging to console
    console.log('Review submitted:', data);
    
    // Simulate email sending with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Thank you email would be sent to ${data.email}`);
        resolve({ success: true });
      }, 1000);
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Mock function to store reviews (in real app, this would be database)
export function storeReview(data: {
  name: string;
  email: string;
  review: string;
  rating: string;
}) {
  // Store in localStorage for demo purposes
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.push({
    ...data,
    timestamp: new Date().toISOString(),
    id: Math.random().toString(36).substr(2, 9),
  });
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  return reviews;
}

// Retrieve stored reviews
export function getStoredReviews() {
  try {
    return JSON.parse(localStorage.getItem('userReviews') || '[]');
  } catch {
    return [];
  }
}
