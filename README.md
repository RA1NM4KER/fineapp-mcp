# fineapp-mcp

MCP server for exposing public FineApp creative listings through structured tools.

## Features

- Lists public creatives from FineApp
- Supports paginated creative search
- Validates inputs and API responses with Zod
- Uses live public FineApp data

## Tools

### list_creatives

Lists public creatives.

Inputs:

- `page` optional number, default `0`
- `size` optional number, default `8`

### search_creatives

Searches public creatives.

Inputs:

- `search` required string
- `page` optional number, default `0`
- `size` optional number, default `8`

## Tech

- TypeScript
- Node.js
- MCP TypeScript SDK
- Zod

## Run locally

```bash
npm install
npm run dev
```
