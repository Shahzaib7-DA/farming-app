import React from 'react';
import { LanguageContext, useLanguageStorage, Language } from '@/hooks/useLanguage';
import { getTranslation } from '@/translations';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useLanguageStorage();

  const t = (key: string, params?: Record<string, string>) => {
    return getTranslation(language, key, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};