# fineapp-mcp

MCP server for exposing FineApp creatives, profiles, session offerings, creative filters, and client requests through structured tools.

## Features

- Lists creatives from FineApp
- Supports paginated creative search
- Supports category filtering on creative listings and search
- Finds creatives by role and location using local filtering
- Fetches available creative specialties and locations
- Fetches creative profiles by slug
- Fetches creative session types and packages by creative ID
- Provides a convenience tool for full creative details in one call
- Lists client requests from FineApp
- Validates tool inputs and external API responses with Zod
- Uses live FineApp API data

## Tools

### `list_creatives`

Lists creatives.

**Inputs**

- `page` optional number, default `0`
- `size` optional number, default `8`
- `category` optional string

**Example input**

{
"page": 0,
"size": 8,
"category": "photographer"
}

### `search_creatives`

Searches creatives using backend search.

**Inputs**

- `search` required string
- `page` optional number, default `0`
- `size` optional number, default `8`
- `category` optional string

**Example input**

{
"search": "videographer",
"page": 0,
"size": 8,
"category": "videographer"
}

### `find_creatives`

Finds creatives by optional role and/or location using local filtering on listing data.

**Inputs**

- `role` optional string
- `location` optional string
- `category` optional string
- `page` optional number, default `0`
- `size` optional number, default `50`

**Example input**

{
"role": "videographer",
"location": "Stellenbosch",
"category": "videographer",
"page": 0,
"size": 50
}

### `get_creative_filters`

Gets available FineApp creative specialties and locations.

**Inputs**

- none

**Example input**

{}

### `get_creative_profile`

Gets a creative profile by portfolio slug.

**Inputs**

- `slug` required string

**Example input**

{
"slug": "chichi"
}

### `get_creative_session_types`

Gets session types and packages for a creative by creative ID.

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

### `list_requests`

Lists client requests from FineApp.

**Inputs**

- `page` optional number, default `0`
- `size` optional number, default `12`
- `status` optional enum: `OPEN`, `IN_PROGRESS`, `ACCEPTED`, `COMPLETED`, `CANCELLED`, `EXPIRED`

**Example input**

{
"page": 0,
"size": 12,
"status": "OPEN"
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
