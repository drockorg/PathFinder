import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useShareAssessmentMutation, useGenerateCertificateMutation } from '../../../store/services/assessmentApi';
import toast from 'react-hot-toast';

const ShareAssessment = ({ assessment, onClose }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [shareAssessment] = useShareAssessmentMutation();
  const [generateCertificate] = useGenerateCertificateMutation();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        method: shareMethod,
        assessmentId: assessment.id,
      };
      
      const result = await shareAssessment({ assessmentId: assessment.id, shareData }).unwrap();
      
      if (shareMethod === 'link') {
        await navigator.clipboard.writeText(result.shareUrl);
        toast.success('Share link copied to clipboard!');
      } else {
        toast.success(`Assessment shared via ${shareMethod}!`);
      }
    } catch (error) {
      toast.error('Failed to share assessment');
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const pdfUrl = await generateCertificate(assessment.id).unwrap();
      // Open PDF in new window
      window.open(pdfUrl, '_blank');
    } catch (error) {
      toast.error('Failed to generate certificate');
      console.error('Certificate generation error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg p-6 max-w-md w-full shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Share Assessment</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sharing dialog"
          >
            <Icon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Share Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={shareMethod === 'link' ? 'default' : 'outline'}
                onClick={() => setShareMethod('link')}
                className="justify-start"
              >
                <Icon name="Link" className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                variant={shareMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setShareMethod('email')}
                className="justify-start"
              >
                <Icon name="Mail" className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleShare}
              className="w-full"
              disabled={isSharing}
            >
              {isSharing ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Icon name="Share2" className="w-4 h-4 mr-2" />
                  Share Assessment
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleGenerateCertificate}
              className="w-full"
            >
              <Icon name="Award" className="w-4 h-4 mr-2" />
              Generate Certificate
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareAssessment;