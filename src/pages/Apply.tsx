import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface CoFounder {
  name: string;
  title: string;
  linkedIn: string;
  experience: string;
}

interface FormData {
  // Contact Info (new Section 1)
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  // Section 2 (was Section 1)
  whatBuilding: string;
  productDescription: string;
  problem: string;
  whyBetter: string;
  marketFind: string;
  isPivot: string; // 'Yes' | 'No'
  pivotExplanation: string;
  // Section 3 (was Section 2)
  progress: string; // 'Idea' | 'Prototype' | 'Launched' | 'Revenue'
  peopleUsing: string; // 'Yes' | 'No'
  userCount: string;
  hasRevenue: string; // 'Yes' | 'No'
  mrr: string;
  keyMetrics: string;
  growthRate: string;
  userAcquisition: string;
  // Section 4 (was Section 3)
  soloFounder: string; // 'Yes' | 'No'
  whyYou: string;
  soloVision: string;
  coFounders: CoFounder[];
  teamVision: string;
  workedTogether: string; // 'Yes' | 'No'
  previousCollab: string;
  // Section 5 (was Section 4)
  fundraising: string; // 'Yes' | 'No'
  fundraisingAmount: string;
  hasInvestors: string; // 'Yes' | 'No'
  investors: string;
  anythingElse: string;
}

