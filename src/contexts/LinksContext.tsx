import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface SiteLinks {
  // Enlaces principales
  ingresarSistema: string;
  gestoresComunitarios: string;
  
  // Redes sociales
  facebook: string;
  twitter: string; // Ahora X
  linkedin: string;
  youtube: string;
  instagram: string;
  
  // Enlaces institucionales
  minvivienda: string;
  govco: string;
  
  // Enlaces de ayuda y soporte
  soporteTecnico: string;
  manualesGuias: string;
  tutoriales: string;
  
  // Enlaces adicionales
  politicaPrivacidad: string;
  terminosUso: string;
  contacto: string;
}

const defaultLinks: SiteLinks = {
  // Enlaces principales
  ingresarSistema: 'https://sinas.minvivienda.gov.co/SINAS/inicio/Login.aspx',
  gestoresComunitarios: 'https://gestores.sinas.minvivienda.gov.co/registro',
  
  // Redes sociales
  facebook: 'https://www.facebook.com/MinVivienda',
  twitter: 'https://x.com/minvivienda', // Cambiado a X
  linkedin: 'https://www.linkedin.com/company/ministerio-de-vivienda-ciudad-y-territorio',
  youtube: 'https://www.youtube.com/user/MinVivienda',
  instagram: 'https://www.instagram.com/minvivienda/',
  
  // Enlaces institucionales
  minvivienda: 'https://www.minvivienda.gov.co',
  govco: 'https://www.gov.co',
  
  // Enlaces de ayuda y soporte
  soporteTecnico: 'mailto:soporte.sinas@minvivienda.gov.co',
  manualesGuias: '/guias-manuales',
  tutoriales: '/tutoriales',
  
  // Enlaces adicionales
  politicaPrivacidad: 'https://www.minvivienda.gov.co/politica-de-privacidad',
  terminosUso: 'https://www.minvivienda.gov.co/terminos-de-uso',
  contacto: 'https://www.minvivienda.gov.co/contacto'
};

interface LinksContextType {
  links: SiteLinks;
  updateLinks: (newLinks: Partial<SiteLinks>) => void;
  resetToDefault: () => void;
  isLoading: boolean;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

const STORAGE_KEY = 'sinas_site_links';

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<SiteLinks>(defaultLinks);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar enlaces desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      if (savedLinks) {
        const parsed = JSON.parse(savedLinks) as SiteLinks;
        // Merge con los enlaces por defecto para asegurar que existan todas las propiedades
        setLinks({ ...defaultLinks, ...parsed });
      }
    } catch (error) {
      console.error('Error loading links from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar enlaces en localStorage cuando cambien
  const updateLinks = (newLinks: Partial<SiteLinks>) => {
    const updatedLinks = { ...links, ...newLinks };
    setLinks(updatedLinks);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLinks));
    } catch (error) {
      console.error('Error saving links to storage:', error);
    }
  };

  const resetToDefault = () => {
    setLinks(defaultLinks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLinks));
    } catch (error) {
      console.error('Error resetting links:', error);
    }
  };

  return (
    <LinksContext.Provider value={{ links, updateLinks, resetToDefault, isLoading }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};