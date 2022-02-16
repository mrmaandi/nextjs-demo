import { PrismaClient, Comment } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

const prisma = new PrismaClient();

const Comments = (props: { comments: Comment[] }) => {
    return (
        <div>
            <h1 className='mt-0'>Your comments</h1>
            <div>
                {props.comments === null ? (
                    <>
                        You`re not logged in
                    </>
                ) : (
                    <>
                        {props.comments.map((comment: Comment) => (
                            <div key={comment.id}>
                                {comment.content}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div >
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    let comments: Comment[] | null = null

    if (session) {
        comments = await prisma.comment.findMany({ where: { userId: session.userId as string } });
    }

    return {
        props: JSON.parse(JSON.stringify({
            comments
        }))
    }
}

export default Comments;
