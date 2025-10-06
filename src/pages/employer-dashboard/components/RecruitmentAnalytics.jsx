import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const RecruitmentAnalytics = ({ analyticsData }) => {
  const applicationTrendData = [
    { month: 'Jan', applications: 45, hires: 8 },
    { month: 'Feb', applications: 52, hires: 12 },
    { month: 'Mar', applications: 38, hires: 6 },
    { month: 'Apr', applications: 67, hires: 15 },
    { month: 'May', applications: 73, hires: 18 },
    { month: 'Jun', applications: 89, hires: 22 }
  ];

  const skillDemandData = [
    { skill: 'JavaScript', demand: 85, color: '#3B82F6' },
    { skill: 'Python', demand: 78, color: '#10B981' },
    { skill: 'React', demand: 72, color: '#F59E0B' },
    { skill: 'Node.js', demand: 65, color: '#EF4444' },
    { skill: 'Data Analysis', demand: 58, color: '#8B5CF6' }
  ];

  const sourceEffectivenessData = [
    { name: 'Learning Paths', value: 45, color: '#3B82F6' },
    { name: 'Direct Applications', value: 30, color: '#10B981' },
    { name: 'Referrals', value: 15, color: '#F59E0B' },
    { name: 'Social Media', value: 10, color: '#EF4444' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Application Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Application Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly applications and successful hires</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-muted-foreground">Applications</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">Hires</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={applicationTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="hires" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Demand */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Top Skills in Demand</h3>
              <p className="text-sm text-muted-foreground">Most requested skills in job postings</p>
            </div>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {skillDemandData?.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                  <span className="text-sm text-muted-foreground">{skill?.demand}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${skill?.demand}%`,
                      backgroundColor: skill?.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Effectiveness */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Candidate Sources</h3>
              <p className="text-sm text-muted-foreground">Where quality candidates come from</p>
            </div>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceEffectivenessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceEffectivenessData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sourceEffectivenessData?.map((source, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <span className="text-xs text-muted-foreground">{source?.name}</span>
                <span className="text-xs font-medium text-foreground">{source?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Ghana Market Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ghana Market Insights</h3>
            <p className="text-sm text-muted-foreground">Local talent market trends and benchmarks</p>
          </div>
          <Icon name="Globe" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">GHS 4,500</div>
            <div className="text-sm text-muted-foreground">Average Tech Salary</div>
            <div className="text-xs text-green-600 mt-1">+12% from last year</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">18 days</div>
            <div className="text-sm text-muted-foreground">Average Time to Fill</div>
            <div className="text-xs text-red-600 mt-1">+3 days from last quarter</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">78%</div>
            <div className="text-sm text-muted-foreground">Skill Match Rate</div>
            <div className="text-xs text-green-600 mt-1">+5% improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentAnalytics;