import { AffiliateLink, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<AffiliateLink[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      originalUrl: "https://example.com/product1",
      customUrl: "https://short.ly/product1",
      summary: "A great product for your needs.",
      productName: "Product 1",
    },
    {
      id: "489e1d42",
      originalUrl: "https://example.com/product2",
      customUrl: "https://short.ly/product2",
      summary: "Another fantastic product.",
      productName: "Product 2",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
