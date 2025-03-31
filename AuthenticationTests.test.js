import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '../../lib/api/APIContext';
import SignInForm from '../../components/auth/SignInForm';
import SignUpForm from '../../components/auth/SignUpForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

// Mock API service
jest.mock('../../lib/api/APIService', () => ({
  auth: {
    signIn: jest.fn().mockResolvedValue({ status: 200, data: { user: { id: '123' } } }),
    signUp: jest.fn().mockResolvedValue({ status: 200, data: { user: { id: '123' } } }),
    resetPassword: jest.fn().mockResolvedValue({ status: 200 })
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

describe('Authentication Components', () => {
  describe('SignInForm', () => {
    test('renders sign in form correctly', () => {
      renderWithProviders(<SignInForm />);
      
      expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });
    
    test('validates required fields', async () => {
      renderWithProviders(<SignInForm />);
      
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      });
    });
    
    test('submits form with valid data', async () => {
      const mockAPI = require('../../lib/api/APIService');
      renderWithProviders(<SignInForm />);
      
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' }
      });
      
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      
      await waitFor(() => {
        expect(mockAPI.auth.signIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });
  
  describe('SignUpForm', () => {
    test('renders sign up form correctly', () => {
      renderWithProviders(<SignUpForm />);
      
      expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });
    
    test('validates required fields', async () => {
      renderWithProviders(<SignUpForm />);
      
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      });
    });
    
    test('validates password match', async () => {
      renderWithProviders(<SignUpForm />);
      
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'Test User' }
      });
      
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' }
      });
      
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
        target: { value: 'password456' }
      });
      
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      });
    });
    
    test('submits form with valid data', async () => {
      const mockAPI = require('../../lib/api/APIService');
      renderWithProviders(<SignUpForm />);
      
      fireEvent.change(screen.getByLabelText(/Full Name/i), {
        target: { value: 'Test User' }
      });
      
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: 'password123' }
      });
      
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
        target: { value: 'password123' }
      });
      
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(() => {
        expect(mockAPI.auth.signUp).toHaveBeenCalledWith(
          'test@example.com', 
          'password123',
          expect.objectContaining({ name: 'Test User' })
        );
      });
    });
  });
  
  describe('ForgotPasswordForm', () => {
    test('renders forgot password form correctly', () => {
      renderWithProviders(<ForgotPasswordForm />);
      
      expect(screen.getByText(/Reset your password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send Reset Link/i })).toBeInTheDocument();
    });
    
    test('validates required fields', async () => {
      renderWithProviders(<ForgotPasswordForm />);
      
      fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      });
    });
    
    test('submits form with valid data', async () => {
      const mockAPI = require('../../lib/api/APIService');
      renderWithProviders(<ForgotPasswordForm />);
      
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));
      
      await waitFor(() => {
        expect(mockAPI.auth.resetPassword).toHaveBeenCalledWith('test@example.com');
      });
    });
  });
});
