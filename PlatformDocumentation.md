# Emirati Career Journey Platform Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Platform Overview](#platform-overview)
3. [Getting Started](#getting-started)
4. [User Guides by Persona](#user-guides-by-persona)
5. [API Integrations](#api-integrations)
6. [Administrator Guide](#administrator-guide)
7. [Technical Documentation](#technical-documentation)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)
10. [Support and Contact](#support-and-contact)

## Introduction

The Emirati Career Journey Platform is a comprehensive career development ecosystem designed specifically for Emirati citizens. This platform connects various stakeholders in the career development process, including students, jobseekers, educational institutions, employers, government entities, and career advisors.

### Purpose

The platform aims to:
- Provide personalized career guidance and development opportunities
- Connect job seekers with relevant employment opportunities
- Enable educational institutions to showcase their programs
- Allow employers to find qualified Emirati talent
- Support government initiatives for Emiratization
- Facilitate mentorship and career advisory services

### Target Audience

The platform serves 23 different user personas, including:
- School Students
- University Students
- National Service Participants
- Employees (Full-time, Part-time)
- Gig Workers
- Jobseekers
- Entrepreneurs
- Retirees
- Educational Institution Representatives
- Parents
- Recruiters
- Government Representatives
- Retiree Advocates
- Training/Assessment Center Representatives
- Mentors/Coaches
- Career Advisors
- Platform Operators/Admins/Super Users

## Platform Overview

### Key Features

1. **Personalized Dashboards**: 16 different dashboards tailored to specific user personas
2. **Resume Building and Parsing**: AI-powered resume creation and analysis
3. **Career Recommendations**: Personalized career path suggestions based on skills and interests
4. **Skills Taxonomy**: Comprehensive skills framework with gap analysis
5. **Location-Based Services**: Find nearby opportunities using Mapbox integration
6. **Video Conferencing**: Conduct online interviews and mentoring sessions
7. **LinkedIn Integration**: Import professional profile data
8. **Job Matching**: AI-powered job recommendations
9. **Educational Resources**: Access to courses, scholarships, and training programs
10. **Mentorship Connections**: Connect with mentors and career advisors

### Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Email/password (with future UAEPass integration)
- **API Integrations**: Affinda (resume parsing), OpenAI (career recommendations), LinkedIn, Mapbox
- **Build Tools**: Vite, Webpack
- **Testing**: Jest, React Testing Library
- **Performance Optimization**: Code splitting, lazy loading, compression

## Getting Started

### System Requirements

- **Browser**: Latest versions of Chrome, Firefox, Safari, or Edge
- **Internet Connection**: Broadband connection (minimum 1 Mbps)
- **Devices**: Desktop, laptop, tablet, or mobile phone
- **Operating System**: Any modern OS (Windows, macOS, Linux, iOS, Android)

### Registration Process

1. Visit the platform website
2. Click on "Sign Up" button
3. Enter your email address and create a password
4. Complete your profile information
5. Select your primary user persona
6. Verify your email address
7. Access your personalized dashboard

### Navigation Overview

The platform features a consistent navigation structure:
- **Top Navigation Bar**: User profile, notifications, settings
- **Side Navigation**: Dashboard-specific menu items
- **Main Content Area**: Dashboard content and features
- **Footer**: Links to help, terms of service, privacy policy

## User Guides by Persona

### School Student Guide

#### Dashboard Overview
The School Student dashboard provides tools and resources for early career exploration and academic planning.

#### Key Features
- **Academic Performance Tracking**: Monitor grades and progress
- **Career Exploration**: Discover potential career paths based on interests
- **Summer Camps & Workshops**: Find and register for educational programs
- **Mentorship Connections**: Connect with mentors for guidance
- **Skill Development**: Identify and develop key skills for future careers

#### How to Use
1. **Track Academic Progress**:
   - View your current grades and performance metrics
   - Set academic goals and track progress
   - Receive recommendations for improvement

2. **Explore Career Options**:
   - Take career interest assessments
   - Browse career profiles and requirements
   - Watch videos from professionals in different fields

3. **Find Summer Camps & Workshops**:
   - Search for programs by interest area
   - View program details and requirements
   - Register for programs directly through the platform

4. **Connect with Mentors**:
   - Browse available mentors by field of expertise
   - Request mentorship connections
   - Schedule and conduct virtual mentoring sessions

5. **Develop Skills**:
   - Take skill assessments to identify strengths and gaps
   - Access learning resources for skill development
   - Track skill progress over time

### University Student Guide

#### Dashboard Overview
The University Student dashboard focuses on academic success, internship opportunities, and transition to employment.

#### Key Features
- **Academic Program Management**: Track degree progress
- **Internship Opportunities**: Find and apply for internships
- **Part-time Job Listings**: Access student-friendly employment
- **Scholarship Information**: Discover funding opportunities
- **Career Planning**: Develop post-graduation career plans

#### How to Use
1. **Manage Academic Program**:
   - Track course requirements and completion
   - Plan course schedules by semester
   - Monitor GPA and academic standing

2. **Find Internships**:
   - Search for internships by field, location, and duration
   - View internship requirements and application deadlines
   - Submit applications through the platform

3. **Access Part-time Jobs**:
   - Browse student-friendly employment opportunities
   - Filter jobs by schedule, location, and pay rate
   - Apply directly through the platform

4. **Discover Scholarships**:
   - Search for scholarships by eligibility criteria
   - View application requirements and deadlines
   - Track application status

5. **Plan Your Career**:
   - Create a career development timeline
   - Set career goals and milestones
   - Access resources for professional development

### Jobseeker Guide

#### Dashboard Overview
The Jobseeker dashboard provides comprehensive tools for finding employment, developing skills, and managing job applications.

#### Key Features
- **Resume Builder**: Create and manage professional resumes
- **Job Recommendations**: Receive personalized job matches
- **Application Tracking**: Monitor application status
- **Skill Gap Analysis**: Identify skills to develop
- **Interview Preparation**: Resources and practice tools

#### How to Use
1. **Build Your Resume**:
   - Create a new resume or import existing one
   - Customize resume sections and content
   - Generate multiple versions for different job types
   - Export in various formats (PDF, DOCX)

2. **Find Job Opportunities**:
   - View personalized job recommendations
   - Search for jobs by title, company, location
   - Filter results by salary, job type, experience level
   - Save favorite job listings

3. **Track Applications**:
   - Submit applications through the platform
   - Monitor application status in real-time
   - Receive notifications for application updates
   - Schedule interviews directly through the platform

4. **Analyze Skill Gaps**:
   - View skills required for target positions
   - Compare your skills to job requirements
   - Receive recommendations for skill development
   - Track skill acquisition progress

5. **Prepare for Interviews**:
   - Access interview preparation resources
   - Practice with virtual interview simulations
   - Schedule mock interviews with career advisors
   - Participate in video interviews through the platform

### Recruiter Guide

#### Dashboard Overview
The Recruiter dashboard enables efficient candidate sourcing, screening, and hiring processes.

#### Key Features
- **Job Posting Management**: Create and manage job listings
- **Candidate Search**: Find qualified Emirati candidates
- **Application Review**: Screen and evaluate applicants
- **Interview Scheduling**: Coordinate and conduct interviews
- **Hiring Analytics**: Track recruitment metrics

#### How to Use
1. **Manage Job Postings**:
   - Create new job listings with detailed requirements
   - Edit and update existing job postings
   - Set application deadlines and visibility options
   - Promote featured positions

2. **Search for Candidates**:
   - Browse candidate profiles by skills, experience, education
   - Use advanced filters for precise candidate matching
   - Save candidate searches for future reference
   - Create talent pools for specific roles

3. **Review Applications**:
   - View all applications in a centralized dashboard
   - Screen candidates based on qualifications
   - Rate and comment on applications
   - Move candidates through custom hiring workflows

4. **Schedule Interviews**:
   - Send interview invitations to selected candidates
   - Coordinate interview times and formats
   - Conduct video interviews directly through the platform
   - Collect feedback from interview panel members

5. **Track Recruitment Metrics**:
   - Monitor key recruitment KPIs
   - View time-to-fill and cost-per-hire metrics
   - Analyze candidate source effectiveness
   - Generate recruitment reports

### Platform Administrator Guide

#### Dashboard Overview
The Platform Administrator dashboard provides tools for managing the entire platform, users, and system settings.

#### Key Features
- **User Management**: Administer all platform users
- **Role Assignment**: Manage user roles and permissions
- **System Configuration**: Control platform settings
- **API Integration Management**: Configure external services
- **Analytics Dashboard**: Monitor platform usage

#### How to Use
1. **Manage Users**:
   - View all registered users
   - Create, edit, or deactivate user accounts
   - Reset passwords and manage account recovery
   - Handle user support requests

2. **Assign Roles**:
   - Set user roles and permissions
   - Create custom role configurations
   - Manage role hierarchies and inheritance
   - Audit role assignments

3. **Configure System Settings**:
   - Manage global platform settings
   - Customize branding and appearance
   - Configure notification preferences
   - Set security parameters

4. **Manage API Integrations**:
   - Configure API keys for external services
   - Monitor API usage and quotas
   - Troubleshoot integration issues
   - Update integration settings

5. **Analyze Platform Usage**:
   - View real-time usage statistics
   - Monitor user engagement metrics
   - Track feature utilization
   - Generate custom reports

## API Integrations

### Affinda Resume Parser

#### Overview
The Affinda integration enables automatic parsing and analysis of resume documents, extracting structured data from various resume formats.

#### Configuration
- **API Key**: Stored securely in the platform's API management system
- **Endpoints**: Resume parsing, data extraction
- **Supported Formats**: PDF, DOCX, DOC, RTF, TXT

#### Usage
1. **Resume Upload**:
   - Users upload resume documents through the platform interface
   - Files are securely transmitted to Affinda's API
   - Parsed data is returned in structured format

2. **Data Extraction**:
   - Personal information (name, contact details)
   - Work experience (companies, positions, dates, responsibilities)
   - Education (institutions, degrees, dates)
   - Skills and certifications
   - Languages and proficiency levels

3. **Data Utilization**:
   - Populate user profiles automatically
   - Generate standardized resume formats
   - Match candidates to job requirements
   - Identify skill gaps and development opportunities

### OpenAI Career Recommendations

#### Overview
The OpenAI integration provides AI-powered career recommendations, skill analysis, and personalized guidance based on user profiles and market trends.

#### Configuration
- **API Key**: Stored securely in the platform's API management system
- **Models**: GPT-4 for text analysis and recommendations
- **Endpoints**: Text completion, embeddings

#### Usage
1. **Career Path Recommendations**:
   - Analyze user skills, education, and experience
   - Generate personalized career path options
   - Provide rationale for each recommendation
   - Suggest steps for career progression

2. **Skill Analysis**:
   - Identify strengths and gaps in user skill sets
   - Recommend skill development priorities
   - Suggest learning resources and training programs
   - Predict skill demand trends in the job market

3. **Job Description Analysis**:
   - Extract key requirements from job descriptions
   - Match user qualifications to job requirements
   - Suggest resume customizations for specific positions
   - Provide interview preparation guidance

### LinkedIn Integration

#### Overview
The LinkedIn integration allows users to import professional profile data, enhancing their platform profiles and enabling better job matching.

#### Configuration
- **API Access**: Platform is prepared for LinkedIn API integration
- **Authentication**: OAuth 2.0 for secure user authorization
- **Data Permissions**: Profile, connections, education, experience

#### Usage
1. **Profile Import**:
   - Connect LinkedIn account to platform
   - Import profile information (education, experience, skills)
   - Synchronize profile updates
   - Maintain data privacy controls

2. **Network Utilization**:
   - Identify potential mentors or advisors
   - Discover mutual connections with employers
   - Find alumni from educational institutions
   - Build professional relationships

3. **Job Opportunity Discovery**:
   - Connect with relevant job postings
   - Discover companies with open positions
   - Leverage network for referrals
   - Track career paths of professionals in target fields

### Mapbox Integration

#### Overview
The Mapbox integration provides location-based services, enabling users to find nearby opportunities, educational institutions, and resources.

#### Configuration
- **API Key**: Stored securely in the platform's API management system
- **Services**: Maps, geocoding, directions
- **Features**: Custom markers, search radius, filtering

#### Usage
1. **Location Search**:
   - Find opportunities within specified radius
   - Filter results by type (jobs, education, training)
   - View detailed location information
   - Get directions to physical locations

2. **Opportunity Mapping**:
   - Visualize job density by location
   - Identify education and training centers
   - Discover industry clusters
   - Plan commute and transportation options

3. **Location-Based Recommendations**:
   - Receive suggestions based on preferred locations
   - Discover remote work opportunities
   - Find relocation possibilities
   - Analyze regional employment trends

## Administrator Guide

### System Architecture

The Emirati Career Journey Platform is built on a modern, scalable architecture:

- **Frontend**: React single-page application (SPA)
- **Backend**: Supabase (PostgreSQL database with RESTful API)
- **Authentication**: Supabase Auth with role-based access control
- **Storage**: Supabase Storage for file management
- **External APIs**: Affinda, OpenAI, LinkedIn, Mapbox
- **Deployment**: Containerized application with CI/CD pipeline

### User Management

#### Creating User Accounts
1. Navigate to Admin Dashboard > User Management
2. Click "Create New 
(Content truncated due to size limit. Use line ranges to read in chunks)