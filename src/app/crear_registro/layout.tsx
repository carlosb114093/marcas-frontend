// app/crear_registro/layout.tsx
import { FormProvider } from '../context/FormContext';

export default function CreateRegistroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    
    <FormProvider>
      {children}
    </FormProvider>
  )
}