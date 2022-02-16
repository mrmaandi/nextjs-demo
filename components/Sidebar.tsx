import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <>
            <Link href="/">
                <a>All posts</a>
            </Link>
            <Link href="/user-posts">
                <a>My posts</a>
            </Link>
            <Link href="/user-comments">
                <a>My comments</a>
            </Link>
            <hr />
            <Link href="/new-post">
                <a>Add new post</a>
            </Link>
        </>
    );
};

export default Sidebar;
