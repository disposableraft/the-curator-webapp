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
