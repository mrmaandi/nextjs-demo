import Head from "next/head";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>NextJS DEMO</title>
            </Head>
            <div className="container">
                <Header />
                <main>
                    <div className="flex" style={{ gap: '2em' }}>
                        <div className="flex flex-column">
                            <Sidebar />
                        </div>
                        <div className="flex-1">{children}</div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Layout;
