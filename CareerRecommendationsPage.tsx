import React from 'react';
import { useNavigate } from 'react-router-dom';
import CareerRecommendationsComponent from '../components/career/CareerRecommendationsComponent';
import '../../styles/theme.css';

// Mock resume data for demonstration
const mockResumeData = {
  name: 'Mohammed Al Mansoori',
  skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git'],
  education: [
    {
      institution: 'United Arab Emirates University',
      degree: 'Bachelor of Science in Computer Science',
      date: '2018 - 2022'
    }
  ],
  workExperience: [
    {
      company: 'Dubai Future Foundation',
      position: 'Junior Developer',
      date: '2022 - Present',
      description: 'Developing web applications using React and Node.js'
    },
    {
      company: 'Etisalat',
      position: 'Intern',
      date: 'Summer 2021',
      description: 'Assisted in developing mobile applications'
    }
  ]
};

const CareerRecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-green-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
      </div>
      
      <CareerRecommendationsComponent resumeData={mockResumeData} />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Career Development Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Training Programs</h3>
            <p className="text-gray-700 mb-3">Enhance your skills with specialized training programs tailored to your career path.</p>
            <button className="btn-primary text-sm">Browse Programs</button>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Mentorship</h3>
            <p className="text-gray-700 mb-3">Connect with industry professionals who can guide you in your career journey.</p>
            <button className="btn-primary text-sm">Find Mentors</button>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Skill Assessments</h3>
            <p className="text-gray-700 mb-3">Take assessments to identify your strengths and areas for improvement.</p>
            <button className="btn-primary text-sm">Start Assessment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationsPage;
