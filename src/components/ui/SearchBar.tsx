import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Network, Users, Home, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'section' | 'document';
  icon: React.ReactNode;
}

interface SearchBarProps {
  variant?: 'navbar' | 'page';
  className?: string;
}

const SearchBar = ({ variant = 'navbar', className = '' }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Datos de búsqueda simulados (en un proyecto real vendrían de una API o índice)
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Página Principal',
      description: 'Inicio del portal SINAS con información general y estadísticas',
      url: '/',
      type: 'page',
      icon: <Home className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Normatividad',
      description: 'Marco legal y normativo del sector de agua potable y saneamiento',
      url: '/normatividad',
      type: 'page',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Interoperabilidad',
      description: 'Entidades que interactúan con el sistema SINAS',
      url: '/interoperabilidad',
      type: 'page',
      icon: <Network className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'Gestores Comunitarios',
      description: 'Registro y gestión de organizaciones comunitarias',
      url: '/gestores-comunitarios',
      type: 'page',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: '5',
      title: 'Mapa del Sitio',
      description: 'Navegación completa del portal SINAS',
      url: '/sitemap',
      type: 'page',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: '6',
      title: 'Acerca del SINAS',
      description: 'Información sobre el Sistema de Inversiones',
      url: '/#acerca',
      type: 'section',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '7',
      title: 'Reportes Públicos',
      description: 'Estadísticas y datos del sector hídrico',
      url: '/#reportes',
      type: 'section',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '8',
      title: 'Ayuda y Soporte',
      description: 'Asistencia técnica y preguntas frecuentes',
      url: '/#ayuda',
      type: 'section',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '9',
      title: 'Decretos y Resoluciones',
      description: 'Documentos legales del sector',
      url: '/normatividad',
      type: 'document',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '10',
      title: 'Entidades Oferentes',
      description: 'Organizaciones que ofrecen servicios',
      url: '/interoperabilidad',
      type: 'document',
      icon: <Network className="w-4 h-4" />
    }
  ];

  // Función de búsqueda
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simular delay de búsqueda
    setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filteredResults.slice(0, 8)); // Limitar a 8 resultados
      setIsSearching(false);
    }, 200);
  };

  // Efecto para buscar cuando cambia la query
  useEffect(() => {
    performSearch(query);
  }, [query]);

  // Focus en input cuando se abre el modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Manejar navegación
  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery('');
    
    if (url.startsWith('/#')) {
      // Para anclas, navegar y hacer scroll
      const anchor = url.split('#')[1];
      navigate('/');
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(url);
    }
  };

  // Manejar Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].url);
    }
  };

  if (variant === 'navbar') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buscar en SINAS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Buscar páginas, documentos, secciones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Resultados */}
            <div className="max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-muted-foreground">Buscando...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                          <span className="inline-block mt-1 text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                            {result.type === 'page' ? 'Página' : 
                             result.type === 'section' ? 'Sección' : 'Documento'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No se encontraron resultados para "{query}"</p>
                  <p className="text-sm mt-2">Intenta con otros términos de búsqueda</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Escribe para buscar en el sitio</p>
                  <p className="text-sm mt-2">Páginas, documentos, secciones y más</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Variant 'page' para usar en otras partes
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Resultados dropdown para variant page */}
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((result) => (
              <Link
                key={result.id}
                to={result.url}
                className="block p-3 hover:bg-muted/50 transition-colors"
                onClick={() => setQuery('')}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{result.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;