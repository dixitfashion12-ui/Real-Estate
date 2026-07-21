const AIRTABLE_API_BASE = "https://api.airtable.com/v0";

export async function saveUserToAirtable(data: {
  name: string;
  email: string;
  password: string;
}) {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const tableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;

  console.log("Airtable Debug Info:", {
    baseId: baseId ? "✓ Found" : "✗ Missing",
    tableId: tableId ? "✓ Found" : "✗ Missing",
    token: token ? "✓ Found" : "✗ Missing",
    environment: import.meta.env.MODE,
  });

  if (!baseId || !tableId || !token) {
    const missing = [
      !baseId ? "VITE_AIRTABLE_BASE_ID" : "",
      !tableId ? "VITE_AIRTABLE_TABLE_ID" : "",
      !token ? "VITE_AIRTABLE_TOKEN" : "",
    ].filter(Boolean);

    const error = new Error(
      `Airtable configuration incomplete. Missing: ${missing.join(", ")}`
    );
    console.error(error.message);
    throw error;
  }

  try {
    const response = await fetch(
      `${AIRTABLE_API_BASE}/${baseId}/${tableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: data.email,
                Name: data.name,
                "Password Hash": data.password,
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
      try {
        const errorData = await response.json();
        const airtableMessage = errorData.error?.message || errorData.message;
        if (airtableMessage) {
          errorMessage = `${errorMessage}: ${airtableMessage}`;
        }
        console.error("Airtable API error:", errorData);
      } catch (parseError) {
        console.error("Failed to parse Airtable error response:", parseError);
      }
      throw new Error(`Airtable API failed: ${errorMessage}`);
    }

    const result = await response.json();
    if (!result.records) {
      throw new Error("Invalid Airtable response: missing records field");
    }

    console.log("✓ User data successfully saved to Airtable");
    return result;
  } catch (error) {
    console.error("Failed to save user to Airtable:", error);
    throw error;
  }
}

export async function getUserFromAirtable(email: string) {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const tableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) {
    console.warn(
      "Airtable credentials not configured. User lookup skipped."
    );
    return null;
  }

  try {
    const encodedFormula = encodeURIComponent(
      `{Email} = "${email.replace(/"/g, '\\"')}"`
    );
    const response = await fetch(
      `${AIRTABLE_API_BASE}/${baseId}/${tableId}?filterByFormula=${encodedFormula}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user from Airtable");
    }

    const data = await response.json();
    return data.records?.[0] || null;
  } catch (error) {
    console.error("Failed to get user from Airtable:", error);
    throw error;
  }
}

export async function saveInquiryToAirtable(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  agentSlug?: string;
}) {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const inquiryTableId = import.meta.env.VITE_AIRTABLE_INQUIRY_TABLE_ID;
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;

  console.log("Inquiry Airtable Debug Info:", {
    baseId: baseId ? "✓ Found" : "✗ Missing",
    tableId: inquiryTableId ? "✓ Found" : "✗ Missing",
    token: token ? "✓ Found" : "✗ Missing",
    environment: import.meta.env.MODE,
  });

  if (!baseId || !inquiryTableId || !token) {
    const missing = [
      !baseId ? "VITE_AIRTABLE_BASE_ID" : "",
      !inquiryTableId ? "inquiryTableId" : "",
      !token ? "VITE_AIRTABLE_TOKEN" : "",
    ].filter(Boolean);

    const error = new Error(
      `Airtable configuration incomplete for inquiries. Missing: ${missing.join(", ")}`
    );
    console.error(error.message);
    throw error;
  }

  try {
    const response = await fetch(
      `${AIRTABLE_API_BASE}/${baseId}/${inquiryTableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: data.name,
                Email: data.email,
                Phone: data.phone || "",
                Message: data.message,
                "Property ID": data.propertyId || "",
                "Property Title": data.propertyTitle || "",
                "Agent Slug": data.agentSlug || "",
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
      try {
        const errorData = await response.json();
        const airtableMessage = errorData.error?.message || errorData.message;
        if (airtableMessage) {
          errorMessage = `${errorMessage}: ${airtableMessage}`;
        }
        console.error("Airtable inquiry error:", errorData);
      } catch (parseError) {
        console.error("Failed to parse Airtable error response:", parseError);
      }
      throw new Error(`Airtable API failed: ${errorMessage}`);
    }

    const result = await response.json();
    if (!result.records) {
      throw new Error("Invalid Airtable response: missing records field");
    }

    console.log("✓ Inquiry successfully saved to Airtable");
    return result;
  } catch (error) {
    console.error("Failed to save inquiry to Airtable:", error);
    throw error;
  }
}
