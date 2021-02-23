// This app shows what Next.js bundles for the client-side with its new SSG
// support. This editor supports TypeScript syntax.
import Cookies from 'cookies';
import Mysql from 'mysql';
import Link from 'next/link';
import SQL from 'sql-template-strings';
import Layout from '../components/Layout';

const pool = Mysql.createPool(process.env.DATABASE_URL);

export default function ({ projects }) {
  return (
    <Layout>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href="/projects/[id]" as={`/projects/${project.id}`}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const userId = new Cookies(req, res).get('user_id');
  const projects = await new Promise((resolve, reject) =>
    pool.query(
      SQL`SELECT id, name FROM projects WHERE user_id = ${userId};`,
      (err, results) => (err ? reject(err) : resolve(results))
    )
  );
  return { props: { projects } };
}
