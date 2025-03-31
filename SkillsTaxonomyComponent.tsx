import React, { useState } from 'react';
import '../../styles/theme.css';

interface Skill {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  relatedSkills: string[];
  inDemand: boolean;
  growthRate: number; // percentage
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  subcategories?: string[];
}

const SkillsTaxonomyService = {
  async getSkillCategories(): Promise<SkillCategory[]> {
    // This would be replaced with actual API call to fetch skill categories
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: "tech",
        name: "Technology",
        description: "Skills related to software development, IT infrastructure, and digital technologies",
        subcategories: ["Programming", "Data Science", "Cybersecurity", "Cloud Computing", "DevOps"]
      },
      {
        id: "business",
        name: "Business",
        description: "Skills related to business operations, management, and strategy",
        subcategories: ["Management", "Marketing", "Finance", "Sales", "Operations"]
      },
      {
        id: "creative",
        name: "Creative",
        description: "Skills related to design, content creation, and creative thinking",
        subcategories: ["Design", "Writing", "Media Production", "Visual Arts"]
      },
      {
        id: "engineering",
        name: "Engineering",
        description: "Skills related to various engineering disciplines",
        subcategories: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering"]
      },
      {
        id: "healthcare",
        name: "Healthcare",
        description: "Skills related to healthcare and medical professions",
        subcategories: ["Medical", "Nursing", "Public Health", "Healthcare Administration"]
      },
      {
        id: "education",
        name: "Education",
        description: "Skills related to teaching, training, and educational development",
        subcategories: ["Teaching", "Curriculum Development", "Educational Technology"]
      },
      {
        id: "soft-skills",
        name: "Soft Skills",
        description: "Interpersonal and transferable skills applicable across industries",
        subcategories: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management"]
      }
    ];
  },
  
  async getSkillsByCategory(categoryId: string): Promise<Skill[]> {
    // This would be replaced with actual API call to fetch skills by category
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock skills data based on category
    const skillsMap: Record<string, Skill[]> = {
      "tech": [
        {
          id: "js",
          name: "JavaScript",
          category: "Technology",
          subcategory: "Programming",
          description: "A programming language that enables interactive web pages",
          level: "intermediate",
          relatedSkills: ["TypeScript", "React", "Node.js"],
          inDemand: true,
          growthRate: 15
        },
        {
          id: "react",
          name: "React",
          category: "Technology",
          subcategory: "Programming",
          description: "A JavaScript library for building user interfaces",
          level: "intermediate",
          relatedSkills: ["JavaScript", "HTML/CSS", "Redux"],
          inDemand: true,
          growthRate: 22
        },
        {
          id: "python",
          name: "Python",
          category: "Technology",
          subcategory: "Programming",
          description: "A high-level programming language for general-purpose programming",
          level: "beginner",
          relatedSkills: ["Data Science", "Machine Learning", "Django"],
          inDemand: true,
          growthRate: 28
        },
        {
          id: "cloud",
          name: "Cloud Computing",
          category: "Technology",
          subcategory: "Cloud Computing",
          description: "Skills related to cloud platforms and services",
          level: "beginner",
          relatedSkills: ["AWS", "Azure", "Google Cloud"],
          inDemand: true,
          growthRate: 35
        },
        {
          id: "cybersec",
          name: "Cybersecurity",
          category: "Technology",
          subcategory: "Cybersecurity",
          description: "Skills related to protecting systems and networks from digital attacks",
          level: "beginner",
          relatedSkills: ["Network Security", "Ethical Hacking", "Security Compliance"],
          inDemand: true,
          growthRate: 32
        }
      ],
      "business": [
        {
          id: "proj-mgmt",
          name: "Project Management",
          category: "Business",
          subcategory: "Management",
          description: "Skills related to planning, executing, and closing projects",
          level: "intermediate",
          relatedSkills: ["Agile", "Scrum", "Risk Management"],
          inDemand: true,
          growthRate: 18
        },
        {
          id: "digital-marketing",
          name: "Digital Marketing",
          category: "Business",
          subcategory: "Marketing",
          description: "Skills related to marketing products or services using digital technologies",
          level: "beginner",
          relatedSkills: ["SEO", "Social Media Marketing", "Content Marketing"],
          inDemand: true,
          growthRate: 20
        },
        {
          id: "financial-analysis",
          name: "Financial Analysis",
          category: "Business",
          subcategory: "Finance",
          description: "Skills related to analyzing financial data and making recommendations",
          level: "beginner",
          relatedSkills: ["Financial Modeling", "Budgeting", "Forecasting"],
          inDemand: true,
          growthRate: 15
        }
      ],
      "soft-skills": [
        {
          id: "communication",
          name: "Communication",
          category: "Soft Skills",
          subcategory: "Communication",
          description: "Ability to convey information effectively and efficiently",
          level: "intermediate",
          relatedSkills: ["Public Speaking", "Writing", "Active Listening"],
          inDemand: true,
          growthRate: 10
        },
        {
          id: "leadership",
          name: "Leadership",
          category: "Soft Skills",
          subcategory: "Leadership",
          description: "Ability to guide and influence others towards achieving a goal",
          level: "intermediate",
          relatedSkills: ["Team Management", "Decision Making", "Delegation"],
          inDemand: true,
          growthRate: 12
        },
        {
          id: "problem-solving",
          name: "Problem Solving",
          category: "Soft Skills",
          subcategory: "Problem Solving",
          description: "Ability to find solutions to difficult or complex issues",
          level: "advanced",
          relatedSkills: ["Critical Thinking", "Analytical Skills", "Creativity"],
          inDemand: true,
          growthRate: 14
        }
      ]
    };
    
    return skillsMap[categoryId] || [];
  },
  
  async searchSkills(query: string): Promise<Skill[]> {
    // This would be replaced with actual API call to search skills
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Combine all skills from different categories
    const allSkills = [
      ...this.getSkillsByCategory("tech").then(skills => skills),
      ...this.getSkillsByCategory("business").then(skills => skills),
      ...this.getSkillsByCategory("soft-skills").then(skills => skills)
    ];
    
    // Filter skills based on query
    return Promise.all(allSkills).then(skillArrays => {
      const flattenedSkills = skillArrays.flat();
      if (!query) return flattenedSkills.slice(0, 5); // Return first 5 skills if no query
      
      return flattenedSkills.filter(skill => 
        skill.name.toLowerCase().includes(query.toLowerCase()) ||
        skill.description.toLowerCase().includes(query.toLowerCase()) ||
        skill.category.toLowerCase().includes(query.toLowerCase()) ||
        (skill.subcategory && skill.subcategory.toLowerCase().includes(query.toLowerCase()))
      );
    });
  },
  
  async getUserSkills(userId: string): Promise<Skill[]> {
    // This would be replaced with actual API call to fetch user skills
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user skills
    return [
      {
        id: "js",
        name: "JavaScript",
        category: "Technology",
        subcategory: "Programming",
        description: "A programming language that enables interactive web pages",
        level: "intermediate",
        relatedSkills: ["TypeScript", "React", "Node.js"],
        inDemand: true,
        growthRate: 15
      },
      {
        id: "react",
        name: "React",
        category: "Technology",
        subcategory: "Programming",
        description: "A JavaScript library for building user interfaces",
        level: "intermediate",
        relatedSkills: ["JavaScript", "HTML/CSS", "Redux"],
        inDemand: true,
        growthRate: 22
      },
      {
        id: "communication",
        name: "Communication",
        category: "Soft Skills",
        subcategory: "Communication",
        description: "Ability to convey information effectively and efficiently",
        level: "intermediate",
        relatedSkills: ["Public Speaking", "Writing", "Active Listening"],
        inDemand: true,
        growthRate: 10
      }
    ];
  },
  
  async addUserSkill(userId: string, skillId: string, level: string): Promise<boolean> {
    // This would be replaced with actual API call to add a skill to user profile
    // For demonstration purposes, we're using a mock implementation
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful response
    return true;
  },
  
  async removeUserSkill(userId: string, skillId: string): Promise<boolean> {
    // This would be replaced with actual API call to remove a skill from user profile
    // For demonstration purposes, we're using a mock implementation
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful response
    return true;
  },
  
  async getRecommendedSkills(userId: string): Promise<Skill[]> {
    // This would be replaced with actual API call to get recommended skills
    // For demonstration purposes, we're using mock data
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock recommended skills
    return [
      {
        id: "typescript",
        name: "TypeScript",
        category: "Technology",
        subcategory: "Programming",
        description: "A typed superset of JavaScript that compiles to plain JavaScript",
        level: "beginner",
        relatedSkills: ["JavaScript", "Angular", "Node.js"],
        inDemand: true,
        growthRate: 25
      },
      {
        id: "node",
        name: "Node.js",
        category: "Technology",
        subcategory: "Programming",
        description: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
        level: "beginner",
        relatedSkills: ["JavaScript", "Express", "MongoDB"],
        inDemand: true,
        growthRate: 18
      },
      {
        id: "proj-mgmt",
        name: "Project Management",
        category: "Business",
        subcategory: "Management",
        description: "Skills related to planning, executing, and closing projects",
        level: "beginner",
        relatedSkills: ["Agile", "Scrum", "Risk Management"],
        inDemand: true,
        growthRate: 18
      }
    ];
  }
};

