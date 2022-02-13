import Head from "next/head";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>NextJS DEMO</title>
            </Head>
            <Header />
            <main>
                <div className="flex">
                    <div className="flex flex-column">
                        <Sidebar />
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
            </main>
        </>
    );
};

export default Layout;
