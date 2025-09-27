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

  const teamsByLeague = {
    laliga: [
      "Real Madrid", "FC Barcelona", "Atlético Madrid", "Athletic Bilbao", "Real Sociedad",
      "Villarreal", "Real Betis", "Valencia", "Sevilla", "Osasuna",
      "Getafe", "Girona", "Las Palmas", "Alavés", "Rayo Vallecano",
      "Celta Vigo", "Mallorca", "Espanyol", "Valladolid", "Leganés"
    ],
    bundesliga: [
      "Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Union Berlin",
      "SC Freiburg", "FC Köln", "Eintracht Frankfurt", "VfL Wolfsburg", "Borussia Mönchengladbach",
      "FSV Mainz 05", "FC Augsburg", "VfB Stuttgart", "TSG Hoffenheim", "Werder Bremen",
      "VfL Bochum", "FC Schalke 04", "Hertha BSC"
    ],
    ligue1: [
      "Paris Saint-Germain", "AS Monaco", "Olympique Marseille", "Stade Rennais", "OGC Nice",
      "RC Lens", "Lille OSC", "Olympique Lyonnais", "RC Strasbourg", "Nantes",
      "Montpellier HSC", "Stade Brestois", "Le Havre AC", "Clermont Foot", "FC Metz",
      "Toulouse FC", "Reims", "AJ Auxerre", "AS Saint-Étienne", "Angers SCO"
    ],
    premier: [
      "Manchester City", "Arsenal", "Liverpool", "Chelsea", "Newcastle United",
      "Manchester United", "Tottenham", "Brighton", "Aston Villa", "West Ham",
      "Crystal Palace", "Bournemouth", "Fulham", "Wolves", "Everton",
      "Brentford", "Nottingham Forest", "Luton Town", "Burnley", "Sheffield United"
    ],
    seriea: [
      "Inter Milan", "AC Milan", "Juventus", "Atalanta", "AS Roma",
      "Lazio", "Napoli", "Fiorentina", "Bologna", "Torino",
      "Monza", "Genoa", "Lecce", "Udinese", "Frosinone",
      "Hellas Verona", "Cagliari", "Empoli", "Sassuolo", "Salernitana"
    ]
  };

  const handleLeagueSelect = (league: typeof leagues[0]) => {
    setSelectedLeague(league.id);
    toast({
      title: "Liga seleccionada",
      description: `Equipos de ${league.name} cargados`,
    });
  };

  const handleTeamStats = (teamName: string) => {
    toast({
      title: "Estadísticas del equipo",
      description: `Estadísticas de ${teamName} próximamente disponibles`,
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

        {/* Teams Section */}
        {selectedLeague && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Equipos de {leagues.find(l => l.id === selectedLeague)?.name}</CardTitle>
              <CardDescription>
                Selecciona un equipo para ver sus estadísticas detalladas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {teamsByLeague[selectedLeague as keyof typeof teamsByLeague]?.map((team) => (
                  <Card key={team} className="border-border hover:border-muted transition-smooth">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-center mb-3 text-sm">{team}</h3>
                      <Button 
                        variant="betting" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleTeamStats(team)}
                      >
                        Conocer estadísticas
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Statistics;