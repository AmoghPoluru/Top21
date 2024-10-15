'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DrawingManager, Libraries } from '@react-google-maps/api';
import { useSearch } from '@/app/contexts/SearchContext';

const libraries: Libraries = ['drawing'];

const MapSearch = () => {
  const { searchQuery } = useSearch();
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);

  const updateMapCenter = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/googlemaps/geocode?address=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapCenter({ lat, lng });
      } else {
        setError('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred while fetching the location.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    updateMapCenter(searchQuery);
  }, [searchQuery, updateMapCenter]);

  const toggleDrawMode = () => {
    setIsDrawMode(!isDrawMode);
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(isDrawMode ? null : google.maps.drawing.OverlayType.POLYGON);
    }
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div className="text-red-500 font-bold">Error: Google Maps API key is missing</div>;
  }

  return (
    <div className="container mx-auto p-4">
     { /*<input
        type="text"
        placeholder="Enter location"
        value={searchQuery}
        onChange={(e) => updateMapCenter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />*/}
      
      <button
        onClick={toggleDrawMode}
        className={`mb-4 px-4 py-2 rounded-md ${isDrawMode ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
      >
        {isDrawMode ? 'Cancel Draw' : 'Draw'}
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={10}
          onLoad={onLoad}
        >
          <Marker position={mapCenter} />
          <DrawingManager
            onLoad={onDrawingManagerLoad}
            options={{
              drawingMode: isDrawMode ? google.maps.drawing.OverlayType.POLYGON : null,
              drawingControl: false,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapSearch;