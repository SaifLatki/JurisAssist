import { FileText, AlertTriangle, Sparkles, Files, Users, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Contract Summaries',
      description: 'Get instant plain-language summaries of complex legal documents in seconds.'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Alerts',
      description: 'AI-powered detection of potential risks and unfavorable clauses in your contracts.'
    },
    {
      icon: Sparkles,
      title: 'AI Clause Suggestions',
      description: 'Smart recommendations for improving contract terms and protecting your interests.'
    },
    {
      icon: Files,
      title: 'Document Comparison',
      description: 'Compare multiple versions of contracts to identify changes and differences.'
    },
    {
      icon: Users,
      title: 'Lawyer Marketplace',
      description: 'Connect with verified legal professionals when you need expert human assistance.'
    }
  ];

  const useCases = [
    {
      title: 'Students',
      description: 'Understand rental agreements, internship contracts, and loan documents without legal jargon.',
      icon: '🎓'
    },
    {
      title: 'Freelancers',
      description: 'Review client contracts, identify red flags, and negotiate better terms confidently.',
      icon: '💼'
    },
    {
      title: 'Small Businesses',
      description: 'Analyze vendor agreements, partnerships, and employment contracts efficiently.',
      icon: '🏢'
    }
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      features: ['3 document summaries/month', 'Basic risk alerts', 'Standard support'],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['50 document summaries/month', 'Advanced risk analysis', 'AI clause suggestions', 'Priority support'],
      highlighted: true
    },
    {
      name: 'Premium',
      price: '$79',
      features: ['Unlimited summaries', 'Document comparison', 'Lawyer marketplace access', '24/7 support'],
      highlighted: false
    },
    {
      name: 'Business',
      price: '$199',
      features: ['Everything in Premium', 'Team collaboration', 'Custom integrations', 'Dedicated account manager'],
      highlighted: false
    }
  ];
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center space-x-2 bg-white/5 border border-[#00C2FF]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#00C2FF]" />
              <span className="text-sm text-gray-300">AI-Powered Legal Technology</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">
              Making Legal Language
            </span>
            <br />
            <span className="text-[#00C2FF]">
              Simple & Accessible
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Upload contracts, agreements, or policies and get instant plain-language summaries,
            risk alerts, and practical insights powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={() => navigate('/login')} className="group px-8 py-4 bg-[#1e293b] border border-[#334155] rounded-lg font-semibold text-white hover:bg-[#334155] hover:shadow-lg hover:shadow-slate-500/30 transition-all duration-300 flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/demo')} className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold text-white hover:bg-white/10 hover:border-[#00C2FF]/50 transition-all duration-300">
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to understand and manage legal documents with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white/5 border border-white/10 rounded-2xl "
                >
                  <div className="w-14 h-14 bg-[#102531] border border-[#00C2FF]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#00C2FF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Who Benefits?</h2>
            <p className="text-gray-400 text-lg">
              Trusted by individuals and businesses across various sectors
            </p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 bg-[#0d141d] border border-white/10 rounded-2xl hover:border-[#00FF88]/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-[#102531] border-[#00C2FF] shadow-xl shadow-[#00C2FF]/20 scale-105'
                    : 'bg-white/5 border-white/10 hover:border-[#00C2FF]/30'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#00C2FF]">{tier.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-300">
                      <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))} 
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-[#00C2FF] text-[#061018] hover:bg-[#33cfff] hover:shadow-lg hover:shadow-[#00C2FF]/50'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
