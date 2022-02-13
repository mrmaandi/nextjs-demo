import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { id } = request.query
    const comments = prisma.comment.findMany({ where: { postId: Number(id) }, include: { user: true } });

    comments.then((data) => response.status(200).json(data));
}