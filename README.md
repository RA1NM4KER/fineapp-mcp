# fineapp-mcp

MCP server for exposing public FineApp creative listings, search, profiles, and session offerings through structured tools.

## Features

- Lists public creatives from FineApp
- Supports paginated creative search
- Fetches public creative profiles by slug
- Fetches public creative session types and packages by creative ID
- Provides a convenience tool for full creative details in one call
- Validates tool inputs and external API responses with Zod
- Uses live public FineApp data

## Tools

### `list_creatives`

Lists public creatives.

**Inputs**

- `page` optional number, default `0`
- `size` optional number, default `8`

**Example input**

{
"page": 0,
"size": 8
}

### `search_creatives`

Searches public creatives.

**Inputs**

- `search` required string
- `page` optional number, default `0`
- `size` optional number, default `8`

**Example input**

{
"search": "videographer",
"page": 0,
"size": 8
}

### `get_creative_profile`

Gets a public creative profile by portfolio slug.

**Inputs**

- `slug` required string

**Example input**

{
"slug": "chichi"
}

### `get_creative_session_types`

Gets public session types and packages for a creative by creative ID.

**Inputs**

- `creativeId` required number

**Example input**

{
"creativeId": 7
}

### `get_creative_full_details`

Gets a creative profile and session types in a single call by portfolio slug.

**Inputs**

- `slug` required string

**Example input**

{
"slug": "chichi"
}

**Example output shape**

{
"profile": {},
"sessionTypes": []
}

## Tech

- TypeScript
- Node.js
- MCP TypeScript SDK
- Zod
- Prettier

## Run locally

```bash
npm install
npm run dev
```
