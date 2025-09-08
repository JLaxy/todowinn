import api from "@/lib/axios";

export default async function Home() {
  const res = await api.get("/")
  const data = res.data;
  return (
    <div>
     {data}
    </div>
  );
}
