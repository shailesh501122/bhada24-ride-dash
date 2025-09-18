import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  LineChart,
  Line,
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
  Calendar,
  Car,
  CheckCircle,
  IndianRupee,
  TrendingUp,
  Users
} from "lucide-react";
import { dashboardStats, bookingTrendData, rideStatusData } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with Bhada24 today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value={dashboardStats.totalBookings.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={Calendar}
        />
        
        <StatsCard
          title="Active Rides"
          value={dashboardStats.activeRides}
          change="Currently ongoing"
          changeType="neutral"
          icon={Car}
          gradient
        />
        
        <StatsCard
          title="Completed Rides"
          value={dashboardStats.completedRides.toLocaleString()}
          change="+8% from yesterday"
          changeType="positive"
          icon={CheckCircle}
        />
        
        <StatsCard
          title="Total Revenue"
          value={`₹${(dashboardStats.totalRevenue / 1000).toFixed(0)}K`}
          change="+15% from last month"
          changeType="positive"
          icon={IndianRupee}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Booking Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
                  formatter={(value) => [`${value} bookings`, 'Bookings']}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ride Status Distribution */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Ride Status Distribution</span>
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
            
            {/* Legend */}
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

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Today's Bookings</p>
                <p className="text-2xl font-bold mt-1">{dashboardStats.todayBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Today's Revenue</p>
                <p className="text-2xl font-bold mt-1">₹{dashboardStats.todayRevenue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-success mt-1">{dashboardStats.activeDrivers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  of {dashboardStats.totalDrivers} total
                </p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground text-sm font-medium">Avg. Trip Value</p>
                <p className="text-2xl font-bold text-warning mt-1">₹{Math.round(dashboardStats.totalRevenue / dashboardStats.totalBookings)}</p>
                <p className="text-xs text-muted-foreground mt-1">per booking</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}