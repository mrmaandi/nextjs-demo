import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { id } = request.query
    const comments = await prisma.comment.findMany({ where: { postId: Number(id) }, include: { user: true } });

    return response.status(200).json(comments)
}
