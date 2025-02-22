import { createDirectus, authentication, rest, refresh } from "@directus/sdk";

export const directus = createDirectus(`${process.env.NEXT_PUBLIC_CMS}`)
  .with(authentication("cookie", { credentials: "include" }))
  .with(rest());
