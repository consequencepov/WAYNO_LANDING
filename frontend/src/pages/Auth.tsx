import { Navigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { AuthForm } from '@/components/features/auth/AuthForm'
import { AuthInfographic } from '@/components/features/auth/AuthInfographic'
import { Seo } from '@/components/seo/Seo'
import { useSession } from '@/hooks/useSession'

export function Auth() {
  const { session, isLoading } = useSession()
  const location = useLocation()
  const redirectTo = (location.state as { from?: string })?.from ?? '/'

  // If already authenticated, redirect away from auth page
  if (!isLoading && session) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <>
      <Seo
        title="Вход в платформу WAYNO"
        description="Авторизация в платформе WAYNO для создания сайтов, лендингов и запуска цифровых продуктов с помощью AI."
        path="/auth"
        noindex
      />
      <AuthLayout
        left={<AuthForm />}
        right={<AuthInfographic />}
      />
    </>
  )
}
