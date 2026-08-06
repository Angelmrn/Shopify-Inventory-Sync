const SHOPIFY_STORE = process.env.SHOPIFY_STORE!;
const SOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API_VERSION = "2026-07";

interface ShopifyProductNode {
  id: string;
  title: string;
  vendor: string;
  status: string;
  variants: {
    edges: {
      node: {
        price: string;
        sku: string;
        inventoryQuantity: number;
      };
    }[];
  };
}

interface ShopifiGaphQLResponse {
  data: {
    products: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      edges: {
        node: ShopifyProductNode;
      }[];
    };
  };
}
export async function fetchAllShopifyProducts(): Promise<ShopifyProductNode[]> {
  const products: ShopifyProductNode[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  const query = `
    query getProducts($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            vendor
            status
            variants(first: 1) {
              edges {
                node {
                  price
                  sku
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
  `;

  while (hasNextPage) {
    const response: Response = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { cursor },
        }),
      },
    );

    const data: ShopifiGaphQLResponse = await response.json();
    const productsData = data.data.products;
    products.push(...productsData.edges.map((edge: any) => edge.node));
    hasNextPage = productsData.pageInfo.hasNextPage;
    cursor = productsData.pageInfo.endCursor;
  }

  return products;
}
