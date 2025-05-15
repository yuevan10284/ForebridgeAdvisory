
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Rocket, TrendingUp, Award, CalendarDays } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = "30under30.ai - Build. Launch. Scale.";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in">
              Build. Launch. Scale <br />
              <span className="inline-block mt-2">— 30 Days to 30K.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-3xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Join the accelerator that takes you from zero to 30,000 users or $30,000 MRR in just one month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link 
                to="/apply" 
                className="bg-black text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
              >
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a 
                href="#what-we-do" 
                className="border border-black px-8 py-4 text-base font-medium hover:bg-black hover:text-white transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Build</h3>
              <p className="text-gray-600">
                Hands-on MVP creation with guidance from experienced founders. Get your product ready for market testing in record time.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Launch</h3>
              <p className="text-gray-600">
                Product testing and iteration based on real user feedback. Refine your offering to match market needs perfectly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Scale</h3>
              <p className="text-gray-600">
                Sprint to 30k users or 30k MRR with proven growth strategies tailored to your specific product and market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why 30under30.ai Section */}
      <section id="why-us" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Why 30under30.ai?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SF Immersion</h3>
              <p className="text-gray-600">
                Build in the heart of tech, surrounded by innovation and opportunity. Network with industry leaders and investors.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Mentorship</h3>
              <p className="text-gray-600">
                Work directly with experienced founders who have scaled successful businesses and know what it takes to succeed.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Coverage</h3>
              <p className="text-gray-600">
                We handle housing, workspace, and tools — you focus entirely on building and growing your product.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">30-Day Sprint</h3>
              <p className="text-gray-600">
                Achieve rapid growth in just one month by following our structured program designed for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Process Section */}
      <section id="process" className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">The Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-bold text-gray-800">01</span>
              </div>
              <div className="mb-4">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply</h3>
              <p className="text-gray-400">
                Submit your application and share your startup vision. We select only 2-3 teams per cohort.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-bold text-gray-800">02</span>
              </div>
              <div className="mb-4">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Build</h3>
              <p className="text-gray-400">
                Move to SF and start developing your product with our team of experienced mentors.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-bold text-gray-800">03</span>
              </div>
              <div className="mb-4">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sprint</h3>
              <p className="text-gray-400">
                Enter our intensive 30-day growth program focused on reaching your 30k target.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-bold text-gray-800">04</span>
              </div>
              <div className="mb-4">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scale</h3>
              <p className="text-gray-400">
                Continue growing beyond the program with our extended support and investor network.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/apply" 
              className="bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
