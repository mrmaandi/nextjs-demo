import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  message: any;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "POST") {
    response.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const req = request.body;
  const { cookies } = request;

  const sessionTokenCookie =
    cookies["next-auth.session-token"] ||
    cookies["__Secure-next-auth.session-token"];

  if (!sessionTokenCookie) {
    response.status(400).send({ message: "No session token" });
    return;
  }

  const session = prisma.session.findUnique({
    where: { sessionToken: sessionTokenCookie },
  });

  if (!session) {
    response.status(400).send({ message: "No session found" });
    return;
  }

  session
    .then((ses) => {
        prisma.post.create({
            data: {
                title: req.title,
                content: req.description,
                authorId: ses!.userId,
            },
        })
        .then((res) => {
            return response.status(200).json({ message: res });
        });
    })
    
}