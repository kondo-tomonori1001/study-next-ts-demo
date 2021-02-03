import Head from 'next/Head';
import Link from 'next/link';
import Header from "../components/Header";
import { GetStaticProps } from 'next';

import { getPostsData } from "../../lib/posts";

export default function Home({allPostsData}) {
  console.log(allPostsData);
  return (
    <>
      <Head>
        <title>MyBlog</title>
      </Head>
      <Header />
      <p>Hello world!</p>
      <Link href="/posts/first-post">link to first-post</Link>
      <Link href="/posts/style-demo/cssModules">CSS Modules Demo</Link>
      <hr/>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData
    }
  }
}