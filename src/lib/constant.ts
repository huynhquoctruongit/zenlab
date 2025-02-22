export const CMS_DOMAIN = "https://cms.zenlab.edu.vn";
export const ENV_MODE = "PRODUCTION"

const API: any = {
  LOCAL: "https://cms.zenlab.edu.vn",
  STAGING: "https://cms.zenlab.edu.vn",
  PRODUCTION: "https://cms.zenlab.edu.vn",
};

const origin: any = {
  LOCAL: "http://localhost:3000",
  STAGING: "https://zenlab-staging.vercel.app",
  PRODUCTION: "https://e-learning.zenlab.edu.vn",
};

export const ENV = process.env.NEXT_PUBLIC_MODE || "LOCAL";
export const CTRL_DOMAIN = API[ENV];
export const ORIGIN_DOMAIN = origin[ENV];
