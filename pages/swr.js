import useSWR from "swr";

export default function Profile() {
  const { data, error } = useSWR("/api/hello", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.text}!</div>;
}
