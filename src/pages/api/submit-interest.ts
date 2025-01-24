import type { APIRoute } from "astro";
import { Client } from "@notionhq/client";

interface CloudflareRuntime {
  runtime: {
    env: {
      NOTION_API_KEY: string;
      NOTION_DATABASE_ID: string;
    };
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as CloudflareRuntime).runtime;
  const env = runtime?.env;

  const notion = new Client({
    auth: import.meta.env.NOTION_API_KEY || env?.NOTION_API_KEY,
  });
  const NOTION_DATABASE_ID =
    import.meta.env.NOTION_DATABASE_ID || env?.NOTION_DATABASE_ID;

  try {
    const data = await request.json();
    const { email, message } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Create a new page in Notion database using the client
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message || "",
              },
            },
          ],
        },
      },
    });
    console.log("🚀 ~ constPOST:APIRoute= ~ response:", response);

    return new Response(
      JSON.stringify({ message: "Successfully registered interest" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return new Response(JSON.stringify({ error: "Failed to submit form" }), {
      status: 500,
    });
  }
};
