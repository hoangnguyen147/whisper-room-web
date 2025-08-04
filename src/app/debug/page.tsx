import EnumMappingTest from '@/components/debug/EnumMappingTest';
import MethodSelectionTest from '@/components/debug/MethodSelectionTest';
import ButtonContrastTest from '@/components/debug/ButtonContrastTest';

export default function DebugPage() {
  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-center mb-8">🔧 Debug Tools</h1>

        <div className="space-y-8">
          <EnumMappingTest />
          <MethodSelectionTest />
          <ButtonContrastTest />
        </div>
      </div>
    </div>
  );
}
