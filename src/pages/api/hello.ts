import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
type ResponseData = {
  token?: string;
  message?: string;
};

// const cors = Cors({
//   methods: ["POST", "GET", "HEAD"],
//   origin: "https://parent-next-app.vercel.app",
//   credentials: true,
//   allowedHeaders: ["Content-Type"],
// });

// function runMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: typeof cors,
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });
  //   await runMiddleware(req, res, cors);
  console.log("***********");
  console.log("COOKIES", req.headers.cookie);
  console.log("***********");
  return res.status(200).send({ message: "hello" });
}
