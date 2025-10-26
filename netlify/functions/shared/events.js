const { sports, travelPartners, bettingPartners } = require('../../../data/sports-config');
const fallback = require('../../../data/fallback-events.json');

const FALLBACK_BY_COMPETITION = fallback.events.reduce((acc, event) => {
  const list = acc.get(event.competitionId) || [];
  list.push(event);
  acc.set(event.competitionId, list);
  return acc;
}, new Map());

const SPORTS_BY_ID = new Map(sports.map((sport) => [sport.id, sport]));

const BETTING_LOOKUP = new Map(bettingPartners.map((partner) => [partner.id, partner]));

const FILTERABLE_FIELDS = {
  sport: (event, value) => value ? event.sportId === value : true,
  competition: (event, value) => value ? event.competitionId === value : true,
  gender: (event, value) => value ? event.gender === value : true,
  region: (event, value) => value ? event.region === value : true,
  type: (event, value) => value ? event.type === value : true,
  country: (event, value) => value ? (event.country && event.country.toLowerCase().includes(value.toLowerCase())) : true,
  team: (event, value) => {
    if (!value) return true;
    const query = value.toLowerCase();
    return [event.teams?.home?.name, event.teams?.home?.shortName, event.teams?.away?.name, event.teams?.away?.shortName]
      .filter(Boolean)
      .some((name) => name.toLowerCase().includes(query));
  },
  status: (event, value) => value ? event.status === value : true,
  stage: (event, value) => value ? (event.stage && event.stage.toLowerCase().includes(value.toLowerCase())) : true
};

function getSportMeta(event) {
  const sport = SPORTS_BY_ID.get(event.sportId);
  if (!sport) return {};
  return {
    sportRanking: sport.ranking,
    sportEstimatedFans: sport.estimatedFans,
    sportKeywords: sport.keywords
  };
}

function parseDate(dateString) {
  if (!dateString) return null;
  try {
    return new Date(dateString);
  } catch (_) {
    return null;
  }
}

function normaliseStatus(rawStatus) {
  if (!rawStatus) return 'scheduled';
  const normalized = rawStatus.toLowerCase();
  if (normalized.includes('post')) return 'postponed';
  if (normalized.includes('cancel')) return 'canceled';
  if (normalized.includes('live')) return 'in-progress';
  if (normalized.includes('final') || normalized.includes('full') || normalized.includes('ended')) return 'final';
  return 'scheduled';
}

