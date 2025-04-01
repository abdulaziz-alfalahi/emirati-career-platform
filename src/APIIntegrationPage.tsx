import React from 'react';
import { 
  CareerAdviceComponent,
  ResumeParserComponent,
  JobLocationSearchComponent,
  CommuteCalculatorComponent,
  SkillsGapAnalysisComponent,
  InterviewPrepComponent
} from './APIIntegrationComponents';
import './APIIntegrationComponents.css';

const APIIntegrationPage: React.FC = () => {
  return (
    <div className="api-integration-page">
      <header className="page-header">
        <h1>Emirati Career Platform - Enhanced Features</h1>
        <p>Powered by AI and Location Services</p>
      </header>

      <div className="features-container">
        <div className="feature-section">
          <h2 className="section-title">Career Development</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Career Advice</h3>
              <p>Get personalized career guidance based on your profile and goals</p>
              <CareerAdviceComponent />
            </div>
            
            <div className="feature-card">
              <h3>Skills Gap Analysis</h3>
              <p>Identify missing skills for your target jobs</p>
              <SkillsGapAnalysisComponent />
            </div>
            
            <div className="feature-card">
              <h3>Interview Preparation</h3>
              <p>Prepare for interviews with AI-generated questions and answers</p>
              <InterviewPrepComponent />
            </div>
          </div>
        </div>
        
        <div className="feature-section">
          <h2 className="section-title">Resume & Profile</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Resume Parser</h3>
              <p>Extract skills and experience from your resume</p>
              <ResumeParserComponent />
            </div>
          </div>
        </div>
        
        <div className="feature-section">
          <h2 className="section-title">Location Services</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Job Location Search</h3>
              <p>Find jobs near your location</p>
              <JobLocationSearchComponent />
            </div>
            
            <div className="feature-card">
              <h3>Commute Calculator</h3>
              <p>Calculate commute times between home and work</p>
              <CommuteCalculatorComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrationPage;
