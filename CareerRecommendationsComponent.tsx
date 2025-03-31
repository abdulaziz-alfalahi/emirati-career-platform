import React, { useState } from 'react';
import '../../styles/theme.css';

interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  skills: {
    matching: string[];
    missing: string[];
  };
  educationPath: string;
  averageSalary: string;
  growthOutlook: string;
  relevantJobs: {
    title: string;
    company: string;
    location: string;
  }[];
}

interface ResumeData {
  name?: string;
  skills?: string[];
  education?: {
    institution: string;
    degree: string;
    date: string;
  }[];
  workExperience?: {
    company: string;
    position: string;
    date: string;
    description: string;
  }[];
}

const CareerRecommendationService = {
  async getRecommendations(resumeData: ResumeData): Promise<CareerRecommendation[]> {
    // This would be replaced with actual OpenAI API integration
    // For demonstration purposes, we're using a mock implementation
    
    // In a real implementation, we would make an API call to OpenAI
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4",
    //     messages: [
    //       {
    //         role: "system",
    //         content: "You are a career advisor specializing in the UAE job market. Analyze the resume data and provide career recommendations."
    //       },
    //       {
    //         role: "user",
    //         content: `Resume data: ${JSON.stringify(resumeData)}`
    //       }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 1000
    //   })
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to get career recommendations');
    // }
    // 
    // const data = await response.json();
    // return transformOpenAIResponse(data);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on resume data
    const userSkills = resumeData.skills || [];
    const recommendations: CareerRecommendation[] = [
      {
        title: "Software Developer",
        description: "Design, develop, and maintain software applications for various platforms. Collaborate with cross-functional teams to define, design, and ship new features.",
        matchPercentage: 92,
        skills: {
          matching: userSkills.filter(skill => ["JavaScript", "React", "Node.js", "HTML/CSS"].includes(skill)),
          missing: ["TypeScript", "AWS", "Docker"].filter(skill => !userSkills.includes(skill))
        },
        educationPath: "Bachelor's in Computer Science or related field. Consider AWS certification.",
        averageSalary: "AED 15,000 - 25,000 per month",
        growthOutlook: "Excellent growth prospects in UAE with 15% annual increase in demand",
        relevantJobs: [
          {
            title: "Frontend Developer",
            company: "Dubai Future Foundation",
            location: "Dubai, UAE"
          },
          {
            title: "Full Stack Developer",
            company: "Etisalat Digital",
            location: "Abu Dhabi, UAE"
          }
        ]
      },
      {
        title: "UX/UI Designer",
        description: "Create user-centered designs for digital products. Conduct user research, create wireframes, prototypes, and collaborate with development teams.",
        matchPercentage: 78,
        skills: {
          matching: userSkills.filter(skill => ["JavaScript", "HTML/CSS"].includes(skill)),
          missing: ["Figma", "Adobe XD", "User Research"].filter(skill => !userSkills.includes(skill))
        },
        educationPath: "Bachelor's in Design or related field. Consider UX certification courses.",
        averageSalary: "AED 12,000 - 22,000 per month",
        growthOutlook: "Strong growth with 10% annual increase in demand across UAE",
        relevantJobs: [
          {
            title: "UI/UX Designer",
            company: "Emirates NBD",
            location: "Dubai, UAE"
          },
          {
            title: "Product Designer",
            company: "Careem",
            location: "Dubai, UAE"
          }
        ]
      },
      {
        title: "Data Analyst",
        description: "Analyze data to identify trends and insights. Create reports and visualizations to communicate findings to stakeholders.",
        matchPercentage: 65,
        skills: {
          matching: userSkills.filter(skill => ["SQL", "JavaScript"].includes(skill)),
          missing: ["Python", "Tableau", "Statistical Analysis"].filter(skill => !userSkills.includes(skill))
        },
        educationPath: "Bachelor's in Statistics, Mathematics, or Computer Science. Consider data analysis certification.",
        averageSalary: "AED 10,000 - 18,000 per month",
        growthOutlook: "Growing field with 12% annual increase in demand",
        relevantJobs: [
          {
            title: "Business Intelligence Analyst",
            company: "ADNOC",
            location: "Abu Dhabi, UAE"
          },
          {
            title: "Data Analyst",
            company: "Dubai Smart Government",
            location: "Dubai, UAE"
          }
        ]
      }
    ];
    
    return recommendations;
  },
  
  // This function would transform OpenAI's response to our application's format
  transformOpenAIResponse(data: any): CareerRecommendation[] {
    // In a real implementation, we would parse the OpenAI response
    // and transform it to match our application's data structure
    try {
      const content = data.choices[0].message.content;
      const parsedContent = JSON.parse(content);
      return parsedContent.recommendations;
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return [];
    }
  }
};

