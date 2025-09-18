import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Settings as SettingsIcon, 
  IndianRupee, 
  Percent, 
  Clock, 
  User, 
  Building, 
  Camera,
  Save,
  Trash2,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FareSetting {
  id: string;
  vehicleType: string;
  baseFare: number;
  perKmRate: number;
  waitingCharges: number;
  minimumFare: number;
}

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  used: number;
  active: boolean;
}

const fareSettings: FareSetting[] = [
  {
    id: 'F001',
    vehicleType: 'Sedan',
    baseFare: 50,
    perKmRate: 12,
    waitingCharges: 2,
    minimumFare: 80
  },
  {
    id: 'F002',
    vehicleType: 'SUV',
    baseFare: 80,
    perKmRate: 18,
    waitingCharges: 3,
    minimumFare: 120
  },
  {
    id: 'F003',
    vehicleType: 'Hatchback',
    baseFare: 40,
    perKmRate: 10,
    waitingCharges: 1.5,
    minimumFare: 60
  }
];

const promoCodes: PromoCode[] = [
  {
    id: 'P001',
    code: 'NEWYEAR2024',
    discount: 20,
    type: 'percentage',
    validFrom: '2024-01-01',
    validUntil: '2024-01-31',
    usageLimit: 1000,
    used: 245,
    active: true
  },
  {
    id: 'P002',
    code: 'FIRSTRIDE',
    discount: 100,
    type: 'fixed',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 500,
    used: 89,
    active: true
  }
];

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your Bhada24 admin panel settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="fares">Fare Settings</TabsTrigger>
          <TabsTrigger value="promos">Promo Codes</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Company Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/bhada24-logo.png" />
                    <AvatarFallback className="bg-gradient-primary text-white text-xl">B24</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Logo
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Bhada24" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="admin@bhada24.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <Label htmlFor="commission">Commission Rate (%)</Label>
                    <Input id="commission" defaultValue="10" type="number" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Business District, Rajkot, Gujarat 360001" />
                </div>
                
                <Button onClick={() => handleSave('Company Profile')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Admin Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Admin Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/admin-avatar.png" />
                    <AvatarFallback className="bg-gradient-primary text-white text-xl">A</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input id="admin-name" defaultValue="Admin User" />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Email Address</Label>
                    <Input id="admin-email" defaultValue="admin@bhada24.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="admin-phone">Phone Number</Label>
                    <Input id="admin-phone" defaultValue="+91 87654 32109" />
                  </div>
                  <div>
                    <Label htmlFor="admin-role">Role</Label>
                    <Input id="admin-role" defaultValue="Super Admin" disabled />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                
                <Button onClick={() => handleSave('Admin Profile')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fare Settings */}
        <TabsContent value="fares">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IndianRupee className="w-5 h-5" />
                <span>Fare Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Base Fare (₹)</TableHead>
                      <TableHead>Per KM Rate (₹)</TableHead>
                      <TableHead>Waiting Charges (₹/min)</TableHead>
                      <TableHead>Minimum Fare (₹)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fareSettings.map((fare) => (
                      <TableRow key={fare.id}>
                        <TableCell className="font-medium">{fare.vehicleType}</TableCell>
                        <TableCell>
                          <Input 
                            defaultValue={fare.baseFare} 
                            type="number" 
                            className="w-20" 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            defaultValue={fare.perKmRate} 
                            type="number" 
                            className="w-20" 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            defaultValue={fare.waitingCharges} 
                            type="number" 
                            step="0.1" 
                            className="w-20" 
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            defaultValue={fare.minimumFare} 
                            type="number" 
                            className="w-20" 
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handleSave('Fare Settings')}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promo Codes */}
        <TabsContent value="promos">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Promo Code Management</h3>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Promo
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Valid Period</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promoCodes.map((promo) => (
                        <TableRow key={promo.id}>
                          <TableCell className="font-mono font-medium">
                            {promo.code}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {promo.type === 'percentage' ? `${promo.discount}%` : `₹${promo.discount}`}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              promo.type === 'percentage' 
                                ? 'bg-success/10 text-success' 
                                : 'bg-primary/10 text-primary'
                            }`}>
                              {promo.type === 'percentage' ? <Percent className="w-3 h-3 mr-1" /> : <IndianRupee className="w-3 h-3 mr-1" />}
                              {promo.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(promo.validFrom).toLocaleDateString('en-IN')}</div>
                              <div className="text-muted-foreground">to {new Date(promo.validUntil).toLocaleDateString('en-IN')}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{promo.used} / {promo.usageLimit}</div>
                              <div className="text-muted-foreground">
                                {Math.round((promo.used / promo.usageLimit) * 100)}% used
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch checked={promo.active} />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-danger">
                                <Trash2 className="w-4 h-4" />
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
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Driver Assignment</h4>
                  <p className="text-sm text-muted-foreground">Automatically assign drivers to bookings</p>
                </div>
                <Switch checked={autoAssignment} onCheckedChange={setAutoAssignment} />
              </div>
              
              <Button onClick={() => handleSave('Notification Settings')} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5" />
                  <span>System Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Put the system under maintenance</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
                
                <div>
                  <Label htmlFor="max-drivers">Maximum Drivers per Area</Label>
                  <Input id="max-drivers" defaultValue="50" type="number" />
                </div>
                
                <div>
                  <Label htmlFor="booking-radius">Booking Search Radius (KM)</Label>
                  <Input id="booking-radius" defaultValue="10" type="number" />
                </div>
                
                <div>
                  <Label htmlFor="cancellation-time">Cancellation Window (Minutes)</Label>
                  <Input id="cancellation-time" defaultValue="5" type="number" />
                </div>
                
                <Button onClick={() => handleSave('System Configuration')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update System Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="open-time">Opening Time</Label>
                    <Input id="open-time" defaultValue="06:00" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="close-time">Closing Time</Label>
                    <Input id="close-time" defaultValue="23:00" type="time" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Asia/Kolkata" />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="INR" />
                </div>
                
                <div>
                  <Label htmlFor="language">Default Language</Label>
                  <Input id="language" defaultValue="English" />
                </div>
                
                <Button onClick={() => handleSave('Business Hours')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Business Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}