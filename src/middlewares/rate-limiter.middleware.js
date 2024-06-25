import rateLimiter from "express-rate-limit";

/**
 * Limits the number of request per 1 hour on the route, to prevent from ddos attack
 * @param {number} numberOfRequests Number of request allowed per 1 hours,
 * number of requests exceed then it will block the ip.
 * @returns
 */
export const limiter = (numberOfRequests) =>
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: process.env["NODE_ENV"] === "development" ? 999 : numberOfRequests,
    // max: process.env.NODE_ENV !== "development" ? numberOfRequests : 100,

    message: "To many request from this IP, please try again in a hour!.",
  });
