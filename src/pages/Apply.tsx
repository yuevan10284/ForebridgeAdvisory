
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Send, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface FormData {
  // Basic Info
  fullName: string;
  email: string;
  linkedIn: string;
  
  // Team Information
  teamType: 'solo' | 'team';
  teamSize: string;
  foundersExperience: string;
  workedTogetherBefore: string;
  whyRightTeam: string;
  
  // Idea and Problem
  buildingDescription: string;
  problemSolving: string;
  solutionAdvantage: string;
  marketAccess: string;
  previousApplication: string;
  
  // Traction and Performance
  progressStage: string;
  activeUsers: string;
  userCount: string;
  revenue: string;
  keyMetrics: string;
  growthRate: string;
  userAcquisition: string;
  
  // Vision and Future
  companyVision: string;
  whyJoin: string;
}

const initialFormData: FormData = {
  // Basic Info
  fullName: '',
  email: '',
  linkedIn: '',
  
  // Team Information
  teamType: 'solo',
  teamSize: '',
  foundersExperience: '',
  workedTogetherBefore: '',
  whyRightTeam: '',
  
  // Idea and Problem
  buildingDescription: '',
  problemSolving: '',
  solutionAdvantage: '',
  marketAccess: '',
  previousApplication: '',
  
  // Traction and Performance
  progressStage: '',
  activeUsers: '',
  userCount: '',
  revenue: '',
  keyMetrics: '',
  growthRate: '',
  userAcquisition: '',
  
  // Vision and Future
  companyVision: '',
  whyJoin: '',
};

