import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Handshake, Building2, TrendingUp, Network, DollarSign, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const useTypewriter = (text: string, speed: number = 100, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, started]);

  return { displayText, isComplete };
};

const Index = () => {
  useEffect(() => {
    document.title = "ForeBridge — SF to Dallas Advisory";
  }, []);

  const mainText = "If you're not at the table,";
  const subText = "you're on the menu.";
  const typingSpeed = 40;
  const mainTextDelay = 0;
  const subTextDelay = mainText.length * typingSpeed + 300;

  const { displayText: typedMainText, isComplete: mainTextComplete } = useTypewriter(mainText, typingSpeed, mainTextDelay);
  const { displayText: typedSubText, isComplete: subTextComplete } = useTypewriter(subText, typingSpeed, subTextDelay);

  const isTypingComplete = mainTextComplete && subTextComplete;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20 bg-white" aria-label="Hero">
          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              {/* SEO-friendly h1 - visually hidden but crawlable */}
              <h1 className="sr-only">
                ForeBridge Advisory Services - San Francisco to Dallas Startup Relocation and Network Access for Bay Area Founders
              </h1>
              <p className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6" aria-live="polite" role="heading" aria-level={2}>
                {typedMainText} <br />
                <span className="inline-block mt-2">{typedSubText}</span>
              </p>
            <div className={`transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-3xl mb-4">
                We bring the fastest-growing companies to the fastest-growing metros.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mb-8">
                Simple, seamless, and smooth. ForeBridge bridges the gap between San Francisco innovation and Texas opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/apply" 
                  className="bg-black text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
                >
                  Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a 
                  href="#services" 
                  className="border border-black px-8 py-4 text-base font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="services" className={`py-16 md:py-24 bg-gray-50 transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-center">What We Do</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            ForeBridge Advisory Services is a Dallas-focused market-entry and establishment advisory firm for Bay Area founders relocating to Texas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-4">Dallas Entry Strategy</h3>
              <p className="text-gray-600">
                Define how you should be positioned inside Dallas from day one. Cultural navigation, reputational guidance, and strategic visibility planning.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <Network className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-4">Network Access</h3>
              <p className="text-gray-600">
                Introductions to Dallas operators, energy leaders, family offices, and capital. Intentional, limited introductions with emphasis on depth over volume.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center border border-black rounded-full mb-6">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-4">Relocation Advisory</h3>
              <p className="text-gray-600">
                Minimize friction and decision fatigue during your move. Housing, workspace, timing guidance, and ongoing decision support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why ForeBridge Section */}
      <section id="why-us" className={`py-16 md:py-24 bg-white transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-16 text-center">Why ForeBridge?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="mb-4">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Deep SF Ties</h3>
              <p className="text-gray-600">
                We understand the AI scene in San Francisco and know the opportunities you're looking for. Bay Area fluency meets Texas execution.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Dallas Networks</h3>
              <p className="text-gray-600">
                Access to Dallas funds, family offices, and the right operators. We know who matters and how to make introductions count.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Discretion First</h3>
              <p className="text-gray-600">
                High-trust advisory relationships with strict discretion. No mass networking, no public programming—just results.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Tangible Value</h3>
              <p className="text-gray-600">
                Startup credits for AI software, cost efficiency analysis, and measurable economic benefits from early relocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section id="clients" className={`py-16 md:py-24 bg-gray-50 transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Who We Work With</h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-black pl-6">
                <p className="text-lg text-gray-700">
                  Productive, innovative individuals or very early teams with Bay Area background or current presence.
                </p>
              </div>
              <div className="border-l-2 border-black pl-6">
                <p className="text-lg text-gray-700">
                  Pre-funding or lightly capitalized founders with strong technical, product, or operational capability.
                </p>
              </div>
              <div className="border-l-2 border-black pl-6">
                <p className="text-lg text-gray-700">
                  High autonomy in decision-making. Willingness to relocate and integrate into Dallas business culture.
                </p>
              </div>
              <div className="border-l-2 border-black pl-6">
                <p className="text-lg text-gray-700">
                  Personal credibility and judgment. Receptivity to guidance on local norms and pace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Process Section */}
      <section id="process" className={`py-16 md:py-24 bg-black text-white transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-16 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-display text-gray-800">01</span>
              </div>
              <div className="mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Intake</h3>
              <p className="text-gray-400">
                Private intake conversations. Assessment of background, intent, and trajectory. Cultural and reputational risk assessment.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-display text-gray-800">02</span>
              </div>
              <div className="mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Position</h3>
              <p className="text-gray-400">
                Dallas entry strategy. Identification of relevant circles—energy, operators, capital, civic. Appropriate visibility planning.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-display text-gray-800">03</span>
              </div>
              <div className="mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Relocate</h3>
              <p className="text-gray-400">
                Timing guidance, housing recommendations, workspace advisory. Coordination with service providers and ongoing support.
              </p>
            </div>
            
            <div className="relative p-6 border border-gray-800">
              <div className="absolute top-6 right-6">
                <span className="text-3xl font-display text-gray-800">04</span>
              </div>
              <div className="mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-3">Establish</h3>
              <p className="text-gray-400">
                Introductions converting into durable relationships. Sequenced relationship building. Credible Dallas presence.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/apply" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className={`py-16 md:py-24 bg-white transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-center">Tangible Offerings</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Beyond advisory, we provide concrete resources to accelerate your Dallas establishment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-8">
              <h3 className="font-display text-xl mb-4">Startup Credits</h3>
              <p className="text-gray-600 mb-4">
                Access to AI software credits and startup programs. Reduce your operational costs from day one.
              </p>
              <span className="text-sm text-gray-400">Available to qualifying clients</span>
            </div>
            
            <div className="border border-gray-200 p-8">
              <h3 className="font-display text-xl mb-4">Regional Incentives</h3>
              <p className="text-gray-600 mb-4">
                Navigation of Texas incentive programs and regional opportunities. We know what's available and how to access it.
              </p>
              <span className="text-sm text-gray-400">Tailored to your situation</span>
            </div>
            
            <div className="border border-gray-200 p-8">
              <h3 className="font-display text-xl mb-4">Cost Efficiency</h3>
              <p className="text-gray-600 mb-4">
                Pre-move baseline costs vs. post-move actuals. Measure realized savings across defined categories.
              </p>
              <span className="text-sm text-gray-400">Transparent calculations</span>
            </div>
          </div>
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