function escapeIcsText(text = '') {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildTravelLinks(city, country, startDateISO) {
  if (!city) return null;
  const checkIn = startDateISO ? new Date(startDateISO) : null;
  const checkOut = checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : null;
  const toDateString = (date) => date ? date.toISOString().slice(0, 10) : '';
  const encodedLocation = encodeURIComponent(`${city}${country ? ', ' + country : ''}`);

  const bookingPartner = travelPartners.find((partner) => partner.id === 'booking');
  const skyscannerPartner = travelPartners.find((partner) => partner.id === 'skyscanner');

  return {
    hotel: bookingPartner ? `${bookingPartner.baseUrl}?ss=${encodedLocation}&checkin=${toDateString(checkIn)}&checkout=${toDateString(checkOut)}&group_adults=2` : null,
    flight: skyscannerPartner ? `${skyscannerPartner.baseUrl}?from=&to=${encodedLocation}&depart=${toDateString(checkIn)}&return=${toDateString(checkOut)}` : `https://www.google.com/travel/flights?q=${encodedLocation}`
  };
}

function buildBettingLink(event) {
  if (!event?.competitionId) return null;
  const partner = BETTING_LOOKUP.get('the-odds-api');
  if (!partner) return null;
  const query = encodeURIComponent(`${event.competitionName} ${event.teams?.home?.name || ''} vs ${event.teams?.away?.name || ''}`.trim());
  return {
    provider: partner.name,
    apiDocs: partner.apiDocs,
    dataEndpointTemplate: `${partner.baseUrl}/liveapi/guides/v4/?event=${query}`
  };
}

function pickBestLink(links = [], rel) {
  if (!Array.isArray(links)) return null;
  const match = links.find((link) => link.rel?.some?.((value) => value === rel));
  return match ? match.href : null;
}

function transformEspnEvent(rawEvent, competition, sport) {
  const competitionBlock = rawEvent.competitions?.[0] || {};
  const competitors = competitionBlock.competitors || [];
  const home = competitors.find((item) => item.homeAway === 'home') || competitors[0] || null;
  const away = competitors.find((item) => item.homeAway === 'away') || competitors[1] || null;
  const venue = competitionBlock.venue || {};
  const address = venue.address || {};
  const startDate = rawEvent.date || competitionBlock.date;
  const endDate = competitionBlock.endDate || startDate;
  const statusName = rawEvent.status?.type?.name || rawEvent.status?.type?.state;

  const event = {
    id: rawEvent.id,
    uid: rawEvent.uid,
    slug: rawEvent.shortName,
    sportId: sport.id,
    sportName: sport.name,
    competitionId: competition.id,
    competitionName: competition.name,
    level: competition.level,
    region: competition.region,
    type: competition.type,
    gender: competition.gender,
    category: competition.category,
    country: competition.country,
    season: rawEvent.season?.displayName || competitionBlock.season?.displayName || null,
    stage: competitionBlock.type?.text || rawEvent.status?.type?.shortDetail || null,
    status: normaliseStatus(statusName),
    statusText: rawEvent.status?.type?.detail || rawEvent.status?.type?.shortDetail || statusName,
    startDate,
    endDate,
    timezone: venue.timezone || address.timeZone || competitionBlock.geoBroadcasts?.[0]?.timeZone || null,
    venue: {
      name: venue.fullName || null,
      city: address.city || null,
      country: address.country || competition.country || null,
      capacity: venue.capacity || null
    },
    teams: {
      home: home?.team ? {
        id: home.team.id,
        name: home.team.displayName || home.team.name,
        shortName: home.team.shortDisplayName || home.team.abbreviation || home.team.displayName,
        country: home.team.location || null
      } : null,
      away: away?.team ? {
        id: away.team.id,
        name: away.team.displayName || away.team.name,
        shortName: away.team.shortDisplayName || away.team.abbreviation || away.team.displayName,
        country: away.team.location || null
      } : null
    },
    broadcasters: (competitionBlock.geoBroadcasts || []).map((broadcast) => ({
      media: broadcast.media?.shortName,
      market: broadcast.market?.type,
      language: broadcast.lang || null
    })),
    links: {
      website: rawEvent.links?.[0]?.href || null,
      tickets: competitionBlock.tickets?.[0]?.links?.[0]?.href || pickBestLink(rawEvent.links, 'tickets'),
      stats: pickBestLink(rawEvent.links, 'stats'),
      recap: pickBestLink(rawEvent.links, 'recap'),
      preview: pickBestLink(rawEvent.links, 'preview'),
      stream: pickBestLink(rawEvent.links, 'video') || competitionBlock.broadcasts?.[0]?.media?.links?.[0]?.href || null
    },
    dataSource: competition.dataSource,
    lastUpdated: rawEvent.status?.type?.detail || new Date().toISOString()
  };

  event.travel = buildTravelLinks(event.venue?.city, event.venue?.country, startDate);
  event.betting = buildBettingLink(event);
  return { ...event, ...getSportMeta(event) };
}

function transformFihEvent(rawEvent, competition, sport) {
  const startDate = rawEvent.startDateTime || rawEvent.localStartDate || rawEvent.eventDateTime;
  const endDate = rawEvent.endDateTime || null;
  const home = rawEvent.homeTeam || {};
  const away = rawEvent.awayTeam || {};

  const event = {
    id: rawEvent.id?.toString() || `${competition.id}-${rawEvent.matchNumber}`,
    uid: rawEvent.id?.toString() || null,
    slug: rawEvent.slug || rawEvent.matchNumber,
    sportId: sport.id,
    sportName: sport.name,
    competitionId: competition.id,
    competitionName: competition.name,
    level: competition.level,
    region: competition.region,
    type: competition.type,
    gender: competition.gender,
    category: competition.category,
    country: competition.country,
    season: rawEvent.season || rawEvent.year || null,
    stage: rawEvent.phase || rawEvent.stage || null,
    status: normaliseStatus(rawEvent.matchStatus || rawEvent.status),
    statusText: rawEvent.matchStatus || rawEvent.status || 'Scheduled',
    startDate,
    endDate,
    timezone: rawEvent.timezone || rawEvent.timeZone || null,
    venue: {
      name: rawEvent.venue?.name || null,
      city: rawEvent.venue?.city || null,
      country: rawEvent.venue?.country || competition.country || null,
      capacity: rawEvent.venue?.capacity || null
    },
    teams: {
      home: home.name ? {
        id: home.id || home.code,
        name: home.name,
        shortName: home.code || home.name,
        country: home.country || null
      } : null,
      away: away.name ? {
        id: away.id || away.code,
        name: away.name,
        shortName: away.code || away.name,
        country: away.country || null
      } : null
    },
    broadcasters: [],
    links: {
      website: rawEvent.links?.matchCentre || rawEvent.url || null,
      tickets: rawEvent.links?.tickets || null,
      stats: rawEvent.links?.stats || null,
      preview: rawEvent.links?.preview || null,
      recap: rawEvent.links?.report || null,
      stream: rawEvent.links?.stream || null
    },
    dataSource: competition.dataSource,
    lastUpdated: new Date().toISOString()
  };

  event.travel = buildTravelLinks(event.venue?.city, event.venue?.country, startDate);
  event.betting = buildBettingLink(event);
  return { ...event, ...getSportMeta(event) };
}

async function fetchCompetitionEvents(competition, sport) {
  if (!competition.dataSource) {
    return (FALLBACK_BY_COMPETITION.get(competition.id) || []).map((event) => ({ ...event }));
  }

  try {
    const response = await fetch(competition.dataSource, { headers: { Accept: 'application/json' } });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const payload = await response.json();
    let events = [];
    if (competition.parser === 'espn-scoreboard') {
      events = (payload.events || []).map((rawEvent) => transformEspnEvent(rawEvent, competition, sport));
    } else if (competition.parser === 'fih-calendar') {
      const matches = payload.matches || payload.Items || payload.items || [];
      events = matches.map((rawEvent) => transformFihEvent(rawEvent, competition, sport));
    } else {
      events = [];
    }

    if (!events.length) {
      return (FALLBACK_BY_COMPETITION.get(competition.id) || []).map((event) => ({ ...event }));
    }

    return events;
  } catch (error) {
    console.error(`Error fetching ${competition.id}:`, error.message);
    return (FALLBACK_BY_COMPETITION.get(competition.id) || []).map((event) => ({ ...event, error: error.message }));
  }
}

async function fetchAllEvents() {
  const tasks = [];
  for (const sport of sports) {
    for (const competition of sport.competitions) {
      tasks.push(fetchCompetitionEvents(competition, sport));
    }
  }
  const results = await Promise.all(tasks);
  return results.flat();
}

const CACHE_TTL = 1000 * 60 * 60 * 12;
let eventCache = { timestamp: 0, events: [] };

async function getEventsWithCache(filters = {}, options = {}) {
  const now = Date.now();
  const forceRefresh = options.refresh || filters.refresh === 'true';

  if (!forceRefresh && eventCache.events.length && now - eventCache.timestamp < CACHE_TTL) {
    return {
      events: applyFilters(eventCache.events, filters),
      cached: true,
      updatedAt: eventCache.timestamp
    };
  }

  const events = await fetchAllEvents();
  eventCache = { timestamp: Date.now(), events };
  return {
    events: applyFilters(events, filters),
    cached: false,
    updatedAt: eventCache.timestamp
  };
}

function applyFilters(events, filters = {}) {
  const fromDate = filters.from ? parseDate(filters.from) : null;
  const toDate = filters.to ? parseDate(filters.to) : null;

  return events.filter((event) => {
    const filterChecks = Object.entries(FILTERABLE_FIELDS).every(([key, fn]) => fn(event, filters[key]));
    if (!filterChecks) return false;

    const eventDate = parseDate(event.startDate);
    if (fromDate && (!eventDate || eventDate < fromDate)) return false;
    if (toDate && (!eventDate || eventDate > toDate)) return false;

    return true;
  }).sort((a, b) => {
    const aDate = parseDate(a.startDate)?.getTime() || 0;
    const bDate = parseDate(b.startDate)?.getTime() || 0;
    return aDate - bDate;
  });
}

function splitByTime(events) {
  const now = Date.now();
  const upcoming = [];
  const past = [];
  for (const event of events) {
    const start = parseDate(event.startDate)?.getTime();
    if (start && start < now) {
      past.push(event);
    } else {
      upcoming.push(event);
    }
  }
  return { upcoming, past };
}

function buildIcs(events, calendarName = 'Major Sports Events') {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MajorSportsEvents//Calendar 1.0//EN',
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
    'CALSCALE:GREGORIAN'
  ];

  for (const event of events) {
    const uid = `${event.id || event.slug || Math.random().toString(36).slice(2)}@majorsportsevents.com`;
    const start = parseDate(event.startDate);
    const end = parseDate(event.endDate) || (start ? new Date(start.getTime() + 2 * 60 * 60 * 1000) : null);
    const toICS = (date) => date ? date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
    const summaryParts = [event.competitionName, event.teams?.home?.name, event.teams?.away?.name].filter(Boolean);
    const descriptionParts = [
      event.statusText,
      event.travel?.hotel ? `Hotel: ${event.travel.hotel}` : null,
      event.travel?.flight ? `Flights: ${event.travel.flight}` : null,
      event.links?.website ? `More info: ${event.links.website}` : null,
      event.links?.stats ? `Stats: ${event.links.stats}` : null,
      event.betting?.dataEndpointTemplate ? `Odds API: ${event.betting.dataEndpointTemplate}` : null
    ].filter(Boolean);

    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `SUMMARY:${escapeIcsText(summaryParts.join(' - '))}`,
      start ? `DTSTART:${toICS(start)}` : '',
      end ? `DTEND:${toICS(end)}` : '',
      event.venue?.name ? `LOCATION:${escapeIcsText(`${event.venue.name}${event.venue.city ? ', ' + event.venue.city : ''}`)}` : '',
      `DESCRIPTION:${escapeIcsText(descriptionParts.join('\n'))}`,
      `CATEGORIES:${escapeIcsText([event.sportName, event.competitionName].filter(Boolean).join(','))}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.filter(Boolean).join('\r\n');
}

function buildCsv(events) {
  const headers = [
    'sport', 'competition', 'stage', 'type', 'gender', 'region', 'country', 'startDate', 'endDate', 'timezone', 'status', 'homeTeam', 'awayTeam', 'venue', 'city', 'countryVenue', 'hotelLink', 'flightLink', 'statsLink'
  ];
  const rows = events.map((event) => [
    event.sportName,
    event.competitionName,
    event.stage || '',
    event.type,
    event.gender,
    event.region,
    event.country || '',
    event.startDate || '',
    event.endDate || '',
    event.timezone || '',
    event.status,
    event.teams?.home?.name || '',
    event.teams?.away?.name || '',
    event.venue?.name || '',
    event.venue?.city || '',
    event.venue?.country || '',
    event.travel?.hotel || '',
    event.travel?.flight || '',
    event.links?.stats || ''
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value || '').replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

function buildJson(events) {
  return JSON.stringify({ generatedAt: new Date().toISOString(), total: events.length, events }, null, 2);
}

function buildPdf(events) {
  const lines = events.map((event) => {
    const date = event.startDate ? new Date(event.startDate).toUTCString() : 'TBA';
    return `${event.sportName} | ${event.competitionName} | ${event.teams?.home?.name || 'TBD'} vs ${event.teams?.away?.name || 'TBD'} | ${date}`;
  });

  const escapePdfText = (text) => String(text || '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const textOperators = lines.length
    ? lines
        .map((line, index) => `${index === 0 ? '' : ' T* ' }(${escapePdfText(line)}) Tj`)
        .join('')
    : '(No events available) Tj';
  const contentStream = `BT /F1 10 Tf 50 780 Td ${textOperators} ET`;

  const objects = [];
  const addObject = (id, content, isStream = false) => {
    const body = isStream ? `<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream` : content;
    objects.push({ id, body });
  };

  addObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  addObject(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  addObject(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>');
  addObject(4, contentStream, true);
  addObject(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  const header = '%PDF-1.4\n';
  let offset = header.length;
  const bodyParts = objects.map(({ id, body }) => {
    const objectString = `${id} 0 obj\n${body}\nendobj\n`;
    const record = { offset, objectString };
    offset += Buffer.byteLength(objectString, 'utf8');
    return record;
  });

  const xrefOffset = offset;
  const xrefEntries = ['0000000000 65535 f '].concat(
    bodyParts.map(({ offset }) => `${offset.toString().padStart(10, '0')} 00000 n `)
  ).join('\n');
  const xref = `xref\n0 ${objects.length + 1}\n${xrefEntries}\n`;
  const trailer = `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const pdfString = header + bodyParts.map((part) => part.objectString).join('') + xref + trailer;
  return Buffer.from(pdfString, 'utf8');
}

module.exports = {
  fetchAllEvents,
  getEventsWithCache,
  applyFilters,
  splitByTime,
  buildIcs,
  buildCsv,
  buildJson,
  buildPdf,
  buildTravelLinks,
  buildBettingLink
};
