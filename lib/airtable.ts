import { createServerFn } from "@tanstack/react-start";
import { randomBytes, scryptSync } from "node:crypto";

const AIRTABLE_API_BASE = "https://api.airtable.com/v0";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

async function airtableRequest(path: string, init?: RequestInit) {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;

  console.log("Server-side Airtable request:", {
    baseId: baseId ? "✓ Found" : "✗ Missing",
    token: token ? "✓ Found" : "✗ Missing",
  });

  if (!baseId || !token) {
    const missing = [!baseId && "VITE_AIRTABLE_BASE_ID", !token && "VITE_AIRTABLE_TOKEN"].filter(Boolean);
    throw new Error(`Airtable configuration incomplete. Missing: ${missing.join(", ")}`);
  }

  const response = await fetch(`${AIRTABLE_API_BASE}/${baseId}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
    try {
      const errorData = await response.json();
      const airtableMessage = errorData.error?.message || errorData.message;
      if (airtableMessage) errorMessage = `${errorMessage}: ${airtableMessage}`;
    } catch {
      /* response body wasn't JSON */
    }
    throw new Error(`Airtable API failed: ${errorMessage}`);
  }

  return response.json();
}

export const saveUserToAirtable = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const tableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
    if (!tableId) throw new Error("Airtable configuration incomplete. Missing: VITE_AIRTABLE_TABLE_ID");

    const result = await airtableRequest(tableId, {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: data.email,
              Name: data.name,
              "Password Hash": hashPassword(data.password),
            },
          },
        ],
      }),
    });

    if (!result.records) throw new Error("Invalid Airtable response: missing records field");
    return result;
  });

export const getUserFromAirtable = createServerFn({ method: "GET" })
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    const tableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
    if (!tableId) return null;

    const encodedFormula = encodeURIComponent(`{Email} = "${email.replace(/"/g, '\\"')}"`);
    const result = await airtableRequest(`${tableId}?filterByFormula=${encodedFormula}`);
    return result.records?.[0] || null;
  });

export const saveInquiryToAirtable = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      phone?: string;
      message: string;
      propertyId?: string;
      propertyTitle?: string;
      agentSlug?: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const inquiryTableId = import.meta.env.VITE_AIRTABLE_INQUIRY_TABLE_ID;
    if (!inquiryTableId)
      throw new Error("Airtable configuration incomplete. Missing: AIRTABLE_INQUIRY_TABLE_ID");

    // The "Contact Form Submissions" table only has Name, Email, Phone Number, Message
    // (no Property ID/Title or Agent Slug columns).
    const result = await airtableRequest(inquiryTableId, {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: data.name,
              Email: data.email,
              "Phone Number": data.phone || "",
              Message: data.message,
            },
          },
        ],
      }),
    });

    if (!result.records) throw new Error("Invalid Airtable response: missing records field");
    return result;
  });
