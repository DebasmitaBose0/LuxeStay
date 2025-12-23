import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Booking } from '@/lib/types';
import BookingCard from '@/components/dashboard/BookingCard';
import { useAuth } from '@/components/auth/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getBookings();
      // Filter for current user (api returns all from mock implementation for simplicity in shared service, but we filter here)
      // Actually the mock api returns all, but in real app it would filter by user. 
      // I'll filter here.
      const userBookings = data.filter(b => b.userId === user?.id);
      
      // Sort by date (newest first)
      const sortedBookings = userBookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setBookings(sortedBookings);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { refund } = await api.cancelBooking(bookingId);
      
      toast.success('Booking cancelled', {
        description: refund 
          ? `Refund of $${refund.amount} has been processed.` 
          : 'Booking cancelled. No refund applicable.',
      });
      
      // Refresh list
      fetchBookings();
    } catch (error) {
      toast.error('Cancellation failed');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Bookings</h1>
      
      <div className="max-w-4xl mx-auto">
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">You haven't made any reservations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
