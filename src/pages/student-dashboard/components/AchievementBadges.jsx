import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white';
      case 'epic':
        return 'bg-gradient-to-br from-orange-500 to-red-500 text-white';
      case 'rare':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white';
      case 'common':
        return 'bg-gradient-to-br from-green-500 to-green-600 text-white';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'learning':
        return 'BookOpen';
      case 'skill':
        return 'Award';
      case 'completion':
        return 'CheckCircle';
      case 'streak':
        return 'Flame';
      case 'social':
        return 'Users';
      default:
        return 'Star';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Icon name="Trophy" size={20} className="text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          <p className="text-sm text-muted-foreground">Your latest milestones</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements?.map((achievement, index) => (
          <motion.div
            key={achievement?.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group cursor-pointer"
          >
            <div className={`${getBadgeColor(achievement?.rarity)} rounded-xl p-4 text-center relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1 right-1">
                  <Icon name="Sparkles" size={16} className="text-white/40" />
                </div>
                <div className="absolute bottom-1 left-1">
                  <Icon name="Star" size={12} className="text-white/30" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={getBadgeIcon(achievement?.category)} size={24} className="text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{achievement?.title}</h4>
                <p className="text-xs opacity-90">{achievement?.description}</p>
                
                {/* Rarity Indicator */}
                <div className="mt-2">
                  <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full capitalize">
                    {achievement?.rarity}
                  </span>
                </div>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2 + 1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-foreground text-background text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                Earned on {achievement?.earnedDate}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Progress to Next Achievement */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Next Achievement</span>
          <span className="text-sm text-muted-foreground">3/5 completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Complete 2 more learning paths to earn "Path Master" badge
        </p>
      </div>
    </div>
  );
};

export default AchievementBadges;