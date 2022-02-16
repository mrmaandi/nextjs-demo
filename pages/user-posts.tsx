import { Post, PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const prisma = new PrismaClient();

const Posts: NextPage = (props: any) => {
  return (
    <div>
      <h1 className='mt-0'>My posts</h1>
      {props.posts.map((post: Post) => (
        <div key={post.id}>
          <Link href={"/posts/" + post.id}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  let posts: Post[] = await prisma.post.findMany({
    where: {
      authorId: session!.userId as string
    }
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    },
  }
}


export default Posts;
