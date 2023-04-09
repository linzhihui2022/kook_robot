import { fetchEvents } from "server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const data = await fetchEvents(
    searchParams.get("after"),
    searchParams.get("prefix")
  );

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
