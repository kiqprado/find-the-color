import { Link } from 'react-router-dom'
import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

export function Home() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".text-animate",
      { 
        opacity: 0, 
        scale: 0, 
        y: 50, 
        rotation: -20 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.05
      }
    );

    tl.fromTo(
      ".start-btn",
      { 
        opacity: 0, 
        scale: 0,
        y: 30 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(".start-btn", {
            scale: 1.08,
            duration: 0.6,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
          });
        }
      },
      "-=0.2"
    );

  }, { scope: containerRef });

  function RenderLettering(text: string) {
    return text.split('').map((char, i) => {
      const neonClass = i % 2 === 0 ? 'text-neon-blue-red' : 'text-neon-yellow-green';

      return (
        <span
          key={i}
          className={`text-animate ${neonClass} inline-block`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      );
    });
  }

  return (
    <div 
      ref={containerRef}
      className='w-full h-svh flex bg-zinc-950 text-zinc-100 select-none overflow-hidden font-black'
    >
      <div className='m-auto flex flex-col items-center gap-2 splash-font'>
        
        <span className='text-7xl tracking-wider mb-2 '>
          {RenderLettering("Advinhe")}
        </span>
    
        <span className='text-5xl mb-2'>
          {RenderLettering("a")}
        </span>
        
        <span className='text-7xl tracking-wider'>
          {RenderLettering("Cor")}
        </span>
        
        <Link
          to='/guess-the-color'
          className='start-btn mt-12 px-10 py-2
          text-3xl font-black capitalized tracking-widest
          bg-white text-black rounded-2xl  border-2 border-black shadow-[0_4px_0_#3b82f6] hover:bg-zinc-100 active:translate-y-1 active:shadow-[0_2px_0_#3b82f6] transition-all'
        >
          Começar
        </Link>
        
      </div>
    </div> 
  )
}