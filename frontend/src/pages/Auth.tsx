import { AuthLayout } from '@/components/layout/AuthLayout'
import { AuthForm } from '@/components/features/auth/AuthForm'
import { AuthInfographic } from '@/components/features/auth/AuthInfographic'
import { Seo } from '@/components/seo/Seo'

export function Auth() {
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
