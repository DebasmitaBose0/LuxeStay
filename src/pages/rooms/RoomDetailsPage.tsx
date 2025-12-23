import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Room } from '@/lib/types';
import BookingModule from '@/components/booking/BookingModule';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wifi, MapPin, Star, Share2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthContext';

export default function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState<{ from: Date; to: Date }[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const roomData = await api.getRoom(id);
        if (!roomData) {
          navigate('/404'); // Or handle appropriately
          return;
        }
        setRoom(roomData);
        
        const dates = await api.getUnavailableDates(id);
        setBookedDates(dates);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id, navigate]);

  const handleBook = async (checkIn: Date, checkOut: Date, totalPrice: number) => {
    if (!room || !user || !id) return;

    try {
      await api.createBooking({
        userId: user.id,
        roomId: room.id,
        roomName: room.name,
        roomImage: room.images[0],
        checkIn,
        checkOut,
        totalPrice: totalPrice + 80 // Add mock fees
      });
      
      toast.success('Booking confirmed successfully!', {
        description: 'You can view your booking in the dashboard.',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Booking failed', {
        description: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary/70"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to rooms
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">{room.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Swiss Alps, Switzerland</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/10]">
            <img 
              src={room.images[0]} 
              alt={room.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 pb-6 border-b">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-medium">4.92</span>
                <span className="text-muted-foreground">(128 reviews)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                <Badge variant="secondary" className="bg-white">{room.type}</Badge>
              </div>
            </div>

            <div className="prose max-w-none text-muted-foreground">
              <h3 className="text-foreground font-serif text-xl font-bold mb-2">About this place</h3>
              <p>{room.description}</p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Wifi className="w-5 h-5 text-muted-foreground" /> 
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <BookingModule 
            room={room} 
            bookedDates={bookedDates} 
            onBook={handleBook}
          />
        </div>
      </div>
    </div>
  );
}