interface CareerRecommendationsProps {
  resumeData: ResumeData | null;
}

const CareerRecommendationsComponent: React.FC<CareerRecommendationsProps> = ({ resumeData }) => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<CareerRecommendation | null>(null);

  const getRecommendations = async () => {
    if (!resumeData) {
      setError('No resume data available. Please upload your resume first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await CareerRecommendationService.getRecommendations(resumeData);
      setRecommendations(data);
      if (data.length > 0) {
        setSelectedRecommendation(data[0]);
      }
    } catch (err) {
      setError('Failed to get career recommendations. Please try again.');
      console.error('Career recommendation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Career Recommendations</h2>
        <p className="text-gray-600">Get AI-powered career recommendations based on your resume and skills.</p>
        
        {!resumeData && (
          <div className="bg-beige-light p-4 rounded-md mt-4">
            <p className="text-gray-700">Please upload your resume to get personalized career recommendations.</p>
          </div>
        )}
        
        {resumeData && !recommendations && !isLoading && (
          <button 
            className="btn-primary mt-4"
            onClick={getRecommendations}
          >
            Get Career Recommendations
          </button>
        )}
        
        {error && (
          <div className="bg-red-100 text-accent p-3 rounded-md mt-4">
            {error}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your profile and generating career recommendations...</p>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 arabesque-floral" style={{ opacity: 0.1 }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Career List */}
            <div className="md:col-span-1">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Recommended Careers</h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedRecommendation?.title === rec.title 
                          ? 'bg-green-100 border-l-4 border-primary' 
                          : 'bg-beige-light hover:bg-green-50'
                      }`}
                      onClick={() => setSelectedRecommendation(rec)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{rec.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.matchPercentage >= 80 ? 'bg-green-100 text-green-800' :
                          rec.matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rec.matchPercentage}% Match
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Career Details */}
            {selectedRecommendation && (
              <div className="md:col-span-2">
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-primary">{selectedRecommendation.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedRecommendation.matchPercentage >= 80 ? 'bg-green-100 text-green-800' :
                      selectedRecommendation.matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedRecommendation.matchPercentage}% Match
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedRecommendation.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-highlight mb-2">Matching Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecommendation.skills.matching.map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                        {selectedRecommendation.skills.matching.length === 0 && (
                          <p className="text-gray-500 text-sm">No matching skills found</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-highlight mb-2">Skills to Develop</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecommendation.skills.missing.map((skill, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                        {selectedRecommendation.skills.missing.length === 0 && (
                          <p className="text-gray-500 text-sm">No skill gaps identified</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-beige-light p-3 rounded-md">
                      <h4 className="font-semibold text-primary text-sm mb-1">Average Salary</h4>
                      <p className="text-gray-800">{selectedRecommendation.averageSalary}</p>
                    </div>
                    
                    <div className="bg-beige-light p-3 rounded-md">
                      <h4 className="font-semibold text-primary text-sm mb-1">Growth Outlook</h4>
                      <p className="text-gray-800">{selectedRecommendation.growthOutlook}</p>
                    </div>
                    
                    <div className="bg-beige-light p-3 rounded-md">
                      <h4 className="font-semibold text-primary text-sm mb-1">Education Path</h4>
                      <p className="text-gray-800">{selectedRecommendation.educationPath}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-highlight mb-3">Relevant Job Opportunities</h4>
                    <div className="space-y-3">
                      {selectedRecommendation.relevantJobs.map((job, index) => (
                        <div key={index} className="border-l-4 border-highlight p-3 bg-beige-light rounded-r-md">
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-gray-600">{job.company}</div>
                          <div className="text-sm text-gray-500">{job.location}</div>
                          <button className="btn-secondary text-sm mt-2 px-3 py-1">View Job</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendationsComponent;
