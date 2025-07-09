import { authConfig } from "@/config/auth";
import { handleProxyResponse, parseCustomHeaders } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const targetURL = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[0];
  const customHeadersStr = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[1];
  const customHeaders = parseCustomHeaders(customHeadersStr);

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${targetURL}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true", // Required for ngrok tunnels
          ...customHeaders,
        },
      }
    );

    const result = await handleProxyResponse(response, targetURL);
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error(`Error in GET ${targetURL}:`, error);
    return Response.json({ 
      error: "Proxy request failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const targetURL = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[0];
  const customHeadersStr = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[1];
  const customHeaders = parseCustomHeaders(customHeadersStr);

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${targetURL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
          ...customHeaders,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await handleProxyResponse(response, targetURL);
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error(`Error in POST ${targetURL}:`, error);
    return Response.json({ 
      error: "Proxy request failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const targetURL = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[0];
  const customHeadersStr = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[1];
  const customHeaders = parseCustomHeaders(customHeadersStr);

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${targetURL}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
          ...customHeaders,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await handleProxyResponse(response, targetURL);
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error(`Error in PUT ${targetURL}:`, error);
    return Response.json({ 
      error: "Proxy request failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const targetURL = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[0];
  const customHeadersStr = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[1];
  const customHeaders = parseCustomHeaders(customHeadersStr);

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${targetURL}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
          ...customHeaders,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await handleProxyResponse(response, targetURL);
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error(`Error in PATCH ${targetURL}:`, error);
    return Response.json({ 
      error: "Proxy request failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const targetURL = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[0];
  const customHeadersStr = decodeURIComponent(
    url.search.replace("?target=", "")
  ).split("&customHeaders=")[1];
  const customHeaders = parseCustomHeaders(customHeadersStr);

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${targetURL}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
          ...customHeaders,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await handleProxyResponse(response, targetURL);
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error(`Error in DELETE ${targetURL}:`, error);
    return Response.json({ 
      error: "Proxy request failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
