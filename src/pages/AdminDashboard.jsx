import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Chart from 'chart.js/auto';
import { 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  Heart, 
  Download, 
  Filter,
  ArrowUpRight,
  Monitor
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for charts
  const wasteDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const estimatedWaste = [120, 130, 125, 140, 150, 160, 170];
  const actualWaste = [100, 110, 105, 115, 120, 130, 135];

  const savingsData = [
    { name: 'Week 1', value: 14500 },
    { name: 'Week 2', value: 19800 },
    { name: 'Week 3', value: 22500 },
    { name: 'Week 4', value: 26400 },
    { name: 'Week 5', value: 30900 },
    { name: 'Week 6', value: 35200 },
  ];

  const categoryData = [
    { name: 'Pre-Orders', value: 520, color: '#059669' },
    { name: 'Flash Deals', value: 270, color: '#f59e0b' },
    { name: 'Donations', value: 210, color: '#ec4899' },
  ];
  const recentDonations = [
    { ngo: 'Goonj Foundation', meals: 64, time: '35m ago', status: 'Verified' },
    { ngo: 'Feeding India', meals: 42, time: '1h ago', status: 'Verified' },
    { ngo: 'Robin Hood Army', meals: 58, time: '3h ago', status: 'Verified' },
    { ngo: 'No Food Waste', meals: 36, time: '6h ago', status: 'Verified' },
  ];

  useEffect(() => {
    const canvasElement = document.getElementById('wasteChart');
    if (!canvasElement) {
      return undefined;
    }

    const existingChart = Chart.getChart(canvasElement);
    if (existingChart) {
      existingChart.destroy();
    }

    const wasteChart = new Chart(canvasElement, {
      type: 'line',
      data: {
        labels: wasteDays,
        datasets: [
          {
            label: 'Before',
            data: estimatedWaste,
            borderColor: '#d1d5db',
            backgroundColor: '#d1d5db',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderWidth: 2,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#d1d5db',
            fill: false,
          },
          {
            label: 'With WasteNot',
            data: actualWaste,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderWidth: 2,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#10b981',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              color: '#334155',
              font: {
                weight: 600,
              },
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y} KG`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#64748b',
            },
          },
          y: {
            title: {
              display: true,
              text: 'KG of Waste',
              color: '#64748b',
              font: {
                weight: 600,
              },
            },
            ticks: {
              color: '#64748b',
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.18)',
            },
          },
        },
      },
    });

    return () => {
      wasteChart.destroy();
    };
  }, []);

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Monitor size={16} /> Command Center
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Performance Dashboard</h1>
            <p className="text-slate-500">Real-time metrics for canteen efficiency and waste reduction.</p>
          </div>
          <div className="flex gap-3">
             <button className="btn-secondary py-3 px-6 flex items-center gap-2">
               <Filter size={18} /> Filters
             </button>
             <button className="btn-primary py-3 px-6 flex items-center gap-2">
               <Download size={18} /> Export PDF
             </button>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard label="Active Orders" value="142" trend="+12%" icon={ShoppingBag} />
          <KPICard label="Waste Reduced" value="48%" trend="-8.2%" icon={TrendingDown} color="emerald" />
          <KPICard label="Impact Score" value="9.4" trend="+0.2" icon={Heart} color="pink" />
          <KPICard label="Total Savings" value="₹85k" trend="+₹12k" icon={Users} color="amber" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Chart - Waste Trend */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
               <div>
                 <h3 className="text-xl font-bold text-slate-900">Waste Reduction Trend</h3>
                 <p className="text-sm text-slate-500">Estimated KG vs Actual KG per day</p>
               </div>
               <div className="flex gap-4 text-xs font-bold">
                 <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200" /> Before</div>
                 <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500" /> With WasteNot</div>
               </div>
            </div>
            <div className="h-80 w-full">
              <canvas id="wasteChart" />
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-900 mb-8">Efficiency Distribution</h3>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="space-y-4 mt-4">
                {categoryData.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-medium text-slate-600">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{cat.value}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>

        {/* Bottom Section - Performance Table & Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-900 mb-8">Savings Growth</h3>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={savingsData}>
                   <defs>
                     <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <Tooltip />
                   <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-900">Recent Donations</h3>
               <button className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                 View All <ArrowUpRight size={14} />
               </button>
             </div>
             <div className="space-y-6">
                {recentDonations.map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs">
                        {row.ngo.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{row.ngo}</div>
                        <div className="text-xs text-slate-400">{row.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-emerald-600">{row.meals} Meals</div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{row.status}</div>
                    </div>
                  </div>
                ))}
             </div>
           </div>

        </div>

      </div>
    </div>
  );
};

const KPICard = ({ label, value, trend, icon: Icon, color = 'emerald' }) => {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    pink: 'bg-pink-50 text-pink-600',
    slate: 'bg-slate-50 text-slate-600'
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {trend}
        </span>
      </div>
      <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  );
};

export default AdminDashboard;
