import { useRef } from 'react'

import { useGuessTheColor } from "../hook/use-guess-the-color"
import { FeedBackGuestModal } from "../components/feedback-guest-modal"
import { ResultModal } from "../components/result-modal"

import { useBreakpoint } from '../hook/use-media-query'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

export function GuessTheColor() {
  const { round, score, feedback, finished, answer, next } = useGuessTheColor()

  const containerRef = useRef<HTMLDivElement>(null);

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


  useGSAP(() => {
    if (!round) return;

    const tl = gsap.timeline();

    tl.set([".game-flag", ".game-title", ".game-question", ".game-btn"], { 
      opacity: 0, 
      scale: 0.8, 
      y: 30 
    });

    tl.to(".game-flag", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.5)"
    });

    tl.to(".game-title", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.3");

    tl.to(".game-question", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    tl.to(".game-btn", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: 0.1
    }, "-=0.1");

  }, { scope: containerRef, dependencies: [round?.country?.name] });

  if (!round) return null

  const { country, correctColor, wrongColor, correctIsFirst } = round
  const first  = correctIsFirst ? correctColor : wrongColor
  const second = correctIsFirst ? wrongColor   : correctColor

  const flagShadowColor = country.colors?.[0]?.primary || '#ffffff';

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-zinc-950 select-none overflow-hidden"
    >
      <img
        src={country.flag}
        alt={`Bandeira de ${country.name}`}
        className={`game-flag ${mobileRangeFull || tabletRangeFull ? 'w-[90%]' : 'w-[44%]'} h-auto 
          rounded-2xl border-4 border-black 
          transition-transform duration-300 ease-in-out hover:scale-105`}
        style={{
          filter: `drop-shadow(0px 0px 8px ${flagShadowColor})`
        }}
      />

      <h1 
        className={`game-title 
        ${mobileRangeFull ? 'text-4xl' : 'text-5xl'} text-white text-center font-black tracking-widest uppercase`}>
        {country.name}
      </h1>

      <p className="game-question tracking-widest text-zinc-300 text-xl font-bold">
        { mobileRangeFull 
          ? 'Qual cor esta na bandeira?' 
          : 'Qual dessas cores está na bandeira?'
        }
      </p>

      <div className="flex gap-8">
        <button
          onClick={() => answer(correctIsFirst)}
          className="game-btn w-20 h-20 rounded-2xl 
          border-4 border-black shadow-[0_6px_0_rgba(0,0,0,0.4)] 
          active:translate-y-1 active:shadow-[0_2px_0_rgba(0,0,0,0.4)] transition-all cursor-pointer"
          style={{ background: first }}
        />
        <button
          onClick={() => answer(!correctIsFirst)}
          className="game-btn w-20 h-20 rounded-2xl 
          border-4 border-black shadow-[0_6px_0_rgba(0,0,0,0.4)] 
          active:translate-y-1 active:shadow-[0_2px_0_rgba(0,0,0,0.4)] transition-all cursor-pointer"
          style={{ background: second }}
        />
      </div>

      {feedback && <FeedBackGuestModal feedback={feedback} onNext={next} />}
      {finished && <ResultModal correct={score.correct} wrong={score.wrong} />}
    </div>
  )
}
