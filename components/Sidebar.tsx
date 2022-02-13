import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <>
            <Link href="/">
                <a>All posts</a>
            </Link>
            <Link href="/posts">
                <a>My posts</a>
            </Link>
            <Link href="/comments">
                <a>My comments</a>
            </Link>
        </>
    );
};

export default Sidebar;
