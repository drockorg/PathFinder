import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SkillsProgress = ({ skillsData }) => {
  const topSkills = skillsData?.slice(0, 6);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Progress: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skills Progress</h3>
          <p className="text-sm text-muted-foreground">Your development overview</p>
        </div>
      </div>
      {/* Skills Chart */}
      <div className="mb-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSkills} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="progress" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Skills List */}
      <div className="space-y-3">
        {topSkills?.map((skill, index) => (
          <motion.div
            key={skill?.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                skill?.progress >= 80 ? 'bg-green-100 text-green-600' :
                skill?.progress >= 60 ? 'bg-orange-100 text-orange-600': 'bg-blue-100 text-blue-600'
              }`}>
                <Icon name="Award" size={16} />
              </div>
              <div>
                <p className="font-medium text-foreground">{skill?.name}</p>
                <p className="text-xs text-muted-foreground">{skill?.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{skill?.progress}%</p>
              <div className="w-16 bg-muted rounded-full h-2 mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill?.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`h-2 rounded-full ${
                    skill?.progress >= 80 ? 'bg-green-500' :
                    skill?.progress >= 60 ? 'bg-orange-500': 'bg-primary'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsProgress;