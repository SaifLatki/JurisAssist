import { Target, Eye, Heart, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Making legal knowledge accessible to everyone, regardless of their background or budget.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear, honest communication about our AI capabilities and limitations.'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'Empowering individuals and businesses to make informed legal decisions.'
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'Building trust through accurate, reliable, and secure AI-powered insights.'
    }
  ];

  const team = [
 {
  name: 'Saifullah Latki',
  role: 'Co-Founder & CEO',
  image: '👨‍💼',
  bio: 'Entrepreneur driven to make legal knowledge simple, accessible, and affordable for everyone.'
},
{
  name: 'Hassan Raza',
  role: 'Co-Founder & CTO',
  image: '👨‍💻',
  bio: 'Tech innovator specializing in AI/ML, focused on building scalable and secure platforms.'
},
{
  name: 'Jitandar Kumar',
  role: 'Co-Founder & COO',
  image: '👨‍🔧',
  bio: 'Operations strategist ensuring smooth execution, user-centered design, and business growth.'
}
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">
             JurisAssist
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to bridge the gap between complex legal language and everyday understanding,
            making legal documents accessible to everyone.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/30 rounded-2xl">
              <div className="w-12 h-12 bg-[#00C2FF]/20 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#00C2FF]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To create a world where legal knowledge is no longer a barrier to fair business practices,
                personal decisions, and equal opportunities. We envision a future where AI assists everyone
                in understanding their legal rights and obligations clearly.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#00FF88]/10 to-transparent border border-[#00FF88]/30 rounded-2xl">
              <div className="w-12 h-12 bg-[#00FF88]/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#00FF88]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To democratize legal understanding by providing AI-powered tools that transform complex
                legal documents into clear, actionable insights. We're committed to helping individuals
                and businesses make informed decisions with confidence.
              </p>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Why This Matters</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Legal documents are often filled with complex terminology and dense language that can be
                intimidating and confusing for the average person. This creates an unfair disadvantage
                for those who cannot afford expensive legal counsel.
              </p>
              <p>
                <span className="text-[#00C2FF] font-semibold">85% of people</span> admit they don’t fully
                understand the contracts they sign, and{" "}
                <span className="text-[#00FF88] font-semibold">60% of small businesses</span> face legal
                issues due to contract misunderstandings.
              </p>
              <p>
               JurisAssist changes this by leveraging cutting-edge artificial intelligence to analyze legal
                documents and provide instant, plain-language explanations that anyone can understand.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00C2FF]/20"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-4xl font-bold text-white text-center mb-4">Meet Our Team</h2>
          <p className="text-gray-400 text-center mb-12">
            Guided by <span className="text-[#00C2FF] font-semibold">Madam Mubeena Ahsan</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00C2FF]/20"
              >
                <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform">
                  {member.image}
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">{member.name}</h3>
                <p className="text-[#00C2FF] text-center mb-4 font-medium">{member.role}</p>
                <p className="text-gray-400 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
