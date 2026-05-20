import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Routh from './components/Routhing/routh'
import {type AppDispatch, type RooState } from './store'
import { useEffect } from 'react'
import { onSetResponse } from './components/Response/redux/responseSlice'
import { onCloseSideToSide, onSidebarHandler } from './components/Home/header/redux/headerSlice'
import { closeAllMegeMenu } from './components/Home/header/menus/redux/megaMenuSlice'
import { nullSideToSide } from './components/Home/header/menus/menuList/sideToSide/redux/sideToSideSlice'

function App() {
  const {dark} =  useSelector((state: RooState) => state.darkMode)  // dark mode
  const {sidebar} =  useSelector((state: RooState) => state.header) // header : sidebar
  const dispatch = useDispatch<AppDispatch>()
  // test

  useEffect(() => {
    const handlerResize = () => {
      // hander resize while response inner width
      dispatch(onSetResponse())
      dispatch(nullSideToSide())

      // close sidebar with resize inner width
      if(window.innerWidth > 750 ){
        dispatch(onCloseSideToSide())
        dispatch(closeAllMegeMenu())
        dispatch(onSidebarHandler({sidebar: null}))
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
      className="bg-[#bebebe]! text-black! dark:bg-[#242424]! dark:text-[rgba(255,255,255,0.87)]!  ">
      {/* routhing */}
      <Routh />

    </div>
  )
}

export default App
