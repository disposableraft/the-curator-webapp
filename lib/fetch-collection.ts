import fetch from "isomorphic-unfetch";

export interface Collection {
  artists: string[];
  name: string;
}

const fetchCollection = async (value: string | null): Promise<Collection> => {
  const response = await fetch("http://localhost:3000/api/post", {
    method: "post",
    body: JSON.stringify({ name: value }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return await response.json();
  }
};

export { fetchCollection };
