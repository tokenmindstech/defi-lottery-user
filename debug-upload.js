#!/usr/bin/env node

/**
 * Debug script to test the backend upload endpoint directly
 * Usage: node debug-upload.js [access-token]
 */

const ACCESS_TOKEN = process.argv[2] || "YOUR_ACCESS_TOKEN_HERE";
const BACKEND_URL = "https://picked-serval-factually.ngrok-free.app";

async function testUploadEndpoint() {
  console.log("🔍 Testing backend upload endpoints...");
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Access Token: ${ACCESS_TOKEN.substring(0, 20)}...`);

  // Test profile upload endpoint
  console.log("\n🖼️ Testing Profile Upload Endpoint");
  console.log("=======================================");

  const profilePayload = {
    fileName: "test-profile.jpg",
    contentType: "image/jpeg",
  };

  console.log("📤 Sending request with payload:", profilePayload);

  try {
    const response = await fetch(
      `${BACKEND_URL}/files/generate-profile-upload-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(profilePayload),
      }
    );

    console.log(
      `📥 Response Status: ${response.status} ${response.statusText}`
    );
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("\n📋 Response Body:");

    try {
      const jsonResponse = JSON.parse(responseText);
      console.log(JSON.stringify(jsonResponse, null, 2));

      const uploadData = jsonResponse.data || jsonResponse;
      if (uploadData.uploadUrl) {
        console.log("\n✅ Profile upload URL received successfully!");
        console.log(`Upload URL: ${uploadData.uploadUrl.substring(0, 50)}...`);
        console.log(`Public URL: ${uploadData.url}`);
      } else {
        console.log("\n❌ No upload URL in response");
      }
    } catch {
      console.log("Raw response (not JSON):", responseText);
    }
  } catch (error) {
    console.error("\n❌ Profile upload request failed:", error.message);
  }

  // Test general upload endpoint
  console.log("\n📁 Testing General Upload Endpoint");
  console.log("===================================");

  const generalPayload = {
    fileName: "test-support.jpg",
    folderName: "supports",
    contentType: "image/jpeg",
  };

  console.log("📤 Sending request with payload:", generalPayload);

  try {
    const response = await fetch(`${BACKEND_URL}/files/generate-upload-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(generalPayload),
    });

    console.log(
      `📥 Response Status: ${response.status} ${response.statusText}`
    );

    const responseText = await response.text();
    console.log("\n📋 Response Body:");

    try {
      const jsonResponse = JSON.parse(responseText);
      console.log(JSON.stringify(jsonResponse, null, 2));

      const uploadData = jsonResponse.data || jsonResponse;
      if (uploadData.uploadUrl) {
        console.log("\n✅ General upload URL received successfully!");
        console.log(`Upload URL: ${uploadData.uploadUrl.substring(0, 50)}...`);
        console.log(`Public URL: ${uploadData.url}`);
      } else {
        console.log("\n❌ No upload URL in response");
      }
    } catch {
      console.log("Raw response (not JSON):", responseText);
    }
  } catch (error) {
    console.error("\n❌ General upload request failed:", error.message);
  }
}

// Run the test
testUploadEndpoint().catch(console.error);
