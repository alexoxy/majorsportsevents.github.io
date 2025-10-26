const { getEventsWithCache, buildIcs } = require('./shared/events');

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const calendarName = params.calendarName || 'Major Sports Events';
    const { events, updatedAt } = await getEventsWithCache(params);
    const ics = buildIcs(events, calendarName);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${calendarName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'calendar'}-majorsports.ics"`,
        'X-Data-Updated-At': new Date(updatedAt).toISOString()
      },
      body: ics
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Unable to generate ICS', message: error.message })
    };
  }
};
