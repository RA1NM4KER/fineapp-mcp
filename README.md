# fineapp-mcp

An MCP server for exposing public FineApp creative listings through structured tools.

## Tools

### `list_creatives`

Lists public creatives from FineApp.

Inputs:

- `page` optional number, default `0`
- `size` optional number, default `8`

### `search_creatives`

Searches public creatives from FineApp.

Inputs:

- `search` required string
- `page` optional number, default `0`
- `size` optional number, default `8`

## Tech

- TypeScript
- Node.js
- Model Context Protocol SDK
- Zod

## Run locally

```bash
npm install
npm run dev
```
