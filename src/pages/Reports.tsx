import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Calendar, TrendingUp, Users, Car, IndianRupee } from "lucide-react";
import { bookingTrendData, rideStatusData, dashboardStats } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const revenueData = [
  { month: 'Jan', revenue: 45000, bookings: 120 },
  { month: 'Feb', revenue: 52000, bookings: 145 },
  { month: 'Mar', revenue: 48000, bookings: 132 },
  { month: 'Apr', revenue: 61000, bookings: 168 },
  { month: 'May', revenue: 73000, bookings: 195 },
  { month: 'Jun', revenue: 68000, bookings: 180 }
];

const driverPerformanceData = [
  { name: 'Amit Singh', rides: 45, revenue: 25000, rating: 4.8 },
  { name: 'Rohit Sharma', rides: 38, revenue: 21000, rating: 4.7 },
  { name: 'Kiran Patel', rides: 42, revenue: 23500, rating: 4.6 },
  { name: 'Vijay Kumar', rides: 35, revenue: 19000, rating: 4.5 },
  { name: 'Raj Mehta', rides: 40, revenue: 22000, rating: 4.4 }
];

export default function Reports() {
  const { toast } = useToast();

  const handleExport = (reportType: string) => {
    toast({
      title: "Export Started",
      description: `${reportType} report is being generated and will be downloaded shortly.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics and downloadable reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          onClick={() => handleExport('Bookings')}
          variant="outline"
          className="justify-start"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Bookings
        </Button>
        <Button
          onClick={() => handleExport('Drivers')}
          variant="outline"  
          className="justify-start"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Drivers
        </Button>
        <Button
          onClick={() => handleExport('Revenue')}
          variant="outline"
          className="justify-start"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Revenue
        </Button>
        <Button
          onClick={() => handleExport('Full Report')}
          className="justify-start bg-gradient-primary hover:opacity-90"
        >
          <Download className="w-4 h-4 mr-2" />
          Full Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Bookings</p>
                <p className="text-2xl font-bold">{dashboardStats.totalBookings}</p>
                <p className="text-xs text-white/80 mt-1">+12% vs last month</p>
              </div>
              <Calendar className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(dashboardStats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-white/80 mt-1">+18% vs last month</p>
              </div>
              <IndianRupee className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground text-sm font-medium">Active Drivers</p>
                <p className="text-2xl font-bold text-success">{dashboardStats.activeDrivers}</p>
                <p className="text-xs text-muted-foreground mt-1">of {dashboardStats.totalDrivers} total</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground text-sm font-medium">Avg Trip Value</p>
                <p className="text-2xl font-bold text-warning">₹{Math.round(dashboardStats.totalRevenue / dashboardStats.totalBookings)}</p>
                <p className="text-xs text-muted-foreground mt-1">per booking</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value?.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Distribution */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="w-5 h-5 text-primary" />
              <span>Booking Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {rideStatusData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue vs Bookings */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="w-5 h-5 text-primary" />
            <span>Monthly Revenue vs Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `₹${value?.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Bookings'
                ]}
              />
              <Bar 
                yAxisId="left"
                dataKey="revenue" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="bookings" 
                fill="hsl(var(--secondary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Driver Performance */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Top Driver Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {driverPerformanceData.map((driver, index) => (
              <div key={driver.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <p className="text-sm text-muted-foreground">Rating: {driver.rating}/5</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{driver.rides} rides</p>
                  <p className="text-sm text-success">₹{driver.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}