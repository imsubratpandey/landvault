import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log(process.env.PINATA_API_KEY);
    console.log(process.env.PINATA_SECRET_API_KEY);
    const formData = await req.formData();
    console.log(formData);
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "pinata_api_key": process.env.PINATA_API_KEY,
          "pinata_secret_api_key": process.env.PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const ipfsHash = response.data.IpfsHash;
    return NextResponse.json({ message: "File uploaded successfully", path: ipfsHash });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed", path:error.message }, { status: 500 });
  }
}
