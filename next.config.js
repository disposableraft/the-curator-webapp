module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    googleSearchUrl: process.env.GOOGLE_SEARCH_URL,
    googleSearchCx: process.env.GOOGLE_SEARCH_CX,
    googleSearchKey: process.env.GOOGLE_SEARCH_KEY,
  },
};
