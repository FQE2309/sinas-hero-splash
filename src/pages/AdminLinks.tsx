import { useState, useEffect } from 'react';
import { useLinks } from '@/contexts/LinksContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import PageTransition from '@/components/ui/PageTransition';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Eye, EyeOff, Save, RotateCcw, Lock, CheckCircle, ExternalLink, Settings } from 'lucide-react';
import { toast } from 'sonner';
import SHA256 from 'crypto-js/sha256';

// Hash SHA-256 de la contraseña de administración (cargado desde .env)
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

// Función para hashear la contraseña ingresada
const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};

const AdminLinks = () => {
  const { links, updateLinks, resetToDefault, isLoading } = useLinks();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(links);
  const [hasChanges, setHasChanges] = useState(false);

  // Verificar si ya está autenticado en sessionStorage
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('sinas_admin_auth');
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Actualizar formData cuando cambien los links
  useEffect(() => {
    setFormData(links);
  }, [links]);

  // Detectar cambios en el formulario
  useEffect(() => {
    const hasChanged = JSON.stringify(formData) !== JSON.stringify(links);
    setHasChanges(hasChanged);
  }, [formData, links]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que la variable de entorno esté configurada
    if (!ADMIN_PASSWORD_HASH) {
      toast.error('Error de configuración: Variable de entorno no encontrada');
      console.error('VITE_ADMIN_PASSWORD_HASH no está definido en .env');
      return;
    }
    
    // Hashear la contraseña ingresada y compararla con el hash guardado
    const hashedInput = hashPassword(password);
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sinas_admin_auth', 'authenticated');
      toast.success('Acceso autorizado');
    } else {
      toast.error('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sinas_admin_auth');
    setPassword('');
    toast.info('Sesión cerrada');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateLinks(formData);
    toast.success('Enlaces actualizados correctamente');
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restaurar todos los enlaces a sus valores por defecto?')) {
      resetToDefault();
      toast.success('Enlaces restaurados a valores por defecto');
    }
  };

  const handleCancel = () => {
    setFormData(links);
    toast.info('Cambios descartados');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl">Panel de Administración</CardTitle>
            <CardDescription>
              Ingrese la contraseña para acceder a la gestión de enlaces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña"
                    className="pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Acceder
              </Button>
            </form>
            
            {/* Botón para volver al sitio */}
            <div className="text-center pt-4 border-t">
              <Button variant="outline" size="sm" asChild>
                <Link to="/" className="text-sm">
                  ← Volver al Sitio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </PageTransition>
    );
  }

  // Panel de administración
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/', icon: <CheckCircle className="w-4 h-4" /> },
          { label: 'Administración', icon: <Settings className="w-4 h-4" /> }
        ]} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestión de enlaces del sitio web SINAS</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/">
                ← Volver al Sitio
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Alert de cambios */}
        {hasChanges && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Cambios Pendientes</AlertTitle>
            <AlertDescription>
              Tienes cambios sin guardar. Recuerda hacer clic en "Guardar Cambios" para aplicarlos.
            </AlertDescription>
          </Alert>
        )}

        {/* Botones de acción */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleReset}
            className="flex items-center gap-2 ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar por Defecto
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Enlaces Principales */}
          <Card>
            <CardHeader>
              <CardTitle>Enlaces Principales</CardTitle>
              <CardDescription>Enlaces de acceso y funcionalidades principales del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ingresarSistema">Ingresar al Sistema</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ingresarSistema"
                      value={formData.ingresarSistema}
                      onChange={(e) => handleInputChange('ingresarSistema', e.target.value)}
                      placeholder="URL del sistema SINAS"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.ingresarSistema} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="gestoresComunitarios">Gestores Comunitarios</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gestoresComunitarios"
                      value={formData.gestoresComunitarios}
                      onChange={(e) => handleInputChange('gestoresComunitarios', e.target.value)}
                      placeholder="URL de registro de gestores"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.gestoresComunitarios} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redes Sociales */}
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
              <CardDescription>Enlaces a las redes sociales oficiales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="flex gap-2">
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      placeholder="URL de Facebook"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.facebook} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="twitter">X (antes Twitter)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      placeholder="URL de X"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.twitter} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="flex gap-2">
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="URL de LinkedIn"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <div className="flex gap-2">
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange('youtube', e.target.value)}
                      placeholder="URL de YouTube"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.youtube} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex gap-2">
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="URL de Instagram"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.instagram} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enlaces Institucionales */}
          <Card>
            <CardHeader>
              <CardTitle>Enlaces Institucionales</CardTitle>
              <CardDescription>Enlaces a sitios gubernamentales y oficiales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minvivienda">Ministerio de Vivienda</Label>
                  <div className="flex gap-2">
                    <Input
                      id="minvivienda"
                      value={formData.minvivienda}
                      onChange={(e) => handleInputChange('minvivienda', e.target.value)}
                      placeholder="URL del MinVivienda"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.minvivienda} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="govco">Gov.co</Label>
                  <div className="flex gap-2">
                    <Input
                      id="govco"
                      value={formData.govco}
                      onChange={(e) => handleInputChange('govco', e.target.value)}
                      placeholder="URL de Gov.co"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.govco} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enlaces de Ayuda */}
          <Card>
            <CardHeader>
              <CardTitle>Enlaces de Ayuda y Soporte</CardTitle>
              <CardDescription>Enlaces para soporte técnico y documentación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="soporteTecnico">Soporte Técnico</Label>
                  <div className="flex gap-2">
                    <Input
                      id="soporteTecnico"
                      value={formData.soporteTecnico}
                      onChange={(e) => handleInputChange('soporteTecnico', e.target.value)}
                      placeholder="Email o URL de soporte"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.soporteTecnico}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="manualesGuias">Manuales y Guías</Label>
                  <div className="flex gap-2">
                    <Input
                      id="manualesGuias"
                      value={formData.manualesGuias}
                      onChange={(e) => handleInputChange('manualesGuias', e.target.value)}
                      placeholder="Ruta o URL de manuales"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.manualesGuias}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="tutoriales">Tutoriales</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tutoriales"
                      value={formData.tutoriales}
                      onChange={(e) => handleInputChange('tutoriales', e.target.value)}
                      placeholder="Ruta o URL de tutoriales"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.tutoriales}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enlaces Adicionales */}
          <Card>
            <CardHeader>
              <CardTitle>Enlaces Adicionales</CardTitle>
              <CardDescription>Políticas, términos y contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="politicaPrivacidad">Política de Privacidad</Label>
                  <div className="flex gap-2">
                    <Input
                      id="politicaPrivacidad"
                      value={formData.politicaPrivacidad}
                      onChange={(e) => handleInputChange('politicaPrivacidad', e.target.value)}
                      placeholder="URL de política de privacidad"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.politicaPrivacidad} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="terminosUso">Términos de Uso</Label>
                  <div className="flex gap-2">
                    <Input
                      id="terminosUso"
                      value={formData.terminosUso}
                      onChange={(e) => handleInputChange('terminosUso', e.target.value)}
                      placeholder="URL de términos de uso"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.terminosUso} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="contacto">Contacto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="contacto"
                      value={formData.contacto}
                      onChange={(e) => handleInputChange('contacto', e.target.value)}
                      placeholder="URL de contacto"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <a href={formData.contacto} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Footer de la página admin */}
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>Panel de Administración SINAS - Gestión de Enlaces</p>
            <p className="text-sm mt-1">Los cambios se guardan localmente en el navegador</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminLinks;
