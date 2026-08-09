import { Product } from "@/types/index";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Vendor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.title}</TableCell>
            <TableCell className="text-muted-foreground">
              {p.sku ?? "-"}
            </TableCell>
            <TableCell>${p.price.toFixed(2)}</TableCell>
            <TableCell>
              <Badge
                variant={p.inventoryQty === 0 ? "destructive" : "secondary"}
              >
                {p.inventoryQty}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {p.vendor ?? "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
