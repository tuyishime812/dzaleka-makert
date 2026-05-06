import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f23] py-12">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-[#e94560] hover:bg-[#d13a54]',
            card: 'bg-[#1a1a2e] border-[#2d2d44]',
            headerTitle: 'text-white',
            headerSubtitle: 'text-[#94a3b8]',
            socialButtonsBlockButton: 'bg-[#0f0f23] border-[#2d2d44] text-white hover:bg-[#2d2d44]',
            socialButtonsIconButton: 'text-white',
            formFieldInput: 'bg-[#0f0f23] border-[#2d2d44] text-white',
            formFieldLabel: 'text-[#94a3b8]',
            footerActionLink: 'text-[#e94560]',
            identityPreviewText: 'text-white',
            identityPreviewEditButton: 'text-[#e94560]',
            dividerLine: 'bg-[#2d2d44]',
            dividerText: 'text-[#94a3b8]',
          },
        }}
      />
    </div>
  )
}