import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getRequests } from "../data/requests.js";
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
}
