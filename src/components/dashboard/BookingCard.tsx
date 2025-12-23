import { useState, useRef } from 'react';
import { Booking, Refund } from '@/lib/types';
import { format, differenceInDays } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Calendar, MapPin, CreditCard, Download, FileText, Image as ImageIcon } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => Promise<void>;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const { user } = useAuth();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions to fit A4 or match content
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${booking.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleDownloadPNG = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `receipt-${booking.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-success hover:bg-success/90 text-success-foreground';
      case 'cancelled': return 'bg-muted text-muted-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary';
    }
  };

  const handleCancelClick = async () => {
    setIsCancelling(true);
    try {
      await onCancel(booking.id);
      setIsCancelOpen(false);
    } finally {
      setIsCancelling(false);
    }
  };

  // Calculate potential refund for display in dialog
  const getRefundPreview = () => {
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const diffHours = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours >= 24) return { percent: 100, amount: booking.totalPrice };
    if (diffHours > 0) return { percent: 50, amount: booking.totalPrice * 0.5 };
    return { percent: 0, amount: 0 };
  };

  const refundPreview = getRefundPreview();

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-md mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <img 
              src={booking.roomImage} 
              alt={booking.roomName} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-xl font-bold">{booking.roomName}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Swiss Alps</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-lg">${booking.totalPrice}</div>
                  <div className="text-xs text-muted-foreground">{booking.paymentStatus}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Check-in</span>
                    <span className="font-medium">{format(booking.checkIn, 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Check-out</span>
                    <span className="font-medium">{format(booking.checkOut, 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t gap-2">
                <Button variant="outline" onClick={() => setIsReceiptOpen(true)}>View Receipt</Button>
                {booking.status === 'confirmed' && (
                  <Button 
                    variant="destructive" 
                    onClick={() => setIsCancelOpen(true)}
                    disabled={booking.status !== 'confirmed'}
                  >
                    Cancel Booking
                  </Button>
                )}
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Receipt</DialogTitle>
            <DialogDescription>
              View and download your booking receipt.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center gap-4 my-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPNG}>
              <ImageIcon className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm" ref={receiptRef}>
            <div className="text-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-serif font-bold text-primary">Hotel Booking</h2>
              <p className="text-muted-foreground text-sm">Receipt #{booking.id.slice(0, 8)}</p>
              <p className="text-muted-foreground text-xs mt-1">{format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest Name</span>
                <span className="font-medium">{user?.name || 'Guest'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium">{booking.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span className="font-medium">{format(booking.checkIn, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span className="font-medium">{format(booking.checkOut, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nights</span>
                <span className="font-medium">{differenceInDays(booking.checkOut, booking.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="uppercase text-[10px]">{booking.status}</Badge>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span>${booking.totalPrice}</span>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-4">
                Thank you for choosing our hotel!
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your stay at {booking.roomName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="bg-muted/50 p-4 rounded-lg my-4 space-y-3">
            <h4 className="font-medium text-sm">Refund Estimation</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Refund Policy Applied</span>
              <span className="font-medium text-primary">
                {refundPreview.percent === 100 ? 'Full Refund' : 
                 refundPreview.percent === 50 ? 'Partial Refund (50%)' : 'No Refund'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold">Refund Amount</span>
              <span className="font-bold text-lg text-primary">${refundPreview.amount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
                {refundPreview.percent === 100 
                    ? "Cancelling more than 24 hours before check-in." 
                    : refundPreview.percent === 50 
                        ? "Cancelling less than 24 hours before check-in." 
                        : "Cancelling after check-in."}
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault(); 
                handleCancelClick();
              }}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isCancelling}
            >
              {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Cancellation'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
