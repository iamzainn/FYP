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
  PlusCircle,
  ExternalLink,
  Settings,
  BarChart3,
  ShoppingBag,
  Edit,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample store data
const stores = [
  {
    id: "S001",
    name: "Fashion Boutique",
    domain: "fashion-boutique.mystore.com",
    status: "Online",
    products: 126,
    orders: 34,
    revenue: 4350.75,
    visitors: 2450,
    lastUpdated: "2 hours ago",
    thumbnail: "/images/stores/fashion-boutique.jpg"
  },
  {
    id: "S002",
    name: "Home Decor Shop",
    domain: "home-decor.mystore.com",
    status: "Online",
    products: 85,
    orders: 27,
    revenue: 3210.50,
    visitors: 1890,
    lastUpdated: "1 day ago",
    thumbnail: "/images/stores/home-decor.jpg"
  },
  {
    id: "S003",
    name: "Craft Supplies",
    domain: "craft-supplies.mystore.com",
    status: "Maintenance",
    products: 210,
    orders: 12,
    revenue: 1542.25,
    visitors: 950,
    lastUpdated: "3 days ago",
    thumbnail: "/images/stores/craft-supplies.jpg"
  }
];

const StoresPage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Stores</h1>
          <p className="text-muted-foreground">Manage and monitor all your online stores.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/site/dashboard/stores/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Store
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* New Store Card */}
        <Card className="border-dashed hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Create a new store</h3>
            <p className="text-muted-foreground mb-6">Launch a new online store with AI-powered design</p>
            <Link href="/site/dashboard/stores/new">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Store Cards */}
        {stores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <div className="h-40 bg-muted relative">
              {/* Replace with actual store images */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 z-10" />
              <div className="absolute top-3 right-3 z-20">
                <Badge variant={store.status === "Online" ? "default" : "secondary"}>
                  {store.status}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
              <CardDescription className="flex items-center">
                {store.domain}
                <ExternalLink className="h-3 w-3 ml-1" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-muted/40 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Products</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{store.products}</p>
                </div>
                <div className="bg-muted/40 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Orders</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{store.orders}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>Revenue: ${store.revenue.toFixed(2)}</div>
                <div>Visitors: {store.visitors}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last updated: {store.lastUpdated}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/site/dashboard/stores/${store.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
