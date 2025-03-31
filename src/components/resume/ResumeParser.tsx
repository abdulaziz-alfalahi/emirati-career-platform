import React, { useState } from 'react';

export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const parseResume = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // In a real implementation, you would call the Affinda API here
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const mockResumeData = {
        name: 'Mohammed Al Mansoori',
        email: 'mohammed.almansoori@example.com',
        phone: '+971 50 123 4567',
        location: 'Dubai, UAE',
        education: [
          {
            institution: 'United Arab Emirates University',
            degree: 'Bachelor of Science in Computer Science',
            dates: '2018 - 2022'
          }
        ],
        experience: [
          {
            company: 'Tech Innovations LLC',
            position: 'Junior Software Developer',
            dates: 'Jan 2023 - Present',
            description: 'Developing web applications using React and Node.js'
          },
          {
            company: 'Digital Solutions',
            position: 'Intern',
            dates: 'Jun 2022 - Dec 2022',
            description: 'Assisted in frontend development and QA testing'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'Agile Methodology']
      };
      
      setResumeData(mockResumeData);
    } catch (err) {
      setError('Failed to parse resume. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D' }}>Resume Parser</h1>
      
      {error && (
        <div style={{ backgroundColor: '#FFEBEE', color: '#B71C1C', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      {!resumeData ? (
        <>
          <div 
            style={{ 
              border: `2px dashed ${isDragging ? '#007A3D' : '#ccc'}`,
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: isDragging ? 'rgba(0, 122, 61, 0.05)' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input 
              type="file" 
              id="file-input" 
              style={{ display: 'none' }} 
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx,.txt"
            />
            <div style={{ marginBottom: '1rem' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L12 8" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11L12 8 15 11" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 16H16" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 19H21" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              {isDragging ? 'Drop your resume here' : 'Drag and drop your resume here'}
            </p>
            <p style={{ color: '#666' }}>or click to browse files</p>
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
              Supported formats: PDF, DOC, DOCX, TXT (Max 5MB) 
            </p>
          </div>
          
          {file && (
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.25rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#007A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ marginLeft: '0.5rem' }}>{file.name}</span>
              </div>
              <button 
                onClick={parseResume}
                disabled={isUploading}
                style={{ 
                  backgroundColor: '#007A3D', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.25rem', 
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  opacity: isUploading ? 0.7 : 1
                }}
              >
                {isUploading ? 'Parsing...' : 'Parse Resume'}
              </button>
            </div>
          ) }
        </>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007A3D' }}>Parsed Resume</h2>
            <button 
              onClick={() => {
                setResumeData(null);
                setFile(null);
              }}
              style={{ 
                backgroundColor: 'transparent', 
                color: '#007A3D', 
                border: '1px solid #007A3D', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.25rem', 
                cursor: 'pointer'
              }}
            >
              Parse Another Resume
            </button>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Name</p>
                <p>{resumeData.name}</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Email</p>
                <p>{resumeData.email}</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Phone</p>
                <p>{resumeData.phone}</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Location</p>
                <p>{resumeData.location}</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Education</h3>
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontWeight: 'bold' }}>{edu.institution}</p>
                <p>{edu.degree}</p>
                <p style={{ color: '#666' }}>{edu.dates}</p>
              </div>
            ))}
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Experience</h3>
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>{exp.position}</p>
                <p>{exp.company}</p>
                <p style={{ color: '#666' }}>{exp.dates}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {resumeData.skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  style={{ 
                    backgroundColor: 'rgba(0, 122, 61, 0.1)', 
                    color: '#007A3D', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
