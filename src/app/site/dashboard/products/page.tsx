import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Filter,
  
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample product data
const products = [
  {
    id: "P001",
    name: "Lightweight Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    inventory: 34,
    status: "Active",
    store: "Fashion Boutique",
  },
  {
    id: "P002",
    name: "Ceramic Coffee Mug",
    category: "Homeware",
    price: 15.50,
    inventory: 56,
    status: "Active",
    store: "Home Decor Store",
  },
  {
    id: "P003",
    name: "Handmade Soap Set",
    category: "Beauty",
    price: 18.75,
    inventory: 23,
    status: "Active",
    store: "Craft Supplies Shop",
  },
  {
    id: "P004",
    name: "Leather Wallet",
    category: "Accessories",
    price: 45.00,
    inventory: 12,
    status: "Low Stock",
    store: "Fashion Boutique",
  },
  {
    id: "P005",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 89.99,
    inventory: 7,
    status: "Low Stock",
    store: "Digital Gadgets",
  },
  {
    id: "P006",
    name: "Organic Bath Bombs",
    category: "Beauty",
    price: 12.99,
    inventory: 0,
    status: "Out of Stock",
    store: "Craft Supplies Shop",
  },
  {
    id: "P007",
    name: "Stainless Steel Water Bottle",
    category: "Homeware",
    price: 29.99,
    inventory: 42,
    status: "Active",
    store: "Outdoor Adventures",
  },
];

const ProductsPage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory across all stores.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/site/dashboard/products/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            View and manage all your products in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all-stores">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Stores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-stores">All Stores</SelectItem>
                  <SelectItem value="fashion-boutique">Fashion Boutique</SelectItem>
                  <SelectItem value="home-decor">Home Decor Store</SelectItem>
                  <SelectItem value="craft-supplies">Craft Supplies Shop</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Inventory</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{product.inventory}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>{product.store}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} of {products.length} products
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductsPage;
