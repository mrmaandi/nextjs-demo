import { Post, PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const prisma = new PrismaClient();


const AddPost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter();

  const addPost = () => {
    fetch("/api/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description
      }),
    }).then((res) => {
      router.replace(router.asPath);
    });
    setTitle('');
    setDescription('');
  }

  return (
    <div>
      <div>
        <span className="p-float-label">
          <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="title">Title</label>
        </span>
      </div>
      <div>
        <InputTextarea rows={5} cols={30} value={description} onChange={(e: React.ChangeEvent) => setDescription((event!.target as HTMLInputElement).value)} />
      </div>

      <Button onClick={addPost}>Post</Button>
    </div>
  );
}

const Posts: NextPage = (props: any) => {
  return (
    <div>
      <h1>My posts</h1>
      <AddPost />
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

  if (!session) {

  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: session?.userId as string
    }
  });

  console.dir(posts);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    },
  }
}


export default Posts;
