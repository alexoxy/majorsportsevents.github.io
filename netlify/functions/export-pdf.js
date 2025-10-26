const { getEventsWithCache, buildPdf } = require('./shared/events');

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const { events, updatedAt } = await getEventsWithCache(params);
    const pdfBuffer = buildPdf(events);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="majorsports-events.pdf"',
        'X-Data-Updated-At': new Date(updatedAt).toISOString()
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Unable to export PDF', message: error.message })
    };
  }
};
