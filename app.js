import axios from "axios";
import dotenv from "dotenv";
import { searchQuery } from "./searchQuery.js";

dotenv.config();

const apiEndpoint = process.env.SHOPIFY_API_ENDPOINT;
const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;

const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");

if (nameIndex === -1 || nameIndex === args.length - 1) {
  console.error("Please provide a product name");
  process.exit(1);
}

const productName = args.slice(nameIndex + 1).join(" ");

async function fetchProducts(cursor = null) {
  const paginatedQuery = searchQuery(productName, 250, cursor);

  try {
    const response = await axios({
      url: apiEndpoint,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": adminToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ query: paginatedQuery }),
    });

    if (response.status !== 200 || response.data.errors) {
      throw new Error(
        `Error fetching products: ${
          response.data.errors
            ? response.data.errors[0].message
            : "Unknown error"
        }`
      );
    }

    return response.data.data.products;
  } catch (error) {
    console.error(`Failed to fetch products: ${error.message}`);
    process.exit(1);
  }
}

async function displayProducts(cursor = null) {
  const products = await fetchProducts(cursor);

  if (products.edges.length === 0) {
    console.log("No products found");
    return;
  }

  const variantsList = products.edges
    .flatMap((product) =>
      product.node.variants.edges.map((variant) => ({
        productName: product.node.title,
        variantTitle: variant.node.title,
        price: parseFloat(variant.node.price),
      }))
    )
    .sort((a, b) => a.price - b.price);

  variantsList.forEach((variant) => {
    console.log(
      `${variant.productName} - ${
        variant.variantTitle
      } - price $${variant.price.toFixed(0)}`
    );
  });

  if (products.pageInfo?.hasNextPage) {
    await displayProducts(products.pageInfo.endCursor);
  }
}

displayProducts().catch((error) => {
  console.error(`Failed to display products: ${error.message}`);
});
