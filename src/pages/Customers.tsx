import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Users, Star, Phone, Mail, Calendar, Shield } from "lucide-react";
import { customers, type Customer } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  blocked: "bg-danger/10 text-danger border-danger/20"
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (customerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    toast({
      title: "Customer Status Updated",
      description: `Customer status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customers Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all registered customers and their profiles
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold text-success">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Users className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">
                  {customers.reduce((acc, c) => acc + c.totalRides, 0)}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Star className="w-6 h-6 text-secondary" />
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
                placeholder="Search by name, phone, or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Rides</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.totalRides}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{customer.totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{customer.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[customer.status]}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(customer.joinDate).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="w-16 h-16">
                                    <AvatarImage src={selectedCustomer.avatar} />
                                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                                    <p className="text-sm text-muted-foreground">ID: {selectedCustomer.id}</p>
                                    <Badge className={statusColors[selectedCustomer.status]}>
                                      {selectedCustomer.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p>{selectedCustomer.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm">{selectedCustomer.email}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                                    <p className="text-lg font-bold">{selectedCustomer.totalRides}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                                    <p className="text-lg font-bold">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-medium">{selectedCustomer.rating}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Avg Trip Value</p>
                                    <p className="font-semibold">
                                      ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalRides)}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(selectedCustomer.joinDate).toLocaleDateString('en-IN')}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(customer.id, customer.status)}
                          className={customer.status === 'active' ? 'text-danger hover:text-danger/80' : 'text-success hover:text-success/80'}
                        >
                          <Shield className="w-4 h-4" />
                          {customer.status === 'active' ? 'Block' : 'Unblock'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}