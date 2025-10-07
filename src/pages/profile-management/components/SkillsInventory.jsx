import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { useAddSkillMutation, useDeleteSkillMutation } from '../../../store/services/api';
import { toast } from 'react-hot-toast';

const SkillsInventory = ({ data = [], onUpdate }) => {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [addSkill, { isLoading: isSubmitting }] = useAddSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'beginner'
  });

  const handleAdd = async () => {
    if (!newSkill.name || !newSkill.level) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addSkill(newSkill).unwrap();
      toast.success('Skill added successfully!');
      setNewSkill({ name: '', level: 'beginner' });
      setIsAddingSkill(false);
    } catch (error) {
      toast.error('Error adding skill: ' + (error.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id).unwrap();
      toast.success('Skill deleted successfully!');
    } catch (error) {
      toast.error('Error deleting skill: ' + (error.data?.message || error.message));
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'expert': return 'bg-green-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add and manage your skills
          </p>
        </div>
        <Button onClick={() => setIsAddingSkill(!isAddingSkill)} variant={isAddingSkill ? "outline" : "default"}>
          <Icon name={isAddingSkill ? "X" : "Plus"} size={16} className="mr-2" />
          {isAddingSkill ? 'Cancel' : 'Add Skill'}
        </Button>
      </div>

      {/* Add Skill Form */}
      {isAddingSkill && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/30 rounded-xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Add New Skill</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Skill Name"
              placeholder="e.g., JavaScript, Communication"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              required
            />
            <Select
              label="Proficiency Level"
              value={newSkill.level}
              onChange={(value) => setNewSkill({ ...newSkill, level: value })}
              options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
                { value: 'expert', label: 'Expert' }
              ]}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} loading={isSubmitting}>
              Add Skill
            </Button>
          </div>
        </motion.div>
      )}

      {/* Skills List */}
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((skill, index) => (
            <motion.div
              key={skill._id || index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Brain" size={20} className="text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">{skill.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getLevelColor(skill.level)}`}>
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                    </span>
                    {skill.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(skill._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Icon name="Brain" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No skills added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Add Skill" to add your skills
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsInventory;
