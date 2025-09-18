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
import { Search, Eye, UserCheck, X, Calendar, MapPin } from "lucide-react";
import { bookings, type Booking } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  assigned: "bg-primary/10 text-primary border-primary/20",
  ongoing: "bg-success/10 text-success border-success/20",
  completed: "bg-muted/10 text-muted-foreground border-muted/20",
  cancelled: "bg-danger/10 text-danger border-danger/20"
};

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAssignDriver = (bookingId: string) => {
    toast({
      title: "Driver Assigned",
      description: `Driver has been assigned to booking ${bookingId}`,
    });
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Booking ${bookingId} status changed to ${newStatus}`,
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking ${bookingId} has been cancelled`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all cab bookings and ride requests
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by booking ID, customer, or location..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono font-medium">
                      {booking.id}
                    </TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-success rounded-full mr-2" />
                          {booking.pickupLocation}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-danger rounded-full mr-2" />
                          {booking.dropLocation}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.driverName || (
                        <span className="text-muted-foreground">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{booking.fare.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(booking.bookingTime).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Booking ID</p>
                                    <p className="font-mono">{selectedBooking.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge className={statusColors[selectedBooking.status]}>
                                      {selectedBooking.status}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Customer</p>
                                  <p className="font-medium">{selectedBooking.customerName}</p>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Route</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 text-success mr-2" />
                                      <span className="text-sm">{selectedBooking.pickupLocation}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 text-danger mr-2" />
                                      <span className="text-sm">{selectedBooking.dropLocation}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Fare</p>
                                    <p className="text-lg font-bold">₹{selectedBooking.fare.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Distance</p>
                                    <p>{selectedBooking.distance || 'N/A'} km</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Driver</p>
                                  <p>{selectedBooking.driverName || 'Not assigned'}</p>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Booking Time</p>
                                  <p>{new Date(selectedBooking.bookingTime).toLocaleString('en-IN')}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {booking.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAssignDriver(booking.id)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}

                        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-danger hover:text-danger/80"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
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