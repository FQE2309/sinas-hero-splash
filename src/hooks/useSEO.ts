import { useEffect } from 'react';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterHandle?: string;
}

const defaultSEO: Required<SEOConfig> = {
  title: 'SINAS - Sistema de Inversiones en Agua Potable y Saneamiento Básico',
  description: 'Plataforma oficial del Ministerio de Vivienda, Ciudad y Territorio para planear, definir, sistematizar, priorizar y monitorear proyectos de inversión en infraestructura del sector hídrico en Colombia.',
  keywords: 'SINAS, agua potable, saneamiento básico, Colombia, Ministerio de Vivienda, infraestructura hídrica, inversión pública, gestión del agua',
  image: '/images/seo/og-image.jpg',
  url: 'https://sinas.minvivienda.gov.co',
  type: 'website',
  siteName: 'SINAS - Ministerio de Vivienda',
  locale: 'es_CO',
  twitterHandle: '@MinVivienda'
};

export const useSEO = (config: SEOConfig = {}) => {
  useEffect(() => {
    const seoConfig = { ...defaultSEO, ...config };
    
    // Title
    document.title = seoConfig.title;
    
    // Meta description
    updateMetaTag('name', 'description', seoConfig.description);
    updateMetaTag('name', 'keywords', seoConfig.keywords);
    
    // Open Graph
    updateMetaTag('property', 'og:title', seoConfig.title);
    updateMetaTag('property', 'og:description', seoConfig.description);
    updateMetaTag('property', 'og:image', seoConfig.image);
    updateMetaTag('property', 'og:url', seoConfig.url);
    updateMetaTag('property', 'og:type', seoConfig.type);
    updateMetaTag('property', 'og:site_name', seoConfig.siteName);
    updateMetaTag('property', 'og:locale', seoConfig.locale);
    
    // Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', seoConfig.twitterHandle);
    updateMetaTag('name', 'twitter:title', seoConfig.title);
    updateMetaTag('name', 'twitter:description', seoConfig.description);
    updateMetaTag('name', 'twitter:image', seoConfig.image);
    
    // Additional SEO tags
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'author', 'Ministerio de Vivienda, Ciudad y Territorio');
    updateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('http-equiv', 'Content-Language', 'es-CO');
    
    // Canonical URL
    updateLinkTag('canonical', seoConfig.url);
    
  }, [config]);
};

const updateMetaTag = (attribute: string, name: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (element) {
    element.setAttribute('href', href);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
};