import React, { useState } from 'react';
import Layout from '../components/Layout';
import type { Symptom, AIResponse } from '../types/pages';

const Symptoms: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [duration, setDuration] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonSymptoms: Symptom[] = [
    { id: '1', name: 'Headache', category: 'neurological', severity: 'mild' },
    { id: '2', name: 'Fever', category: 'general', severity: 'moderate' },
    { id: '3', name: 'Cough', category: 'respiratory', severity: 'mild' },
    { id: '4', name: 'Nausea', category: 'digestive', severity: 'mild' },
    { id: '5', name: 'Fatigue', category: 'general', severity: 'mild' },
    { id: '6', name: 'Chest Pain', category: 'cardiovascular', severity: 'severe' },
    { id: '7', name: 'Shortness of Breath', category: 'respiratory', severity: 'moderate' },
    { id: '8', name: 'Dizziness', category: 'neurological', severity: 'moderate' },
    { id: '9', name: 'Sore Throat', category: 'respiratory', severity: 'mild' },
    { id: '10', name: 'Abdominal Pain', category: 'digestive', severity: 'moderate' }
  ];

  const handleSymptomToggle = (symptomName: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomName) 
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockResponse: AIResponse = {
        id: Date.now().toString(),
        suggestions: [
          'Monitor your symptoms for 24-48 hours',
          'Stay hydrated and get adequate rest',
          'Consider over-the-counter pain relief if needed',
          'Avoid strenuous activities until symptoms improve'
        ],
        urgencyLevel: severity === 'severe' ? 'high' : severity === 'moderate' ? 'medium' : 'low',
        recommendedActions: [
          'Schedule a consultation if symptoms worsen',
          'Keep a symptom diary to track changes',
          'Contact emergency services if experiencing severe chest pain or difficulty breathing'
        ],
        shouldSeeDoctor: severity === 'severe' || selectedSymptoms.includes('Chest Pain'),
        estimatedWaitTime: '2-4 hours'
      };

      setAiResponse(mockResponse);
      setIsSubmitting(false);
    }, 2000);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-100 border-red-500 text-red-700';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="min-h-full bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Symptom Checker</h1>
          <p className="mt-2 text-gray-600">
            Describe your symptoms and get AI-powered health insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptom Input Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Tell us about your symptoms</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Symptoms Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select common symptoms (optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => handleSymptomToggle(symptom.name)}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        selectedSymptoms.includes(symptom.name)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {symptom.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your symptoms in detail
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe what you're experiencing, when it started, and any other relevant details..."
                  required
                />
              </div>

              {/* Severity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How severe are your symptoms?
                </label>
                <div className="flex space-x-4">
                  {(['mild', 'moderate', 'severe'] as const).map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        value={level}
                        checked={severity === level}
                        onChange={(e) => setSeverity(e.target.value as 'mild' | 'moderate' | 'severe')}
                        className="mr-2 text-blue-600"
                      />
                      <span className="capitalize text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  How long have you had these symptoms?
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="less-than-1-hour">Less than 1 hour</option>
                  <option value="1-6-hours">1-6 hours</option>
                  <option value="6-24-hours">6-24 hours</option>
                  <option value="1-3-days">1-3 days</option>
                  <option value="3-7-days">3-7 days</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="more-than-2-weeks">More than 2 weeks</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !description.trim() || !duration}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Analyzing symptoms...' : 'Get AI Analysis'}
              </button>
            </form>
          </div>

          {/* AI Response */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">AI Health Assistant</h2>
            
            {!aiResponse && !isSubmitting && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-500">Submit your symptoms to get AI-powered health insights</p>
              </div>
            )}

            {isSubmitting && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your symptoms...</p>
              </div>
            )}

            {aiResponse && (
              <div className="space-y-6">
                {/* Urgency Level */}
                <div className={`p-4 rounded-lg border-l-4 ${getUrgencyColor(aiResponse.urgencyLevel)}`}>
                  <h3 className="font-semibold mb-2">Urgency Level: {aiResponse.urgencyLevel.toUpperCase()}</h3>
                  {aiResponse.shouldSeeDoctor && (
                    <p className="text-sm">We recommend seeing a healthcare provider.</p>
                  )}
                </div>

                {/* AI Suggestions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Immediate Suggestions</h3>
                  <ul className="space-y-2">
                    {aiResponse.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700 text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Recommended Actions</h3>
                  <ul className="space-y-2">
                    {aiResponse.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">→</span>
                        <span className="text-gray-700 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Appointment Button */}
                {aiResponse.shouldSeeDoctor && (
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                      Book Appointment with Doctor
                    </button>
                    {aiResponse.estimatedWaitTime && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Estimated wait time: {aiResponse.estimatedWaitTime}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Medical Disclaimer</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Symptoms;