const initialFormData: FormData = {
  // Contact Info
  fullName: '',
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  twitter: '',
  instagram: '',
  // Section 2
  whatBuilding: '',
  productDescription: '',
  problem: '',
  whyBetter: '',
  marketFind: '',
  isPivot: '',
  pivotExplanation: '',
  // Section 3
  progress: '',
  peopleUsing: '',
  userCount: '',
  hasRevenue: '',
  mrr: '',
  keyMetrics: '',
  growthRate: '',
  userAcquisition: '',
  // Section 4
  soloFounder: '',
  whyYou: '',
  soloVision: '',
  coFounders: [{ name: '', title: '', linkedIn: '', experience: '' }],
  teamVision: '',
  workedTogether: '',
  previousCollab: '',
  // Section 5
  fundraising: '',
  fundraisingAmount: '',
  hasInvestors: '',
  investors: '',
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
    document.title = "Apply - 30under30.ai";
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

  const handleCoFounderChange = (idx: number, field: keyof CoFounder, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.coFounders];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, coFounders: updated };
    });
  };

  const addCoFounder = () => {
    setFormData((prev) => ({ ...prev, coFounders: [...prev.coFounders, { name: '', title: '', linkedIn: '', experience: '' }] }));
  };

  const removeCoFounder = (idx: number) => {
    setFormData((prev) => {
      const updated = prev.coFounders.filter((_, i) => i !== idx);
      return { ...prev, coFounders: updated };
    });
  };

  const validateSection = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (section === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Required';
      // All other fields are optional
    } else if (section === 2) {
      if (!formData.whatBuilding.trim()) newErrors.whatBuilding = 'Required';
      if (!formData.productDescription.trim()) newErrors.productDescription = 'Required';
      if (!formData.problem.trim()) newErrors.problem = 'Required';
      if (!formData.whyBetter.trim()) newErrors.whyBetter = 'Required';
      if (!formData.marketFind.trim()) newErrors.marketFind = 'Required';
      if (!formData.isPivot) newErrors.isPivot = 'Required';
      if (formData.isPivot === 'Yes' && !formData.pivotExplanation.trim()) newErrors.pivotExplanation = 'Required';
    } else if (section === 3) {
      if (!formData.progress) newErrors.progress = 'Required';
      if (!formData.peopleUsing) newErrors.peopleUsing = 'Required';
      if (formData.peopleUsing === 'Yes' && !formData.userCount.trim()) newErrors.userCount = 'Required';
      if (!formData.hasRevenue) newErrors.hasRevenue = 'Required';
      if (formData.hasRevenue === 'Yes' && !formData.mrr.trim()) newErrors.mrr = 'Required';
      if (!formData.userAcquisition.trim()) newErrors.userAcquisition = 'Required';
    } else if (section === 4) {
      if (!formData.soloFounder) newErrors.soloFounder = 'Required';
      if (formData.soloFounder === 'Yes') {
        if (!formData.whyYou.trim()) newErrors.whyYou = 'Required';
        if (!formData.soloVision.trim()) newErrors.soloVision = 'Required';
      } else {
        formData.coFounders.forEach((cf, idx) => {
          if (!cf.name.trim()) newErrors[`coFounders_${idx}_name`] = 'Required';
          if (!cf.title.trim()) newErrors[`coFounders_${idx}_title`] = 'Required';
          if (!cf.linkedIn.trim()) newErrors[`coFounders_${idx}_linkedIn`] = 'Required';
          if (!cf.experience.trim()) newErrors[`coFounders_${idx}_experience`] = 'Required';
        });
        if (!formData.teamVision.trim()) newErrors.teamVision = 'Required';
        if (!formData.workedTogether) newErrors.workedTogether = 'Required';
        if (formData.workedTogether === 'Yes' && !formData.previousCollab.trim()) newErrors.previousCollab = 'Required';
      }
    } else if (section === 5) {
      if (formData.fundraising === 'Yes' && !formData.fundraisingAmount.trim()) newErrors.fundraisingAmount = 'Required';
      if (formData.hasInvestors === 'Yes' && !formData.investors.trim()) newErrors.investors = 'Required';
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
          title: "Application Submitted",
          description: "Thank you for applying to 30under30.ai! We'll review your application and get back to you soon.",
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
      <section className="pt-24 pb-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl mb-2">Apply to 30under30.ai</h1>
            <p className="text-lg text-gray-600 mb-8">Join us in San Francisco for 3 months to build, launch, and scale your product to 30K.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Contact Information */}
              <div className={section === 1 ? 'block transition-all duration-500' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Section 1: Contact Information</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                  <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">LinkedIn (optional)</label>
                  <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 focus:outline-none" placeholder="https://linkedin.com/in/yourusername" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">GitHub (optional)</label>
                  <input name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 focus:outline-none" placeholder="https://github.com/yourusername" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Twitter (optional)</label>
                  <input name="twitter" value={formData.twitter} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 focus:outline-none" placeholder="https://twitter.com/yourusername" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Instagram (optional)</label>
                  <input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 focus:outline-none" placeholder="https://instagram.com/yourusername" />
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded cursor-not-allowed">Back</button>
                  <button type="button" onClick={handleNext} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">Next</button>
                </div>
              </div>
              {/* Section 2: The Idea and Problem */}
              <div className={section === 2 ? 'block transition-all duration-500' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Section 2: The Idea and Problem</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">What are you building? *</label>
                  <input name="whatBuilding" value={formData.whatBuilding} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.whatBuilding ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.whatBuilding && <p className="text-red-500 text-sm">{errors.whatBuilding}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Briefly describe your product or service. *</label>
                  <textarea name="productDescription" value={formData.productDescription} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.productDescription ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.productDescription && <p className="text-red-500 text-sm">{errors.productDescription}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">What problem are you solving? *</label>
                  <textarea name="problem" value={formData.problem} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.problem ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Why is your solution better than existing ones? *</label>
                  <textarea name="whyBetter" value={formData.whyBetter} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.whyBetter ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.whyBetter && <p className="text-red-500 text-sm">{errors.whyBetter}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">How will your target market find you? *</label>
                  <input name="marketFind" value={formData.marketFind} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.marketFind ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                  {errors.marketFind && <p className="text-red-500 text-sm">{errors.marketFind}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Is this a pivot from a previous idea? *</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="isPivot" value="Yes" checked={formData.isPivot === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="isPivot" value="No" checked={formData.isPivot === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                  {errors.isPivot && <p className="text-red-500 text-sm">{errors.isPivot}</p>}
                </div>
                {formData.isPivot === 'Yes' && (
                  <div className="mb-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-1">If "Yes," please explain the pivot and what you learned. *</label>
                    <textarea name="pivotExplanation" value={formData.pivotExplanation} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.pivotExplanation ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                    {errors.pivotExplanation && <p className="text-red-500 text-sm">{errors.pivotExplanation}</p>}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-black px-6 py-3 rounded hover:bg-gray-300 transition-colors">Back</button>
                  <button type="button" onClick={handleNext} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">Next</button>
                </div>
              </div>
              {/* Section 3: Traction and Performance */}
              <div className={section === 3 ? 'block transition-all duration-500' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Section 3: Traction and Performance</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">How far along are you? *</label>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="progress" value="Idea" checked={formData.progress === 'Idea'} onChange={handleChange} className="mr-2" />Idea stage</label>
                    <label className="flex items-center"><input type="radio" name="progress" value="Prototype" checked={formData.progress === 'Prototype'} onChange={handleChange} className="mr-2" />Prototype</label>
                    <label className="flex items-center"><input type="radio" name="progress" value="Launched" checked={formData.progress === 'Launched'} onChange={handleChange} className="mr-2" />Launched</label>
                    <label className="flex items-center"><input type="radio" name="progress" value="Revenue" checked={formData.progress === 'Revenue'} onChange={handleChange} className="mr-2" />Generating revenue</label>
                  </div>
                  {errors.progress && <p className="text-red-500 text-sm">{errors.progress}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Are people using your product? *</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="peopleUsing" value="Yes" checked={formData.peopleUsing === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="peopleUsing" value="No" checked={formData.peopleUsing === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                  {errors.peopleUsing && <p className="text-red-500 text-sm">{errors.peopleUsing}</p>}
                </div>
                {formData.peopleUsing === 'Yes' && (
                  <div className="mb-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-1">If "Yes," how many users? *</label>
                    <input name="userCount" value={formData.userCount} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.userCount ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                    {errors.userCount && <p className="text-red-500 text-sm">{errors.userCount}</p>}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Do you have revenue? *</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="hasRevenue" value="Yes" checked={formData.hasRevenue === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="hasRevenue" value="No" checked={formData.hasRevenue === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                  {errors.hasRevenue && <p className="text-red-500 text-sm">{errors.hasRevenue}</p>}
                </div>
                {formData.hasRevenue === 'Yes' && (
                  <div className="mb-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-1">If "Yes," how much MRR? *</label>
                    <input name="mrr" value={formData.mrr} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.mrr ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                    {errors.mrr && <p className="text-red-500 text-sm">{errors.mrr}</p>}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">How do you acquire users? *</label>
                  <input name="userAcquisition" value={formData.userAcquisition} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.userAcquisition ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} placeholder="Briefly describe your growth channels and strategies" />
                  {errors.userAcquisition && <p className="text-red-500 text-sm">{errors.userAcquisition}</p>}
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-black px-6 py-3 rounded hover:bg-gray-300 transition-colors">Back</button>
                  <button type="button" onClick={handleNext} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">Next</button>
                </div>
              </div>
              {/* Section 4: The Team and Founders */}
              <div className={section === 4 ? 'block transition-all duration-500' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Section 4: The Team and Founders</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Are you a Solo Founder? *</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="soloFounder" value="Yes" checked={formData.soloFounder === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="soloFounder" value="No" checked={formData.soloFounder === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                  {errors.soloFounder && <p className="text-red-500 text-sm">{errors.soloFounder}</p>}
                </div>
                {formData.soloFounder === 'Yes' && (
                  <div className="animate-fade-in">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Why are you the right person to solve this problem? *</label>
                      <textarea name="whyYou" value={formData.whyYou} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.whyYou ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                      {errors.whyYou && <p className="text-red-500 text-sm">{errors.whyYou}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">What is your vision for the company's future? *</label>
                      <textarea name="soloVision" value={formData.soloVision} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.soloVision ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                      {errors.soloVision && <p className="text-red-500 text-sm">{errors.soloVision}</p>}
                    </div>
                  </div>
                )}
                {formData.soloFounder === 'No' && (
                  <div className="animate-fade-in">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">How many co-founders are there?</label>
                      <div className="flex gap-2 items-center">
                        <span>{formData.coFounders.length}</span>
                        <button type="button" onClick={addCoFounder} className="ml-2 px-2 py-1 bg-gray-200 rounded">Add</button>
                        {formData.coFounders.length > 1 && (
                          <button type="button" onClick={() => removeCoFounder(formData.coFounders.length - 1)} className="ml-2 px-2 py-1 bg-gray-200 rounded">Remove</button>
                        )}
                      </div>
                    </div>
                    {formData.coFounders.map((cf, idx) => (
                      <div key={idx} className="mb-4 border p-4 rounded bg-gray-50">
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">Name *</label>
                          <input value={cf.name} onChange={e => handleCoFounderChange(idx, 'name', e.target.value)} className={`w-full px-4 py-2 border ${errors[`coFounders_${idx}_name`] ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                          {errors[`coFounders_${idx}_name`] && <p className="text-red-500 text-sm">{errors[`coFounders_${idx}_name`]}</p>}
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">Title *</label>
                          <input value={cf.title} onChange={e => handleCoFounderChange(idx, 'title', e.target.value)} className={`w-full px-4 py-2 border ${errors[`coFounders_${idx}_title`] ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                          {errors[`coFounders_${idx}_title`] && <p className="text-red-500 text-sm">{errors[`coFounders_${idx}_title`]}</p>}
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">LinkedIn *</label>
                          <input value={cf.linkedIn} onChange={e => handleCoFounderChange(idx, 'linkedIn', e.target.value)} className={`w-full px-4 py-2 border ${errors[`coFounders_${idx}_linkedIn`] ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                          {errors[`coFounders_${idx}_linkedIn`] && <p className="text-red-500 text-sm">{errors[`coFounders_${idx}_linkedIn`]}</p>}
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">Experience and expertise *</label>
                          <textarea value={cf.experience} onChange={e => handleCoFounderChange(idx, 'experience', e.target.value)} rows={2} className={`w-full px-4 py-2 border ${errors[`coFounders_${idx}_experience`] ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                          {errors[`coFounders_${idx}_experience`] && <p className="text-red-500 text-sm">{errors[`coFounders_${idx}_experience`]}</p>}
                        </div>
                      </div>
                    ))}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Why is your team uniquely positioned to solve this problem? *</label>
                      <textarea name="teamVision" value={formData.teamVision} onChange={handleChange} rows={3} className={`w-full px-4 py-3 border ${errors.teamVision ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                      {errors.teamVision && <p className="text-red-500 text-sm">{errors.teamVision}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Have you worked together before? *</label>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center"><input type="radio" name="workedTogether" value="Yes" checked={formData.workedTogether === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                        <label className="flex items-center"><input type="radio" name="workedTogether" value="No" checked={formData.workedTogether === 'No'} onChange={handleChange} className="mr-2" />No</label>
                      </div>
                      {errors.workedTogether && <p className="text-red-500 text-sm">{errors.workedTogether}</p>}
                    </div>
                    {formData.workedTogether === 'Yes' && (
                      <div className="mb-4 animate-fade-in">
                        <label className="block text-sm font-medium mb-1">If "Yes," describe your previous collaborations. *</label>
                        <textarea name="previousCollab" value={formData.previousCollab} onChange={handleChange} rows={2} className={`w-full px-4 py-2 border ${errors.previousCollab ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                        {errors.previousCollab && <p className="text-red-500 text-sm">{errors.previousCollab}</p>}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-black px-6 py-3 rounded hover:bg-gray-300 transition-colors">Back</button>
                  <button type="button" onClick={handleNext} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">Next</button>
                </div>
              </div>
              {/* Section 5: Additional Information (Optional) */}
              <div className={section === 5 ? 'block transition-all duration-500' : 'hidden'}>
                <h2 className="text-xl font-semibold mb-4">Section 5: Additional Information (Optional)</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Are you currently fundraising?</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="fundraising" value="Yes" checked={formData.fundraising === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="fundraising" value="No" checked={formData.fundraising === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                </div>
                {formData.fundraising === 'Yes' && (
                  <div className="mb-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-1">If "Yes," how much?</label>
                    <input name="fundraisingAmount" value={formData.fundraisingAmount} onChange={handleChange} className={`w-full px-4 py-3 border ${errors.fundraisingAmount ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                    {errors.fundraisingAmount && <p className="text-red-500 text-sm">{errors.fundraisingAmount}</p>}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Do you have any notable investors or advisors?</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="hasInvestors" value="Yes" checked={formData.hasInvestors === 'Yes'} onChange={handleChange} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="hasInvestors" value="No" checked={formData.hasInvestors === 'No'} onChange={handleChange} className="mr-2" />No</label>
                  </div>
                </div>
                {formData.hasInvestors === 'Yes' && (
                  <div className="mb-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-1">If "Yes," list them.</label>
                    <textarea name="investors" value={formData.investors} onChange={handleChange} rows={2} className={`w-full px-4 py-2 border ${errors.investors ? 'border-red-500' : 'border-gray-300'} focus:outline-none`} />
                    {errors.investors && <p className="text-red-500 text-sm">{errors.investors}</p>}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Is there anything else we should know?</label>
                  <textarea name="anythingElse" value={formData.anythingElse} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-300 focus:outline-none" />
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-black px-6 py-3 rounded hover:bg-gray-300 transition-colors">Back</button>
                  <button type="submit" disabled={isSubmitting} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center">
                    {isSubmitting ? (<span>Submitting...</span>) : (<>Submit Application <Send className="ml-2 h-4 w-4" /></>)}
                  </button>
                </div>
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
