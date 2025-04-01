import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  CareerAdviceComponent,
  ResumeParserComponent,
  JobLocationSearchComponent,
  CommuteCalculatorComponent,
  SkillsGapAnalysisComponent,
  InterviewPrepComponent
} from './APIIntegrationComponents';

// Mock the API services
jest.mock('./openai_integration', () => ({
  __esModule: true,
  default: {
    getCareerAdvice: jest.fn(),
    analyzeSkillsGap: jest.fn(),
    prepareForInterview: jest.fn(),
    improveResume: jest.fn()
  }
}));

jest.mock('./affinda_integration', () => ({
  __esModule: true,
  default: {
    parseResume: jest.fn(),
    extractSkills: jest.fn(),
    matchJobs: jest.fn(),
    storeResumeData: jest.fn()
  }
}));

jest.mock('./mapbox_integration', () => ({
  __esModule: true,
  default: {
    geocodeAddress: jest.fn(),
    getDirections: jest.fn(),
    analyzeCommute: jest.fn(),
    findNearbyJobs: jest.fn()
  }
}));

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: {
          session: {
            user: {
              id: 'test-user-id'
            }
          }
        }
      })
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: {
          id: 'test-id',
          title: 'Test Job',
          company: 'Test Company'
        },
        error: null
      })
    })
  }))
}));

// Import the services for mocking
import OpenAIService from './openai_integration';
import AffindaService from './affinda_integration';
import MapboxService from './mapbox_integration';

describe('API Integration Components', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('CareerAdviceComponent', () => {
    test('renders career advice form', () => {
      render(<CareerAdviceComponent />);
      expect(screen.getByText('Personalized Career Advice')).toBeInTheDocument();
      expect(screen.getByLabelText('Current Role')).toBeInTheDocument();
      expect(screen.getByLabelText('Career Goals')).toBeInTheDocument();
      expect(screen.getByText('Get Career Advice')).toBeInTheDocument();
    });

    test('submits form and displays advice', async () => {
      // Mock the OpenAI service response
      (OpenAIService.getCareerAdvice as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          advice: 'Test advice',
          nextSteps: ['Step 1', 'Step 2'],
          resources: [
            { title: 'Resource 1', url: 'https://example.com', description: 'Description 1' }
          ]
        }
      });

      render(<CareerAdviceComponent />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText('Current Role'), { target: { value: 'Software Developer' } });
      fireEvent.change(screen.getByLabelText('Career Goals'), { target: { value: 'Become a manager' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Get Career Advice'));
      
      // Wait for the results to be displayed
      await waitFor(() => {
        expect(screen.getByText('Your Personalized Career Advice')).toBeInTheDocument();
        expect(screen.getByText('Test advice')).toBeInTheDocument();
        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Resource 1')).toBeInTheDocument();
      });
      
      // Verify the API was called with correct parameters
      expect(OpenAIService.getCareerAdvice).toHaveBeenCalledWith(
        'test-user-id',
        'Become a manager',
        'Software Developer'
      );
    });

    test('handles API errors', async () => {
      // Mock the OpenAI service to return an error
      (OpenAIService.getCareerAdvice as jest.Mock).mockResolvedValue({
        success: false,
        error: 'API error'
      });

      render(<CareerAdviceComponent />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText('Current Role'), { target: { value: 'Software Developer' } });
      fireEvent.change(screen.getByLabelText('Career Goals'), { target: { value: 'Become a manager' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Get Career Advice'));
      
      // Wait for the error message to be displayed
      await waitFor(() => {
        expect(screen.getByText('API error')).toBeInTheDocument();
      });
    });
  });

  describe('JobLocationSearchComponent', () => {
    test('renders job location search form', () => {
      render(<JobLocationSearchComponent />);
      expect(screen.getByText('Find Jobs Near You')).toBeInTheDocument();
      expect(screen.getByLabelText('Your Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Search Radius (km)')).toBeInTheDocument();
      expect(screen.getByText('Find Nearby Jobs')).toBeInTheDocument();
    });

    test('submits form and displays nearby jobs', async () => {
      // Mock the Mapbox service response
      (MapboxService.findNearbyJobs as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          userLocation: {
            name: 'Dubai, UAE',
            coordinates: [55.2708, 25.2048]
          },
          jobs: [
            {
              id: 'job-1',
              title: 'Software Engineer',
              company: 'Tech Co',
              location: 'Dubai Media City',
              distance: {
                value: 5000,
                unit: 'meters'
              },
              coordinates: [55.1708, 25.1048]
            }
          ]
        }
      });

      render(<JobLocationSearchComponent />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText('Your Location'), { target: { value: 'Dubai, UAE' } });
      fireEvent.change(screen.getByLabelText('Search Radius (km)'), { target: { value: '10' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Find Nearby Jobs'));
      
      // Wait for the results to be displayed
      await waitFor(() => {
        expect(screen.getByText('Jobs Near Dubai, UAE')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('Tech Co')).toBeInTheDocument();
        expect(screen.getByText('5.00 km away')).toBeInTheDocument();
      });
      
      // Verify the API was called with correct parameters
      expect(MapboxService.findNearbyJobs).toHaveBeenCalledWith('Dubai, UAE', 10);
    });
  });

  describe('CommuteCalculatorComponent', () => {
    test('renders commute calculator form', () => {
      render(<CommuteCalculatorComponent />);
      expect(screen.getByText('Commute Calculator')).toBeInTheDocument();
      expect(screen.getByLabelText('Home Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Work Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Transportation Mode')).toBeInTheDocument();
      expect(screen.getByText('Calculate Commute')).toBeInTheDocument();
    });

    test('submits form and displays commute analysis', async () => {
      // Mock the Mapbox service response
      (MapboxService.analyzeCommute as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          origin: {
            name: 'Downtown Dubai',
            coordinates: [55.2708, 25.2048]
          },
          destination: {
            name: 'Dubai Media City',
            coordinates: [55.1708, 25.1048]
          },
          distance: {
            value: 15000,
            unit: 'meters'
          },
          duration: {
            value: 1200,
            unit: 'seconds'
          },
          route: {
            coordinates: [[55.2708, 25.2048], [55.1708, 25.1048]],
            type: 'LineString'
          }
        }
      });

      render(<CommuteCalculatorComponent />);
      
      // Fill out the form
      fireEvent.change(screen.getByLabelText('Home Location'), { target: { value: 'Downtown Dubai' } });
      fireEvent.change(screen.getByLabelText('Work Location'), { target: { value: 'Dubai Media City' } });
      fireEvent.change(screen.getByLabelText('Transportation Mode'), { target: { value: 'driving' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Calculate Commute'));
      
      // Wait for the results to be displayed
      await waitFor(() => {
        expect(screen.getByText('Commute Analysis')).toBeInTheDocument();
        expect(screen.getByText('Downtown Dubai')).toBeInTheDocument();
        expect(screen.getByText('Dubai Media City')).toBeInTheDocument();
        expect(screen.getByText('15.00 km')).toBeInTheDocument();
        expect(screen.getByText('20 minutes')).toBeInTheDocument();
      });
      
      // Verify the API was called with correct parameters
      expect(MapboxService.analyzeCommute).toHaveBeenCalledWith(
        'Downtown Dubai',
        'Dubai Media City',
        'driving'
      );
    });
  });

  // Additional tests for other components would follow the same pattern
});
