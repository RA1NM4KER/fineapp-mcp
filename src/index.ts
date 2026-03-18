import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  getCreativeProfile,
  getCreativeSessionTypes,
  getCreatives,
  searchCreatives,
  getCreativeFullDetails,
} from "./data/creatives.js";

const server = new McpServer({
  name: "fineapp-mcp",
  version: "0.1.0",
});

server.registerTool(
  "list_creatives",
  {
    title: "List creatives",
    description: "List public FineApp creatives",
    inputSchema: {
      page: z.number().int().min(0).optional(),
      size: z.number().int().min(1).max(50).optional(),
    },
  },
  async ({ page = 0, size = 8 }) => {
    const result = await getCreatives(page, size);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "search_creatives",
  {
    title: "Search creatives",
    description: "Search public FineApp creatives",
    inputSchema: {
      search: z.string().min(1),
      page: z.number().int().min(0).optional(),
      size: z.number().int().min(1).max(50).optional(),
    },
  },
  async ({ search, page = 0, size = 8 }) => {
    const result = await searchCreatives(search, page, size);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_creative_profile",
  {
    title: "Get creative profile",
    description: "Get a public FineApp creative profile by portfolio slug",
    inputSchema: {
      slug: z.string().min(1),
    },
  },
  async ({ slug }) => {
    const result = await getCreativeProfile(slug);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_creative_session_types",
  {
    title: "Get creative session types",
    description:
      "Get public session types and packages for a FineApp creative by creative ID",
    inputSchema: {
      creativeId: z.number().int().positive(),
    },
  },
  async ({ creativeId }) => {
    const result = await getCreativeSessionTypes(creativeId);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_creative_full_details",
  {
    title: "Get creative full details",
    description:
      "Get a public FineApp creative profile and session types by portfolio slug",
    inputSchema: {
      slug: z.string().min(1),
    },
  },
  async ({ slug }) => {
    const result = await getCreativeFullDetails(slug);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
