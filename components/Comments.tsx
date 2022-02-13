import { Prisma } from '@prisma/client';
import { intervalToDuration, formatDuration } from 'date-fns';
import { Avatar } from 'primereact/avatar';
import React, { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import Router from "next/router";

const commentWithAuthor = Prisma.validator<Prisma.CommentArgs>()({
    include: { user: true },
})

type CommentWithAuthor = Prisma.CommentGetPayload<typeof commentWithAuthor>

const AddComment = (props: { postId: number }) => {
    const [comment, setComment] = useState('')

    const addComment = () => {
        fetch("/api/addcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment,
                postId: props.postId
            }),
        }).then((res) => {
            Router.reload();
        });
        setComment('');
    }

    return (
        <div>
            <div>
                <InputTextarea rows={5} cols={30} value={comment} onChange={(e: React.ChangeEvent) => setComment((event!.target as HTMLInputElement).value)} />
            </div>
            <Button onClick={addComment}>Comment</Button>
        </div>
    );
}

const Comments = (props: { postId: number }) => {
    const fetchWithId = (url: string, id: number) => fetch(`${url}?id=${id}`).then((r) => r.json());
    const { data, error } = useSWR([`/api/comments`, props.postId], fetchWithId);

    if (error) return <div>An error has occurred.</div>;
    if (!data) return <div>Loading...</div>;
    if (data.length === 0) return <div><AddComment postId={props.postId} /></div>

    return (
        <div>
            <AddComment postId={props.postId} />
            {data
                .sort((first: CommentWithAuthor, second: CommentWithAuthor) => new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime())
                .map((comment: CommentWithAuthor) => {
                    const duration = intervalToDuration({ start: new Date(comment.createdAt), end: new Date() })

                    return (
                        <div key={comment.id}>
                            <div className='flex align-items-center' style={{ gap: 10 }}>
                                <Avatar
                                    image={comment.user.image || ''}
                                    shape="circle"
                                />
                                {comment.user.name} ({formatDuration(duration, {
                                    delimiter: ', '
                                })} ago)
                            </div>
                            {comment.content}
                        </div>
                    )
                })}
        </div>
    );
};

export default Comments;
