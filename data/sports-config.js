module.exports = {
  updatedAt: '2024-08-15T00:00:00Z',
  description: 'Enterprise intelligence coverage for the leading global team sports leagues and national competitions.',
  sports: [
    {
      id: 'soccer',
      name: 'Association Football',
      shortName: 'Football',
      ranking: 1,
      estimatedFans: '3.5B+',
      continents: ['global'],
      keywords: ['FIFA', 'UEFA', 'club football', 'national teams'],
      competitions: [
        {
          id: 'fifa-world-cup',
          name: 'FIFA World Cup Qualifiers',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'fifa-womens-world-cup',
          name: "FIFA Women's World Cup Qualifiers",
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world.women/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'uefa-champions-league',
          name: 'UEFA Champions League',
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'Europe',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'uefa-womens-champions-league',
          name: "UEFA Women's Champions League",
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'Europe',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions.women/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'conmebol-libertadores',
          name: 'CONMEBOL Libertadores',
          level: 'continental',
          region: 'south-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'South America',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/soccer/conmebol.libertadores/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'american-football',
      name: 'American Football',
      shortName: 'NFL',
      ranking: 2,
      estimatedFans: '410M+',
      continents: ['north-america', 'europe'],
      keywords: ['NFL', 'Super Bowl', 'International Games'],
      competitions: [
        {
          id: 'nfl-regular-season',
          name: 'NFL Regular Season',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'USA/Canada',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'nfl-playoffs',
          name: 'NFL Playoffs',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'USA/Canada',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?groups=80',
          parser: 'espn-scoreboard'
        },
        {
          id: 'nfl-international-series',
          name: 'NFL International Series',
          level: 'continental',
          region: 'europe',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'United Kingdom/Germany/Brazil',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?groups=9',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'basketball',
      name: 'Basketball',
      shortName: 'Basketball',
      ranking: 3,
      estimatedFans: '2.4B+',
      continents: ['global'],
      keywords: ['NBA', 'Finals', 'World Cup'],
      competitions: [
        {
          id: 'nba',
          name: 'NBA Season',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'USA/Canada',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'wnba',
          name: 'WNBA Season',
          level: 'continental',
          region: 'north-america',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'USA',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'fiba-world-cup',
          name: 'FIBA Basketball World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/basketball/fiba.men/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'cricket',
      name: 'Cricket',
      shortName: 'Cricket',
      ranking: 4,
      estimatedFans: '2.5B+',
      continents: ['asia', 'oceania', 'europe', 'africa'],
      keywords: ['ICC', 'T20', 'ODI', 'Tests'],
      competitions: [
        {
          id: 'icc-cricket-world-cup',
          name: 'ICC Cricket World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/icc.cricket.worldcup/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'icc-womens-world-cup',
          name: "ICC Women's Cricket World Cup",
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'female',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/icc.womens.worldcup/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'ipl',
          name: 'Indian Premier League',
          level: 'continental',
          region: 'asia',
          type: 'club',
          gender: 'male',
          category: 'senior',
          country: 'India',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/ipl/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'wpl',
          name: "Women's Premier League",
          level: 'continental',
          region: 'asia',
          type: 'club',
          gender: 'female',
          category: 'senior',
          country: 'India',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/cricket/india.wpl/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    },
    {
      id: 'rugby',
      name: 'Rugby Union',
      shortName: 'Rugby',
      ranking: 5,
      estimatedFans: '950M+',
      continents: ['europe', 'oceania', 'africa', 'south-america'],
      keywords: ['World Cup', 'Six Nations', 'The Rugby Championship'],
      competitions: [
        {
          id: 'rugby-world-cup',
          name: 'Rugby World Cup',
          level: 'world',
          region: 'global',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Global',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/rugby/worldcup/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'six-nations',
          name: 'Six Nations Championship',
          level: 'continental',
          region: 'europe',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Europe',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/rugby/sixnations/scoreboard',
          parser: 'espn-scoreboard'
        },
        {
          id: 'the-rugby-championship',
          name: 'The Rugby Championship',
          level: 'continental',
          region: 'oceania',
          type: 'national',
          gender: 'male',
          category: 'senior',
          country: 'Southern Hemisphere',
          dataSource: 'https://site.api.espn.com/apis/site/v2/sports/rugby/trinations/scoreboard',
          parser: 'espn-scoreboard'
        }
      ]
    }
  ]
};
