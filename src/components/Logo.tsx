interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16",
    xl: "h-20"
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Puedes reemplazar esta URL por la imagen real del logo SINAS */}
      <img 
        src="/images/sinas-logo.png"
        alt="SINAS - Sistema de Inversiones en Agua Potable y Saneamiento Básico" 
        className={`${sizeClasses[size]} w-auto`}
        onError={(e) => {
          // Fallback si la imagen no carga
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      {/* Fallback text si no carga la imagen */}
      <div className="hidden text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <div className="w-6 h-6 bg-white/60 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold">SINAS</h1>
            <p className="text-xs opacity-90">Sistema de Inversiones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;