# Emirati Career Journey Platform - Database Schema Design

## Overview
This document outlines the database schema design for the Emirati Career Journey Platform. The platform requires a comprehensive database structure to support 23 different user personas, 16 dashboards, and various integrated services.

## Authentication and User Management

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- Hashed password
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  reset_password_token TEXT,
  reset_password_expires TIMESTAMP WITH TIME ZONE
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  nationality TEXT,
  phone TEXT,
  address TEXT,
  emirate TEXT,
  profile_picture_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User Roles Table
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User-Role Mapping
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);
```

### Permissions Table
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Role-Permission Mapping
```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);
```

## Persona-Specific Tables

### School Students
```sql
CREATE TABLE school_students (
  id UUID PRIMARY KEY REFERENCES users(id),
  school_id UUID REFERENCES educational_institutions(id),
  grade TEXT,
  student_id TEXT,
  parent_id UUID REFERENCES users(id),
  academic_year TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### University Students
```sql
CREATE TABLE university_students (
  id UUID PRIMARY KEY REFERENCES users(id),
  university_id UUID REFERENCES educational_institutions(id),
  major TEXT,
  degree_level TEXT,
  student_id TEXT,
  graduation_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### National Service Participants
```sql
CREATE TABLE national_service_participants (
  id UUID PRIMARY KEY REFERENCES users(id),
  service_start_date DATE,
  service_end_date DATE,
  service_id TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Employees (Full-time, Part-time)
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY REFERENCES users(id),
  employer_id UUID REFERENCES organizations(id),
  position TEXT,
  department TEXT,
  employment_type TEXT, -- 'full-time', 'part-time'
  start_date DATE,
  end_date DATE,
  employee_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Gig Workers
```sql
CREATE TABLE gig_workers (
  id UUID PRIMARY KEY REFERENCES users(id),
  skills TEXT[],
  availability TEXT,
  hourly_rate DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Jobseekers
```sql
CREATE TABLE jobseekers (
  id UUID PRIMARY KEY REFERENCES users(id),
  resume_id UUID REFERENCES resumes(id),
  desired_position TEXT,
  desired_salary DECIMAL(10, 2),
  availability_date DATE,
  job_search_status TEXT,
  home_location GEOGRAPHY(POINT),
  max_commute_distance INTEGER, -- in kilometers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Entrepreneurs/Business Owners
```sql
CREATE TABLE entrepreneurs (
  id UUID PRIMARY KEY REFERENCES users(id),
  business_name TEXT,
  business_type TEXT,
  business_size TEXT,
  industry TEXT,
  founding_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Retirees
```sql
CREATE TABLE retirees (
  id UUID PRIMARY KEY REFERENCES users(id),
  retirement_date DATE,
  previous_occupation TEXT,
  previous_employer TEXT,
  pension_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Educational Institution Representatives
```sql
CREATE TABLE educational_institution_reps (
  id UUID PRIMARY KEY REFERENCES users(id),
  institution_id UUID REFERENCES educational_institutions(id),
  position TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Parents
```sql
CREATE TABLE parents (
  id UUID PRIMARY KEY REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Parent-Child Relationship
```sql
CREATE TABLE parent_children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  child_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);
```

### Private Sector Recruiters
```sql
CREATE TABLE recruiters (
  id UUID PRIMARY KEY REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  position TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Government Representatives
```sql
CREATE TABLE government_reps (
  id UUID PRIMARY KEY REFERENCES users(id),
  department TEXT,
  position TEXT,
  government_entity TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Retiree Advocates
```sql
CREATE TABLE retiree_advocates (
  id UUID PRIMARY KEY REFERENCES users(id),
  organization TEXT,
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Training Center Representatives
```sql
CREATE TABLE training_center_reps (
  id UUID PRIMARY KEY REFERENCES users(id),
  center_id UUID REFERENCES training_centers(id),
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Assessment Center Representatives
```sql
CREATE TABLE assessment_center_reps (
  id UUID PRIMARY KEY REFERENCES users(id),
  center_id UUID REFERENCES assessment_centers(id),
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Mentors/Coaches
```sql
CREATE TABLE mentors (
  id UUID PRIMARY KEY REFERENCES users(id),
  expertise TEXT[],
  experience_years INTEGER,
  bio TEXT,
  availability TEXT,
  hourly_rate DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Career Advisors
```sql
CREATE TABLE career_advisors (
  id UUID PRIMARY KEY REFERENCES users(id),
  specialization TEXT[],
  experience_years INTEGER,
  certification TEXT,
  availability TEXT,
  hourly_rate DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Platform Operators
```sql
CREATE TABLE platform_operators (
  id UUID PRIMARY KEY REFERENCES users(id),
  department TEXT,
  responsibilities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Platform Administrators
```sql
CREATE TABLE platform_admins (
  id UUID PRIMARY KEY REFERENCES users(id),
  access_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Super Users
```sql
CREATE TABLE super_users (
  id UUID PRIMARY KEY REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Organization and Institution Tables

### Educational Institutions
```sql
CREATE TABLE educational_institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT, -- 'school', 'university', etc.
  address TEXT,
  emirate TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Organizations (Employers)
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  address TEXT,
  emirate TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  logo_url TEXT,
  is_private_sector BOOLEAN,
  is_government BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Training Centers
```sql
CREATE TABLE training_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  emirate TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Assessment Centers
```sql
CREATE TABLE assessment_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  emirate TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Platform Services Tables

### Resumes
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  summary TEXT,
  file_url TEXT,
  parsed_data JSONB,
  linkedin_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Resume Skills
```sql
CREATE TABLE resume_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level TEXT,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(resume_id, skill_id)
);
```

### Resume Education
```sql
CREATE TABLE resume_education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  institution TEXT,
  degree TEXT,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Resume Experience
```sql
CREATE TABLE resume_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  company TEXT,
  position TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Skills Taxonomy
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  market_demand INTEGER, -- Scale 1-10
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Job Postings
```sql
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  posted_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  job_type TEXT, -- 'full-time', 'part-time', 'gig'
  salary_min DECIMAL(10, 2),
  salary_max DECIMAL(10, 2),
  location TEXT,
  location_coordinates GEOGRAPHY(POINT),
  remote_option BOOLEAN,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Job Skills Requirements
```sql
CREATE TABLE job_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  importance INTEGER, -- Scale 1-5
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, skill_id)
);
```

### Job Applications
```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id),
  cover_letter TEXT,
  status TEXT, -- 'applied', 'reviewed', 'interview', 'rejected', 'offered', 'accepted'
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Scholarships
```sql
CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider_id UUID REFERENCES organizations(id),
  description TEXT,
  eligibility_criteria TEXT,
  amount DECIMAL(10, 2),
  application_deadline DATE,
  study_field TEXT,
  degree_level TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Scholarship Applications
```sql
CREATE TABLE scholarship_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT, -- 'applied', 'under review', 'accepted', 'rejected'
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Internships
```sql
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  posted_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  duration TEXT,
  start_date DATE,
  end_date DATE,
  stipend DECIMAL(10, 2),
  location TEXT,
  location_coordinates GEOGRAPHY(POINT),
  remote_option BOOLEAN,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Internship Applications
```sql
CREATE TABLE internship_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id),
  cover_letter TEXT,
  status TEXT, -- 'applied', 'reviewed', 'interview', 'rejected', 'offered', 'accepted'
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Training Programs
```sql
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID REFERENCES training_centers(id),
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  start_date DATE,
  end_date DATE,
  cost DECIMAL(10, 2),
  location TEXT,
  capacity INTEGER,
  is_online BOOLEAN,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Training Enrollments
```sql
CREATE TABLE training_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES training_programs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT, -- 'enrolled', 'completed', 'dropped'
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completion_date TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT
);
```

### Assessment Programs
```sql
CREATE TABLE assessment_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID REFERENCES assessment_centers(id),
  name TEXT NOT NULL,
  type TEXT, -- 'psychometric', 'IQ', 'EQ', 'functional'
  description TEXT,
  duration TEXT,
  cost DECIMAL(10, 2),
  is_online BOOLEAN,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Assessment Results
```sql
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessment_programs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(10, 2),
  feedback TEXT,
  assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  report_url TEXT
);
```

### Summer Knowledge Camps
```sql
CREATE TABLE summer_camps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  organizer_id UUID REFERENCES organizations(id),
  description TEXT,
  start_date DATE,
  end_date DATE,
  location TEXT,
  age_range TEXT,
  capacity INTEGER,
  cost DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Summer Camp Registrations
```sql
CREATE TABLE summer_camp_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  camp_id UUID REFERENCES summer_camps(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT, -- 'registered', 'confirmed', 'attended', 'cancelled'
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Mentoring Sessions
```sql
CREATE TABLE mentoring_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES users(id),
  mentee_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  session_date TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  status TEXT, -- 'scheduled', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Career Advisory Sessions
```sql
CREATE TABLE advisory_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advisor_id UUID REFERENCES users(id),
  advisee_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  session_date TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  status TEXT, -- 'scheduled', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Interviews
```sql
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_application_id UUID REFERENCES job_applications(id),
  interviewer_id UUID REFERENCES users(id),
  interview_date TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  location TEXT,
  is_online BOOLEAN,
  video_conference_link TEXT,
  status TEXT, -- 'scheduled', 'completed', 'cancelled'
  notes TEXT,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Portfolios
```sql
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Portfolio Items
```sql
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  type TEXT, -- 'project', 'certificate', 'award', 'publication'
  url TEXT,
  image_url TEXT,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### API Integrations
```sql
CREATE TABLE api_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  base_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes for Performance

```sql
-- User search and authentication
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_name ON profiles(first_name, last_name);

-- Location-based queries
CREATE INDEX idx_job_postings_location ON job_postings USING GIST(location_coordinates);
CREATE INDEX idx_jobseekers_location ON jobseekers USING GIST(home_location);

-- Role-based access
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

-- Job and internship searches
CREATE INDEX idx_job_postings_type ON job_postings(job_type);
CREATE INDEX idx_job_postings_active ON job_postings(is_active);
CREATE INDEX idx_internships_active ON internships(is_active);

-- Skills matching
CREATE INDEX idx_resume_skills_resume_id ON resume_skills(resume_id);
CREATE INDEX idx_resume_skills_skill_id ON resume_skills(skill_id);
CREATE INDEX idx_job_skills_job_id ON job_skills(job_id);
CREATE INDEX idx_job_skills_skill_id ON job_skills(skill_id);

-- Application tracking
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_applicant_id ON job_applications(applicant_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
```

## Database Relationships Diagram

The database schema includes the following key relationships:

1. Users can have multiple roles (one-to-many)
2. Roles have multiple permissions (many-to-many)
3. Users can have specific persona profiles (one-to-one)
4. Organizations can post multiple job listings (one-to-many)
5. Users can apply to multiple jobs (many-to-many)
6. Users can have multiple resumes (one-to-many)
7. Resumes contain multiple skills, education, and experience entries (one-to-many)
8. Jobs require multiple skills (many-to-many)
9. Educational institutions can have multiple representatives (one-to-many)
10. Parents can have multiple children (one-to-many)

This schema design supports all the required functionality for the Emirati Career Journey Platform, including the 23 different user personas, 16 dashboards, and various integrated services.
