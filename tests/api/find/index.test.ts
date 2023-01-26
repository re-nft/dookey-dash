import { expect, test } from "@playwright/test";
import { createMocks } from "node-mocks-http";

import handler from "@/pages/api/player/find/[address]";

test("GET /api/player/find/[address] >> Invalid address format", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: {
      address: "0x938CF6514cC309dd081A73330F30B42C9d7c55",
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({
    OK: false,
    error: "Invalid address",
  });
});

test("GET /api/player/find/[address] >> Invalid address type", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: {
      address: 123,
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({
    OK: false,
    error: "Invalid address",
  });
});

test("GET /api/player/find/[address] >> Address not supplied", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({
    OK: false,
    error: "Address is required",
  });
});

test("GET /api/player/find/[address] >> Method not allowed", async () => {
  const { req, res } = createMocks({
    method: "POST",
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(405);
  expect(res._getJSONData()).toEqual({
    OK: false,
    error: "Method not allowed",
  });
});

test("GET /api/player/find/[address] >> Player exists", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: {
      address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b",
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    OK: true,
    result: {
      address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b",
      message: "{}",
      createdAt: "2023-01-01T00:00:00.000Z",
      __v: 0,
    },
  });
});
