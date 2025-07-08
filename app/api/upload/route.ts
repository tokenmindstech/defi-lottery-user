import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const folderName = decodeURIComponent(url.search.replace("?folderName=", ""));
  
  // Validate folder name for security
  const allowedFolders = ['supports', 'profiles'];
  if (!allowedFolders.includes(folderName)) {
    console.error(`Invalid folder name: ${folderName}`);
    return Response.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) {
    console.error("No file found in form data");
    return Response.json({ error: "File not found" }, { status: 400 });
  }

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    console.error("No valid session or access token");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    // Use different endpoints based on folder type
    const isProfileUpload = folderName === 'profiles';
    const endpoint = isProfileUpload 
      ? '/files/generate-profile-upload-url'
      : '/files/generate-upload-url';
    
    const payload = isProfileUpload 
      ? {
          fileName: file.name,
          contentType: file.type,
        }
      : {
          fileName: file.name,
          folderName,
          contentType: file.type,
        };
    
    console.log(`Requesting upload URL from backend (${endpoint}) with payload:`, payload);
    
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log(`Backend response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend error response:`, errorText);
      return Response.json({ 
        error: `Backend error: ${response.status} ${response.statusText}`,
        details: errorText
      }, { status: response.status });
    }

    const result = await response.json();
    console.log(`Backend upload URL response:`, result);
    
    // Handle new backend response structure
    const responseData = result.data || result;
    const { uploadUrl, url } = responseData;
    
    if (!uploadUrl) {
      console.error("No uploadUrl received from backend:", result);
      return Response.json({ error: "No upload URL received from backend" }, { status: 500 });
    }

    console.log(`Uploading file to S3 URL: ${uploadUrl}`);
    
    response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    
    console.log(`S3 upload response: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`S3 upload error:`, errorText);
      throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
    }

    console.log(`Upload successful, returning URL: ${url}`);
    return Response.json({ uploadUrl, url }, { status: 200 });
  } catch (error) {
    console.error(`Error in POST upload:`, error);
    return Response.json({ 
      error: "Upload failed",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
