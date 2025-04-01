import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Mapbox API configuration
const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';
const MAPBOX_API_URL = 'https://api.mapbox.com';

// Response type definitions
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface GeocodingResponse {
  query: string;
  features: {
    id: string;
    place_name: string;
    center: [number, number]; // [longitude, latitude]
    place_type: string[];
    relevance: number;
    properties: {
      [key: string]: any;
    };
  }[];
}

interface DirectionsResponse {
  routes: {
    distance: number; // in meters
    duration: number; // in seconds
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }[];
}

interface CommuteAnalysisResponse {
  origin: {
    name: string;
    coordinates: [number, number];
  };
  destination: {
    name: string;
    coordinates: [number, number];
  };
  distance: {
    value: number;
    unit: string;
  };
  duration: {
    value: number;
    unit: string;
  };
  route: {
    coordinates: [number, number][];
    type: string;
  };
}

interface NearbyJobsResponse {
  userLocation: {
    name: string;
    coordinates: [number, number];
  };
  jobs: {
    id: string;
    title: string;
    company: string;
    location: string;
    distance: {
      value: number;
      unit: string;
    };
    coordinates: [number, number];
  }[];
}

/**
 * Mapbox Service for the Emirati Career Platform
 * Provides location-based services including geocoding, directions, commute analysis, and nearby job search
 */
class MapboxService {
  /**
   * Call Mapbox API with proper authentication
   */
  private async callMapbox(endpoint: string, params: any = {}): Promise<APIResponse<any>> {
    try {
      // Add access token to params
      const queryParams = {
        ...params,
        access_token: MAPBOX_ACCESS_TOKEN
      };

      // Build query string
      const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

      const response = await axios.get(`${MAPBOX_API_URL}${endpoint}?${queryString}`);

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error('Mapbox API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get response from Mapbox'
      };
    }
  }

  /**
   * Geocode an address to get coordinates
   * @param address Address or place name to geocode
   * @param limit Maximum number of results to return
   */
  async geocodeAddress(address: string, limit: number = 5): Promise<APIResponse<GeocodingResponse>> {
    try {
      // URL encode the address
      const encodedAddress = encodeURIComponent(address);
      
      // Call Mapbox Geocoding API
      const response = await this.callMapbox(`/geocoding/v5/mapbox.places/${encodedAddress}.json`, {
        limit,
        types: 'address,place,locality,neighborhood,region',
        country: 'ae', // Limit to UAE by default
        language: 'en'
      });

      if (!response.success) {
        return {
          success: false,
          error: response.error
        };
      }

      return {
        success: true,
        data: response.data as GeocodingResponse
      };
    } catch (error: any) {
      console.error('Error geocoding address:', error);
      return {
        success: false,
        error: error.message || 'Failed to geocode address'
      };
    }
  }

  /**
   * Get directions between two locations
   * @param origin Starting location (coordinates or address)
   * @param destination Ending location (coordinates or address)
   * @param mode Transportation mode (driving, walking, cycling)
   */
  async getDirections(
    origin: string | [number, number],
    destination: string | [number, number],
    mode: 'driving' | 'walking' | 'cycling' = 'driving'
  ): Promise<APIResponse<DirectionsResponse>> {
    try {
      // Convert addresses to coordinates if needed
      const originCoords = await this.getCoordinates(origin);
      const destinationCoords = await this.getCoordinates(destination);

      if (!originCoords || !destinationCoords) {
        throw new Error('Failed to geocode one or both locations');
      }

      // Format coordinates for Mapbox API
      const originStr = `${originCoords[0]},${originCoords[1]}`;
      const destinationStr = `${destinationCoords[0]},${destinationCoords[1]}`;

      // Call Mapbox Directions API
      const response = await this.callMapbox(`/directions/v5/mapbox/${mode}/${originStr};${destinationStr}`, {
        geometries: 'geojson',
        overview: 'full',
        steps: true,
        alternatives: false
      });

      if (!response.success) {
        return {
          success: false,
          error: response.error
        };
      }

      return {
        success: true,
        data: response.data as DirectionsResponse
      };
    } catch (error: any) {
      console.error('Error getting directions:', error);
      return {
        success: false,
        error: error.message || 'Failed to get directions'
      };
    }
  }

  /**
   * Analyze commute between home and work locations
   * @param homeLocation Home location (coordinates or address)
   * @param workLocation Work location (coordinates or address)
   * @param mode Transportation mode (driving, walking, cycling)
   */
  async analyzeCommute(
    homeLocation: string | [number, number],
    workLocation: string | [number, number],
    mode: 'driving' | 'walking' | 'cycling' = 'driving'
  ): Promise<APIResponse<CommuteAnalysisResponse>> {
    try {
      // Get directions between locations
      const directionsResponse = await this.getDirections(homeLocation, workLocation, mode);

      if (!directionsResponse.success) {
        throw new Error(directionsResponse.error);
      }

      // Get location names if coordinates were provided
      const homeLocationName = typeof homeLocation === 'string' 
        ? homeLocation 
        : await this.getLocationName(homeLocation);
      
      const workLocationName = typeof workLocation === 'string' 
        ? workLocation 
        : await this.getLocationName(workLocation);

      // Get coordinates if addresses were provided
      const homeCoords = typeof homeLocation === 'string' 
        ? await this.getCoordinates(homeLocation) 
        : homeLocation;
      
      const workCoords = typeof workLocation === 'string' 
        ? await this.getCoordinates(workLocation) 
        : workLocation;

      if (!homeCoords || !workCoords) {
        throw new Error('Failed to geocode one or both locations');
      }

      // Extract route information
      const route = directionsResponse.data.routes[0];
      
      // Format response
      const response: CommuteAnalysisResponse = {
        origin: {
          name: homeLocationName || 'Home',
          coordinates: homeCoords
        },
        destination: {
          name: workLocationName || 'Work',
          coordinates: workCoords
        },
        distance: {
          value: route.distance,
          unit: 'meters'
        },
        duration: {
          value: route.duration,
          unit: 'seconds'
        },
        route: route.geometry
      };

      return {
        success: true,
        data: response
      };
    } catch (error: any) {
      console.error('Error analyzing commute:', error);
      return {
        success: false,
        error: error.message || 'Failed to analyze commute'
      };
    }
  }

