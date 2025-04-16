import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  
  
  Eye,
 
  BarChart3,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users,
  ShoppingCart,
  Store,
} from 'lucide-react'

const DashboardPage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your stores.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/site/dashboard/stores/new">
            <Button>
              <Store className="mr-2 h-4 w-4" />
              Create New Store
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats overview cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { 
            title: "Total Revenue", 
            value: "$12,543", 
            change: "+12.5%", 
            trend: "up",
            icon: <DollarSign className="h-5 w-5 text-muted-foreground" /> 
          },
          { 
            title: "Active Stores", 
            value: "3", 
            change: "+1", 
            trend: "up",
            icon: <Store className="h-5 w-5 text-muted-foreground" /> 
          },
          { 
            title: "Total Customers", 
            value: "2,345", 
            change: "+5.2%", 
            trend: "up",
            icon: <Users className="h-5 w-5 text-muted-foreground" /> 
          },
          { 
            title: "Orders This Month", 
            value: "342", 
            change: "-2.1%", 
            trend: "down",
            icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" /> 
          },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-md bg-muted">{stat.icon}</span>
                {stat.trend === "up" ? (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main analytics card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Comparison of revenue in the last 30 days</CardDescription>
            </div>
            <Tabs defaultValue="30days">
              <TabsList>
                <TabsTrigger value="7days">7d</TabsTrigger>
                <TabsTrigger value="30days">30d</TabsTrigger>
                <TabsTrigger value="90days">90d</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-8 w-8 text-muted" />
              <span className="ml-2 text-sm text-muted-foreground">Chart visualization here</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "New Order",
                  description: "Order #25432 - $126.30",
                  timestamp: "10 minutes ago",
                  store: "Fashion Boutique"
                },
                {
                  title: "Product View",
                  description: "Someone viewed 'Handmade Vase'",
                  timestamp: "1 hour ago",
                  store: "Home Decor Store"
                },
                {
                  title: "New Customer",
                  description: "Alex Johnson signed up",
                  timestamp: "3 hours ago",
                  store: "Fashion Boutique"
                },
                {
                  title: "Store Update",
                  description: "Theme customization saved",
                  timestamp: "5 hours ago",
                  store: "Craft Supplies Shop"
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-primary/10 p-1.5">
                    <Eye className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      <span className="mx-1 text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{activity.store}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage