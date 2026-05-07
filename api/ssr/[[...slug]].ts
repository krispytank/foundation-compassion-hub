import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";

const fetch = createStartHandler(defaultStreamHandler);

function createRequest(req: any): Request {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(name, v));
    } else {
      headers.append(name, value as string);
    }
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? null : req,
  });
}

export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(createRequest(req));

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.statusCode = response.status;
    const body = await response.text();
    res.end(body);
  } catch (err) {
    console.error("[ssr-error]", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

