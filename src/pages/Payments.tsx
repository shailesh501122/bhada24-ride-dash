import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CreditCard, IndianRupee, TrendingUp, Download } from "lucide-react";
import { payments, type Payment } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  completed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-danger/10 text-danger border-danger/20"
};

const methodColors = {
  cash: "bg-muted/10 text-muted-foreground border-muted/20",
  card: "bg-primary/10 text-primary border-primary/20",
  upi: "bg-secondary/10 text-secondary border-secondary/20"
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const totalCommission = payments.reduce((acc, payment) => acc + payment.commission, 0);
  const totalDriverPayout = payments.reduce((acc, payment) => acc + payment.driverPayout, 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Payment report is being generated and will be downloaded shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments & Earnings</h1>
          <p className="text-muted-foreground mt-2">
            Track all payments, commissions, and driver payouts
          </p>
        </div>
        <Button onClick={handleExport} className="bg-gradient-primary hover:opacity-90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold text-success">₹{totalCommission.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Driver Payouts</p>
                <p className="text-2xl font-bold text-warning">₹{totalDriverPayout.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <IndianRupee className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Payments</p>
                <p className="text-2xl font-bold">{completedPayments}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by payment ID or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Payments ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Driver Payout</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono font-medium">
                      {payment.id}
                    </TableCell>
                    <TableCell className="font-mono">
                      {payment.bookingId}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium text-success">
                      ₹{payment.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{payment.driverPayout.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={methodColors[payment.method]}>
                        {payment.method.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[payment.status]}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                payments.reduce((acc, payment) => {
                  acc[payment.method] = (acc[payment.method] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([method, count]) => (
                <div key={method} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={methodColors[method as keyof typeof methodColors]}>
                      {method.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">
                    {count} payments ({Math.round((count / payments.length) * 100)}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gross Revenue</span>
                <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Platform Commission (10%)</span>
                <span className="font-semibold text-success">₹{totalCommission.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Driver Earnings (90%)</span>
                <span className="font-semibold">₹{totalDriverPayout.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Commission Rate</span>
                  <span className="font-bold text-primary">
                    {Math.round((totalCommission / totalAmount) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}