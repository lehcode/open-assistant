export interface Env {
  ENVIRONMENT: string;
  API_URL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const apiUrl = new URL(env.API_URL);

    // Forward the request to the API
    const apiRequest = new Request(`${apiUrl.origin}${url.pathname}${url.search}`, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    try {
      const response = await fetch(apiRequest);
      
      // Clone the response and add CORS headers
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

      return newResponse;
    } catch (error) {
      return new Response('Error forwarding request to API', { status: 500 });
    }
  },
};
