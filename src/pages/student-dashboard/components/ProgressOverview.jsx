import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ userProgress }) => {
  const { currentLevel, totalXP, completedPaths, activePaths, achievements } = userProgress;

  const progressPercentage = Math.min((totalXP / 10000) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Icon name="Compass" size={120} className="text-white/20" />
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Explorer!</h2>
            <p className="text-blue-100">Continue your learning journey</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-400">{totalXP?.toLocaleString()}</div>
            <div className="text-sm text-blue-200">Total XP</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {currentLevel} Progress</span>
            <span className="text-sm text-blue-200">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-blue-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{completedPaths}</div>
            <div className="text-xs text-blue-200">Completed Paths</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{activePaths}</div>
            <div className="text-xs text-blue-200">Active Paths</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{achievements}</div>
            <div className="text-xs text-blue-200">Achievements</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressOverview;