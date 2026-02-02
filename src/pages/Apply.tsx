import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface FormData {
  // Contact Info
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  // Background
  currentLocation: string;
  companyName: string;
  companyStage: string;
  teamSize: string;
  whatBuilding: string;
  // Relocation Intent
  relocationType: string;
  timeline: string;
  dallasConnections: string;
  // Goals
  primaryGoals: string;
  networkingPriorities: string;
  anythingElse: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  currentLocation: '',
  companyName: '',
  companyStage: '',
  teamSize: '',
  whatBuilding: '',
  relocationType: '',
  timeline: '',
  dallasConnections: '',
  primaryGoals: '',
  networkingPriorities: '',
  anythingElse: '',
};

const Apply = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [section, setSection] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Get In Touch — ForeBridge";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateSection = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (section === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    } else if (section === 2) {
      if (!formData.currentLocation.trim()) newErrors.currentLocation = 'Required';
      if (!formData.whatBuilding.trim()) newErrors.whatBuilding = 'Required';
    } else if (section === 3) {
      if (!formData.timeline) newErrors.timeline = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) setSection((s) => s + 1);
  };
  const handleBack = () => setSection((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSection()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Inquiry Submitted",
          description: "Thank you for reaching out. We'll be in touch within 48 hours to schedule a conversation.",
        });
        setFormData(initialFormData);
        setSection(1);
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="pt-24 pb-16 md:py-24 bg-white flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl mb-2">Start a Conversation</h1>
            <p className="text-lg text-gray-600 mb-8">
              Tell us about yourself and your goals. We'll reach out to schedule a private intake conversation.
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    section >= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 ${section > step ? 'bg-black' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Contact Information */}
              <div className={section === 1 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors`} 
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors`} 
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
                  <input 
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors" 
                    placeholder="https://linkedin.com/in/yourprofile" 
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button 
                    type="button" 
                    disabled 
                    className="bg-gray-200 text-gray-400 px-6 py-3 cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors inline-flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Section 2: Background */}
              <div className={section === 2 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Your Background</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Current Location *</label>
                  <input 
                    name="currentLocation" 
                    value={formData.currentLocation} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 border ${errors.currentLocation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors`} 
                    placeholder="e.g., San Francisco, Palo Alto, etc."
                  />
                  {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Company Stage</label>
                  <select 
                    name="companyStage" 
                    value={formData.companyStage} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    <option value="">Select stage...</option>
                    <option value="idea">Idea / Pre-product</option>
                    <option value="building">Building MVP</option>
                    <option value="launched">Launched</option>
                    <option value="revenue">Generating Revenue</option>
                    <option value="funded">Seed / Series A</option>
                    <option value="individual">Individual (not a company)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Team Size</label>
                  <select 
                    name="teamSize" 
                    value={formData.teamSize} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    <option value="">Select size...</option>
                    <option value="solo">Solo founder</option>
                    <option value="2-3">2-3 people</option>
                    <option value="4-10">4-10 people</option>
                    <option value="10+">10+ people</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">What are you building? *</label>
                  <textarea 
                    name="whatBuilding" 
                    value={formData.whatBuilding} 
                    onChange={handleChange} 
                    rows={3} 
                    className={`w-full px-4 py-3 border ${errors.whatBuilding ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors`}
                    placeholder="Briefly describe your product, service, or what you're working on"
                  />
                  {errors.whatBuilding && <p className="text-red-500 text-sm mt-1">{errors.whatBuilding}</p>}
                </div>
                <div className="flex justify-between mt-8">
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className="bg-gray-200 text-black px-6 py-3 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors inline-flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Section 3: Relocation Intent */}
              <div className={section === 3 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Dallas Relocation</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Relocation Type</label>
                  <select 
                    name="relocationType" 
                    value={formData.relocationType} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                  >
                    <option value="">Select type...</option>
                    <option value="full">Full relocation</option>
                    <option value="partial">Partial / Dual presence</option>
                    <option value="exploring">Exploring options</option>
                    <option value="already">Already in Dallas</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Timeline *</label>
                  <select 
                    name="timeline" 
                    value={formData.timeline} 
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.timeline ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black transition-colors bg-white`}
                  >
                    <option value="">Select timeline...</option>
                    <option value="immediate">Immediate (0-3 months)</option>
                    <option value="soon">Soon (3-6 months)</option>
                    <option value="later">Later this year</option>
                    <option value="next-year">Next year</option>
                    <option value="undecided">Undecided</option>
                  </select>
                  {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Do you have existing Dallas connections?</label>
                  <textarea 
                    name="dallasConnections" 
                    value={formData.dallasConnections} 
                    onChange={handleChange} 
                    rows={2} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                    placeholder="Friends, colleagues, investors, family, etc."
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className="bg-gray-200 text-black px-6 py-3 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors inline-flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Section 4: Goals */}
              <div className={section === 4 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">What are your primary goals for Dallas establishment?</label>
                  <textarea 
                    name="primaryGoals" 
                    value={formData.primaryGoals} 
                    onChange={handleChange} 
                    rows={3} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                    placeholder="Access to capital, network building, cost reduction, lifestyle, etc."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Networking priorities</label>
                  <textarea 
                    name="networkingPriorities" 
                    value={formData.networkingPriorities} 
                    onChange={handleChange} 
                    rows={3} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                    placeholder="Family offices, funds, operators, energy sector, civic leaders, etc."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Anything else we should know?</label>
                  <textarea 
                    name="anythingElse" 
                    value={formData.anythingElse} 
                    onChange={handleChange} 
                    rows={3} 
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className="bg-gray-200 text-black px-6 py-3 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>Submit Inquiry <Send className="ml-2 h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Discretion note */}
            <div className="mt-12 p-6 bg-gray-50 border-l-2 border-black">
              <p className="text-sm text-gray-600">
                <strong>Discretion is paramount.</strong> All conversations are strictly confidential. 
                We maintain a low-volume, high-trust practice. We'll reach out within 48 hours 
                to schedule a private intake conversation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Apply;
