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
import { Search, Eye, Plus, Car, Calendar, Settings, Shield } from "lucide-react";
import { vehicles, type Vehicle } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  maintenance: "bg-warning/10 text-warning border-warning/20",
  inactive: "bg-muted/10 text-muted-foreground border-muted/20"
};

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { toast } = useToast();

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (vehicleId: string, newStatus: string) => {
    toast({
      title: "Vehicle Status Updated",
      description: `Vehicle status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicles Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all registered vehicles and their information
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Vehicle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold">{vehicles.length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Vehicles</p>
                <p className="text-2xl font-bold text-success">
                  {vehicles.filter(v => v.status === 'active').length}
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
                <p className="text-sm font-medium text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold text-warning">
                  {vehicles.filter(v => v.status === 'maintenance').length}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Settings className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vehicle Types</p>
                <p className="text-2xl font-bold">
                  {new Set(vehicles.map(v => v.type)).size}
                </p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Shield className="w-6 h-6 text-secondary" />
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
                placeholder="Search by number, type, model, or driver..."
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
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Vehicles ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Type & Model</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Insurance Expiry</TableHead>
                  <TableHead>Permit Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Car className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono font-bold">{vehicle.number}</p>
                          <p className="text-sm text-muted-foreground">ID: {vehicle.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vehicle.type}</p>
                        <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vehicle.driverName}</p>
                        <p className="text-sm text-muted-foreground">ID: {vehicle.driverId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {vehicle.year}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[vehicle.status]}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(vehicle.insurance).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(vehicle.permit).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedVehicle(vehicle)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Vehicle Details</DialogTitle>
                            </DialogHeader>
                            {selectedVehicle && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <div className="p-4 bg-primary/10 rounded-xl">
                                    <Car className="w-8 h-8 text-primary" />
                                  </div>
                                  <div>
                                    <h3 className="font-mono text-lg font-bold">{selectedVehicle.number}</h3>
                                    <p className="text-sm text-muted-foreground">ID: {selectedVehicle.id}</p>
                                    <Badge className={statusColors[selectedVehicle.status]}>
                                      {selectedVehicle.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                                    <p className="font-medium">{selectedVehicle.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Model</p>
                                    <p className="font-medium">{selectedVehicle.model}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                                    <p className="font-medium">{selectedVehicle.year}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Driver</p>
                                    <p className="font-medium">{selectedVehicle.driverName}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Insurance Expiry</p>
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm">
                                        {new Date(selectedVehicle.insurance).toLocaleDateString('en-IN')}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Permit Expiry</p>
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm">
                                        {new Date(selectedVehicle.permit).toLocaleDateString('en-IN')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Select
                          value={vehicle.status}
                          onValueChange={(value) => handleStatusChange(vehicle.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
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