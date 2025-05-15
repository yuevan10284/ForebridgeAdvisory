
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface FormData {
  fullName: string;
  email: string;
  linkedIn: string;
  idea: string;
  teamSize: string;
  experience: string;
  whyJoin: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  linkedIn: '',
  idea: '',
  teamSize: '',
  experience: '',
  whyJoin: '',
};

const Apply = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.idea.trim()) {
      newErrors.idea = 'Startup idea description is required';
    }
    
    if (!formData.teamSize.trim()) {
      newErrors.teamSize = 'Team size is required';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience level is required';
    }
    
    if (!formData.whyJoin.trim()) {
      newErrors.whyJoin = 'Please tell us why you want to join';
    } else if (formData.whyJoin.length < 50) {
      newErrors.whyJoin = 'Please provide at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-24 pb-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Apply to 30under30.ai</h1>
            <p className="text-lg text-gray-600 mb-8">
              Join us in San Francisco for 3 months to build, launch, and scale your product to 30K.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
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
                <input
                  id="linkedIn"
                  name="linkedIn"
                  type="text"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="idea" className="block text-sm font-medium mb-2">
                  Startup Idea Description *
                </label>
                <textarea
                  id="idea"
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border ${
                    errors.idea ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                  placeholder="Describe your startup idea in detail..."
                ></textarea>
                {errors.idea && (
                  <p className="mt-1 text-sm text-red-500">{errors.idea}</p>
                )}
              </div>
              
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
                  <option value="Solo">Solo founder</option>
                  <option value="2-3">2-3 people</option>
                  <option value="4-5">4-5 people</option>
                  <option value="6+">6+ people</option>
                </select>
                {errors.teamSize && (
                  <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  Experience Level *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-white`}
                >
                  <option value="">Select experience level</option>
                  <option value="First-time">First-time founder</option>
                  <option value="Previous-startup">Previous startup experience</option>
                  <option value="Scaled-before">Have scaled a product before</option>
                  <option value="Multiple-exits">Multiple successful exits</option>
                </select>
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="whyJoin" className="block text-sm font-medium mb-2">
                  Why do you want to join 30under30.ai? *
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border ${
                    errors.whyJoin ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors`}
                  placeholder="Tell us why you're a good fit for our accelerator..."
                ></textarea>
                {errors.whyJoin && (
                  <p className="mt-1 text-sm text-red-500">{errors.whyJoin}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Minimum 50 characters required.
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-6 py-4 text-base font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
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
