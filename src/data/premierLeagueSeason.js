/**
 * ⚠️ ILLUSTRATIVE PLACEHOLDER DATA — NOT VERIFIED SEASON STATS.
 *
 * Rough, approximate single-season Premier League totals across three
 * recent seasons, not pulled from a live source. Easy to replace with a
 * real stats feed later.
 *
 * `pools` marks which stat categories a player is fair to compare on —
 * same pattern as footballStats.js: attackers/creative players are
 * eligible for goals/assists, goalkeepers and centre-backs for clean
 * sheets, everyone for appearances. No trophies category here — a single
 * season's trophy haul is a team/binary outcome, not a meaningful
 * individual number to compare.
 *
 * Rounds only ever compare two players from the *same* season — see
 * `buildEplStatsRound` in roundService.js. Comparing Haaland's 2022/23
 * tally to Salah's 2023/24 wouldn't be a coherent "who did more that
 * year" question.
 */

export const PLACEHOLDER = true
export const SEASONS = ['2023/24', '2022/23', '2021/22']

const season2324 = [
  { id: 'pl2324-1',  season: '2023/24', player: 'Erling Haaland',    team: 'Manchester City', position: 'Forward',    goals: 27, assists: 5,  appearances: 31, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-2',  season: '2023/24', player: 'Cole Palmer',       team: 'Chelsea',         position: 'Forward',    goals: 22, assists: 11, appearances: 34, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-3',  season: '2023/24', player: 'Mohamed Salah',     team: 'Liverpool',       position: 'Forward',    goals: 18, assists: 10, appearances: 32, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-4',  season: '2023/24', player: 'Ollie Watkins',     team: 'Aston Villa',     position: 'Forward',    goals: 19, assists: 13, appearances: 37, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-5',  season: '2023/24', player: 'Son Heung-min',     team: 'Tottenham',       position: 'Forward',    goals: 17, assists: 10, appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-6',  season: '2023/24', player: 'Bukayo Saka',       team: 'Arsenal',         position: 'Forward',    goals: 16, assists: 9,  appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-7',  season: '2023/24', player: 'Phil Foden',        team: 'Manchester City', position: 'Midfielder', goals: 19, assists: 8,  appearances: 35, cleanSheets: 0,  emoji: '🎯', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-8',  season: '2023/24', player: 'Dominic Solanke',   team: 'Bournemouth',     position: 'Forward',    goals: 19, assists: 3,  appearances: 38, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-9',  season: '2023/24', player: 'Alexander Isak',    team: 'Newcastle',       position: 'Forward',    goals: 21, assists: 2,  appearances: 30, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-10', season: '2023/24', player: 'Julian Alvarez',    team: 'Manchester City', position: 'Forward',    goals: 11, assists: 8,  appearances: 36, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-11', season: '2023/24', player: 'James Maddison',    team: 'Tottenham',       position: 'Midfielder', goals: 8,  assists: 9,  appearances: 33, cleanSheets: 0,  emoji: '🎯', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2324-12', season: '2023/24', player: 'David Raya',        team: 'Arsenal',         position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 35, cleanSheets: 16, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-13', season: '2023/24', player: 'Jordan Pickford',   team: 'Everton',         position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 38, cleanSheets: 12, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-14', season: '2023/24', player: 'Andre Onana',       team: 'Manchester United', position: 'Goalkeeper', goals: 0, assists: 0, appearances: 37, cleanSheets: 11, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-15', season: '2023/24', player: 'Emiliano Martinez', team: 'Aston Villa',     position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 13, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-16', season: '2023/24', player: 'Alisson Becker',    team: 'Liverpool',       position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 26, cleanSheets: 10, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-17', season: '2023/24', player: 'Robert Sanchez',    team: 'Chelsea',         position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 32, cleanSheets: 10, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-18', season: '2023/24', player: 'William Saliba',    team: 'Arsenal',         position: 'Defender',   goals: 1,  assists: 1,  appearances: 38, cleanSheets: 16, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-19', season: '2023/24', player: 'Virgil van Dijk',   team: 'Liverpool',       position: 'Defender',   goals: 3,  assists: 1,  appearances: 31, cleanSheets: 15, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2324-20', season: '2023/24', player: 'Ezri Konsa',        team: 'Aston Villa',     position: 'Defender',   goals: 3,  assists: 1,  appearances: 34, cleanSheets: 12, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
]

const season2223 = [
  { id: 'pl2223-1',  season: '2022/23', player: 'Erling Haaland',    team: 'Manchester City', position: 'Forward',    goals: 36, assists: 8,  appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-2',  season: '2022/23', player: 'Harry Kane',        team: 'Tottenham',       position: 'Forward',    goals: 30, assists: 3,  appearances: 38, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-3',  season: '2022/23', player: 'Ivan Toney',        team: 'Brentford',       position: 'Forward',    goals: 20, assists: 4,  appearances: 33, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-4',  season: '2022/23', player: 'Mohamed Salah',     team: 'Liverpool',       position: 'Forward',    goals: 19, assists: 12, appearances: 38, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-5',  season: '2022/23', player: 'Callum Wilson',     team: 'Newcastle',       position: 'Forward',    goals: 18, assists: 3,  appearances: 29, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-6',  season: '2022/23', player: 'Marcus Rashford',   team: 'Manchester United', position: 'Forward',  goals: 17, assists: 5,  appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-7',  season: '2022/23', player: 'Bukayo Saka',       team: 'Arsenal',         position: 'Forward',    goals: 14, assists: 11, appearances: 38, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-8',  season: '2022/23', player: 'Martin Odegaard',   team: 'Arsenal',         position: 'Midfielder', goals: 15, assists: 7,  appearances: 37, cleanSheets: 0,  emoji: '🎯', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-9',  season: '2022/23', player: 'Kevin De Bruyne',   team: 'Manchester City', position: 'Midfielder', goals: 7,  assists: 16, appearances: 32, cleanSheets: 0,  emoji: '🎯', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-10', season: '2022/23', player: 'Gabriel Martinelli', team: 'Arsenal',        position: 'Forward',    goals: 15, assists: 5,  appearances: 36, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2223-11', season: '2022/23', player: 'David de Gea',      team: 'Manchester United', position: 'Goalkeeper', goals: 0, assists: 0, appearances: 38, cleanSheets: 17, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-12', season: '2022/23', player: 'Nick Pope',         team: 'Newcastle',       position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 38, cleanSheets: 15, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-13', season: '2022/23', player: 'Alisson Becker',    team: 'Liverpool',       position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 38, cleanSheets: 13, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-14', season: '2022/23', player: 'Ederson',           team: 'Manchester City', position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 33, cleanSheets: 12, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-15', season: '2022/23', player: 'Aaron Ramsdale',    team: 'Arsenal',         position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 14, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-16', season: '2022/23', player: 'William Saliba',    team: 'Arsenal',         position: 'Defender',   goals: 2,  assists: 1,  appearances: 34, cleanSheets: 13, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-17', season: '2022/23', player: 'Virgil van Dijk',   team: 'Liverpool',       position: 'Defender',   goals: 1,  assists: 0,  appearances: 33, cleanSheets: 13, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2223-18', season: '2022/23', player: 'Sven Botman',       team: 'Newcastle',       position: 'Defender',   goals: 1,  assists: 0,  appearances: 34, cleanSheets: 15, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
]

const season2122 = [
  { id: 'pl2122-1',  season: '2021/22', player: 'Mohamed Salah',     team: 'Liverpool',       position: 'Forward',    goals: 23, assists: 13, appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-2',  season: '2021/22', player: 'Son Heung-min',     team: 'Tottenham',       position: 'Forward',    goals: 23, assists: 7,  appearances: 35, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-3',  season: '2021/22', player: 'Cristiano Ronaldo', team: 'Manchester United', position: 'Forward',  goals: 18, assists: 3,  appearances: 30, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-4',  season: '2021/22', player: 'Harry Kane',        team: 'Tottenham',       position: 'Forward',    goals: 17, assists: 9,  appearances: 37, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-5',  season: '2021/22', player: 'Sadio Mane',        team: 'Liverpool',       position: 'Forward',    goals: 16, assists: 5,  appearances: 34, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-6',  season: '2021/22', player: 'Kevin De Bruyne',   team: 'Manchester City', position: 'Midfielder', goals: 15, assists: 8,  appearances: 31, cleanSheets: 0,  emoji: '🎯', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-7',  season: '2021/22', player: 'Raheem Sterling',   team: 'Manchester City', position: 'Forward',    goals: 13, assists: 7,  appearances: 34, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-8',  season: '2021/22', player: 'Diogo Jota',        team: 'Liverpool',       position: 'Forward',    goals: 13, assists: 4,  appearances: 34, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-9',  season: '2021/22', player: 'Jarrod Bowen',      team: 'West Ham',        position: 'Forward',    goals: 12, assists: 6,  appearances: 36, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-10', season: '2021/22', player: 'Bukayo Saka',       team: 'Arsenal',         position: 'Forward',    goals: 11, assists: 7,  appearances: 38, cleanSheets: 0,  emoji: '⚽', pools: ['goals', 'assists', 'appearances'] },
  { id: 'pl2122-11', season: '2021/22', player: 'Ederson',           team: 'Manchester City', position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 20, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-12', season: '2021/22', player: 'Alisson Becker',    team: 'Liverpool',       position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 18, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-13', season: '2021/22', player: 'Hugo Lloris',       team: 'Tottenham',       position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 12, emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-14', season: '2021/22', player: 'Illan Meslier',     team: 'Leeds United',    position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 37, cleanSheets: 6,  emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-15', season: '2021/22', player: 'Nick Pope',         team: 'Burnley',         position: 'Goalkeeper', goals: 0,  assists: 0,  appearances: 36, cleanSheets: 8,  emoji: '🧤', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-16', season: '2021/22', player: 'Virgil van Dijk',   team: 'Liverpool',       position: 'Defender',   goals: 3,  assists: 2,  appearances: 36, cleanSheets: 18, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-17', season: '2021/22', player: 'Ruben Dias',        team: 'Manchester City', position: 'Defender',   goals: 1,  assists: 0,  appearances: 32, cleanSheets: 17, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
  { id: 'pl2122-18', season: '2021/22', player: 'Cristian Romero',   team: 'Tottenham',       position: 'Defender',   goals: 0,  assists: 0,  appearances: 26, cleanSheets: 10, emoji: '🛡️', pools: ['appearances', 'clean-sheets'] },
]

export const premierLeagueSeasons = [...season2324, ...season2223, ...season2122]
