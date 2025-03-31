import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '../../lib/api/APIContext';
import LocationSearchComponent from '../../components/map/LocationSearchComponent';

// Mock mapboxgl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    addControl: jest.fn(),
    remove: jest.fn(),
    flyTo: jest.fn(),
    getSource: jest.fn(() => ({
      setData: jest.fn()
    })),
    addSource: jest.fn(),
    addLayer: jest.fn()
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis()
  })),
  Popup: jest.fn(() => ({
    setHTML: jest.fn().mockReturnThis()
  }))
}));

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation(success => 
    success({
      coords: {
        latitude: 25.2048,
        longitude: 55.2708
      }
    })
  )
};
global.navigator.geolocation = mockGeolocation;

// Mock API service
jest.mock('../../lib/api/APIService', () => ({
  location: {
    searchLocations: jest.fn().mockResolvedValue({ 
      status: 200, 
      data: [
        {
          id: 'job1',
          name: 'Emirates Group',
          type: 'job',
          coordinates: [55.3708, 25.2548],
          address: 'Dubai International Airport, Dubai, UAE',
          description: 'Multiple job openings in aviation and hospitality',
          distance: 5.2
        },
        {
          id: 'edu1',
          name: 'United Arab Emirates University',
          type: 'education',
          coordinates: [55.4708, 25.1548],
          address: 'Al Ain, UAE',
          description: 'Higher education programs and scholarships',
          distance: 12.7
        }
      ]
    })
  }
}));

// Helper function to render components with required providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <APIProvider>
        {component}
      </APIProvider>
    </BrowserRouter>
  );
};

describe('Location Search Component', () => {
  beforeEach(() => {
    // Create a mock for HTMLDivElement.prototype.getBoundingClientRect
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      bottom: 600,
      right: 800
    }));
  });

  test('renders location search component correctly', () => {
    renderWithProviders(<LocationSearchComponent />);
    
    expect(screen.getByText(/Location Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Find job opportunities, educational institutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Map View/i)).toBeInTheDocument();
    expect(screen.getByText(/Search Radius/i)).toBeInTheDocument();
  });
  
  test('displays location filters', () => {
    renderWithProviders(<LocationSearchComponent />);
    
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Educational Institutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Training Centers/i)).toBeInTheDocument();
    expect(screen.getByText(/Assessment Centers/i)).toBeInTheDocument();
  });
  
  test('handles location type filtering', async () => {
    const mockAPI = require('../../lib/api/APIService');
    renderWithProviders(<LocationSearchComponent />);
    
    // Click on Jobs filter
    fireEvent.click(screen.getByText(/Jobs/i));
    
    await waitFor(() => {
      expect(mockAPI.location.searchLocations).toHaveBeenCalled();
    });
    
    // Click on Educational Institutions filter
    fireEvent.click(screen.getByText(/Educational Institutions/i));
    
    await waitFor(() => {
      expect(mockAPI.location.searchLocations).toHaveBeenCalledTimes(2);
    });
  });
  
  test('displays search results', async () => {
    renderWithProviders(<LocationSearchComponent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Nearby Locations/i)).toBeInTheDocument();
      expect(screen.getByText(/Emirates Group/i)).toBeInTheDocument();
      expect(screen.getByText(/United Arab Emirates University/i)).toBeInTheDocument();
      expect(screen.getByText(/5.2 km away/i)).toBeInTheDocument();
    });
  });
  
  test('handles radius adjustment', async () => {
    const mockAPI = require('../../lib/api/APIService');
    renderWithProviders(<LocationSearchComponent />);
    
    const radiusSlider = screen.getByRole('slider');
    fireEvent.change(radiusSlider, { target: { value: 20 } });
    
    await waitFor(() => {
      expect(screen.getByText(/Search Radius: 20 km/i)).toBeInTheDocument();
      expect(mockAPI.location.searchLocations).toHaveBeenCalledTimes(2);
    });
  });
  
  test('selects location and shows details', async () => {
    renderWithProviders(<LocationSearchComponent />);
    
    await waitFor(() => {
      expect(screen.getByText(/Emirates Group/i)).toBeInTheDocument();
    });
    
    // Click on a location
    fireEvent.click(screen.getByText(/Emirates Group/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Location Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Dubai International Airport, Dubai, UAE/i)).toBeInTheDocument();
      expect(screen.getByText(/Multiple job openings in aviation and hospitality/i)).toBeInTheDocument();
      expect(screen.getByText(/View Job Openings/i)).toBeInTheDocument();
    });
  });
});
