import axios from "axios";

export async function getPayPalAccessToken() {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const apiEndpoint = process.env.PAYPAL_API;

    if (!clientId || !clientSecret || !apiEndpoint) {
      console.error("PayPal credentials or endpoint missing.");
      return null;
    }

    console.log("Using PayPal API endpoint:", apiEndpoint);

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const response = await axios.post(
      `${apiEndpoint}/v1/oauth2/token`,
      params,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
