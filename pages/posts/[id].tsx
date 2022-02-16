import { Prisma, PrismaClient } from '@prisma/client';
import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic'
import useInView from "react-cool-inview";
const Comments = dynamic(() => import('../../components/Comments'))

const prisma = new PrismaClient();

const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  include: { author: true },
})

type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>

const PostPage = (props: { post: PostWithAuthor }) => {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
    },
  });

  if (!props.post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <p>Posted by {props.post.author.name}</p>
      <h1>
        {props.post.title}
      </h1>
      <div>
        {props.post.content}
      </div>
      <div ref={observe}>
        <div className='mt-5'>
          <h2>Comments</h2>
        </div>
        {inView && <Comments postId={props.post.id} />}
      </div>
    </div>
  )
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const post = await prisma.post.findUnique({ where: { id: Number(context.params!.id) }, include: { author: true } });

  return {
    props: JSON.parse(JSON.stringify({
      post
    })),
    revalidate: 15
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}


export default PostPage;
