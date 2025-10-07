import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useGetDetailedHistoryQuery } from '../../../store/services/assessmentApi';

const DetailedHistory = () => {
  const { data: history, isLoading, error } = useGetDetailedHistoryQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card animate-pulse rounded-lg p-4 h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <Icon name="AlertTriangle" className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-muted-foreground">Failed to load history</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Assessment History</h3>
        <Button variant="outline" size="sm">
          <Icon name="Download" className="w-4 h-4 mr-2" />
          Export History
        </Button>
      </div>

      <div className="space-y-4">
        {history?.map((assessment) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{assessment.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Completed {format(new Date(assessment.completedAt), 'PPP')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Share2" className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="FileText" className="w-4 h-4 mr-2" />
                  Certificate
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background rounded p-3">
                <p className="text-sm text-muted-foreground mb-1">Score</p>
                <p className="text-lg font-semibold">{assessment.score}%</p>
              </div>
              <div className="bg-background rounded p-3">
                <p className="text-sm text-muted-foreground mb-1">Time Taken</p>
                <p className="text-lg font-semibold">{assessment.timeTaken} min</p>
              </div>
              <div className="bg-background rounded p-3">
                <p className="text-sm text-muted-foreground mb-1">Questions</p>
                <p className="text-lg font-semibold">{assessment.totalQuestions}</p>
              </div>
            </div>

            {assessment.skillBreakdown && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Skill Breakdown</p>
                <div className="space-y-2">
                  {Object.entries(assessment.skillBreakdown).map(([skill, score]) => (
                    <div key={skill} className="flex items-center">
                      <span className="text-sm text-muted-foreground w-32">{skill}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-sm ml-2">{score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DetailedHistory;