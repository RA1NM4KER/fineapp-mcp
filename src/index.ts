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
import {
  findSizeSchema,
  listSizeSchema,
  pageSchema,
} from "./schemas/tool-inputs.js";

const server = new McpServer({
  name: "fineapp-mcp",
  version: "0.1.0",
});

function jsonResult(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

server.registerTool(
  "list_creatives",
  {
    title: "List creatives",
    description:
      "List public FineApp creatives. Pagination is 0-indexed. The first page is page=0.",
    inputSchema: {
      page: pageSchema,
      size: listSizeSchema,
    },
  },
  async ({ page = 0, size = 8 }) => {
    return jsonResult(await getCreatives(page, size));
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
      page: pageSchema,
      size: listSizeSchema,
    },
  },
  async ({ search, page = 0, size = 8 }) => {
    return jsonResult(await searchCreatives(search, page, size));
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
      page: pageSchema,
      size: findSizeSchema,
    },
  },
  async ({ role, location, page = 0, size = 50 }) => {
    return jsonResult(
      await findCreatives({
        page,
        size,
        ...(role !== undefined ? { role } : {}),
        ...(location !== undefined ? { location } : {}),
      })
    );
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
    return jsonResult(await getCreativeProfile(slug));
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
    return jsonResult(await getCreativeSessionTypes(creativeId));
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
    return jsonResult(await getCreativeFullDetails(slug));
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
