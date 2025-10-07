import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAddExperienceMutation, useDeleteExperienceMutation } from '../../../store/services/api';
import { toast } from 'react-hot-toast';

const ExperienceHistory = ({ data = [], onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addExperience, { isLoading: isSubmitting }] = useAddExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false
  });

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handleAdd = async () => {
    if (!newExperience.company || !newExperience.position) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addExperience(newExperience).unwrap();
      toast.success('Experience added successfully!');
      setNewExperience({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false
      });
      setIsAdding(false);
    } catch (error) {
      toast.error('Error adding experience: ' + (error.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id).unwrap();
      toast.success('Experience deleted successfully!');
    } catch (error) {
      toast.error('Error deleting experience: ' + (error.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add your professional work history
          </p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
          <Icon name={isAdding ? "X" : "Plus"} size={16} className="mr-2" />
          {isAdding ? 'Cancel' : 'Add Experience'}
        </Button>
      </div>

      {/* Add Experience Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/30 rounded-xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Add New Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              placeholder="e.g., Tech Ghana Ltd"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              required
            />
            <Input
              label="Position"
              placeholder="e.g., Software Developer"
              value={newExperience.position}
              onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Description
            </label>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
            />
            <Input
              label="End Date"
              type="month"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              disabled={newExperience.current}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              checked={newExperience.current}
              onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="current" className="text-sm text-foreground">
              I currently work here
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} loading={isSubmitting}>
              Add Experience
            </Button>
          </div>
        </motion.div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Briefcase" size={20} className="text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">{exp.position}</h3>
                  </div>
                  <p className="text-foreground font-medium">{exp.company}</p>
                  {exp.description && (
                    <p className="text-muted-foreground mt-2 text-sm">{exp.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(exp._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No work experience added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Add Experience" to add your work history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceHistory;
