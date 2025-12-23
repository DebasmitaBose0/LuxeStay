export type User = {
  id: string;
  name: string;
  email: string;
  gender?: 'boy' | 'girl' | 'other';
};

export type RoomType = 'standard' | 'deluxe' | 'suite';

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  description: string;
  amenities: string[];
  images: string[];
  maxGuests: number;
  status: 'available' | 'limited' | 'booked';
};

export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'paid' | 'refunded' | 'partial_refunded';

export type Booking = {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
};

export type Refund = {
  id: string;
  bookingId: string;
  amount: number;
  percentage: number;
  date: Date;
};
