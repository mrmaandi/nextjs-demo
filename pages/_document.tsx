import { Head, Html, Main, NextScript } from "next/document";

const CustomDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="NextJS Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default CustomDocument;
