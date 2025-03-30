import { NextApiRequest, NextApiResponse } from "next";

const greetings = {
  "63902476-66f3-4351-a617-0a36b1f0cd15": {
    id: "63902476-66f3-4351-a617-0a36b1f0cd15",
    recipientName: "John",
    senderName: "Jane",
    message: "Happy Birthday!",
    occasion: "birthday",
    themeId: "default",
    continuousEffect: "confetti",
    continuousEffectEnabled: true,
  },
  // Add more greetings here
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const greeting = greetings[id as string];

  if (greeting) {
    res.status(200).json(greeting);
  } else {
    res.status(404).json({ error: "Greeting not found" });
  }
}
