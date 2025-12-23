import { Room } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Wifi, Coffee, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'bg-success hover:bg-success/90 text-success-foreground';
      case 'limited': return 'bg-warning hover:bg-warning/90 text-warning-foreground';
      case 'booked': return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_60px_rgba(22,163,74,0.4)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${getStatusColor(room.status)} capitalize border-0`}>
            {room.status === 'booked' ? 'Booked Out' : room.status}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="font-serif text-xl font-bold">{room.name}</h3>
          <p className="text-sm opacity-90">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
        </div>
      </div>
      
      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{room.maxGuests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>50m²</span>
          </div>
        </div>
        
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="font-normal bg-muted">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="secondary" className="font-normal bg-muted">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-border/50 mt-auto">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Starting from</span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-primary">${room.price}</span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
        </div>
        <Link to={`/rooms/${room.id}`}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
