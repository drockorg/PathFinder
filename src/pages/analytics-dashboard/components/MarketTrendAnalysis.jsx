import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MapPin, Building2, DollarSign, Users, Zap } from 'lucide-react';

const MarketTrendAnalysis = ({ data }) => {
  const [activeView, setActiveView] = useState('skills');

  const viewOptions = [
    { id: 'skills', label: 'Skills Demand', icon: Zap },
    { id: 'regions', label: 'Regional Trends', icon: MapPin },
    { id: 'industries', label: 'Industry Growth', icon: Building2 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const formatSalary = (amount) => {
    return `GHS ${amount?.toLocaleString() || 0}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((pld, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${pld?.dataKey}: ${pld?.value}${
                pld?.dataKey === 'salary' ? '' : 
                pld?.dataKey === 'demand' || pld?.dataKey === 'growth' ? '%' : ''
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeView) {
      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data?.demandBySkill || []} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="skill" 
                stroke="#666" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="demand" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Demand %" />
              <Bar dataKey="growth" fill="#10B981" radius={[4, 4, 0, 0]} name="Growth %" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'regions':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data?.regionalTrends || []} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="region" type="category" stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="jobPostings" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Job Postings" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'industries':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data?.industryGrowth || []}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="growth"
                label={({ industry, growth }) => `${industry} ${growth}%`}
                labelLine={false}
              >
                {data?.industryGrowth?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
            Ghana Market Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Latest job market insights specific to Ghana's employment landscape
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
      <div className="mb-6">
        {renderChart()}
      </div>
      {/* Market Insights Based on Active View */}
      {activeView === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Highest Demand Skills
            </h4>
            <div className="space-y-3">
              {data?.demandBySkill?.slice(0, 4)?.map((skill, index) => (
                <div key={skill?.skill} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    />
                    <span className="font-medium text-foreground">{skill?.skill}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">{formatSalary(skill?.salary)}</div>
                    <div className="text-xs text-green-600">+{skill?.growth}% growth</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Leaders */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Fastest Growing Skills
            </h4>
            <div className="space-y-3">
              {data?.demandBySkill?.sort((a, b) => b?.growth - a?.growth)?.slice(0, 4)?.map((skill, index) => (
                <div key={skill?.skill} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-foreground">{skill?.skill}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">+{skill?.growth}%</div>
                    <div className="text-xs text-muted-foreground">{skill?.demand}% demand</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeView === 'regions' && (
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Regional Job Market Analysis
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data?.regionalTrends?.map((region, index) => (
              <div key={region?.region} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-foreground">{region?.region}</h5>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    region?.growth >= 20 ? 'bg-green-100 text-green-800' :
                    region?.growth >= 15 ? 'bg-yellow-100 text-yellow-800': 'bg-blue-100 text-blue-800'
                  }`}>
                    +{region?.growth}% growth
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Job Postings</span>
                    <span className="text-sm font-medium text-foreground">{region?.jobPostings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Salary</span>
                    <span className="text-sm font-medium text-foreground">{formatSalary(region?.avgSalary)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (region?.jobPostings / 250) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeView === 'industries' && (
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-purple-600" />
            Industry Growth Analysis
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data?.industryGrowth?.map((industry, index) => (
              <div key={industry?.industry} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    />
                    <h5 className="font-semibold text-foreground">{industry?.industry}</h5>
                  </div>
                  <div className="text-lg font-bold text-green-600">+{industry?.growth}%</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Job Opportunities</span>
                    <span className="text-sm font-medium text-foreground">{industry?.opportunities}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(industry?.growth / 50) * 100}%`,
                        backgroundColor: COLORS?.[index % COLORS?.length]
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Growth rate compared to market average
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Market Summary */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4">Market Summary</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-foreground">
              {data?.regionalTrends?.reduce((sum, region) => sum + region?.jobPostings, 0) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Total Job Postings</div>
          </div>
          <div className="text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-foreground">
              {formatSalary(
                Math.round((data?.regionalTrends?.reduce((sum, region) => sum + region?.avgSalary, 0) || 0) / 
                (data?.regionalTrends?.length || 1))
              )}
            </div>
            <div className="text-sm text-muted-foreground">Average Salary</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-foreground">
              {Math.round(
                (data?.industryGrowth?.reduce((sum, industry) => sum + industry?.growth, 0) || 0) / 
                (data?.industryGrowth?.length || 1)
              )}%
            </div>
            <div className="text-sm text-muted-foreground">Avg. Growth Rate</div>
          </div>
          <div className="text-center">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-foreground">
              {data?.industryGrowth?.reduce((sum, industry) => sum + industry?.opportunities, 0) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Total Opportunities</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketTrendAnalysis;