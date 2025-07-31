import { useTheme } from "./ThemeProvider";

export function FloatingVectorField() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Vector Field */}
      <div className="absolute inset-0">
        {/* Diagonal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-5 animate-vector-slide" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-5 animate-vector-slide" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-5 animate-vector-slide" style={{ animationDelay: '10s' }}></div>
        
        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-5 animate-vector-slide" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-5 animate-vector-slide" style={{ animationDelay: '7s' }}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/6 left-1/6 w-4 h-4 opacity-10 animate-vector-float" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 16 16" className="w-full h-full text-current">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-6 h-6 opacity-10 animate-vector-float" style={{ animationDelay: '3s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-current">
            <polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 opacity-10 animate-vector-float" style={{ animationDelay: '6s' }}>
          <svg viewBox="0 0 20 20" className="w-full h-full text-current">
            <rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute top-2/3 right-1/6 w-4 h-4 opacity-10 animate-vector-float" style={{ animationDelay: '9s' }}>
          <svg viewBox="0 0 16 16" className="w-full h-full text-current">
            <path d="M8,2 L14,8 L8,14 L2,8 Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        
        {/* Moving Arrow Vectors */}
        <div className="absolute top-1/5 right-1/3 w-8 h-8 opacity-15 animate-vector-pulse" style={{ animationDelay: '4s' }}>
          <svg viewBox="0 0 32 32" className="w-full h-full text-current">
            <path d="M4,16 L24,16 M20,12 L24,16 L20,20" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 left-1/5 w-8 h-8 opacity-15 animate-vector-pulse" style={{ animationDelay: '8s' }}>
          <svg viewBox="0 0 32 32" className="w-full h-full text-current">
            <path d="M16,4 L16,24 M12,20 L16,24 L20,20" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        
        {/* Complex Vector Patterns */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 opacity-10 animate-vector-float" style={{ animationDelay: '11s' }}>
          <svg viewBox="0 0 48 48" className="w-full h-full text-current">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M24,4 L24,44 M4,24 L44,24" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}