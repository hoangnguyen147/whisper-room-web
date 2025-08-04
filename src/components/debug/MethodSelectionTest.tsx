'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type WhisperRoomType = 'direct_human' | 'ai_interaction' | 'virtual_reality';

interface MethodOption {
  id: WhisperRoomType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function MethodSelectionTest() {
  const [selectedMethod, setSelectedMethod] = useState<WhisperRoomType | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const methods: MethodOption[] = [
    {
      id: 'direct_human',
      title: 'Trực tiếp với người thật',
      description: 'Test method selection',
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'ai_interaction',
      title: 'Tương tác với AI',
      description: 'Test method selection',
      icon: '🤖',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'virtual_reality',
      title: 'Thực tế ảo (VR)',
      description: 'Test method selection',
      icon: '🥽',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleMethodSelect = (method: WhisperRoomType) => {
    console.log('🎯 Method selected:', method);
    setSelectedMethod(method);
    setClickCount(prev => prev + 1);
  };

  const resetSelection = () => {
    setSelectedMethod(null);
    setClickCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6">🎯 Method Selection Test</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Test Status:</h3>
          <p><strong>Selected Method:</strong> {selectedMethod || 'None'}</p>
          <p><strong>Click Count:</strong> {clickCount}</p>
          <Button onClick={resetSelection} variant="outline" className="mt-2">
            Reset Selection
          </Button>
        </div>

        {/* Method Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`cursor-pointer transition-all duration-300 rounded-lg ${
                selectedMethod === method.id
                  ? 'ring-4 ring-primary ring-opacity-50 shadow-xl transform scale-105'
                  : 'hover:shadow-lg hover:transform hover:scale-102'
              }`}
              onClick={() => handleMethodSelect(method.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMethodSelect(method.id);
                }
              }}
            >
              <Card className="h-full border-2 border-transparent hover:border-primary/20 group">
                <div className="text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl text-white">{method.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {method.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm">
                    {method.description}
                  </p>

                  {/* Selection/Hover Indicator */}
                  <div className="mt-4">
                    {selectedMethod === method.id ? (
                      <div className="p-3 bg-primary text-white rounded-lg shadow-md">
                        <span className="text-sm font-medium flex items-center justify-center">
                          <span className="mr-2">✓</span>
                          Đã chọn
                        </span>
                      </div>
                    ) : (
                      <div className="p-3 border-2 border-gray-200 rounded-lg group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                        <span className="text-sm font-medium flex items-center justify-center text-gray-500 group-hover:text-white">
                          Click để chọn
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Test Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Test Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click on any method card to select it</li>
            <li>• Check if the selection state updates correctly</li>
            <li>• Verify hover effects work properly</li>
            <li>• Test keyboard navigation (Tab + Enter/Space)</li>
            <li>• Check console logs for click events</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
