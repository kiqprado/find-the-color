import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface FeedBackGuestModalProps {
  feedback: 'correct' | 'wrong';
  onNext: () => void;
}

export function FeedBackGuestModal({ feedback, onNext }: FeedBackGuestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isCorrect = feedback === 'correct';

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    if (isCorrect) {
      gsap.fromTo(modalRef.current,
        { scale: 0.3, y: 100, rotation: -10 },
        { scale: 1, y: 0, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
      );
    } else {
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current,
        { scale: 1.2, y: -150, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' }
      );
    
      tl.to(modalRef.current, { x: -10, duration: 0.05, yoyo: true, repeat: 5 })
        .to(modalRef.current, { x: 0, duration: 0.05 });
    }

    gsap.to(modalRef.current, {
      y: '-=8',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 0.6
    });

  }, { scope: overlayRef });

  function handleButtonClick() {
    gsap.to(".btn-next", {
      scale: 0.92,
      y: 4,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: onNext
    });
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm"
    >
      <div 
        ref={modalRef}
        className={`
          bg-zinc-950 rounded-[2.5rem] p-10 flex flex-col items-center gap-6 min-w-[90%] sm:min-w-[35%] 
          border-8 select-none shadow-2xl text-center
          ${isCorrect 
            ? 'border-emerald-500 shadow-emerald-500/20 text-neon-yellow-green' 
            : 'border-rose-600 shadow-rose-600/20 text-neon-blue-red'
          }
        `}
        style={{
          filter: isCorrect 
            ? 'drop-shadow(0px 0px 20px rgba(16, 185, 129, 0.4))' 
            : 'drop-shadow(0px 0px 20px rgba(225, 29, 72, 0.4))'
        }}
      >

        <div className="text-8xl filter drop-shadow-[0_4px_0_rgba(0,0,0,1)] animate-pulse">
          {isCorrect ? '✅' : '❌'}
        </div>

        <span 
          className="text-4xl tracking-widest uppercase 
          text-white font-extrabold filter drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
        >
          {isCorrect ? 'Parabéns!' : 'Oops!'}
        </span>

        <button
          onClick={handleButtonClick}
          className={`
            btn-next w-full py-4 rounded-2xl 
            font-black text-2xl uppercase tracking-widest
            border-4 border-black text-white cursor-pointer 
            transition-all duration-200
            ${isCorrect 
              ? 'bg-emerald-500 shadow-[0_2px_0_#065f46] hover:bg-emerald-400' 
              : 'bg-rose-500 shadow-[0_2px_0_#9f1239] hover:bg-rose-400'
            }
          `}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}