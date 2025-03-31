import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/theme.css';

// This would be replaced with your actual Mapbox access token
// For security, this should be stored in an environment variable
const MAPBOX_ACCESS_TOKEN = 'pk.your_mapbox_token_here';

interface Location {
  id: string;
  name: string;
  type: 'job' | 'education' | 'training' | 'assessment';
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  description?: string;
  distance?: number; // in kilometers
}

interface MapComponentProps {
  center?: [number, number]; // [longitude, latitude]
  zoom?: number;
  userLocation?: [number, number];
  locations?: Location[];
  onLocationSelect?: (location: Location) => void;
  searchRadius?: number; // in kilometers
}

const MapService = {
  async getUserLocation(): Promise<[number, number] | null> {
    // This would be replaced with actual geolocation API
    // For demonstration purposes, we're using a mock implementation
    
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.longitude, position.coords.latitude]);
          },
          (error) => {
            console.error('Error getting user location:', error);
            // Default to Dubai coordinates for demo
            resolve([55.2708, 25.2048]);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser');
        // Default to Dubai coordinates for demo
        resolve([55.2708, 25.2048]);
      }
    });
  },
  
  async searchLocations(
    center: [number, number], 
    radius: number, 
    types?: ('job' | 'education' | 'training' | 'assessment')[]
  ): Promise<Location[]> {
    // This would be replaced with actual API call to search locations
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock locations around Dubai
    const mockLocations: Location[] = [
      {
        id: 'job1',
        name: 'Emirates Group',
        type: 'job',
        coordinates: [55.3708, 25.2548],
        address: 'Dubai International Airport, Dubai, UAE',
        description: 'Multiple job openings in aviation and hospitality',
      },
      {
        id: 'job2',
        name: 'Dubai Future Foundation',
        type: 'job',
        coordinates: [55.2808, 25.2148],
        address: 'Emirates Towers, Dubai, UAE',
        description: 'Technology and innovation roles',
      },
      {
        id: 'edu1',
        name: 'United Arab Emirates University',
        type: 'education',
        coordinates: [55.4708, 25.1548],
        address: 'Al Ain, UAE',
        description: 'Higher education programs and scholarships',
      },
      {
        id: 'edu2',
        name: 'American University in Dubai',
        type: 'education',
        coordinates: [55.1708, 25.0948],
        address: 'Dubai Media City, Dubai, UAE',
        description: 'Undergraduate and graduate programs',
      },
      {
        id: 'train1',
        name: 'Dubai Knowledge Park',
        type: 'training',
        coordinates: [55.1608, 25.1048],
        address: 'Al Sufouh, Dubai, UAE',
        description: 'Professional development and training programs',
      },
      {
        id: 'train2',
        name: 'Etisalat Academy',
        type: 'training',
        coordinates: [55.3908, 25.2648],
        address: 'Al Muhaisnah, Dubai, UAE',
        description: 'Technical and leadership training',
      },
      {
        id: 'assess1',
        name: 'Dubai Assessment Center',
        type: 'assessment',
        coordinates: [55.2908, 25.2248],
        address: 'Business Bay, Dubai, UAE',
        description: 'Skills assessment and certification',
      }
    ];
    
    // Calculate distance from center for each location
    const locationsWithDistance = mockLocations.map(location => {
      const distance = this.calculateDistance(
        center[1], center[0], 
        location.coordinates[1], location.coordinates[0]
      );
      return { ...location, distance };
    });
    
    // Filter by distance and types
    return locationsWithDistance
      .filter(location => location.distance <= radius)
      .filter(location => !types || types.includes(location.type))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  },
  
  // Haversine formula to calculate distance between two coordinates in kilometers
  calculateDistance(
    lat1: number, lon1: number, 
    lat2: number, lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  },
  
  deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
};

