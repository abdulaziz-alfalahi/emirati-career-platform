import React, { useEffect, useRef, useState } from 'react';
// Note: In a real implementation, you would import mapboxgl
// For now, we'll create a mock implementation

interface Location {
  id: string;
  name: string;
  type: 'job' | 'education' | 'training' | 'assessment';
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  description: string;
}

export default function LocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationType, setLocationType] = useState<string>('all');
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would initialize Mapbox GL
    // For now, we'll simulate loading locations after a delay
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock locations data
        const mockLocations: Location[] = [
          {
            id: '1',
            name: 'Dubai Technology Hub',
            type: 'job',
            coordinates: [55.2708, 25.2048],
            address: 'Sheikh Zayed Road, Dubai, UAE',
            description: 'A hub for technology companies with multiple job opportunities.'
          },
          {
            id: '2',
            name: 'Emirates Institute of Technology',
            type: 'education',
            coordinates: [55.3708, 25.2548],
            address: 'Academic City Road, Dubai, UAE',
            description: 'Leading educational institution offering technology and business programs.'
          },
          {
            id: '3',
            name: 'Professional Training Center',
            type: 'training',
            coordinates: [55.3108, 25.2748],
            address: 'Business Bay, Dubai, UAE',
            description: 'Offers professional training courses in various fields.'
          },
          {
            id: '4',
            name: 'Career Assessment Center',
            type: 'assessment',
            coordinates: [55.2308, 25.1948],
            address: 'Downtown Dubai, UAE',
            description: 'Provides career assessment and guidance services.'
          },
          {
            id: '5',
            name: 'Abu Dhabi Innovation Hub',
            type: 'job',
            coordinates: [54.3773, 24.4539],
            address: 'Corniche Road, Abu Dhabi, UAE',
            description: 'Innovation center with job opportunities in technology and research.'
          },
          {
            id: '6',
            name: 'Sharjah University',
            type: 'education',
            coordinates: [55.4874, 25.3463],
            address: 'University City, Sharjah, UAE',
            description: 'Comprehensive university offering various academic programs.'
          }
        ];
        
        setLocations(mockLocations);
        setSelectedLocation(mockLocations[0]);
      } catch (err) {
        console.error('Failed to load locations:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(location => {
    const matchesQuery = location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         location.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = locationType === 'all' || location.type === locationType;
    
    return matchesQuery && matchesType;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a map search
    console.log('Searching for:', searchQuery, 'Type:', locationType, 'Radius:', searchRadius);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D' }}>Location Search</h1>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Search and filters */}
        <div style={{ width: '300px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <form onSubmit={handleSearch}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter location or keyword"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Type</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
                >
                  <option value="all">All Types</option>
                  <option value="job">Jobs</option>
                  <option value="education">Educational Institutions</option>
                  <option value="training">Training Centers</option>
                  <option value="assessment">Assessment Centers</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Search Radius: {searchRadius} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <button
                type="submit"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#007A3D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Search
              </button>
            </form>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Results ({filteredLocations.length})</h2>
            
            {isLoading ? (
              <p>Loading locations...</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                {filteredLocations.map((location) => (
                  <div 
                    key={location.id}
                    style={{ 
                      padding: '0.75rem',
                      backgroundColor: selectedLocation?.id === location.id ? 'rgba(0, 122, 61, 0.1)' : 'transparent',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      border: selectedLocation?.id === location.id ? '1px solid #007A3D' : '1px solid transparent'
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span 
                        style={{ 
                          width: '0.75rem', 
                          height: '0.75rem', 
                          borderRadius: '9999px',
                          backgroundColor: 
                            location.type === 'job' ? '#4CAF50' : 
                            location.type === 'education' ? '#2196F3' : 
                            location.type === 'training' ? '#FFC107' : 
                            '#FF9800',
                          marginRight: '0.5rem'
                        }}
                      ></span>
                      <h3 style={{ fontWeight: 'bold' }}>{location.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>{location.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Map and location details */}
        <div style={{ flex: 1 }}>
          {/* Mock map */}
          <div 
            ref={mapContainer}
            style={{ 
              height: '400px', 
              backgroundColor: '#e9eef2', 
              borderRadius: '0.5rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {isLoading ? (
              <p>Loading map...</p>
            ) : (
              <>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.7 }}>
                  {/* This would be a real map in production */}
                  <img 
                    src="https://i.imgur.com/JVzsC5S.png" 
                    alt="Map of UAE" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}>
                  <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.25rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) ' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#4CAF50', marginRight: '0.5rem' }}></span>
                      <span style={{ fontSize: '0.75rem' }}>Jobs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#2196F3', marginRight: '0.5rem' }}></span>
                      <span style={{ fontSize: '0.75rem' }}>Educational Institutions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#FFC107', marginRight: '0.5rem' }}></span>
                      <span style={{ fontSize: '0.75rem' }}>Training Centers</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#FF9800', marginRight: '0.5rem' }}></span>
                      <span style={{ fontSize: '0.75rem' }}>Assessment Centers</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Location details */}
          {selectedLocation && (
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span 
                  style={{ 
                    width: '1rem', 
                    height: '1rem', 
                    borderRadius: '9999px',
                    backgroundColor: 
                      selectedLocation.type === 'job' ? '#4CAF50' : 
                      selectedLocation.type === 'education' ? '#2196F3' : 
                      selectedLocation.type === 'training' ? '#FFC107' : 
                      '#FF9800',
                    marginRight: '0.75rem'
                  }}
                ></span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007A3D' }}>{selectedLocation.name}</h2>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Address</h3>
                <p>{selectedLocation.address}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Description</h3>
                <p>{selectedLocation.description}</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Coordinates</h3>
                <p>Longitude: {selectedLocation.coordinates[0]}, Latitude: {selectedLocation.coordinates[1]}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  style={{ 
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007A3D',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Get Directions
                </button>
                <button
                  style={{ 
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'transparent',
                    color: '#007A3D',
                    border: '1px solid #007A3D',
                    borderRadius: '0.25rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Save Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
