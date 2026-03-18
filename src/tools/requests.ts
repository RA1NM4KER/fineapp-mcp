import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { findRequests, getRequests } from "../data/requests.js";
import { RequestStatusSchema } from "../schemas/request.js";
import { pageSchema, requestSizeSchema } from "../schemas/tool-inputs.js";
import { jsonResult } from "./shared.js";

export function registerRequestTools(server: McpServer) {
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

  server.registerTool(
    "find_requests",
    {
      title: "Find requests",
      description:
        "Find public FineApp client requests by optional category, location, and status using local filtering on request data. Pagination is 0-indexed. The first page is page=0.",
      inputSchema: {
        category: z.string().min(1).optional(),
        location: z.string().min(1).optional(),
        status: RequestStatusSchema.optional(),
        page: pageSchema,
        size: requestSizeSchema,
      },
    },
    async ({ category, location, status, page = 0, size = 12 }) => {
      return jsonResult(
        await findRequests({
          page,
          size,
          ...(category !== undefined ? { category } : {}),
          ...(location !== undefined ? { location } : {}),
          ...(status !== undefined ? { status } : {}),
        })
      );
    }
  );
}
