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
      let error;
      try {
        error = await response.json();
        console.error("Airtable error:", error);
        throw new Error(`Airtable API error: ${error.error?.message}`);
      } catch (parseError) {
        console.error(`HTTP ${response.status}: ${response.statusText}`, response);
        throw new Error(
          `Airtable API failed: HTTP ${response.status} - ${response.statusText}`
        );
      }
    }

    const data = await response.json();
    if (!data.records) {
      throw new Error("Invalid Airtable response: missing records field");
    }

    console.log("✓ User data successfully saved to Airtable");
    return data;
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
