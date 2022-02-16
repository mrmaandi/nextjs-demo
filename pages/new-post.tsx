import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';

const NewPost: NextPage = (props: any) => {
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
      <h1 className='mt-0'>Add new post</h1>
      <div>
        <span className="p-float-label">
          <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="title">Title</label>
        </span>
      </div>
      <div>
        <InputTextarea placeholder='description' rows={5} cols={30} value={description} onChange={(e: React.ChangeEvent) => setDescription((event!.target as HTMLInputElement).value)} />
      </div>
      <Button onClick={addPost}>Post</Button>
    </div>
  );
}

export default NewPost;
