import { Upload, Brain, CheckCircle, TrendingUp, DollarSign, PieChart } from 'lucide-react';

export default function Operations() {
  const operationalSteps = [
    {
      icon: Upload,
      step: 'Step 1',
      title: 'User Uploads Document',
      description: 'User uploads contract, agreement, or legal document through web interface or mobile app'
    },
    {
      icon: Brain,
      step: 'Step 2',
      title: 'AI Analysis',
      description: 'Our AI engine processes the document, extracting key clauses, identifying risks, and generating insights'
    },
    {
      icon: CheckCircle,
      step: 'Step 3',
      title: 'Results Delivered',
      description: 'User receives plain-language summary, risk alerts, and actionable recommendations instantly'
    },
    {
      icon: TrendingUp,
      step: 'Step 4',
      title: 'Upgrade or Consult',
      description: 'User can upgrade for advanced features or connect with a lawyer through our marketplace'
    }
  ];

  const financialData = {
    year1: { revenue: 250000, expenses: 180000, profit: 70000 },
    year2: { revenue: 750000, expenses: 450000, profit: 300000 },
    year3: { revenue: 1800000, expenses: 900000, profit: 900000 }
  };

  const expenseBreakdown = [
    { category: 'Development & AI', percentage: 35, color: '#00C2FF' },
    { category: 'Marketing & Sales', percentage: 25, color: '#00FF88' },
    { category: 'Operations', percentage: 20, color: '#00A8CC' },
    { category: 'Legal & Compliance', percentage: 12, color: '#00DD77' },
    { category: 'Other', percentage: 8, color: '#0088AA' }
  ];

  const revenueStreams = [
    { stream: 'Subscription Plans', contribution: '60%', description: 'Pro, Premium, and Business tier monthly/annual subscriptions' },
    { stream: 'Lawyer Marketplace', contribution: '25%', description: 'Commission on successful lawyer consultations and document reviews' },
    { stream: 'Enterprise Solutions', contribution: '15%', description: 'Custom integrations and white-label solutions for businesses' }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Operations & <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">Financials</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our operational workflow and financial projections
          </p>
        </div>

        {/* Operational Plan */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Operational Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationalSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-[#00C2FF]/50 transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[#00C2FF]" />
                    </div>
                    <span className="text-sm text-[#00C2FF] font-semibold">{step.step}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {index < operationalSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#00C2FF] to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Financial Projection */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-white text-center mb-4">3-Year Financial Projection</h2>
          <p className="text-gray-400 text-center mb-12">All figures in USD</p>

          {/* Yearly Financials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {['year1', 'year2', 'year3'].map((year, idx) => {
              const data = financialData[year];
              return (
                <div
                  key={year}
                  className={`p-8 rounded-2xl border transition-all duration-300 ${
                    idx === 2
                      ? 'bg-gradient-to-br from-[#00C2FF]/10 to-[#00FF88]/10 border-[#00C2FF] shadow-xl shadow-[#00C2FF]/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Year {idx + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 text-sm">Revenue</span>
                      <p className="text-3xl font-bold text-[#00C2FF]">${(data.revenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Expenses</span>
                      <p className="text-2xl font-semibold text-gray-300">${(data.expenses / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-gray-400 text-sm">Net Profit</span>
                      <p className="text-3xl font-bold text-[#00FF88]">${(data.profit / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expense & Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Expense Breakdown */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <PieChart className="w-6 h-6 text-[#00C2FF]" />
                <h3 className="text-2xl font-bold text-white">Expense Breakdown</h3>
              </div>
              <div className="space-y-4">
                {expenseBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">{item.category}</span>
                      <span className="text-white font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Streams */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="w-6 h-6 text-[#00FF88]" />
                <h3 className="text-2xl font-bold text-white">Revenue Streams</h3>
              </div>
              <div className="space-y-6">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{stream.stream}</h4>
                      <span className="text-[#00FF88] font-bold text-lg">{stream.contribution}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{stream.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
