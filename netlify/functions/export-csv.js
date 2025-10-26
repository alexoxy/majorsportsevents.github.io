const { getEventsWithCache, buildCsv } = require('./shared/events');

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const { events, updatedAt } = await getEventsWithCache(params);
    const csv = buildCsv(events);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="majorsports-events.csv"',
        'X-Data-Updated-At': new Date(updatedAt).toISOString()
      },
      body: csv
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `error,${error.message}`
    };
  }
};
