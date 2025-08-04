'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Whisper Room
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === '/'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === '/about'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Về chúng tôi
            </Link>
{/* Debug button - controlled by environment variable */}
            {process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true' && (
              <Link
                href="/debug"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === '/debug'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-orange-500 hover:text-orange-600'
                }`}
              >
                🔧 Debug
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
