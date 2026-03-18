import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerCreativeTools } from "./tools/creatives.js";
import { registerRequestTools } from "./tools/requests.js";

const server = new McpServer({
  name: "fineapp-mcp",
  version: "0.1.0",
});

registerCreativeTools(server);
registerRequestTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
