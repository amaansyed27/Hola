import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Path to the centralized JSON file
  const filePath = path.resolve(process.cwd(), "data", "greetings.json");

  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, "utf-8");
    const greetings = JSON.parse(data);

    const greeting = greetings[id as string];

    if (greeting) {
      res.status(200).json(greeting);
    } else {
      res.status(404).json({ error: "Greeting not found" });
    }
  } catch (error) {
    console.error("Error reading greetings file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
