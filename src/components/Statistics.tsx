import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Statistics = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const leagues = [
    {
      id: "laliga",
      name: "La Liga",
      description: "Primera División Española",
      country: "España",
      teams: 20,
    },
    {
      id: "bundesliga", 
      name: "Bundesliga",
      description: "Liga Federal Alemana",
      country: "Alemania",
      teams: 18,
    },
    {
      id: "ligue1",
      name: "Ligue 1",
      description: "Primera División Francesa",
      country: "Francia", 
      teams: 20,
    },
    {
      id: "premier",
      name: "Premier League",
      description: "Liga Premier Inglesa",
      country: "Inglaterra",
      teams: 20,
    },
    {
      id: "seriea",
      name: "Serie A",
      description: "Serie A Italiana",
      country: "Italia",
      teams: 20,
    },
  ];

  const handleLeagueSelect = (league: typeof leagues[0]) => {
    setSelectedLeague(league.id);
    toast({
      title: "Liga seleccionada",
      description: `Estadísticas de ${league.name} próximamente disponibles`,
    });
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8 max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Estadísticas Futbolísticas</h1>
          <p className="text-muted-foreground mt-1">Selecciona una liga para ver estadísticas detalladas</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Leagues Section */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-accent" />
              LIGAS
            </CardTitle>
            <CardDescription>
              Selecciona una liga europea para acceder a estadísticas detalladas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leagues.map((league) => (
                <Card
                  key={league.id}
                  className={`cursor-pointer transition-smooth hover:shadow-glow border ${
                    selectedLeague === league.id 
                      ? "border-accent shadow-glow" 
                      : "border-border hover:border-muted"
                  }`}
                  onClick={() => handleLeagueSelect(league)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{league.name}</CardTitle>
                    <CardDescription>{league.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">País:</span>
                        <span className="font-medium">{league.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Equipos:</span>
                        <span className="font-medium">{league.teams}</span>
                      </div>
                    </div>
                    <Button 
                      variant={selectedLeague === league.id ? "secondary" : "outline"} 
                      className="w-full mt-4"
                    >
                      {selectedLeague === league.id ? "Seleccionada" : "Seleccionar"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for statistics content */}
        {selectedLeague && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Estadísticas de {leagues.find(l => l.id === selectedLeague)?.name}</CardTitle>
              <CardDescription>
                Próximamente: estadísticas detalladas, tablas de posiciones, y análisis de rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Tabla de Posiciones</h3>
                  <p className="text-sm text-muted-foreground">Clasificación actual de equipos</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Estadísticas de Goles</h3>
                  <p className="text-sm text-muted-foreground">Promedios y tendencias de goles</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Rendimiento por Equipo</h3>
                  <p className="text-sm text-muted-foreground">Análisis individual de equipos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Statistics;