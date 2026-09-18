const AUTH_CHECK_URL = 'https://vintage-alarm-analytics.orima1995.workers.dev/__preview-auth-check__';

async function authorized(request) {
  const authorization = request.headers.get('Authorization') || '';
  if (!authorization.startsWith('Basic ')) return false;

  try {
    const response = await fetch(AUTH_CHECK_URL, {
      method: 'GET',
      headers: {
        Authorization: authorization,
        Accept: 'text/plain'
      },
      redirect: 'manual'
    });

    // The analytics Worker authenticates first, then returns 404 for this
    // intentionally nonexistent path. Any non-401/503 response therefore
    // means the existing admin credentials were accepted.
    return response.status !== 401 && response.status !== 503;
  } catch {
    return false;
  }
}

function protectedHeaders(headers = new Headers()) {
  const next = new Headers(headers);
  next.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next.set('Referrer-Policy', 'no-referrer');
  return next;
}

export default {
  async fetch(request, env) {
    if (!(await authorized(request))) {
      return new Response('Authentication required.', {
        status: 401,
        headers: protectedHeaders(new Headers({
          'WWW-Authenticate': 'Basic realm="VINTAGE ALARM ANALYTICS", charset="UTF-8"',
          'Cache-Control': 'no-store'
        }))
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = protectedHeaders(response.headers);
    if ((headers.get('Content-Type') || '').includes('text/html')) {
      headers.set('Cache-Control', 'no-store');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
