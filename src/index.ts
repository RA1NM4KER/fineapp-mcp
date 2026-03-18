import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  findCreatives,
  getCreativeFilters,
  getCreativeFullDetails,
  getCreativeProfile,
  getCreativeSessionTypes,
  getCreatives,
  searchCreatives,
} from "./data/creatives.js";
import { getRequests } from "./data/requests.js";
import { RequestStatusSchema } from "./schemas/request.js";
import {
  findSizeSchema,
  listSizeSchema,
  pageSchema,
  requestSizeSchema,
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
      "List public FineApp creatives. Pagination is 0-indexed. The first page is page=0. You can optionally filter by category.",
    inputSchema: {
      page: pageSchema,
      size: listSizeSchema,
      category: z.string().min(1).optional(),
    },
  },
  async ({ page = 0, size = 8, category }) => {
    return jsonResult(await getCreatives(page, size, category));
  }
);

server.registerTool(
  "search_creatives",
  {
    title: "Search creatives",
    description:
      "Search public FineApp creatives using backend search. Pagination is 0-indexed. The first page is page=0. Use short search terms like 'videographer' or 'Stellenbosch'. You can optionally filter by category.",
    inputSchema: {
      search: z.string().min(1),
      page: pageSchema,
      size: listSizeSchema,
      category: z.string().min(1).optional(),
    },
  },
  async ({ search, page = 0, size = 8, category }) => {
    return jsonResult(await searchCreatives(search, page, size, category));
  }
);

server.registerTool(
  "find_creatives",
  {
    title: "Find creatives",
    description:
      "Find public FineApp creatives by optional role, location, and category using local filtering on public listing data. Pagination is 0-indexed. The first page is page=0.",
    inputSchema: {
      role: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      category: z.string().min(1).optional(),
      page: pageSchema,
      size: findSizeSchema,
    },
  },
  async ({ role, location, category, page = 0, size = 50 }) => {
    return jsonResult(
      await findCreatives({
        page,
        size,
        ...(role !== undefined ? { role } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(category !== undefined ? { category } : {}),
      })
    );
  }
);

server.registerTool(
  "get_creative_filters",
  {
    title: "Get creative filters",
    description:
      "Get available FineApp creative specialties and locations from the public filters endpoint.",
    inputSchema: {},
  },
  async () => {
    return jsonResult(await getCreativeFilters());
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

server.registerTool(
  "list_requests",
  {
    title: "List requests",
    description:
      "List public FineApp client requests. Pagination is 0-indexed. The first page is page=0. You can optionally filter by request status.",
    inputSchema: {
      page: pageSchema,
      size: requestSizeSchema,
      status: RequestStatusSchema.optional(),
    },
  },
  async ({ page = 0, size = 12, status }) => {
    return jsonResult(
      await getRequests({
        page,
        size,
        ...(status !== undefined ? { status } : {}),
      })
    );
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
