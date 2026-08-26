/**
 * ⚠️ ILLUSTRATIVE PLACEHOLDER DATA — NOT VERIFIED CAREER STATS.
 *
 * Rough, approximate senior career totals (club + country combined), not
 * pulled from a live source. Easy to replace with a real stats feed later —
 * each player just needs goals/assists/appearances/trophies as of some
 * fixed cutoff date.
 *
 * `pools` marks which stat categories a player is fair to compare on. This
 * is a judgment call, not a mechanical function of `position` — a
 * goal-scoring midfielder (Lampard, Bellingham) belongs in the goals pool
 * despite the position label, while a deep-lying playmaker (Modric, Xavi)
 * doesn't, even though both are "Midfielder". Appearances and trophies
 * aren't role-locked the way goals/assists are, so those pools stay broad.
 */

export const PLACEHOLDER = true

export const footballers = [
  { id: 'fs-1',  player: 'Lionel Messi',        country: 'Argentina',   position: 'Forward',    goals: 850, assists: 380, appearances: 1050, trophies: 45, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-2',  player: 'Cristiano Ronaldo',    country: 'Portugal',    position: 'Forward',    goals: 900, assists: 250, appearances: 1250, trophies: 35, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-3',  player: 'Neymar',               country: 'Brazil',      position: 'Forward',    goals: 440, assists: 230, appearances: 780,  trophies: 30, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-4',  player: 'Kylian Mbappe',        country: 'France',      position: 'Forward',    goals: 350, assists: 160, appearances: 460,  trophies: 15, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-5',  player: 'Erling Haaland',       country: 'Norway',      position: 'Forward',    goals: 280, assists: 60,  appearances: 330,  trophies: 8,  emoji: '⚽', pools: ['goals', 'appearances', 'trophies'] },
  { id: 'fs-6',  player: 'Robert Lewandowski',   country: 'Poland',      position: 'Forward',    goals: 630, assists: 170, appearances: 830,  trophies: 25, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-7',  player: 'Harry Kane',           country: 'England',     position: 'Forward',    goals: 430, assists: 130, appearances: 630,  trophies: 2,  emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-8',  player: 'Mohamed Salah',        country: 'Egypt',       position: 'Forward',    goals: 260, assists: 120, appearances: 470,  trophies: 12, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-9',  player: 'Kevin De Bruyne',      country: 'Belgium',     position: 'Midfielder', goals: 130, assists: 270, appearances: 620,  trophies: 20, emoji: '🎯', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-10', player: 'Luka Modric',          country: 'Croatia',     position: 'Midfielder', goals: 90,  assists: 150, appearances: 950,  trophies: 28, emoji: '🎯', pools: ['assists', 'appearances', 'trophies'] },
  { id: 'fs-11', player: 'Karim Benzema',        country: 'France',      position: 'Forward',    goals: 430, assists: 180, appearances: 850,  trophies: 25, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-12', player: 'Luis Suarez',          country: 'Uruguay',     position: 'Forward',    goals: 520, assists: 220, appearances: 830,  trophies: 22, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-13', player: 'Antoine Griezmann',    country: 'France',      position: 'Forward',    goals: 320, assists: 170, appearances: 780,  trophies: 12, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-14', player: 'Virgil van Dijk',      country: 'Netherlands', position: 'Defender',   goals: 40,  assists: 25,  appearances: 480,  trophies: 10, cleanSheets: 180, emoji: '🛡️', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-15', player: 'Toni Kroos',           country: 'Germany',     position: 'Midfielder', goals: 60,  assists: 190, appearances: 780,  trophies: 26, emoji: '🎯', pools: ['assists', 'appearances', 'trophies'] },
  { id: 'fs-16', player: 'Casemiro',             country: 'Brazil',      position: 'Midfielder', goals: 40,  assists: 30,  appearances: 620,  trophies: 20, emoji: '🎯', pools: ['appearances', 'trophies'] },
  { id: 'fs-17', player: 'Son Heung-min',        country: 'South Korea', position: 'Forward',    goals: 200, assists: 100, appearances: 550,  trophies: 1,  emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-18', player: 'Vinicius Jr',          country: 'Brazil',      position: 'Forward',    goals: 130, assists: 90,  appearances: 350,  trophies: 10, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-19', player: 'Jude Bellingham',      country: 'England',     position: 'Midfielder', goals: 90,  assists: 50,  appearances: 260,  trophies: 6,  emoji: '🎯', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-20', player: 'Marcus Rashford',      country: 'England',     position: 'Forward',    goals: 130, assists: 70,  appearances: 420,  trophies: 3,  emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-21', player: 'Andres Iniesta',       country: 'Spain',       position: 'Midfielder', goals: 90,  assists: 130, appearances: 900,  trophies: 32, emoji: '🎯', pools: ['assists', 'appearances', 'trophies'] },
  { id: 'fs-22', player: 'Xavi Hernandez',       country: 'Spain',       position: 'Midfielder', goals: 90,  assists: 150, appearances: 1000, trophies: 31, emoji: '🎯', pools: ['assists', 'appearances', 'trophies'] },
  { id: 'fs-23', player: 'Ronaldinho',           country: 'Brazil',      position: 'Forward',    goals: 350, assists: 170, appearances: 700,  trophies: 20, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-24', player: 'Didier Drogba',        country: 'Ivory Coast', position: 'Forward',    goals: 380, assists: 130, appearances: 700,  trophies: 20, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-25', player: 'Thierry Henry',        country: 'France',      position: 'Forward',    goals: 460, assists: 180, appearances: 850,  trophies: 15, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-26', player: 'Zlatan Ibrahimovic',   country: 'Sweden',      position: 'Forward',    goals: 570, assists: 190, appearances: 950,  trophies: 34, emoji: '⚽', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-27', player: 'Sergio Ramos',         country: 'Spain',       position: 'Defender',   goals: 130, assists: 40,  appearances: 1050, trophies: 26, cleanSheets: 200, emoji: '🛡️', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-28', player: 'Manuel Neuer',         country: 'Germany',     position: 'Goalkeeper', goals: 1,   assists: 12,  appearances: 750,  trophies: 27, cleanSheets: 380, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-29', player: 'N\'Golo Kante',        country: 'France',      position: 'Midfielder', goals: 30,  assists: 25,  appearances: 550,  trophies: 15, emoji: '🎯', pools: ['appearances', 'trophies'] },
  { id: 'fs-30', player: 'Bruno Fernandes',      country: 'Portugal',    position: 'Midfielder', goals: 150, assists: 150, appearances: 500,  trophies: 4,  emoji: '🎯', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  // Box-to-box goal-scoring midfielders — the Lampard case: outscored plenty
  // of forwards despite the "Midfielder" label, so they belong in the goals
  // pool even though a deep-lying playmaker like Modric doesn't.
  { id: 'fs-31', player: 'Frank Lampard',        country: 'England',     position: 'Midfielder', goals: 211, assists: 150, appearances: 900,  trophies: 11, emoji: '🎯', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  { id: 'fs-32', player: 'Steven Gerrard',       country: 'England',     position: 'Midfielder', goals: 185, assists: 150, appearances: 900,  trophies: 11, emoji: '🎯', pools: ['goals', 'assists', 'appearances', 'trophies'] },
  // More goalkeepers — Neuer alone meant appearances/trophies rounds could
  // never pit two keepers against each other.
  { id: 'fs-33', player: 'Gianluigi Buffon',     country: 'Italy',       position: 'Goalkeeper', goals: 0,   assists: 2,   appearances: 1100, trophies: 15, cleanSheets: 300, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-34', player: 'Iker Casillas',        country: 'Spain',       position: 'Goalkeeper', goals: 0,   assists: 1,   appearances: 1050, trophies: 26, cleanSheets: 340, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-35', player: 'Petr Cech',            country: 'Czech Republic', position: 'Goalkeeper', goals: 0, assists: 1,  appearances: 950,  trophies: 21, cleanSheets: 350, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-36', player: 'Thibaut Courtois',     country: 'Belgium',     position: 'Goalkeeper', goals: 0,   assists: 1,   appearances: 650,  trophies: 18, cleanSheets: 220, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-37', player: 'Alisson Becker',       country: 'Brazil',      position: 'Goalkeeper', goals: 1,   assists: 1,   appearances: 450,  trophies: 12, cleanSheets: 160, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
  { id: 'fs-38', player: 'Oliver Kahn',          country: 'Germany',     position: 'Goalkeeper', goals: 0,   assists: 0,   appearances: 850,  trophies: 15, cleanSheets: 280, emoji: '🧤', pools: ['appearances', 'trophies', 'clean-sheets'] },
]
