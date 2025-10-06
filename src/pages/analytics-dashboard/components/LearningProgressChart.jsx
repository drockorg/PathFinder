import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, TrendingUp, Award } from 'lucide-react';

const LearningProgressChart = ({ data }) => {
  const [activeView, setActiveView] = useState('completion');

  const chartViews = [
    { id: 'completion', label: 'Course Completion', icon: BookOpen },
    { id: 'skills', label: 'Skill Development', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const skillProgressData = data?.skillDevelopment?.map(skill => ({
    name: skill?.skill,
    progress: skill?.progress?.[skill?.progress?.length - 1] // Latest progress
  })) || [];

  const achievementsByCategory = data?.achievements?.reduce((acc, achievement) => {
    acc[achievement.category] = (acc?.[achievement?.category] || 0) + 1;
    return acc;
  }, {}) || {};

  const achievementPieData = Object.entries(achievementsByCategory)?.map(([category, count]) => ({
    name: category?.charAt(0)?.toUpperCase() + category?.slice(1),
    value: count
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          {payload?.map((pld, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${pld?.dataKey}: ${pld?.value}${activeView === 'completion' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeView) {
      case 'completion':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.courseCompletion || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="enrolled" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillProgressData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} stroke="#666" />
              <YAxis dataKey="name" type="category" stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'achievements':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={achievementPieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              >
                {achievementPieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors?.[index % pieColors?.length]} />
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
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">Learning Progress</h3>
          <p className="text-sm text-muted-foreground">
            Track your learning journey and skill development
          </p>
        </div>

        {/* View Selector */}
        <div className="flex bg-muted rounded-lg p-1">
          {chartViews?.map((view) => {
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
      <div className="h-80">
        {renderChart()}
      </div>
      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {data?.courseCompletion?.reduce((acc, curr) => acc + curr?.completed, 0) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Courses Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {data?.skillDevelopment?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Active Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {data?.achievements?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningProgressChart;