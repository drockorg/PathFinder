import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SkillsInventory = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('technical');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: '',
    verified: false
  });

  const skillCategories = {
    technical: [
      'Programming', 'Frontend', 'Backend', 'Database', 'Mobile Development',
      'DevOps', 'Data Science', 'Machine Learning', 'Cybersecurity', 'Cloud Computing'
    ],
    soft: [
      'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
      'Critical Thinking', 'Creativity', 'Adaptability', 'Project Management', 'Customer Service'
    ]
  };

  const getSkillLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Basic';
    return 'Beginner';
  };

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 70) return 'bg-blue-500';
    if (level >= 50) return 'bg-yellow-500';
    if (level >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleAddSkill = () => {
    if (!newSkill?.name || !newSkill?.category) return;

    const skillType = activeTab;
    const updatedSkills = {
      ...data,
      [skillType]: [
        ...(data?.[skillType] || []),
        {
          ...newSkill,
          id: `${skillType}-${Date.now()}`,
          verified: false
        }
      ]
    };

    onUpdate?.(updatedSkills);
    setNewSkill({ name: '', level: 50, category: '', verified: false });
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (skillType, index) => {
    const updatedSkills = {
      ...data,
      [skillType]: data?.[skillType]?.filter((_, i) => i !== index) || []
    };
    onUpdate?.(updatedSkills);
  };

  const handleUpdateSkillLevel = (skillType, index, newLevel) => {
    const updatedSkills = {
      ...data,
      [skillType]: data?.[skillType]?.map((skill, i) => 
        i === index ? { ...skill, level: newLevel } : skill
      ) || []
    };
    onUpdate?.(updatedSkills);
  };

  const handleVerifySkill = (skillType, index) => {
    const updatedSkills = {
      ...data,
      [skillType]: data?.[skillType]?.map((skill, i) => 
        i === index ? { ...skill, verified: !skill?.verified } : skill
      ) || []
    };
    onUpdate?.(updatedSkills);
  };

  const currentSkills = data?.[activeTab] || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Skills Inventory</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your technical and soft skills to help employers find you
          </p>
        </div>
        <Button 
          onClick={() => setIsAddingSkill(true)}
          className="flex items-center"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Skill
        </Button>
      </div>
      {/* Skills Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Code" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {data?.technical?.length || 0}
          </div>
          <div className="text-sm text-blue-700">Technical Skills</div>
          <div className="text-xs text-blue-600 mt-1">
            {data?.technical?.filter(s => s?.verified)?.length || 0} verified
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {data?.soft?.length || 0}
          </div>
          <div className="text-sm text-green-700">Soft Skills</div>
          <div className="text-xs text-green-600 mt-1">
            {data?.soft?.filter(s => s?.verified)?.length || 0} verified
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Award" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {((data?.technical?.filter(s => s?.level >= 70)?.length || 0) + (data?.soft?.filter(s => s?.level >= 70)?.length || 0))}
          </div>
          <div className="text-sm text-purple-700">Advanced Skills</div>
          <div className="text-xs text-purple-600 mt-1">70%+ proficiency</div>
        </div>
      </div>
      {/* Skill Type Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'technical' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Code" size={16} />
          <span>Technical Skills</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
            {data?.technical?.length || 0}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('soft')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'soft' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Users" size={16} />
          <span>Soft Skills</span>
          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
            {data?.soft?.length || 0}
          </span>
        </button>
      </div>
      {/* Add New Skill Modal */}
      {isAddingSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Add New {activeTab === 'technical' ? 'Technical' : 'Soft'} Skill
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={newSkill?.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder={`e.g., ${activeTab === 'technical' ? 'React, Python, SQL' : 'Leadership, Communication'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={newSkill?.category}
                onChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
                options={[
                  { value: '', label: 'Select category' },
                  ...skillCategories?.[activeTab]?.map(cat => ({ value: cat, label: cat }))
                ]}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Proficiency Level: {getSkillLevelLabel(newSkill?.level)} ({newSkill?.level}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={newSkill?.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e?.target?.value) }))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkill({ name: '', level: 50, category: '', verified: false });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSkill} disabled={!newSkill?.name || !newSkill?.category}>
              Add Skill
            </Button>
          </div>
        </motion.div>
      )}
      {/* Skills List */}
      <div className="space-y-4">
        {currentSkills?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={activeTab === 'technical' ? 'Code' : 'Users'} size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No {activeTab === 'technical' ? 'technical' : 'soft'} skills added yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your skills to help employers understand your capabilities
            </p>
            <Button onClick={() => setIsAddingSkill(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Add Your First Skill
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentSkills?.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{skill?.name}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {skill?.category}
                      </span>
                      {skill?.verified && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs">
                          <Icon name="CheckCircle" size={12} />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-medium text-foreground">
                          {getSkillLevelLabel(skill?.level)} ({skill?.level}%)
                        </span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getSkillLevelColor(skill?.level)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill?.level}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs text-muted-foreground mb-1">
                        Update proficiency level:
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={skill?.level}
                        onChange={(e) => handleUpdateSkillLevel(activeTab, index, parseInt(e?.target?.value))}
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerifySkill(activeTab, index)}
                      className={skill?.verified ? 'border-green-500 text-green-600' : ''}
                    >
                      <Icon name={skill?.verified ? 'CheckCircle' : 'Circle'} size={14} className="mr-1" />
                      {skill?.verified ? 'Verified' : 'Verify'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveSkill(activeTab, index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Skill Verification Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Skill Verification</h3>
            <p className="text-sm text-blue-700 mb-3">
              Verify your skills through assessments or certifications to increase your credibility with employers.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                <Icon name="FileCheck" size={14} className="mr-2" />
                Take Assessment
              </Button>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                <Icon name="Upload" size={14} className="mr-2" />
                Upload Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsInventory;