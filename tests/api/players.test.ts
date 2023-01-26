import { expect, test } from "@playwright/test";
import { createMocks } from "node-mocks-http";

import handler from "../../pages/api/player/find/[address]";

test("GET /api/player/find/[address] >> Does not exists", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: {
      address: "0x938CF6514cC309dd081A73330F30B42C9d7c5569",
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({
    OK: false,
    error: "Invalid address",
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
