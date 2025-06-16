
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PortfolioMaker = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedIn: '',
    github: '',
    
    // Professional Info
    title: '',
    summary: '',
    yearsExperience: '',
    
    // Skills
    technicalSkills: '',
    softSkills: '',
    languages: '',
    
    // Experience
    experiences: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }],
    
    // Education
    education: [{
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    
    // Projects
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: '',
      githubLink: ''
    }],
    
    // Preferences
    portfolioTheme: 'modern',
    primaryColor: '#3b82f6'
  });

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        name: '',
        description: '',
        technologies: '',
        link: '',
        githubLink: ''
      }]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Portfolio Data:', formData);
    // Here you would typically send the data to generate the portfolio
    alert('Portfolio data submitted! This would generate your portfolio.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <User className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Portfolio Maker</h2>
          <p className="text-neo-500">Create your professional portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold text-neo-700 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-neo-600">Full Name</Label>
              <Input
                id="fullName"
                className="neo-input text-neo-700"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-neo-600">Email</Label>
              <Input
                id="email"
                type="email"
                className="neo-input text-neo-700"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-neo-600">Phone</Label>
              <Input
                id="phone"
                className="neo-input text-neo-700"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-neo-600">Location</Label>
              <Input
                id="location"
                className="neo-input text-neo-700"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-neo-600">Website</Label>
              <Input
                id="website"
                className="neo-input text-neo-700"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="linkedIn" className="text-neo-600">LinkedIn</Label>
              <Input
                id="linkedIn"
                className="neo-input text-neo-700"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedIn}
                onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold text-neo-700 mb-4">Professional Summary</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-neo-600">Professional Title</Label>
              <Input
                id="title"
                className="neo-input text-neo-700"
                placeholder="e.g., Senior Software Developer"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="summary" className="text-neo-600">Professional Summary</Label>
              <Textarea
                id="summary"
                className="neo-input text-neo-700 min-h-[120px]"
                placeholder="Brief description of your professional background and expertise..."
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="yearsExperience" className="text-neo-600">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                className="neo-input text-neo-700"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold text-neo-700 mb-4">Skills</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="technicalSkills" className="text-neo-600">Technical Skills</Label>
              <Textarea
                id="technicalSkills"
                className="neo-input text-neo-700"
                placeholder="React, Node.js, Python, SQL, etc. (comma separated)"
                value={formData.technicalSkills}
                onChange={(e) => setFormData({...formData, technicalSkills: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="softSkills" className="text-neo-600">Soft Skills</Label>
              <Textarea
                id="softSkills"
                className="neo-input text-neo-700"
                placeholder="Leadership, Communication, Problem-solving, etc."
                value={formData.softSkills}
                onChange={(e) => setFormData({...formData, softSkills: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="languages" className="text-neo-600">Languages</Label>
              <Input
                id="languages"
                className="neo-input text-neo-700"
                placeholder="English (Native), Spanish (Fluent), etc."
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Portfolio Preferences */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold text-neo-700 mb-4">Portfolio Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="portfolioTheme" className="text-neo-600">Portfolio Theme</Label>
              <Select value={formData.portfolioTheme} onValueChange={(value) => setFormData({...formData, portfolioTheme: value})}>
                <SelectTrigger className="neo-input text-neo-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="neo-card border-neo-300">
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="primaryColor" className="text-neo-600">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                className="neo-input text-neo-700 h-10"
                value={formData.primaryColor}
                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="neo-card p-6">
          <Button type="submit" className="neo-button w-full bg-neo-300 text-neo-700 font-medium py-3">
            Generate My Portfolio
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioMaker;
