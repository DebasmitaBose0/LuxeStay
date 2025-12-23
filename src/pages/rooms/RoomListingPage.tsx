import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Room, RoomType } from '@/lib/types';
import RoomCard from '@/components/rooms/RoomCard';
import RoomFilters from '@/components/rooms/RoomFilters';
import { Skeleton } from '@/components/ui/skeleton';

export default function RoomListingPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    priceRange: [number, number];
    types: RoomType[];
  }>({
    priceRange: [0, 1000],
    types: []
  });

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await api.getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesPrice = room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1];
    const matchesType = filters.types.length === 0 || filters.types.includes(room.type);
    return matchesPrice && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Find your perfect stay</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our hand-picked collection of rooms and suites, designed for your comfort and style.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <RoomFilters onFilterChange={setFilters} />
        </aside>
        
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[250px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Asymmetric Bento Layout simulation - using span classes for some cards if I had more data/control, 
                    but for now a simple grid is cleaner given dynamic data */}
              {filteredRooms.map((room) => (
                <div key={room.id} className="h-full">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium mb-2">No rooms found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find available rooms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
