import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position to center-right
  useEffect(() => {
    if (noButtonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({
        x: container.width / 2 + 80,
        y: container.height / 2 - button.height / 2
      });
    }
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Generate random position within container bounds with padding
    const padding = 20;
    const maxX = container.width - button.width - padding;
    const maxY = container.height - button.height - padding;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4 overflow-hidden relative">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-romantic-heart opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                fontSize: `${20 + Math.random() * 30}px`
              }}
              fill="currentColor"
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-romantic-border">
            <img
              src="/assets/generated/valentine-good-choice-meme.dim_1024x1024.png"
              alt="Good choice"
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-romantic-dark mb-4 flex items-center justify-center gap-3">
              Good choice
              <Heart className="text-romantic-heart animate-pulse" fill="currentColor" size={40} />
            </h1>
            <p className="text-xl md:text-2xl text-romantic-text">
              I knew you'd make the right decision! 💕
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4 overflow-hidden relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-romantic-heart opacity-15 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 30}px`
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-romantic-border">
          <Heart className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-romantic-heart animate-pulse" fill="currentColor" />
          
          <h1 className="text-4xl md:text-6xl font-bold text-romantic-dark mb-4 leading-tight">
            Will you be my Valentine?
          </h1>
          
          <p className="text-lg md:text-xl text-romantic-text mb-12">
            Choose wisely... 💖
          </p>

          <div
            ref={containerRef}
            className="relative h-32 md:h-40 w-full max-w-md mx-auto"
          >
            {/* Yes Button - Static position */}
            <Button
              onClick={handleYesClick}
              size="lg"
              className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 -ml-10 bg-romantic-yes hover:bg-romantic-yes-hover text-white font-bold text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border-2 border-romantic-yes-border"
            >
              Yes! 💕
            </Button>

            {/* No Button - Evasive position */}
            <Button
              ref={noButtonRef}
              onPointerEnter={moveNoButton}
              onPointerDown={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              size="lg"
              variant="outline"
              className="absolute bg-white hover:bg-white text-romantic-no border-2 border-romantic-no font-bold text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 rounded-full shadow-lg transition-all duration-300 ease-out cursor-pointer"
              style={{
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              No
            </Button>
          </div>
        </div>

        <footer className="mt-8 text-romantic-footer text-sm">
          © 2026. Built with <Heart className="inline w-4 h-4 text-romantic-heart" fill="currentColor" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-romantic-dark transition-colors">
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
