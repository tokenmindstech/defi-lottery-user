export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
  
  console.log(`Testing backend connectivity to: ${backendUrl}`);
  
  if (!backendUrl) {
    return Response.json({
      error: "Backend URL not configured",
      envVar: "NEXT_PUBLIC_BACKEND_BASEURL",
      configured: false
    }, { status: 500 });
  }

  try {
    // Try a simple health check or root endpoint
    const response = await fetch(`${backendUrl}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log(`Health check response status: ${response.status}`);
    console.log(`Health check response headers:`, Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log(`Health check response body:`, responseText);

    return Response.json({
      backendUrl,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText.length > 1000 ? responseText.substring(0, 1000) + "..." : responseText,
      isJson: response.headers.get("content-type")?.includes("application/json") || false
    });

  } catch (error) {
    console.error(`Backend connectivity test failed:`, error);
    
    return Response.json({
      backendUrl,
      error: "Connection failed",
      message: error instanceof Error ? error.message : String(error),
      configured: true,
      reachable: false
    }, { status: 500 });
  }
}
