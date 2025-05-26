import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const folderName = decodeURIComponent(url.search.replace("?folderName=", ""));

  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return Response.json({ error: "File not found" }, { status: 400 });
  }

  const session = await getServerSession(authConfig);
  if (!session || !session.user.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;

  try {
    const payload = {
      fileName: file.name,
      folderName,
      contentType: file.type,
    };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/files/generate-upload-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = (await response.json()) as APIBaseGenerateUploadResponse;
    console.log(`Response from backend:`, result);
    const { uploadUrl, url } = result;
    response = await fetch(result.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return Response.json({ uploadUrl, url }, { status: 200 });
  } catch (error) {
    console.error(`Error in POST:`, error);
    return Response.json({ error }, { status: 500 });
  }
}
