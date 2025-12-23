import { useState, useMemo } from 'react';
import { Room } from '@/lib/types';
import { DateRange } from "react-day-picker";
import { addDays, differenceInDays, isWithinInterval, format } from 'date-fns';
import { DateRangePicker } from './DateRangePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

interface BookingModuleProps {
  room: Room;
  bookedDates: { from: Date; to: Date }[];
  onBook: (checkIn: Date, checkOut: Date, totalPrice: number) => Promise<void>;
}

export default function BookingModule({ room, bookedDates, onBook }: BookingModuleProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate nights and price
  const { nights, totalPrice } = useMemo(() => {
    if (!date?.from || !date?.to) return { nights: 0, totalPrice: 0 };
    const diff = differenceInDays(date.to, date.from);
    return {
      nights: diff,
      totalPrice: diff * room.price
    };
  }, [date, room.price]);

  // Disable booked dates
  const disabledDates = useMemo(() => {
    return [
      { before: new Date() }, // Past dates
      ...bookedDates // Already booked
    ];
  }, [bookedDates]);

  const handleBookClick = () => {
    if (!user) {
      toast.error('Please log in to book a room');
      navigate('/login');
      return;
    }
    if (!date?.from || !date?.to) return;
    
    // Double check overlap
    const isOverlap = bookedDates.some(booking => 
      (date.from! < booking.to && date.to! > booking.from)
    );

    if (isOverlap) {
      toast.error('Selected dates are not available');
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!date?.from || !date?.to) return;
    
    setIsProcessing(true);
    try {
      await onBook(date.from, date.to, totalPrice);
      setIsConfirmOpen(false);
      // Success is handled by parent or toast there
    } catch (error) {
      // Error handled by parent usually, but we can catch here too
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card className="border shadow-lg sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono">${room.price}</span>
            <span className="text-muted-foreground text-sm font-normal">/ night</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Dates</label>
            <DateRangePicker 
              date={date} 
              setDate={setDate} 
              disabledDates={disabledDates}
            />
          </div>

          {nights > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="underline">${room.price} x {nights} nights</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="underline">Cleaning fee</span>
                <span>$50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="underline">Service fee</span>
                <span>$30</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice + 80}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 text-lg" 
            onClick={handleBookClick}
            disabled={!date?.from || !date?.to || nights === 0}
          >
            Reserve
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Confirm your booking</DialogTitle>
            <DialogDescription>
              Review your trip details before finalizing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="font-bold">{room.name}</h4>
                <p className="text-sm text-muted-foreground">{room.type} Room</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl">${totalPrice + 80}</div>
                <div className="text-xs text-muted-foreground">Total including taxes</div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Check-in</span>
                <span className="font-medium">{date?.from && format(date.from, 'MMM dd, yyyy')}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Check-out</span>
                <span className="font-medium">{date?.to && format(date.to, 'MMM dd, yyyy')}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Guests</span>
                <span className="font-medium">{room.maxGuests} Guests</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg text-xs space-y-2">
              <p>
                <strong>Cancellation Policy:</strong> Free cancellation until 24 hours before check-in.
                50% refund if cancelled within 24 hours. No refund after check-in.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} disabled={isProcessing} className="bg-primary">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm & Pay'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
