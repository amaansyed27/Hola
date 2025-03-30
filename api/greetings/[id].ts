import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Retrieve greetings from local storage (simulated for server-side)
  const greetingsStr = process.env.GREETINGS || "{}";
  const greetings = JSON.parse(greetingsStr);

  const greeting = greetings[id as string];

  if (greeting) {
    res.status(200).json(greeting);
  } else {
    res.status(404).json({ error: "Greeting not found" });
  }
}
