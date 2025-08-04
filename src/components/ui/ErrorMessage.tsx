import Button from './Button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({ 
  title = 'Có lỗi xảy ra', 
  message, 
  onRetry, 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
      <div className="text-red-600 text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="border-red-300 text-red-700 hover:bg-red-100">
          Thử lại
        </Button>
      )}
    </div>
  );
}
