import { useState } from "react"
import { countries } from "../../data/countries"

import { AllColors } from "../utils/colors"

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max)
}

function buildRound(usedIndices: number[]) {
  const available = countries.map((_, i) => i).filter(i => !usedIndices.includes(i))
  if (available.length === 0) return null

  const idx = available[getRandomIndex(available.length)]
  const country = countries[idx]
  const countryColors = Object.values(country.colors[0]).filter(Boolean) as string[]
  const correctColor = countryColors[getRandomIndex(countryColors.length)]
  const wrongColor = AllColors.filter(c => !countryColors.includes(c))[getRandomIndex(AllColors.length)]
  const correctIsFirst = Math.random() > 0.5

  return { country, correctColor, wrongColor, correctIsFirst, index: idx }
}

export function useGuessTheColor() {
  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [round, setRound] = useState(() => buildRound([]))
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [finished, setFinished] = useState(false)

  function answer(isCorrect: boolean) {
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    }))
  }

  function next() {
    const newUsed = [...usedIndices, round!.index]
    if (newUsed.length >= countries.length) {
      setFinished(true)
      return
    }
    setUsedIndices(newUsed)
    setRound(buildRound(newUsed))
    setFeedback(null)
  }

  return { round, score, feedback, finished, answer, next }
}