const Apply = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Apply - 30under30.ai";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (section === 1) {
      // Basic info & team type
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!formData.teamType) {
        newErrors.teamType = 'Please select whether you are a solo founder or have a team';
      }
    }
    
    if (section === 2) {
      // Idea and Problem
      if (!formData.buildingDescription.trim()) {
        newErrors.buildingDescription = 'Please describe what you are building';
      }
      
      if (!formData.problemSolving.trim()) {
        newErrors.problemSolving = 'Please describe the problem you are solving';
      }
      
      if (!formData.solutionAdvantage.trim()) {
        newErrors.solutionAdvantage = 'Please explain why your solution is better';
      }
    }
    
    if (section === 3) {
      // Traction and Performance
      if (!formData.progressStage.trim()) {
        newErrors.progressStage = 'Please describe how far along you are';
      }
    }
    
    if (section === 4) {
      // Team Information & Why Join
      if (formData.teamType === 'team' && !formData.foundersExperience.trim()) {
        newErrors.foundersExperience = 'Please describe your team\'s experience';
      }
      
      if (formData.teamType === 'team' && !formData.workedTogetherBefore.trim()) {
        newErrors.workedTogetherBefore = 'Please indicate if you have worked together before';
      }
      
      if (!formData.whyRightTeam.trim()) {
        newErrors.whyRightTeam = 'Please explain why you are the right team/person for this problem';
      }
      
      if (!formData.companyVision.trim()) {
        newErrors.companyVision = 'Please share your vision for the company';
      }
      
      if (!formData.whyJoin.trim()) {
        newErrors.whyJoin = 'Please tell us why you want to join';
      } else if (formData.whyJoin.length < 50) {
        newErrors.whyJoin = 'Please provide at least 50 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, 4));
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateSection(currentSection)) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Application Submitted",
          description: "Thank you for applying to 30under30.ai! We'll review your application and get back to you soon.",
        });
        
        // Reset form and redirect
        setFormData(initialFormData);
        navigate('/');
      }, 1500);
    }
  };

  const renderFormSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl mb-4">Basic Information</h2>
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Full Name *
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'border-red-500' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium mb-2">
                LinkedIn Profile (optional)
              </label>
              <Input
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-4">Are you a solo founder or do you have co-founders? *</h3>
              <RadioGroup 
                value={formData.teamType} 
                onValueChange={(value) => handleRadioChange('teamType', value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo">Solo Founder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team" id="team" />
                  <Label htmlFor="team">We have co-founders</Label>
                </div>
              </RadioGroup>
              {errors.teamType && (
                <p className="mt-1 text-sm text-red-500">{errors.teamType}</p>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl mb-4">The Idea and Problem</h2>
            
            <div>
              <label htmlFor="buildingDescription" className="block text-sm font-medium mb-2">
                What are you building? *
              </label>
              <Textarea
                id="buildingDescription"
                name="buildingDescription"
                value={formData.buildingDescription}
                onChange={handleChange}
                rows={4}
                className={errors.buildingDescription ? 'border-red-500' : ''}
                placeholder="Describe your product or solution in detail..."
              />
              {errors.buildingDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.buildingDescription}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="problemSolving" className="block text-sm font-medium mb-2">
                What problem are you solving? *
              </label>
              <Textarea
                id="problemSolving"
                name="problemSolving"
                value={formData.problemSolving}
                onChange={handleChange}
                rows={4}
                className={errors.problemSolving ? 'border-red-500' : ''}
                placeholder="Describe the core problem your product addresses..."
              />
              {errors.problemSolving && (
                <p className="mt-1 text-sm text-red-500">{errors.problemSolving}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="solutionAdvantage" className="block text-sm font-medium mb-2">
                Why is your solution better than existing ones? *
              </label>
              <Textarea
                id="solutionAdvantage"
                name="solutionAdvantage"
                value={formData.solutionAdvantage}
                onChange={handleChange}
                rows={4}
                className={errors.solutionAdvantage ? 'border-red-500' : ''}
                placeholder="Explain your competitive advantage..."
              />
              {errors.solutionAdvantage && (
                <p className="mt-1 text-sm text-red-500">{errors.solutionAdvantage}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="marketAccess" className="block text-sm font-medium mb-2">
                How easy is it for your target market to find you?
              </label>
              <Textarea
                id="marketAccess"
                name="marketAccess"
                value={formData.marketAccess}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your go-to-market strategy and visibility..."
              />
            </div>
            
            <div>
              <label htmlFor="previousApplication" className="block text-sm font-medium mb-2">
                Is this the same idea as a previous application, or have you pivoted?
              </label>
              <Textarea
                id="previousApplication"
                name="previousApplication"
                value={formData.previousApplication}
                onChange={handleChange}
                rows={3}
                placeholder="Share your journey and how your idea has evolved..."
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl mb-4">Traction and Performance</h2>
            
            <div>
              <label htmlFor="progressStage" className="block text-sm font-medium mb-2">
                How far along are you? *
              </label>
              <Textarea
                id="progressStage"
                name="progressStage"
                value={formData.progressStage}
                onChange={handleChange}
                rows={3}
                className={errors.progressStage ? 'border-red-500' : ''}
                placeholder="Describe your current stage (idea, prototype, launched product, etc.)..."
              />
              {errors.progressStage && (
                <p className="mt-1 text-sm text-red-500">{errors.progressStage}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="activeUsers" className="block text-sm font-medium mb-2">
                Are people using your product?
              </label>
              <Textarea
                id="activeUsers"
                name="activeUsers"
                value={formData.activeUsers}
                onChange={handleChange}
                rows={3}
                placeholder="Describe user engagement and adoption..."
              />
            </div>
            
            <div>
              <label htmlFor="userCount" className="block text-sm font-medium mb-2">
                How many users/customers do you have?
              </label>
              <Input
                id="userCount"
                name="userCount"
                value={formData.userCount}
                onChange={handleChange}
                placeholder="Number of active users or customers"
              />
            </div>
            
            <div>
              <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                Do you have revenue?
              </label>
              <Textarea
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                rows={2}
                placeholder="Share revenue details and business model..."
              />
            </div>
            
            <div>
              <label htmlFor="keyMetrics" className="block text-sm font-medium mb-2">
                What are your key metrics?
              </label>
              <Textarea
                id="keyMetrics"
                name="keyMetrics"
                value={formData.keyMetrics}
                onChange={handleChange}
                rows={3}
                placeholder="Share the metrics you track to measure success..."
              />
            </div>
            
            <div>
              <label htmlFor="growthRate" className="block text-sm font-medium mb-2">
                What's your growth rate?
              </label>
              <Input
                id="growthRate"
                name="growthRate"
                value={formData.growthRate}
                onChange={handleChange}
                placeholder="e.g., 15% MoM, 2x YoY"
              />
            </div>
            
            <div>
              <label htmlFor="userAcquisition" className="block text-sm font-medium mb-2">
                How do you acquire users?
              </label>
              <Textarea
                id="userAcquisition"
                name="userAcquisition"
                value={formData.userAcquisition}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your user acquisition channels and strategies..."
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl mb-4">
              {formData.teamType === 'solo' ? "About You" : "The Team and Founders"}
            </h2>
            
            {formData.teamType === 'team' && (
              <>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium mb-2">
                    Team Size *
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.teamSize ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-white`}
                  >
                    <option value="">Select team size</option>
                    <option value="2-3">2-3 people</option>
                    <option value="4-5">4-5 people</option>
                    <option value="6+">6+ people</option>
                  </select>
                  {errors.teamSize && (
                    <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="foundersExperience" className="block text-sm font-medium mb-2">
                    What's the team's experience and expertise? *
                  </label>
                  <Textarea
                    id="foundersExperience"
                    name="foundersExperience"
                    value={formData.foundersExperience}
                    onChange={handleChange}
                    rows={4}
                    className={errors.foundersExperience ? 'border-red-500' : ''}
                    placeholder="Describe the experience and skills of all co-founders..."
                  />
                  {errors.foundersExperience && (
                    <p className="mt-1 text-sm text-red-500">{errors.foundersExperience}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="workedTogetherBefore" className="block text-sm font-medium mb-2">
                    Have you worked together before? *
                  </label>
                  <Textarea
                    id="workedTogetherBefore"
                    name="workedTogetherBefore"
                    value={formData.workedTogetherBefore}
                    onChange={handleChange}
                    rows={3}
                    className={errors.workedTogetherBefore ? 'border-red-500' : ''}
                    placeholder="Describe your history working together as a team..."
                  />
                  {errors.workedTogetherBefore && (
                    <p className="mt-1 text-sm text-red-500">{errors.workedTogetherBefore}</p>
                  )}
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="whyRightTeam" className="block text-sm font-medium mb-2">
                Why are you {formData.teamType === 'team' ? 'the right team' : 'the right person'} for this problem? *
              </label>
              <Textarea
                id="whyRightTeam"
                name="whyRightTeam"
                value={formData.whyRightTeam}
                onChange={handleChange}
                rows={4}
                className={errors.whyRightTeam ? 'border-red-500' : ''}
                placeholder={`Why are you uniquely positioned to solve this problem?`}
              />
              {errors.whyRightTeam && (
                <p className="mt-1 text-sm text-red-500">{errors.whyRightTeam}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="companyVision" className="block text-sm font-medium mb-2">
                What's your vision for the company's future? *
              </label>
              <Textarea
                id="companyVision"
                name="companyVision"
                value={formData.companyVision}
                onChange={handleChange}
                rows={4}
                className={errors.companyVision ? 'border-red-500' : ''}
                placeholder="Where do you see your company in 5-10 years?"
              />
              {errors.companyVision && (
                <p className="mt-1 text-sm text-red-500">{errors.companyVision}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="whyJoin" className="block text-sm font-medium mb-2">
                Why do you want to join 30under30.ai? *
              </label>
              <Textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                rows={5}
                className={errors.whyJoin ? 'border-red-500' : ''}
                placeholder="Tell us why you're a good fit for our accelerator..."
              />
              {errors.whyJoin && (
                <p className="mt-1 text-sm text-red-500">{errors.whyJoin}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Minimum 50 characters required.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-24 pb-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl mb-2">Apply to 30under30.ai</h1>
            <p className="text-lg text-gray-600 mb-8">
              Join us in San Francisco for 3 months to build, launch, and scale your product to 30K.
            </p>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentSection 
                          ? 'bg-black text-white' 
                          : step < currentSection 
                            ? 'bg-gray-800 text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">
                      {step === 1 ? 'Basic Info' : 
                       step === 2 ? 'Idea' : 
                       step === 3 ? 'Traction' : 'Team'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 h-1">
                <div 
                  className="bg-black h-1 transition-all duration-300"
                  style={{ width: `${(currentSection / 4) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={currentSection === 4 ? handleSubmit : e => { e.preventDefault(); nextSection(); }} className="space-y-6">
              {renderFormSection()}
              
              <div className="pt-6 flex justify-between">
                {currentSection > 1 && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={prevSection}
                  >
                    Back
                  </Button>
                )}
                {currentSection < 4 ? (
                  <Button 
                    type="submit"
                    className="ml-auto"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        Submit Application <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Apply;