const SkillsTaxonomyComponent: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skillLevel, setSkillLevel] = useState<string>('beginner');

  // Load categories on component mount
  React.useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await SkillsTaxonomyService.getSkillCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load skill categories');
        console.error('Error fetching skill categories:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchUserSkills = async () => {
      try {
        const data = await SkillsTaxonomyService.getUserSkills('current-user');
        setUserSkills(data);
      } catch (err) {
        console.error('Error fetching user skills:', err);
      }
    };
    
    const fetchRecommendedSkills = async () => {
      try {
        const data = await SkillsTaxonomyService.getRecommendedSkills('current-user');
        setRecommendedSkills(data);
      } catch (err) {
        console.error('Error fetching recommended skills:', err);
      }
    };
    
    fetchCategories();
    fetchUserSkills();
    fetchRecommendedSkills();
  }, []);

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await SkillsTaxonomyService.getSkillsByCategory(categoryId);
      setSkills(data);
    } catch (err) {
      setError('Failed to load skills for this category');
      console.error('Error fetching skills by category:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await SkillsTaxonomyService.searchSkills(searchQuery);
      setSearchResults(data);
    } catch (err) {
      setError('Failed to search skills');
      console.error('Error searching skills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const handleAddSkill = async () => {
    if (!selectedSkill) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await SkillsTaxonomyService.addUserSkill('current-user', selectedSkill.id, skillLevel);
      setUserSkills([...userSkills, {...selectedSkill, level: skillLevel as any}]);
      setSelectedSkill(null);
    } catch (err) {
      setError('Failed to add skill to your profile');
      console.error('Error adding skill:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await SkillsTaxonomyService.removeUserSkill('current-user', skillId);
      setUserSkills(userSkills.filter(skill => skill.id !== skillId));
    } catch (err) {
      setError('Failed to remove skill from your profile');
      
(Content truncated due to size limit. Use line ranges to read in chunks)