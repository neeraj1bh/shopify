export const searchQuery = (searchString, first, start) => {
  const query = `${first ? `first: ${first}` : ""} ${
    start ? `after: "${start}"` : ""
  } ${searchString ? `query: "${searchString}"` : ""}`.trim();

  return `
{
    products(${query}) {
        edges {
            node {
                title
                variants(first: 100) {
                    edges {
                        node {
                            title
                            price
                        }
                    }
                }
            }
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;
};
