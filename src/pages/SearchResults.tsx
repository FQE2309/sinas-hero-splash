import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageTransition from '@/components/ui/PageTransition';
import SearchBar from '@/components/ui/SearchBar';
import { useSEO } from '@/hooks/useSEO';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Search, FileText, Network, Users, Home, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'section' | 'document';
  icon: React.ReactNode;
  category?: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  const query = searchParams.get('q') || '';
  
  useScrollToTop();
  
  useSEO({
    title: `Resultados de búsqueda: ${query} | SINAS`,
    description: `Resultados de búsqueda para "${query}" en el portal SINAS. Encuentra páginas, documentos y secciones relacionadas.`,
    keywords: `búsqueda, ${query}, resultados, SINAS`,
    url: `https://sinas.minvivienda.gov.co/search?q=${encodeURIComponent(query)}`,
    type: 'article'
  });

  // Datos de búsqueda simulados
  const allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Página Principal',
      description: 'Inicio del portal SINAS con información general y estadísticas del sector hídrico en Colombia.',
      url: '/',
      type: 'page',
      icon: <Home className="w-4 h-4" />,
      category: 'Principal'
    },
    {
      id: '2',
      title: 'Normatividad',
      description: 'Marco legal y normativo del sector de agua potable y saneamiento básico. Decretos, resoluciones y documentos oficiales.',
      url: '/normatividad',
      type: 'page',
      icon: <FileText className="w-4 h-4" />,
      category: 'Legal'
    },
    {
      id: '3',
      title: 'Interoperabilidad',
      description: 'Entidades oferentes y demandantes que interactúan con el sistema SINAS para la gestión del sector hídrico.',
      url: '/interoperabilidad',
      type: 'page',
      icon: <Network className="w-4 h-4" />,
      category: 'Técnico'
    },
    {
      id: '4',
      title: 'Gestores Comunitarios',
      description: 'Registro y gestión de organizaciones comunitarias del sector de agua potable y saneamiento básico.',
      url: '/gestores-comunitarios',
      type: 'page',
      icon: <Users className="w-4 h-4" />,
      category: 'Servicios'
    },
    {
      id: '5',
      title: 'Acerca del SINAS',
      description: 'Información detallada sobre el Sistema de Inversiones en Agua Potable y Saneamiento Básico.',
      url: '/#acerca',
      type: 'section',
      icon: <FileText className="w-4 h-4" />,
      category: 'Información'
    },
    {
      id: '6',
      title: 'Reportes Públicos',
      description: 'Estadísticas, indicadores y datos abiertos del sector hídrico colombiano.',
      url: '/#reportes',
      type: 'section',
      icon: <FileText className="w-4 h-4" />,
      category: 'Datos'
    },
    {
      id: '7',
      title: 'Decreto 1898 de 2016',
      description: 'Decreto que reglamenta el registro de organizaciones comunitarias prestadoras de servicios de acueducto.',
      url: '/normatividad',
      type: 'document',
      icon: <FileText className="w-4 h-4" />,
      category: 'Legal'
    },
    {
      id: '8',
      title: 'Entidades Oferentes',
      description: 'Organizaciones que ofrecen servicios y productos relacionados con el sector de agua potable.',
      url: '/interoperabilidad',
      type: 'document',
      icon: <Network className="w-4 h-4" />,
      category: 'Técnico'
    }
  ];

  // Función de búsqueda
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const searchResults = allResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(searchResults);
      setFilteredResults(searchResults);
      setIsLoading(false);
    }, 300);
  };

  // Filtrar resultados por tipo
  const applyFilter = (filterType: string) => {
    if (filterType === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(result => result.type === filterType));
    }
  };

  useEffect(() => {
    performSearch(query);
  }, [query]);

  useEffect(() => {
    applyFilter(filter);
  }, [filter, results]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page': return 'Páginas';
      case 'section': return 'Secciones';
      case 'document': return 'Documentos';
      default: return 'Todos';
    }
  };

  const getTypeCounts = () => {
    const counts = {
      all: results.length,
      page: results.filter(r => r.type === 'page').length,
      section: results.filter(r => r.type === 'section').length,
      document: results.filter(r => r.type === 'document').length,
    };
    return counts;
  };

  const counts = getTypeCounts();

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/', icon: <Home className="w-4 h-4" /> },
          { label: 'Resultados de Búsqueda', icon: <Search className="w-4 h-4" /> }
        ]} />
        
        {/* Search Header */}
        <section className="pt-8 pb-6 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">
                Resultados de Búsqueda
              </h1>
              {query && (
                <p className="text-muted-foreground mb-6">
                  {isLoading ? 'Buscando...' : `${filteredResults.length} resultados encontrados para "${query}"`}
                </p>
              )}
              
              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar 
                  variant="page" 
                  className="max-w-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Filters */}
              {results.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtrar por tipo:</span>
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        Todos ({counts.all})
                      </SelectItem>
                      <SelectItem value="page">
                        Páginas ({counts.page})
                      </SelectItem>
                      <SelectItem value="section">
                        Secciones ({counts.section})
                      </SelectItem>
                      <SelectItem value="document">
                        Documentos ({counts.document})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-4"></div>
                  <span className="text-muted-foreground">Buscando resultados...</span>
                </div>
              )}

              {/* Results */}
              {!isLoading && query && (
                <>
                  {filteredResults.length > 0 ? (
                    <div className="space-y-4">
                      {filteredResults.map((result) => (
                        <Card key={result.id} className="hover:shadow-lg transition-all duration-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-primary">
                                  {result.icon}
                                </div>
                                <div>
                                  <CardTitle className="text-lg">
                                    <a 
                                      href={result.url}
                                      className="hover:text-primary transition-colors"
                                    >
                                      {result.title}
                                    </a>
                                  </CardTitle>
                                  <div className="flex gap-2 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {getTypeLabel(result.type).slice(0, -1)}
                                    </Badge>
                                    {result.category && (
                                      <Badge variant="outline" className="text-xs">
                                        {result.category}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-base mb-3">
                              {result.description}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{result.url}</span>
                              <Button asChild variant="ghost" size="sm" className="h-auto p-0 text-primary">
                                <a href={result.url}>
                                  Ver página →
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground mb-6">
                        No encontramos ningún resultado para "{query}"
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Sugerencias:</p>
                        <ul className="space-y-1">
                          <li>• Verifica la ortografía</li>
                          <li>• Intenta con términos más generales</li>
                          <li>• Usa sinónimos o palabras relacionadas</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* No Query State */}
              {!query && !isLoading && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">¿Qué estás buscando?</h3>
                  <p className="text-muted-foreground">
                    Escribe en el cuadro de búsqueda para encontrar páginas, documentos y secciones.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default SearchResults;