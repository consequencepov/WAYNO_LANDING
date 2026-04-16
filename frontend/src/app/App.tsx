import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import { useLenis } from '@/hooks/useLenis'

function AppInner() {
  useLenis()
  return (
    <>
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
