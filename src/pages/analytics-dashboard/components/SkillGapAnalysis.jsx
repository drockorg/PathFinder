import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Clock, BookOpen } from 'lucide-react';

const SkillGapAnalysis = ({ data }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getGapColor = (gap) => {
    if (gap >= -10) return '#10B981'; // Green - minimal gap
    if (gap >= -25) return '#F59E0B'; // Yellow - moderate gap  
    return '#EF4444'; // Red - significant gap
  };

  const getGapSeverity = (gap) => {
    if (gap >= -10) return 'low';
    if (gap >= -25) return 'medium';
    return 'high';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'low':
        return <Target className="w-4 h-4 text-green-600" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-yellow-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const skillData = data?.currentSkills?.find(skill => skill?.name === label);
      return (
        <div className="bg-card p-4 rounded-lg shadow-lg border border-border min-w-48">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Current Level: <span className="font-medium">{skillData?.level}%</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Market Demand: <span className="font-medium">{skillData?.market_demand}%</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Skill Gap: <span className="font-medium text-red-600">{Math.abs(skillData?.gap)}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartData = data?.currentSkills?.map(skill => ({
    name: skill?.name,
    current: skill?.level,
    demand: skill?.market_demand,
    gap: Math.abs(skill?.gap)
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Skill Gap Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Identify skills to focus on for better job opportunities
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl">
          <Target className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      {/* Skills Gap Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={70} stroke="#10B981" strokeDasharray="2 2" label="Target" />
            <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
            <Bar dataKey="demand" fill="#E5E7EB" name="Market Demand" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Skills List with Gap Analysis */}
      <div className="space-y-3 mb-6">
        <h4 className="text-lg font-semibold text-foreground">Skill Priority Matrix</h4>
        {data?.currentSkills?.map((skill, index) => {
          const severity = getGapSeverity(skill?.gap);
          const gapColor = getGapColor(skill?.gap);
          
          return (
            <motion.div
              key={skill?.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedSkill === skill?.name 
                  ? 'border-primary bg-primary/5' :'border-border bg-background'
              }`}
              onClick={() => setSelectedSkill(selectedSkill === skill?.name ? null : skill?.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(severity)}
                  <div>
                    <h5 className="font-medium text-foreground">{skill?.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      Current: {skill?.level}% | Market: {skill?.market_demand}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className="text-lg font-bold"
                    style={{ color: gapColor }}
                  >
                    {Math.abs(skill?.gap)}%
                  </div>
                  <p className="text-xs text-muted-foreground uppercase">
                    {severity} priority
                  </p>
                </div>
              </div>
              {/* Progress Bars */}
              <div className="mt-3 space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Current Level</span>
                    <span>{skill?.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill?.level}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Market Demand</span>
                    <span>{skill?.market_demand}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill?.market_demand}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Recommendations */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Learning Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.recommendations?.map((rec, index) => (
            <motion.div
              key={rec?.skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-foreground">{rec?.skill}</h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec?.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec?.priority === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {rec?.priority} priority
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec?.reason}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {rec?.timeEstimate}
                </div>
                <div>{rec?.courses?.length || 0} courses</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillGapAnalysis;