import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { useBreakpoint } from '../hook/use-media-query'

gsap.registerPlugin(useGSAP);

interface ResultModalProps {
  correct: number;
  wrong: number;
}

export function ResultModal({ correct, wrong }: ResultModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // BREAKPOINTS INDIVIDUALS
  const isMobileXS = useBreakpoint('mobileXS')
  const isMobileSM = useBreakpoint('mobileSM')
  const isMobileMD = useBreakpoint('mobileMD')
  const isMobileLG = useBreakpoint('mobileLG')
  const isMobileXL = useBreakpoint('mobileXL')

  const isTabletSM = useBreakpoint('tabletSM')
  const isTabletMD = useBreakpoint('tabletMD')

  const isDesktopSM = useBreakpoint('desktopSM')
  const isDesktopMD = useBreakpoint('desktopMD')
  const isDesktopLG = useBreakpoint('desktopLG')
  const isDesktopXL = useBreakpoint('desktopXL')
  const isDesktop2XL = useBreakpoint('desktop2XL')

  // GROUPS DE BREAKPOINTS

  const mobileRangeFull =
    isMobileXS ||
    isMobileSM ||
    isMobileMD ||
    isMobileLG ||
    isMobileXL

  const tabletRangeFull =
    isTabletSM ||
    isTabletMD

  const desktopRangeFull =
    isDesktopSM ||
    isDesktopMD ||
    isDesktopLG ||
    isDesktopXL ||
    isDesktop2XL


  const resizedViewRange = mobileRangeFull ? 'w-[90%]' : tabletRangeFull ? 'w-[60%]' : 'w-[40%]'

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(overlayRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    tl.fromTo(modalRef.current,
      { scale: 0.2, y: 150, rotation: 15 },
      { scale: 1, y: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.8)' },
      '-=0.1'
    );

    tl.fromTo('.score-box',
      { scale: 0, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.15 }
    , '-=0.2');

    gsap.to(modalRef.current, {
      y: '-=6',
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 0.6
    });

  }, { scope: overlayRef });

  function handleBackClick(e: React.MouseEvent) {
    e.preventDefault();
    
    gsap.to(".btn-home", {
      scale: 0.92,
      y: 4,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        navigate('/');
      }
    });
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6 backdrop-blur-sm"
    >
      <div 
        ref={modalRef}
        className={` ${resizedViewRange}
            flex flex-col items-center gap-8
            ${mobileRangeFull ? 'p-4' : 'p-8'}
          bg-zinc-950 rounded-[2.5rem]
            border-8 border-purple-600 shadow-2xl text-center select-none`}
        style={{
          filter: 'drop-shadow(0px 0px 25px rgba(147, 51, 234, 0.45))'
        }}
      >
        <p 
          className="text-4xl font-black tracking-widest uppercase 
        text-white filter drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
        >
          Resultado final
        </p>

        <div 
          className={`w-full flex ${mobileRangeFull ? 'gap-3 px-1 py-3 ' : 'gap-8 py-6'} justify-center
           bg-zinc-900/50  rounded-3xl border-4 border-zinc-800  `}
        >

          <div className="score-box flex flex-col items-center">
            <span className="text-6xl font-black text-emerald-400 filter drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
              {correct}
            </span>
            <span className="text-lg font-extrabold text-zinc-300 uppercase tracking-wider mt-2">
              Acertos
            </span>
          </div>

          <div className={`${mobileRangeFull ? 'hidden' : ''}w-1 h-16 self-center rounded-full bg-zinc-800`} />

          <div className="score-box flex flex-col items-center">
            <span className="text-6xl font-black text-rose-500 filter drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
              {wrong}
            </span>
            <span className="text-lg font-extrabold text-zinc-300 uppercase tracking-wider mt-2">
              Erros
            </span>
          </div>

        </div>

        <Link 
          to='/' 
          onClick={handleBackClick}
          className="btn-home w-full py-3
          font-black text-2xl uppercase tracking-widest
          bg-purple-600 hover:bg-purple-500 text-white rounded-2xl  
          border-4 border-black shadow-[0_2px_0_#581c87] 
          active:translate-y-1 active:shadow-[0_2px_0_#581c87] transition-all text-center cursor-pointer"
        >
          Início
        </Link>
      </div>
    </div>
  )
}