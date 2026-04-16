import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import { useLenis } from '@/hooks/useLenis'
import { Preloader } from '@/components/ui'

function AppInner() {
  useLenis()
  return (
    <>
      <Preloader />
      <AppRouter />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
