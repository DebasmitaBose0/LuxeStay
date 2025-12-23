import { User, Room, Booking, Refund, BookingStatus, PaymentStatus } from './types';
import { addDays, differenceInHours, isBefore, startOfDay, parseISO } from 'date-fns';

const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Alpine Deluxe',
    type: 'deluxe',
    price: 250,
    description: 'A spacious room with a panoramic view of the mountains. Features a king-size bed, private balcony, and a luxurious bathroom with a rain shower.',
    amenities: ['King Bed', 'Mountain View', 'Balcony', 'Free Wi-Fi', 'Smart TV', 'Mini Bar'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'],
    maxGuests: 2,
    status: 'available'
  },
  {
    id: '2',
    name: 'Urban Suite',
    type: 'suite',
    price: 450,
    description: 'Experience the city in style. This suite offers a separate living area, a kitchenette, and floor-to-ceiling windows overlooking the skyline.',
    amenities: ['King Bed', 'City View', 'Living Room', 'Kitchenette', 'Work Desk', 'Bathtub'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'],
    maxGuests: 3,
    status: 'available'
  },
  {
    id: '3',
    name: 'Cozy Standard',
    type: 'standard',
    price: 120,
    description: 'Perfect for the solo traveler or a couple. This cozy room provides all the essentials for a comfortable stay.',
    amenities: ['Queen Bed', 'Garden View', 'Free Wi-Fi', 'Coffee Maker'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
    maxGuests: 2,
    status: 'available'
  },
  {
    id: '4',
    name: 'Lakeside Retreat',
    type: 'deluxe',
    price: 280,
    description: 'Relax by the water in this serene room. Direct access to the lake and a private terrace.',
    amenities: ['King Bed', 'Lake View', 'Terrace', 'Fireplace'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
    maxGuests: 2,
    status: 'available'
  },
  {
    id: '5',
    name: 'Family Suite',
    type: 'suite',
    price: 500,
    description: 'Spacious accommodation for the whole family. Two bedrooms, two bathrooms, and a large living area.',
    amenities: ['2 Queen Beds', 'Living Room', '2 Bathrooms', 'Game Console'],
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'],
    maxGuests: 4,
    status: 'limited'
  },
  {
    id: '6',
    name: 'Business Executive',
    type: 'standard',
    price: 180,
    description: 'Designed for productivity. Features a large ergonomic desk, high-speed internet, and a comfortable lounge chair.',
    amenities: ['Queen Bed', 'Work Desk', 'High-Speed Wi-Fi', 'Lounge Chair'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'],
    maxGuests: 2,
    status: 'available'
  }
];

// Helper to delay for realistic feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getRooms: async (): Promise<Room[]> => {
    await delay(500);
    return MOCK_ROOMS;
  },

  getRoom: async (id: string): Promise<Room | undefined> => {
    await delay(300);
    return MOCK_ROOMS.find(r => r.id === id);
  },

  // Auth Mocks
  login: async (email: string): Promise<User> => {
    await delay(800);
    // Mock login - accepts any email
    return {
      id: 'user-1',
      name: 'John Doe',
      email
    };
  },

  register: async (name: string, email: string, gender?: string): Promise<User> => {
    await delay(800);
    return {
      id: 'user-1',
      name,
      email,
      gender: gender as 'boy' | 'girl' | 'other' | undefined
    };
  },

  // Booking Mocks
  getBookings: async (): Promise<Booking[]> => {
    await delay(600);
    const bookingsStr = localStorage.getItem('bookings');
    const bookings = bookingsStr ? JSON.parse(bookingsStr) : [];
    // Convert date strings back to Date objects
    return bookings.map((b: any) => ({
      ...b,
      checkIn: new Date(b.checkIn),
      checkOut: new Date(b.checkOut),
      createdAt: new Date(b.createdAt)
    }));
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'status' | 'paymentStatus' | 'createdAt'>): Promise<Booking> => {
    await delay(1000);
    
    // Check for overlaps (simplified)
    const allBookings = await api.getBookings();
    const isOverlap = allBookings.some(b => 
      b.roomId === booking.roomId && 
      b.status === 'confirmed' &&
      ((booking.checkIn >= b.checkIn && booking.checkIn < b.checkOut) ||
       (booking.checkOut > b.checkIn && booking.checkOut <= b.checkOut) ||
       (booking.checkIn <= b.checkIn && booking.checkOut >= b.checkOut))
    );

    if (isOverlap) {
      throw new Error('Selected dates are not available.');
    }

    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date()
    };

    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    return newBooking;
  },

  cancelBooking: async (bookingId: string): Promise<{ booking: Booking, refund: Refund | null }> => {
    await delay(1200);
    const allBookings = await api.getBookings();
    const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) throw new Error('Booking not found');
    
    const booking = allBookings[bookingIndex];
    
    // Calculate refund
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const hoursUntilCheckIn = differenceInHours(checkIn, now);
    
    let refundPercentage = 0;
    if (hoursUntilCheckIn >= 24) {
      refundPercentage = 100;
    } else if (hoursUntilCheckIn > 0) {
      refundPercentage = 50;
    } else {
      refundPercentage = 0; // After check-in
    }

    const refundAmount = (booking.totalPrice * refundPercentage) / 100;
    
    const updatedBooking: Booking = {
      ...booking,
      status: 'cancelled',
      paymentStatus: refundPercentage > 0 ? (refundPercentage === 100 ? 'refunded' : 'partial_refunded') : 'paid'
    };

    allBookings[bookingIndex] = updatedBooking;
    localStorage.setItem('bookings', JSON.stringify(allBookings));

    const refund: Refund | null = refundAmount > 0 ? {
      id: Math.random().toString(36).substr(2, 9),
      bookingId,
      amount: refundAmount,
      percentage: refundPercentage,
      date: new Date()
    } : null;

    return { booking: updatedBooking, refund };
  },

  // Helper to get unavailable dates for a room
  getUnavailableDates: async (roomId: string): Promise<{ from: Date; to: Date }[]> => {
    const bookings = await api.getBookings();
    return bookings
      .filter(b => b.roomId === roomId && b.status === 'confirmed')
      .map(b => ({ from: b.checkIn, to: b.checkOut }));
  }
};
