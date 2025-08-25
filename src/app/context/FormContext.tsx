"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

interface FormData {
  brand_name: string;
  brand_owner: string;
  date: string;
  brand_status: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);


export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    brand_name: '',
    brand_owner: '',
    date: '',
    brand_status: 'En trámite',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext debe ser usado dentro de un FormProvider');
  }
  return context;
};