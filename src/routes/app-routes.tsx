import { Route, Routes } from 'react-router-dom'

import { Home } from '../pages/home'
import { GuessTheColor } from '../pages/guess-the-color'
import { About } from '../pages/about'

export default function AppRoutes() {
  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/guess-the-color' element={<GuessTheColor/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
  )
}