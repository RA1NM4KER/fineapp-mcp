import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  findCreatives,
  getCreativeFullDetails,
  getCreativeProfile,
  getCreativeSessionTypes,
  getCreatives,
  searchCreatives,
} from "./data/creatives.js";

const server = new McpServer({
  name: "fineapp-mcp",
  version: "0.1.0",
});

server.registerTool(
  "list_creatives",
  {
    title: "List creatives",
    description:
      "List public FineApp creatives. Pagination is 0-indexed. The first page is page=0.",
    inputSchema: {
      page: z.number().int().min(0).default(0),
      size: z.number().int().min(1).max(50).default(8),
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
    description:
      "Search public FineApp creatives using backend search. Pagination is 0-indexed. The first page is page=0. Use short search terms like 'videographer' or 'Stellenbosch'.",
    inputSchema: {
      search: z.string().min(1),
      page: z.number().int().min(0).default(0),
      size: z.number().int().min(1).max(50).default(8),
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
  "find_creatives",
  {
    title: "Find creatives",
    description:
      "Find public FineApp creatives by optional role and/or location using local filtering on public listing data. Pagination is 0-indexed. The first page is page=0.",
    inputSchema: {
      role: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      page: z.number().int().min(0).default(0),
      size: z.number().int().min(1).max(100).default(50),
    },
  },
  async ({ role, location, page = 0, size = 50 }) => {
    const result = await findCreatives({
      page,
      size,
      ...(role !== undefined ? { role } : {}),
      ...(location !== undefined ? { location } : {}),
    });
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
    description: "Get a public FineApp creative profile by portfolio slug.",
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
      "Get public session types and packages for a FineApp creative by creative ID.",
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
      "Get a public FineApp creative profile and session types by portfolio slug.",
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
