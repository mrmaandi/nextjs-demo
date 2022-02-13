import { Post, Prisma, PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import type { NextPage } from 'next'
import Link from 'next/link';

const prisma = new PrismaClient();

const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  include: { author: true },
})

type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>

const Home: NextPage = (props: any) => {
  return (
    <div>
      {props.posts.map((post: PostWithAuthor) => (
        <div key={post.id} className='mb-5'>
          <div>
            {post.author.name} ({format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm')})
          </div>
          <Link href={"/posts/" + post.id}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({ include: { author: true } });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    },
    revalidate: 15
  }
}

export default Home
