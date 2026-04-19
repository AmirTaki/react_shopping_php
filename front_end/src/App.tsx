import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Routh from './components/Routhing/routh'
import {type AppDispatch, type RooState } from './store'
import { useEffect } from 'react'
import { onSetResponse } from './components/Response/redux/responseSlice'
import { onCloseSideToSide } from './components/Home/header/redux/headerSlice'

function App() {
  const {dark} =  useSelector((state: RooState) => state.darkMode)
  const {sidebar} =  useSelector((state: RooState) => state.header)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    const handlerResize = () => {
      dispatch(onSetResponse())

      // close sidebar with resize inner width
      if(window.innerWidth > 750 ){
        dispatch(onCloseSideToSide())
      }
    }
    handlerResize()
    window.addEventListener('resize', handlerResize)
    return () => window.removeEventListener('resize', handlerResize)
  }, [])

  // open sidebar  hidden overflow & close side bar auto overflow

  useEffect(() => {
    document.documentElement.style.overflow = sidebar ? 'hidden' : 'auto'
    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [sidebar])
  
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