  /**
   * Find jobs near a location
   * @param location User's location (coordinates or address)
   * @param radius Search radius in kilometers
   * @param limit Maximum number of jobs to return
   */
  async findNearbyJobs(
    location: string | [number, number],
    radius: number = 10,
    limit: number = 20
  ): Promise<APIResponse<NearbyJobsResponse>> {
    try {
      // Get coordinates if address was provided
      const coordinates = typeof location === 'string' 
        ? await this.getCoordinates(location) 
        : location;

      if (!coordinates) {
        throw new Error('Failed to geocode location');
      }

      // Get location name if coordinates were provided
      const locationName = typeof location === 'string' 
        ? location 
        : await this.getLocationName(coordinates);

      // Convert radius to meters
      const radiusInMeters = radius * 1000;

      // Get all active jobs from Supabase
      const { data: jobs, error } = await supabase
        .from('job_postings')
        .select('id, title, company, location')
        .eq('status', 'active');
        
      if (error) throw new Error(error.message);

      // For each job, geocode its location and calculate distance
      const jobsWithDistance = await Promise.all(jobs.map(async (job: any) => {
        try {
          // Geocode job location
          const jobCoords = await this.getCoordinates(job.location);
          
          if (!jobCoords) {
            return null; // Skip jobs that can't be geocoded
          }
          
          // Calculate distance between user and job
          const distance = this.calculateDistance(coordinates, jobCoords);
          
          // Only include jobs within the radius
          if (distance <= radiusInMeters) {
            return {
              id: job.id,
              title: job.title,
              company: job.company,
              location: job.location,
              distance: {
                value: distance,
                unit: 'meters'
              },
              coordinates: jobCoords
            };
          }
          
          return null;
        } catch (error) {
          console.error(`Error processing job ${job.id}:`, error);
          return null;
        }
      }));

      // Filter out null values and sort by distance
      const validJobs = jobsWithDistance
        .filter(job => job !== null) as any[];
      
      validJobs.sort((a, b) => a.distance.value - b.distance.value);
      
      // Limit results
      const limitedJobs = validJobs.slice(0, limit);
      
      return {
        success: true,
        data: {
          userLocation: {
            name: locationName || 'Your Location',
            coordinates
          },
          jobs: limitedJobs
        }
      };
    } catch (error: any) {
      console.error('Error finding nearby jobs:', error);
      return {
        success: false,
        error: error.message || 'Failed to find nearby jobs'
      };
    }
  }

  /**
   * Helper method to get coordinates from an address
   * @param location Address or coordinates
   * @returns Coordinates as [longitude, latitude]
   */
  private async getCoordinates(location: string | [number, number]): Promise<[number, number] | null> {
    if (Array.isArray(location)) {
      return location;
    }

    try {
      const geocodeResponse = await this.geocodeAddress(location, 1);
      
      if (!geocodeResponse.success || geocodeResponse.data.features.length === 0) {
        return null;
      }
      
      return geocodeResponse.data.features[0].center;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  }

  /**
   * Helper method to get location name from coordinates
   * @param coordinates Coordinates as [longitude, latitude]
   * @returns Location name
   */
  private async getLocationName(coordinates: [number, number]): Promise<string> {
    try {
      // Call Mapbox Reverse Geocoding API
      const response = await this.callMapbox(`/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`, {
        types: 'address,place,locality,neighborhood',
        language: 'en'
      });

      if (!response.success || response.data.features.length === 0) {
        return 'Unknown Location';
      }
      
      return response.data.features[0].place_name;
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Unknown Location';
    }
  }

  /**
   * Calculate distance between two coordinates using the Haversine formula
   * @param coords1 First coordinates as [longitude, latitude]
   * @param coords2 Second coordinates as [longitude, latitude]
   * @returns Distance in meters
   */
  private calculateDistance(coords1: [number, number], coords2: [number, number]): number {
    const [lon1, lat1] = coords1;
    const [lon2, lat2] = coords2;
    
    const R = 6371e3; // Earth's radius in meters
    const φ1 = this.toRadians(lat1);
    const φ2 = this.toRadians(lat2);
    const Δφ = this.toRadians(lat2 - lat1);
    const Δλ = this.toRadians(lon2 - lon1);

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}

export default new MapboxService();
