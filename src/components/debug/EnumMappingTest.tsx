'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { testEnumMapping, sampleDisplayData } from '@/utils/testApiMapping';
import { validateEnumMapping, createSampleSurveyData } from '@/utils/validateEnumMapping';
import { testSlotsApiCalls, testWeekRange } from '@/utils/testSlotsApi';
import { surveyApi } from '@/utils/api';

export default function EnumMappingTest() {
  const [testResult, setTestResult] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [apiTestResult, setApiTestResult] = useState<any>(null);
  const [slotsTestResult, setSlotsTestResult] = useState<any>(null);
  const [weekTestResult, setWeekTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const runMappingTest = () => {
    const result = testEnumMapping();
    setTestResult(result);
  };

  const runValidationTest = () => {
    const result = validateEnumMapping();
    setValidationResult(result);
  };

  const testApiCall = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing API call with sample data...');
      const sampleData = createSampleSurveyData();
      const result = await surveyApi.submitSurvey(sampleData);
      setApiTestResult(result);
      console.log('✅ API test result:', result);
      console.log('🧠 TAI Score:', result.tai_score);
      console.log('📊 Anxiety Level:', result.anxiety_level);
    } catch (error) {
      console.error('❌ API test error:', error);
      setApiTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testSlotsApi = async () => {
    setSlotsLoading(true);
    try {
      console.log('🧪 Testing Slots API with new parameters...');
      const result = await testSlotsApiCalls();
      setSlotsTestResult(result);
      console.log('✅ Slots API test completed');
    } catch (error) {
      console.error('❌ Slots API test error:', error);
      setSlotsTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setSlotsLoading(false);
    }
  };

  const testWeekRangeApi = async () => {
    setSlotsLoading(true);
    try {
      console.log('🧪 Testing Week Range API...');
      const result = await testWeekRange();
      setWeekTestResult(result);
      console.log('✅ Week range test completed');
    } catch (error) {
      console.error('❌ Week range test error:', error);
      setWeekTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setSlotsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6">🧪 Enum Mapping Test</h2>
        
        <div className="space-y-6">
          <div>
            <div className="flex space-x-4 mb-4">
              <Button onClick={runMappingTest} variant="outline">
                Test Enum Mapping
              </Button>
              <Button onClick={runValidationTest} variant="outline">
                Run Validation Tests
              </Button>
            </div>
            
            {testResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Mapping Test Results:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-blue-600">Original Display Data:</h4>
                    <pre className="bg-white p-2 rounded text-xs overflow-auto">
                      {JSON.stringify({
                        age: testResult.sampleDisplayData.age,
                        academic_year: testResult.sampleDisplayData.academic_year,
                        daily_study_hours: testResult.sampleDisplayData.daily_study_hours,
                        exam_preparation_time: testResult.sampleDisplayData.exam_preparation_time
                      }, null, 2)}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-600">Converted API Data:</h4>
                    <pre className="bg-white p-2 rounded text-xs overflow-auto">
                      {JSON.stringify({
                        age: testResult.convertedToApi.age,
                        academic_year: testResult.convertedToApi.academic_year,
                        daily_study_hours: testResult.convertedToApi.daily_study_hours,
                        exam_preparation_time: testResult.convertedToApi.exam_preparation_time
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {validationResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Validation Results: {validationResult.allPassed ? '✅ All Passed' : '❌ Some Failed'}
                </h3>
                <div className="text-sm mb-4">
                  <span className="text-green-600">Passed: {validationResult.summary.passed}</span>
                  {' | '}
                  <span className="text-red-600">Failed: {validationResult.summary.failed}</span>
                  {' | '}
                  <span className="text-gray-600">Total: {validationResult.summary.total}</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {validationResult.results.map((result: any, index: number) => (
                    <div key={index} className={`text-xs p-2 mb-1 rounded ${result.testPassed ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="font-medium">
                        {result.testPassed ? '✅' : '❌'} {result.field}: "{result.display}" → "{result.expectedApi}"
                      </div>
                      {!result.testPassed && (
                        <div className="text-red-600 mt-1">
                          Got: "{result.actualApi}" (to API: {result.toApiPassed ? '✅' : '❌'})
                          Back: "{result.actualDisplay}" (to Display: {result.toDisplayPassed ? '✅' : '❌'})
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex space-x-4 mb-4">
              <Button onClick={testApiCall} loading={loading}>
                Test Survey API
              </Button>
              <Button onClick={testSlotsApi} loading={slotsLoading}>
                Test Slots API
              </Button>
              <Button onClick={testWeekRangeApi} loading={slotsLoading}>
                Test Week Range
              </Button>
            </div>
            
            {apiTestResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Survey API Test Results:</h3>

                {/* TAI Results Highlight */}
                {apiTestResult.tai_score !== undefined && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🧠 TAI Results:</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>TAI Score:</strong> {apiTestResult.tai_score || 'null'}</p>
                      <p><strong>Anxiety Level:</strong> {apiTestResult.anxiety_level || 'N/A'}</p>
                      <p><strong>Client ID:</strong> {apiTestResult.client_id}</p>
                      <p><strong>Survey ID:</strong> {apiTestResult.survey_id}</p>
                    </div>
                  </div>
                )}

                <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(apiTestResult, null, 2)}
                </pre>
              </div>
            )}

            {slotsTestResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Slots API Test Results:</h3>
                {Array.isArray(slotsTestResult) ? (
                  <div className="space-y-2">
                    {slotsTestResult.map((result: any, index: number) => (
                      <div key={index} className={`p-2 rounded text-sm ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="font-medium">
                          {result.success ? '✅' : '❌'} {result.testCase}
                        </div>
                        {result.success ? (
                          <div className="text-green-700 text-xs">
                            {result.count} slots found ({result.duration}ms)
                          </div>
                        ) : (
                          <div className="text-red-700 text-xs">
                            Error: {result.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(slotsTestResult, null, 2)}
                  </pre>
                )}
              </div>
            )}

            {weekTestResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Week Range Test Results:</h3>
                {weekTestResult.success ? (
                  <div className="text-green-700">
                    <p className="font-medium">✅ Found {weekTestResult.total} slots for the week</p>
                    {weekTestResult.slotsByDate && (
                      <div className="mt-2 text-xs">
                        <strong>Slots by date:</strong>
                        {Object.entries(weekTestResult.slotsByDate).map(([date, slots]: [string, any]) => (
                          <div key={date} className="ml-2">
                            {date}: {slots.length} slots
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-700">
                    ❌ Error: {weekTestResult.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">✅ Server Now Accepts Text Values:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Age:</strong> "20" → "20" (no conversion)</p>
              <p><strong>Academic Year:</strong> "Năm 3" → "Năm 3" (no conversion)</p>
              <p><strong>Study Hours:</strong> "1 – 2 giờ" → "1 – 2 giờ" (no conversion)</p>
              <p><strong>Exam Prep:</strong> "Vài ngày trước" → "Vài ngày trước" (no conversion)</p>
              <p className="text-green-600 font-medium">✨ Enum mapping no longer needed!</p>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">New Slots API Parameters:</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p><strong>Single date:</strong> ?date=2024-01-15</p>
              <p><strong>Date range:</strong> ?start_date=2024-01-15&end_date=2024-01-20</p>
              <p><strong>From date:</strong> ?start_date=2024-01-15</p>
              <p><strong>Until date:</strong> ?end_date=2024-01-20</p>
              <p><strong>All slots:</strong> (no parameters)</p>
            </div>
          </div>
        </div>

        {/* UI Test Section */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-4">🎨 UI Component Tests</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Button Variants:</h4>
              <div className="flex space-x-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Button Sizes:</h4>
              <div className="flex items-center space-x-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Loading State:</h4>
              <Button loading>Loading Button</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
