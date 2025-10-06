import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Gem, TrendingUp, Target, Calendar, Zap, Award } from 'lucide-react';

const PredictiveAnalytics = ({ data }) => {
  const [activeTab, setActiveTab] = useState('completion');

  const tabs = [
    { id: 'completion', label: 'Learning Path', icon: Calendar },
    { id: 'jobmatch', label: 'Job Matching', icon: Target }
  ];

  // Prepare learning completion timeline data
  const learningTimelineData = data?.learningCompletion?.milestones?.map((milestone, index) => ({
    date: new Date(milestone.date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    probability: milestone?.probability,
    milestone: milestone?.milestone,
    cumulative: Math.min(100, 20 + (index * 20))
  })) || [];

  // Prepare job match improvement data  
  const jobMatchData = [
    { factor: 'Current', score: data?.jobMatchProbability?.currentScore || 0 },
    { factor: 'With React', score: (data?.jobMatchProbability?.currentScore || 0) + 
      (data?.jobMatchProbability?.improvementFactors?.find(f => f?.factor?.includes('React'))?.impact || 0) },
    { factor: 'With ML', score: (data?.jobMatchProbability?.currentScore || 0) + 
      (data?.jobMatchProbability?.improvementFactors?.find(f => f?.factor?.includes('ML'))?.impact || 0) + 
      (data?.jobMatchProbability?.improvementFactors?.find(f => f?.factor?.includes('React'))?.impact || 0) },
    { factor: 'With Portfolio', score: data?.jobMatchProbability?.projectedScore || 0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((pld, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${pld?.dataKey}: ${pld?.value}${pld?.dataKey?.includes('probability') || pld?.dataKey?.includes('score') ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 85) return 'High Confidence';
    if (confidence >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center">
            <Gem className="w-6 h-6 mr-2 text-purple-600" />
            Predictive Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-powered insights for your learning and career trajectory
          </p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        {tabs?.map((tab) => {
          const IconComponent = tab?.icon;
          const isActive = activeTab === tab?.id;
          
          return (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab?.label}</span>
            </button>
          );
        })}
      </div>
      {/* Content based on active tab */}
      {activeTab === 'completion' && (
        <div>
          {/* Learning Path Prediction */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Learning Path Timeline</h4>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-opacity-10 ${
                getConfidenceColor(data?.learningCompletion?.confidence)
              } bg-current`}>
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getConfidenceLabel(data?.learningCompletion?.confidence || 0)}
                </span>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={learningTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cumulative" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Completion Prediction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-foreground">Estimated Completion</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {new Date(data?.learningCompletion?.estimatedCompletion || Date.now())?.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data?.learningCompletion?.currentPath}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-foreground">Success Probability</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {data?.learningCompletion?.confidence || 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on current progress
                </p>
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div>
              <h5 className="text-md font-semibold text-foreground mb-3">Upcoming Milestones</h5>
              <div className="space-y-3">
                {data?.learningCompletion?.milestones?.slice(0, 3)?.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{milestone?.milestone}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(milestone.date)?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${milestone?.probability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'jobmatch' && (
        <div>
          {/* Job Match Improvement */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Job Match Score Projection</h4>
            
            {/* Improvement Chart */}
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={jobMatchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="factor" stroke="#666" />
                  <YAxis domain={[0, 100]} stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Current vs Projected */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-foreground">Current Match Score</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {data?.jobMatchProbability?.currentScore || 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on current skills
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-foreground">Projected Score</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {data?.jobMatchProbability?.projectedScore || 0}%
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +{(data?.jobMatchProbability?.projectedScore || 0) - (data?.jobMatchProbability?.currentScore || 0)}% improvement
                </div>
              </div>
            </div>

            {/* Improvement Factors */}
            <div>
              <h5 className="text-md font-semibold text-foreground mb-3">Key Improvement Areas</h5>
              <div className="space-y-3">
                {data?.jobMatchProbability?.improvementFactors?.map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-foreground">{factor?.factor}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+{factor?.impact}%</div>
                      <p className="text-xs text-muted-foreground">impact</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PredictiveAnalytics;