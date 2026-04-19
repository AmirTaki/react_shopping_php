import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Routh from './components/Routhing/routh'
import {type AppDispatch, type RooState } from './store'
import { useEffect } from 'react'
import { onSetResponse } from './components/Response/redux/responseSlice'

function App() {
  const {dark} =  useSelector((state: RooState) => state.darkMode)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handlerResize = () => {
      dispatch(onSetResponse())
    }
    handlerResize()
    window.addEventListener('resize', handlerResize)
    return () => window.removeEventListener('resize', handlerResize)
  }, [])
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
