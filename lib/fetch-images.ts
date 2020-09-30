import fetch from "isomorphic-unfetch";

export interface SearchItem {
  title: string;
  link: string;
  image: {
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface SearchResult {
  items: SearchItem[];
  error?: any;
}

const fetchImages = async (term: string): Promise<SearchResult> => {
  const url = new URL("http://localhost:3000/api/search");
  url.searchParams.append("name", term);
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error("Error retrieving image");
  } else {
    return await response.json();
  }
};

export { fetchImages };
