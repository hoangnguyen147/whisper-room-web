'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PersonalInfoSection from './PersonalInfoSection';
import AnxietyScaleSection from './AnxietyScaleSection';
import ContactInfoSection from './ContactInfoSection';

export interface SurveyData {
  // Contact info (optional)
  nick_name?: string;
  phone?: string;
  email?: string;
  
  // Personal info
  gender: string;
  age: string;
  major_group: string;
  academic_year: string;
  relationship_status: string;
  is_only_child: string;
  living_area: string;
  work_status: string;
  family_economic_status: string;
  academic_performance: string;
  major_satisfaction: string;
  daily_study_hours: string;
  exam_preparation_time: string;
  anxiety_impact_on_performance: string;
  
  // Anxiety scales (1-4)
  w1_fear_poor_performance: number;
  w2_fear_disappointing_others: number;
  w3_worry_before_exam: number;
  w4_fear_forgetting: number;
  w5_self_blame: number;
  w6_worry_about_future: number;
  w7_worry_others_better: number;
  w8_fear_losing_composure: number;
  e1_stress_preparing: number;
  e2_difficulty_concentrating: number;
  e3_heart_racing: number;
  e4_muscle_tension: number;
  e5_stomach_discomfort: number;
  e6_nervous_when_receiving_test: number;
  e7_trembling_hands: number;
  e8_time_pressure: number;
  e9_difficulty_sleeping: number;
  e10_rapid_breathing: number;
  e11_restless_waiting: number;
  e12_heart_pounding_mention: number;
}

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
  loading?: boolean;
}

export default function SurveyForm({ onSubmit, loading = false }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SurveyData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  const updateFormData = (data: Partial<SurveyData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const newErrors = { ...errors };
    Object.keys(data).forEach(key => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validate personal info
      const requiredFields = [
        'gender', 'age', 'major_group', 'academic_year', 'relationship_status',
        'is_only_child', 'living_area', 'work_status', 'family_economic_status',
        'academic_performance', 'major_satisfaction', 'daily_study_hours',
        'exam_preparation_time', 'anxiety_impact_on_performance'
      ];

      requiredFields.forEach(field => {
        if (!formData[field as keyof SurveyData]) {
          newErrors[field] = 'Vui lòng chọn một tùy chọn';
        }
      });
    }

    if (step === 2) {
      // Validate anxiety scales
      const anxietyFields = [
        'w1_fear_poor_performance', 'w2_fear_disappointing_others', 'w3_worry_before_exam',
        'w4_fear_forgetting', 'w5_self_blame', 'w6_worry_about_future',
        'w7_worry_others_better', 'w8_fear_losing_composure', 'e1_stress_preparing',
        'e2_difficulty_concentrating', 'e3_heart_racing', 'e4_muscle_tension',
        'e5_stomach_discomfort', 'e6_nervous_when_receiving_test', 'e7_trembling_hands',
        'e8_time_pressure', 'e9_difficulty_sleeping', 'e10_rapid_breathing',
        'e11_restless_waiting', 'e12_heart_pounding_mention'
      ];

      anxietyFields.forEach(field => {
        const value = formData[field as keyof SurveyData];
        if (!value || value < 1 || value > 4) {
          newErrors[field] = 'Vui lòng chọn mức độ từ 1-4';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData as SurveyData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            data={formData}
            onChange={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <AnxietyScaleSection
            data={formData}
            onChange={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <ContactInfoSection
            data={formData}
            onChange={updateFormData}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Bước {currentStep} / {totalSteps}
          </h2>
          <span className="text-sm text-gray-500">
            {currentStep === 1 && 'Thông tin cá nhân'}
            {currentStep === 2 && 'Thang đo lo âu'}
            {currentStep === 3 && 'Thông tin liên hệ (tùy chọn)'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </Card>

      {/* Form Content */}
      <Card className="mb-8">
        {renderStepContent()}
      </Card>

      {/* Navigation */}
      <Card>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Quay lại
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Tiếp theo
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading}>
              Hoàn thành khảo sát
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
