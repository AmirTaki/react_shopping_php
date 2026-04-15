import { useSelector } from 'react-redux'
import './App.css'
import Routh from './components/Routhing/routh'
import type { RooState } from './store'

function App() {
  const {dark} =  useSelector((state: RooState) => state.darkMode)
  return (
    <div 
      data-theme = {`${dark ? "dark" : ''}`}
      className="bg-white! text-black! dark:bg-[#242424]! dark:text-[rgba(255,255,255,0.87)]!  ">
      {/* routhing */}
      <Routh />
    </div>
  )
}

export default App
