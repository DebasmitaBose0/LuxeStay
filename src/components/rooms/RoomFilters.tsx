import { useState, useEffect } from 'react';
import { RoomType } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RoomFiltersProps {
  onFilterChange: (filters: {
    priceRange: [number, number];
    types: RoomType[];
  }) => void;
}

export default function RoomFilters({ onFilterChange }: RoomFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [types, setTypes] = useState<RoomType[]>([]);

  useEffect(() => {
    onFilterChange({ priceRange, types });
  }, [priceRange, types, onFilterChange]);

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setTypes([]);
  };

  return (
    <div className="space-y-8 p-6 bg-card rounded-lg border shadow-sm h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-primary">
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <Label>Price Range</Label>
            <span className="font-mono text-xs text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
            </span>
        </div>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={50}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="py-4"
        />
      </div>

      <div className="space-y-4">
        <Label>Room Type</Label>
        <ToggleGroup 
            type="multiple" 
            variant="outline" 
            value={types}
            onValueChange={(value) => setTypes(value as RoomType[])}
            className="justify-start flex-wrap gap-2"
        >
          <ToggleGroupItem value="standard" aria-label="Toggle standard">
            Standard
          </ToggleGroupItem>
          <ToggleGroupItem value="deluxe" aria-label="Toggle deluxe">
            Deluxe
          </ToggleGroupItem>
          <ToggleGroupItem value="suite" aria-label="Toggle suite">
            Suite
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
