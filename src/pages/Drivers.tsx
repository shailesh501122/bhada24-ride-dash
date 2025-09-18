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
import { Search, Eye, Plus, Star, Phone, Mail, Car, Calendar } from "lucide-react";
import { drivers, type Driver } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted/10 text-muted-foreground border-muted/20",
  busy: "bg-warning/10 text-warning border-warning/20"
};

const documentStatusColors = {
  verified: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-danger/10 text-danger border-danger/20"
};

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const { toast } = useToast();

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (driverId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: "Driver Status Updated",
      description: `Driver status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Drivers Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all registered drivers and their information
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Driver
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold">{drivers.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Car className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold text-success">
                  {drivers.filter(d => d.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Car className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Busy Drivers</p>
                <p className="text-2xl font-bold text-warning">
                  {drivers.filter(d => d.status === 'busy').length}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Car className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1)}
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
                placeholder="Search by name, phone, vehicle number, or email..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Drivers ({filteredDrivers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Rides</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={driver.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {driver.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {driver.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{driver.vehicleNumber}</p>
                        <p className="text-sm text-muted-foreground">{driver.vehicleType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[driver.status]}>
                        {driver.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{driver.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {driver.totalRides}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{driver.earnings.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={documentStatusColors[driver.documentsStatus]}>
                        {driver.documentsStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedDriver(driver)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Driver Details</DialogTitle>
                            </DialogHeader>
                            {selectedDriver && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="w-16 h-16">
                                    <AvatarImage src={selectedDriver.avatar} />
                                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                                      {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold text-lg">{selectedDriver.name}</h3>
                                    <p className="text-sm text-muted-foreground">ID: {selectedDriver.id}</p>
                                    <Badge className={statusColors[selectedDriver.status]}>
                                      {selectedDriver.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p>{selectedDriver.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm">{selectedDriver.email}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vehicle Number</p>
                                    <p className="font-mono">{selectedDriver.vehicleNumber}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vehicle Type</p>
                                    <p>{selectedDriver.vehicleType}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-medium">{selectedDriver.rating}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                                    <p className="font-semibold">{selectedDriver.totalRides}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                                    <p className="font-semibold">₹{selectedDriver.earnings.toLocaleString()}</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Documents Status</p>
                                  <Badge className={documentStatusColors[selectedDriver.documentsStatus]}>
                                    {selectedDriver.documentsStatus}
                                  </Badge>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(selectedDriver.joinDate).toLocaleDateString('en-IN')}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(driver.id, driver.status)}
                          className={driver.status === 'active' ? 'text-warning' : 'text-success'}
                        >
                          {driver.status === 'active' ? 'Deactivate' : 'Activate'}
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