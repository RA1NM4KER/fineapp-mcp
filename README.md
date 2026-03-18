# fineapp-mcp

MCP server for exposing FineApp creatives, filters, profiles, session offerings, and client requests through structured tools.

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
- Finds client requests by category, location, and status
- Validates tool inputs and external API responses with Zod
- Uses live FineApp API data

## What you can do

Once connected to an MCP client like Codex, you can ask things like:

- Find videographers in Stellenbosch and show me their packages.
- Pick the best FineApp creative for a couple shoot in Stellenbosch and justify the choice using their profile and packages.
- What services are available on FineApp?
- What locations are available on FineApp?
- What client requests are currently open on FineApp?
- Find photography requests in Stellenbosch.
- If you could say in one word what the majority of requests are about.

## Tools

## Creatives

### `list_creatives`

Lists creatives.

**Inputs**

- `page` optional number, default `0`
- `size` optional number, default `8`
- `category` optional string

**Example input**

```json
{
  "page": 0,
  "size": 8,
  "category": "photographer"
}
```

### `search_creatives`

Searches creatives using backend search.

**Inputs**

- `search` required string
- `page` optional number, default `0`
- `size` optional number, default `8`
- `category` optional string

**Example input**

```json
{
  "search": "videographer",
  "page": 0,
  "size": 8,
  "category": "videographer"
}
```

### `find_creatives`

Finds creatives by optional role and/or location using local filtering on listing data.

**Inputs**

- `role` optional string
- `location` optional string
- `category` optional string
- `page` optional number, default `0`
- `size` optional number, default `50`

**Example input**

```json
{
  "role": "videographer",
  "location": "Stellenbosch",
  "category": "videographer",
  "page": 0,
  "size": 50
}
```

### `get_creative_filters`

Gets available FineApp creative specialties and locations.

**Inputs**

- none

**Example input**

```json
{}
```

## Profiles & Packages

### `get_creative_profile`

Gets a creative profile by portfolio slug.

**Inputs**

- `slug` required string

**Example input**

```json
{
  "slug": "chichi"
}
```

### `get_creative_session_types`

Gets session types and packages for a creative by creative ID.

**Inputs**

- `creativeId` required number

**Example input**

```json
{
  "creativeId": 7
}
```

### `get_creative_full_details`

Gets a creative profile and session types in a single call by portfolio slug.

**Inputs**

- `slug` required string

**Example input**

```json
{
  "slug": "chichi"
}
```

**Example output shape**

```json
{
  "profile": {},
  "sessionTypes": []
}
```

## Requests

### `list_requests`

Lists client requests from FineApp.

**Inputs**

- `page` optional number, default `0`
- `size` optional number, default `12`
- `status` optional enum: `OPEN`, `IN_PROGRESS`, `ACCEPTED`, `COMPLETED`, `CANCELLED`, `EXPIRED`

**Example input**

```json
{
  "page": 0,
  "size": 12,
  "status": "OPEN"
}
```

### `find_requests`

Finds client requests by optional category, location, and status.

**Inputs**

- `category` optional string
- `location` optional string
- `status` optional enum: `OPEN`, `IN_PROGRESS`, `ACCEPTED`, `COMPLETED`, `CANCELLED`, `EXPIRED`
- `page` optional number, default `0`
- `size` optional number, default `12`

**Example input**

```json
{
  "category": "photography",
  "location": "Stellenbosch",
  "status": "OPEN",
  "page": 0,
  "size": 12
}
```

## Tech

- TypeScript
- Node.js
- MCP TypeScript SDK
- Zod
- Prettier
- Vitest
- Bottleneck
- p-retry

## Run locally

```bash
npm install
npm run dev
```

## Example Codex setup

```bash
codex mcp add fineapp -- npx tsx src/index.ts
```

Then launch Codex from the repo and check connected MCP servers with:

```text
/mcp
```

## Testing

Run tests:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```

The project includes tests for:

- endpoint URL builders
- FineApp API wrappers
- request client behavior
- creative data helpers
- request data helpers

## Project structure

```txt
src/
  data/      orchestration helpers
  lib/       request client and endpoint builders
  schemas/   zod schemas
  tools/     MCP tool registration by domain
  types/     shared TypeScript types
```

## Notes

- Pagination is 0-indexed, so the first page is `page=0`.
- This server is designed for local stdio use with MCP clients like Codex.
- The project uses live FineApp API data and validates external responses with Zod.
- Some FineApp endpoints have different access behavior depending on the endpoint and request context.
