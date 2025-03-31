import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  description: string;
  requiredSkills: string[];
  link: string;
}

interface CareerPath {
  title: string;
  matchPercentage: number;
  growthOutlook: string;
  averageSalary: string;
  description: string;
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  educationPaths: string[];
  relatedJobs: Job[];
}

export default function CareerRecommendations() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  useEffect(() => {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll simulate a response after a delay
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock career paths data
        const mockCareerPaths: CareerPath[] = [
          {
            title: 'Software Engineer',
            matchPercentage: 92,
            growthOutlook: 'High growth (15% annually)',
            averageSalary: 'AED 25,000 - 35,000 monthly',
            description: 'Software engineers design, develop, and maintain software systems. They work with programming languages, frameworks, and tools to create applications that solve specific problems or provide services.',
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'SQL', 'Problem Solving'],
            matchingSkills: ['JavaScript', 'React', 'Node.js', 'Git'],
            missingSkills: ['TypeScript', 'SQL'],
            educationPaths: [
              'Bachelor\'s in Computer Science',
              'Software Engineering Bootcamp',
              'AWS Certification'
            ],
            relatedJobs: [
              {
                title: 'Frontend Developer',
                company: 'Tech Innovations LLC',
                location: 'Dubai, UAE',
                salary: 'AED 22,000 - 28,000',
                matchScore: 95,
                description: 'Develop user interfaces for web applications using React and TypeScript.',
                requiredSkills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'],
                link: '#'
              },
              {
                title: 'Full Stack Developer',
                company: 'Digital Solutions',
                location: 'Abu Dhabi, UAE',
                salary: 'AED 25,000 - 32,000',
                matchScore: 90,
                description: 'Build end-to-end web applications using React, Node.js, and MongoDB.',
                requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
                link: '#'
              }
            ]
          },
          {
            title: 'Data Scientist',
            matchPercentage: 85,
            growthOutlook: 'Very high growth (20% annually)',
            averageSalary: 'AED 28,000 - 40,000 monthly',
            description: 'Data scientists analyze and interpret complex data to help organizations make better decisions. They use statistical methods, machine learning, and programming to extract insights from data.',
            requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Problem Solving'],
            matchingSkills: ['Problem Solving', 'Python'],
            missingSkills: ['Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
            educationPaths: [
              'Master\'s in Data Science',
              'Bachelor\'s in Statistics or Computer Science',
              'IBM Data Science Professional Certificate'
            ],
            relatedJobs: [
              {
                title: 'Data Analyst',
                company: 'Financial Services Inc.',
                location: 'Dubai, UAE',
                salary: 'AED 20,000 - 25,000',
                matchScore: 88,
                description: 'Analyze financial data and create reports to support business decisions.',
                requiredSkills: ['SQL', 'Excel', 'Data Visualization', 'Statistics'],
                link: '#'
              },
              {
                title: 'Machine Learning Engineer',
                company: 'AI Solutions',
                location: 'Dubai, UAE',
                salary: 'AED 30,000 - 38,000',
                matchScore: 82,
                description: 'Develop and deploy machine learning models for various applications.',
                requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch'],
                link: '#'
              }
            ]
          },
          {
            title: 'UX/UI Designer',
            matchPercentage: 78,
            growthOutlook: 'Moderate growth (10% annually)',
            averageSalary: 'AED 18,000 - 28,000 monthly',
            description: 'UX/UI designers create user-friendly interfaces for websites and applications. They focus on user experience, visual design, and usability to ensure products are both functional and appealing.',
            requiredSkills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'HTML/CSS'],
            matchingSkills: ['HTML/CSS'],
            missingSkills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
            educationPaths: [
              'Bachelor\'s in Design',
              'UX/UI Design Bootcamp',
              'Google UX Design Certificate'
            ],
            relatedJobs: [
              {
                title: 'UI Designer',
                company: 'Creative Agency',
                location: 'Dubai, UAE',
                salary: 'AED 18,000 - 25,000',
                matchScore: 80,
                description: 'Create visually appealing interfaces for websites and mobile applications.',
                requiredSkills: ['UI Design', 'Figma', 'Adobe XD', 'HTML/CSS'],
                link: '#'
              },
              {
                title: 'UX Researcher',
                company: 'User First Design',
                location: 'Dubai, UAE',
                salary: 'AED 20,000 - 28,000',
                matchScore: 75,
                description: 'Conduct user research and usability testing to improve product design.',
                requiredSkills: ['UX Research', 'User Testing', 'Interviewing', 'Data Analysis'],
                link: '#'
              }
            ]
          }
        ];
        
        setCareerPaths(mockCareerPaths);
        setSelectedCareer(mockCareerPaths[0]);
      } catch (err) {
        setError('Failed to fetch career recommendations. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <p>Loading career recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#FFEBEE', color: '#B71C1C', padding: '1rem', borderRadius: '0.25rem' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D' }}>Career Recommendations</h1>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Career paths sidebar */}
        <div style={{ width: '300px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recommended Careers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {careerPaths.map((career, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '1rem',
                  backgroundColor: selectedCareer?.title === career.title ? 'rgba(0, 122, 61, 0.1)' : 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  border: selectedCareer?.title === career.title ? '1px solid #007A3D' : '1px solid transparent'
                }}
                onClick={() => setSelectedCareer(career)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 'bold', color: selectedCareer?.title === career.title ? '#007A3D' : 'inherit' }}>{career.title}</h3>
                  <span 
                    style={{ 
                      backgroundColor: career.matchPercentage >= 90 ? '#4CAF50' : career.matchPercentage >= 80 ? '#FFC107' : '#FF9800',
                      color: career.matchPercentage >= 90 ? 'white' : 'black',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {career.matchPercentage}% Match
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>{career.growthOutlook}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Career details */}
        {selectedCareer && (
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007A3D', marginBottom: '0.5rem' }}>{selectedCareer.title}</h2>
                  <p style={{ color: '#666' }}>{selectedCareer.averageSalary}</p>
                </div>
                <span 
                  style={{ 
                    backgroundColor: selectedCareer.matchPercentage >= 90 ? '#4CAF50' : selectedCareer.matchPercentage >= 80 ? '#FFC107' : '#FF9800',
                    color: selectedCareer.matchPercentage >= 90 ? 'white' : 'black',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontWeight: 'bold'
                  }}
                >
                  {selectedCareer.matchPercentage}% Match
                </span>
              </div>
              
              <p style={{ marginBottom: '1.5rem' }}>{selectedCareer.description}</p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Skills Analysis</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#4CAF50' }}>Matching Skills</h4>
                    <ul style={{ marginLeft: '1.5rem' }}>
                      {selectedCareer.matchingSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#FF9800' }}>Skills to Develop</h4>
                    <ul style={{ marginLeft: '1.5rem' }}>
                      {selectedCareer.missingSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Education Paths</h3>
                <ul style={{ marginLeft: '1.5rem' }}>
                  {selectedCareer.educationPaths.map((path, index) => (
                    <li key={index}>{path}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Job Opportunities</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedCareer.relatedJobs.map((job, index) => (
                    <div 
                      key={index}
                      style={{ 
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 122, 61, 0.05)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(0, 122, 61, 0.1)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontWeight: 'bold' }}>{job.title}</h4>
                        <span 
                          style={{ 
                            backgroundColor: job.matchScore >= 90 ? '#4CAF50' : job.matchScore >= 80 ? '#FFC107' : '#FF9800',
                            color: job.matchScore >= 90 ? 'white' : 'black',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {job.matchScore}% Match
                        </span>
                      </div>
                      <p style={{ marginBottom: '0.25rem' }}>{job.company} • {job.location}</p>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>{job.salary}</p>
                      <p style={{ marginBottom: '0.5rem' }}>{job.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {job.requiredSkills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            style={{ 
                              backgroundColor: 'rgba(0, 122, 61, 0.1)', 
                              color: '#007A3D', 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '9999px',
                              fontSize: '0.75rem'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={job.link}
                        style={{ 
                          display: 'inline-block',
                          backgroundColor: '#007A3D',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.25rem',
                          textDecoration: 'none',
                          fontWeight: 'bold'
                        }}
                      >
                        View Job
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
