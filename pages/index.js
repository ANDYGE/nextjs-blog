import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import useSWR from "swr";

export default function Home({ allPostsData }) {
  const { data, error } = useSWR("/api/hello", fetch);
  console.log(data);
  return (
    <Layout home>
      <Head>
        <title>
          {siteTitle}-{!data ? "loading" : data}
        </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <button
          onClick={async () => {
            const result = await fetch("/api/hello");
            const data = await result.json();
            console.log(data);
          }}
        >
          调用api/hello
        </button>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
