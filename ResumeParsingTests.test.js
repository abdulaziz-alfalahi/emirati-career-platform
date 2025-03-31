import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '../../lib/api/APIContext';
import ResumeParsingComponent from '../../components/resume/ResumeParsingComponent';

// Mock API service
jest.mock('../../lib/api/APIService', () => ({
  resume: {
    parseResume: jest.fn().mockResolvedValue({ 
      status: 200, 
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971 50 123 4567',
        education: [
          {
            institution: 'United Arab Emirates University',
            degree: 'Bachelor of Science in Computer Science',
            startDate: '2015-09-01',
            endDate: '2019-06-30'
          }
        ],
        workExperience: [
          {
            company: 'Dubai Future Foundation',
            position: 'Software Developer',
            startDate: '2019-08-01',
            endDate: null,
            description: 'Developing innovative solutions for government initiatives'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python']
      }
    }),
    saveResume: jest.fn().mockResolvedValue({ status: 200 })
  }
}));

// Mock file upload
global.URL.createObjectURL = jest.fn(() => 'https://example.com/mock-file-url');

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

describe('Resume Parsing Component', () => {
  test('renders resume upload area correctly', () => {
    renderWithProviders(<ResumeParsingComponent />);
    
    expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop your resume file here/i)).toBeInTheDocument();
    expect(screen.getByText(/Supported formats: PDF, DOCX, DOC, RTF, TXT/i)).toBeInTheDocument();
  });
  
  test('handles file upload', async () => {
    renderWithProviders(<ResumeParsingComponent />);
    
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload Resume/i);
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    await waitFor(() => {
      expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
    });
  });
  
  test('parses resume and displays results', async () => {
    const mockAPI = require('../../lib/api/APIService');
    renderWithProviders(<ResumeParsingComponent />);
    
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload Resume/i);
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    const parseButton = screen.getByRole('button', { name: /Parse Resume/i });
    fireEvent.click(parseButton);
    
    await waitFor(() => {
      expect(mockAPI.resume.parseResume).toHaveBeenCalled();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/United Arab Emirates University/i)).toBeInTheDocument();
      expect(screen.getByText(/Dubai Future Foundation/i)).toBeInTheDocument();
      expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
    });
  });
  
  test('saves parsed resume', async () => {
    const mockAPI = require('../../lib/api/APIService');
    renderWithProviders(<ResumeParsingComponent />);
    
    // Mock the parsing process
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload Resume/i);
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    const parseButton = screen.getByRole('button', { name: /Parse Resume/i });
    fireEvent.click(parseButton);
    
    await waitFor(() => {
      expect(mockAPI.resume.parseResume).toHaveBeenCalled();
    });
    
    // Now test saving
    const saveButton = screen.getByRole('button', { name: /Save to Profile/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockAPI.resume.saveResume).toHaveBeenCalled();
      expect(screen.getByText(/Resume saved successfully/i)).toBeInTheDocument();
    });
  });
  
  test('handles parsing errors', async () => {
    const mockAPI = require('../../lib/api/APIService');
    mockAPI.resume.parseResume.mockRejectedValueOnce({ 
      status: 400, 
      message: 'Failed to parse resume' 
    });
    
    renderWithProviders(<ResumeParsingComponent />);
    
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload Resume/i);
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    const parseButton = screen.getByRole('button', { name: /Parse Resume/i });
    fireEvent.click(parseButton);
    
    await waitFor(() => {
      expect(mockAPI.resume.parseResume).toHaveBeenCalled();
      expect(screen.getByText(/Error parsing resume/i)).toBeInTheDocument();
    });
  });
});
