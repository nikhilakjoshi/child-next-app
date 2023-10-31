import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
type ResponseData = {
  token?: string;
  message?: string;
};

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });
  const token = Buffer.from("This is a secret token").toString("base64");
  const currentTime = new Date().getTime();
  let updatedTime = new Date(currentTime + 5 * 60 * 1000);
  await runMiddleware(req, res, cors);
  res.setHeader(
    "Set-Cookie",
    `token=${token}; domain=localhost;Path=/home; SameSite=None; Secure; Expires=${updatedTime.toUTCString()}`,
  );
  res.setHeader("location", `/home?token=${token}`);
  return res.status(200).send({ message: "Token set" });
}
