import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, MapPin, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const JobTrackingMetrics = ({ data }) => {
  const [activeView, setActiveView] = useState('timeline');

  const viewOptions = [
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'regions', label: 'Regions', icon: MapPin },
    { id: 'types', label: 'Job Types', icon: Briefcase }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatSalary = (amount) => {
    return `GHS ${amount?.toLocaleString() || 0}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((pld, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${pld?.dataKey}: ${pld?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeView) {
      case 'timeline':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data?.applicationsByMonth || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="applications" fill="#3B82F6" radius={[2, 2, 0, 0]} name="Applications" />
              <Bar dataKey="interviews" fill="#10B981" radius={[2, 2, 0, 0]} name="Interviews" />
              <Bar dataKey="offers" fill="#F59E0B" radius={[2, 2, 0, 0]} name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'regions':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data?.applicationsByRegion || []}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ region, percent }) => `${region} ${(percent * 100)?.toFixed(0)}%`}
              >
                {data?.applicationsByRegion?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'types':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data?.applicationsByJobType || []} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="type" type="category" stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const totalApplications = data?.applicationsByMonth?.reduce((sum, month) => sum + month?.applications, 0) || 0;
  const totalInterviews = data?.applicationsByMonth?.reduce((sum, month) => sum + month?.interviews, 0) || 0;
  const totalOffers = data?.applicationsByMonth?.reduce((sum, month) => sum + month?.offers, 0) || 0;
  const conversionRate = totalApplications > 0 ? ((totalOffers / totalApplications) * 100)?.toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">Job Application Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your job search progress and success rates
          </p>
        </div>

        {/* View Selector */}
        <div className="flex bg-muted rounded-lg p-1">
          {viewOptions?.map((view) => {
            const IconComponent = view?.icon;
            const isActive = activeView === view?.id;
            
            return (
              <button
                key={view?.id}
                onClick={() => setActiveView(view?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{view?.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        {renderChart()}
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Briefcase className="w-5 h-5 text-blue-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-foreground">{totalApplications}</div>
          <div className="text-sm text-muted-foreground">Total Applications</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-green-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-foreground">{totalInterviews}</div>
          <div className="text-sm text-muted-foreground">Interviews</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-foreground">{totalOffers}</div>
          <div className="text-sm text-muted-foreground">Offers</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-purple-600 mr-1" />
          </div>
          <div className="text-2xl font-bold text-foreground">{conversionRate}%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
      </div>
      {/* Regional Insights */}
      {activeView === 'regions' && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4">Regional Success Rates</h4>
          <div className="space-y-3">
            {data?.applicationsByRegion?.map((region, index) => {
              const successRate = region?.count > 0 ? ((region?.success / region?.count) * 100)?.toFixed(1) : 0;
              return (
                <div key={region?.region} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    />
                    <span className="text-sm font-medium text-foreground">{region?.region}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{successRate}%</div>
                    <div className="text-xs text-muted-foreground">{region?.success}/{region?.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default JobTrackingMetrics;