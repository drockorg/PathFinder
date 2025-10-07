import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AssessmentOverview = ({ stats }) => {
  const calculateStats = () => {
    if (!stats?.length) {
      return {
        totalAssessments: 0,
        averageScore: 0,
        strongestSkill: '-',
        weakestSkill: '-',
        recentActivity: null,
        completedThisMonth: 0,
      };
    }

    const totalAssessments = stats.length;
    const averageScore = Math.round(
      stats.reduce((acc, curr) => acc + curr.score, 0) / totalAssessments
    );

    // Calculate skill proficiency
    const skillMap = {};
    stats.forEach((assessment) => {
      Object.entries(assessment.skillBreakdown).forEach(([skill, score]) => {
        if (!skillMap[skill]) {
          skillMap[skill] = { total: 0, count: 0 };
        }
        skillMap[skill].total += score;
        skillMap[skill].count++;
      });
    });

    const skillAverages = Object.entries(skillMap).map(([skill, data]) => ({
      skill,
      average: Math.round(data.total / data.count),
    }));

    const strongestSkill = skillAverages.reduce((a, b) => 
      a.average > b.average ? a : b
    ).skill;

    const weakestSkill = skillAverages.reduce((a, b) => 
      a.average < b.average ? a : b
    ).skill;

    // Calculate assessments completed this month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const completedThisMonth = stats.filter(
      (assessment) => new Date(assessment.completedAt) >= firstDayOfMonth
    ).length;

    // Get most recent activity
    const recentActivity = [...stats].sort(
      (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
    )[0];

    return {
      totalAssessments,
      averageScore,
      strongestSkill,
      weakestSkill,
      recentActivity,
      completedThisMonth,
    };
  };

  const {
    totalAssessments,
    averageScore,
    strongestSkill,
    weakestSkill,
    recentActivity,
    completedThisMonth,
  } = calculateStats();

  const overviewStats = [
    {
      id: 'total-assessments',
      label: 'Assessments Taken',
      value: totalAssessments,
      icon: 'FileCheck',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: completedThisMonth ? `+${completedThisMonth} this month` : 'No assessments this month',
    },
    {
      id: 'average-score',
      label: 'Average Score',
      value: `${averageScore}%`,
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: recentActivity ? `Last: ${recentActivity.score}% in ${recentActivity.title}` : '-',
    },
    {
      id: 'strongest-skill',
      label: 'Strongest Skill',
      value: strongestSkill,
      icon: 'Star',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: 'Keep up the good work!',
    },
    {
      id: 'improvement-area',
      label: 'Area for Improvement',
      value: weakestSkill,
      icon: 'Target',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'Focus on this skill',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assessment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-card rounded-lg border border-border p-4"
          >
            <div className={`${stat.bgColor} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
              <Icon name={stat.icon} className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value || '-'}</p>
              <p className="text-sm text-muted-foreground">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentOverview;