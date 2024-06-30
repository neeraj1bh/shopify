# Shopify Product Variants Fetcher

This project is a Node.js script to fetch and display product variants from a Shopify store using the Shopify Admin GraphQL API. The script supports pagination and sorts the variants by price.

## Prerequisites

- Node.js installed on your machine
- Shopify Admin API credentials
- Environment variables set up in a `.env` file

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
SHOPIFY_API_ENDPOINT=your_shopify_api_endpoint
SHOPIFY_ADMIN_TOKEN=your_shopify_admin_token
```

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies

```sh
git clone https://github.com/neeraj1bh/shopify.git
cd shopify
yarn install
```

## Usage

Run the script with the product name as an argument. The script will fetch and display product variants sorted by price.

```sh
node app.js --name "product_name"
```

For example:

```sh
node app.js --name glove
```

## Files

- `app.js`: The main script that handles fetching and displaying products.
- `searchQuery.js`: A module that constructs the GraphQL query to fetch products and their variants.
