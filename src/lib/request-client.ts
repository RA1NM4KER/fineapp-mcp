import Bottleneck from "bottleneck";
import pRetry, { AbortError } from "p-retry";

const limiter = new Bottleneck({
  minTime: 120,
  maxConcurrent: 1,
});

type Schema<T> = {
  parse: (input: unknown) => T;
};

function shouldAbortRetry(status: number) {
  return status >= 400 && status < 500 && status !== 429;
}

export async function requestJson<T>(
  url: string,
  schema: Schema<T>
): Promise<T> {
  return limiter.schedule(() =>
    pRetry(
      async () => {
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          if (shouldAbortRetry(response.status)) {
            throw new AbortError(
              `FineApp API request failed: ${response.status}`
            );
          }

          throw new Error(`FineApp API request failed: ${response.status}`);
        }

        const json = await response.json();
        return schema.parse(json);
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 250,
        maxTimeout: 2000,
      }
    )
  );
}
