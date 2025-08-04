'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ButtonContrastTest() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6">🎨 Button Contrast Test</h2>
        
        {/* Test on different backgrounds */}
        <div className="space-y-8">
          
          {/* White background */}
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="font-semibold mb-4">White Background</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="white">White Button</Button>
            </div>
          </div>

          {/* Gray background */}
          <div className="p-6 bg-gray-100 border rounded-lg">
            <h3 className="font-semibold mb-4">Gray Background</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="white">White Button</Button>
            </div>
          </div>

          {/* Primary gradient background (like hero section) */}
          <div className="p-6 bg-gradient-to-br from-primary to-[#2d5aa0] border rounded-lg">
            <h3 className="font-semibold mb-4 text-white">Primary Gradient Background (Hero Section)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="white">White Button ⭐</Button>
            </div>
          </div>

          {/* Dark background */}
          <div className="p-6 bg-gray-800 border rounded-lg">
            <h3 className="font-semibold mb-4 text-white">Dark Background</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="white">White Button</Button>
            </div>
          </div>

          {/* Button sizes test */}
          <div className="p-6 bg-gradient-to-r from-primary to-[#2d5aa0] border rounded-lg">
            <h3 className="font-semibold mb-4 text-white">Button Sizes on Gradient</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="white" size="sm">Small Button</Button>
              <Button variant="white" size="md">Medium Button</Button>
              <Button variant="white" size="lg">Large Button</Button>
            </div>
          </div>

          {/* Loading state test */}
          <div className="p-6 bg-gradient-to-br from-primary to-[#2d5aa0] border rounded-lg">
            <h3 className="font-semibold mb-4 text-white">Loading States</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="white" loading>Loading Button</Button>
              <Button variant="white" disabled>Disabled Button</Button>
            </div>
          </div>
        </div>

        {/* Color values reference */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Color Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Primary Colors:</h4>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#3b82f6] rounded mr-2"></div>
                  <span>Primary: #3b82f6</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#2d5aa0] rounded mr-2"></div>
                  <span>Primary Hover: #2d5aa0</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">White Button Colors:</h4>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#1e40af] rounded mr-2"></div>
                  <span>Text: #1e40af</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#1d4ed8] rounded mr-2"></div>
                  <span>Text Hover: #1d4ed8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effects Test */}
        <div className="p-6 bg-gray-100 border rounded-lg">
          <h3 className="font-semibold mb-4">Hover Effects Test</h3>
          <p className="text-sm text-gray-600 mb-4">Hover over these buttons to test smooth transitions:</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Hover me (Primary)</Button>
            <Button variant="secondary">Hover me (Secondary)</Button>
            <Button variant="outline">Hover me (Outline)</Button>
            <Button variant="white">Hover me (White)</Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Test Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check if text is clearly visible on all backgrounds</li>
            <li>• Verify hover effects work properly (smooth transitions)</li>
            <li>• Test different button sizes</li>
            <li>• Check loading and disabled states</li>
            <li>• The "White Button ⭐" should be used on gradient backgrounds</li>
            <li>• Hover effects should not hide text or cause flickering</li>
          </ul>
        </div>

        {/* Accessibility note */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">♿ Accessibility:</h3>
          <p className="text-sm text-green-700">
            All button variants should meet WCAG 2.1 AA contrast ratio requirements (4.5:1 for normal text).
            The white variant uses darker blue colors (#1e40af, #1d4ed8) to ensure good contrast on white backgrounds.
          </p>
        </div>
      </Card>
    </div>
  );
}