const MapComponent: React.FC<MapComponentProps> = ({
  center = [55.2708, 25.2048], // Default to Dubai coordinates
  zoom = 10,
  userLocation,
  locations = [],
  onLocationSelect,
  searchRadius = 10 // Default 10km radius
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: center,
        zoom: zoom
      });
      
      map.current.on('load', () => {
        setMapLoaded(true);
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Cleanup on unmount
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map. Please check your internet connection and try again.');
    }
  }, []);
  
  // Add user location marker
  useEffect(() => {
    if (!mapLoaded || !map.current || !userLocation) return;
    
    // Remove existing user marker if any
    const existingMarker = document.getElementById('user-marker');
    if (existingMarker) {
      existingMarker.remove();
    }
    
    // Add user location marker
    const userMarkerElement = document.createElement('div');
    userMarkerElement.id = 'user-marker';
    userMarkerElement.className = 'user-marker';
    userMarkerElement.style.width = '20px';
    userMarkerElement.style.height = '20px';
    userMarkerElement.style.borderRadius = '50%';
    userMarkerElement.style.backgroundColor = '#007A3D'; // Primary color
    userMarkerElement.style.border = '3px solid white';
    userMarkerElement.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
    
    new mapboxgl.Marker(userMarkerElement)
      .setLngLat(userLocation)
      .addTo(map.current);
    
    // Add search radius circle
    if (map.current.getSource('radius-circle')) {
      (map.current.getSource('radius-circle') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: userLocation
        },
        properties: {}
      });
    } else {
      map.current.addSource('radius-circle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: userLocation
          },
          properties: {}
        }
      });
      
      map.current.addLayer({
        id: 'radius-circle',
        type: 'circle',
        source: 'radius-circle',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, searchRadius * 1000 / 0.075] // Convert km to pixels based on zoom level
            ],
            base: 2
          },
          'circle-color': '#007A3D',
          'circle-opacity': 0.1,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#007A3D'
        }
      });
    }
    
    // Center map on user location
    map.current.flyTo({
      center: userLocation,
      zoom: 11,
      essential: true
    });
    
  }, [mapLoaded, userLocation, searchRadius]);
  
  // Add location markers
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Remove existing location markers
    const existingMarkers = document.querySelectorAll('.location-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Add location markers
    locations.forEach(location => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'location-marker';
      markerElement.style.width = '30px';
      markerElement.style.height = '30px';
      markerElement.style.backgroundSize = 'contain';
      markerElement.style.backgroundRepeat = 'no-repeat';
      markerElement.style.cursor = 'pointer';
      
      // Set marker icon based on location type
      switch (location.type) {
        case 'job':
          markerElement.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23CE1126\"><path d=\"M10 2h4c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2zm4 4V4h-4v2h4z\"/></svg>')";
          break;
        case 'education':
          markerElement.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23007A3D\"><path d=\"M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z\"/></svg>')";
          break;
        case 'training':
          markerElement.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23FFD700\"><path d=\"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v4H7v2h4v4h2v-4h4v-2h-4V8z\"/></svg>')";
          break;
        case 'assessment':
          markerElement.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23000000\"><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z\"/></svg>')";
          break;
      }
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div>
          <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 5px;">${location.address}</p>
          ${location.distance ? `<p style="font-size: 12px; color: #666; margin-bottom: 5px;">${location.distance} km away</p>` : ''}
          ${location.description ? `<p style="font-size: 12px; margin-top: 5px;">${location.description}</p>` : ''}
        </div>
      `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click event
      markerElement.addEventListener('click', () => {
        setSelectedLocation(location);
        if (onLocationSelect) {
          onLocationSelect(location);
        }
      });
    });
    
  }, [mapLoaded, locations, onLocationSelect]);
  
  return (
    <div className="relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-accent p-3 z-10 rounded-md">
          {error}
        </div>
      )}
      <div ref={mapContainer} className="h-96 rounded-lg shadow-sm" />
      
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10 max-w-md mx-auto">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-primary">{selectedLocation.name}</h3>
            <button 
              className="text-gray-500 hover:text-accent"
              onClick={() => setSelectedLocation(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm">{selectedLocation.address}</p>
          {selectedLocation.distance && (
            <p className="text-gray-600 text-sm">{selectedLocation.distance} km away</p>
          )}
          {selectedLocation.description && (
            <p className="text-gray-700 mt-2">{selectedLocation.description}</p>
          )}
          <div className="mt-3 flex justify-end">
            <button className="btn-primary text-sm">View Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

const LocationSearchComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [locationType, setLocationType] = useState<('job' | 'education' | 'training' | 'assessment')[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get user location on component mount
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const location = await MapService.getUserLocation();
        if (location) {
          setUserLocation(location);
        }
      } catch (err) {
        console.error('Error getting user location:', err);
        setError('Failed to get your location. Using default location instead.');
      }
    };
    
    getUserLocation();
  }, []);
  
  // Search locations when user location or search parameters change
  useEffect(() => {
    if (!userLocation) return;
    
    const searchLocations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const results = await MapService.searchLocations(
          userLocation,
          searchRadius,
          locationType.length > 0 ? locationType : undefined
        );
        setLocations(results);
      } catch (err) {
        console.error('Error searching locations:', err);
        setError('Failed to search locations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    searchLocations();
  }, [userLocation, searchRadius, locationType]);
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };
  
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRadius(parseInt(e.target.value));
  };
  
  const handleTypeToggle = (type: 'job' | 'education' | 'training' | 'assessment') => {
    setLocationType(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !=
(Content truncated due to size limit. Use line ranges to read in chunks)