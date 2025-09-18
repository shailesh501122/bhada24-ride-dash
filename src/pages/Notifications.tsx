import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, Send, Users, Car, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  recipient: 'all' | 'drivers' | 'customers';
  status: 'sent' | 'draft' | 'scheduled';
  sentAt: string;
  recipients_count: number;
}

const notifications: Notification[] = [
  {
    id: 'N001',
    title: 'New Year Special Offers',
    message: 'Get 20% off on all rides this New Year! Use code NEWYEAR2024',
    recipient: 'customers',
    status: 'sent',
    sentAt: '2024-01-01T10:00:00Z',
    recipients_count: 245
  },
  {
    id: 'N002',
    title: 'Driver Incentive Program',
    message: 'Complete 50 rides this month and earn extra ₹5000 bonus!',
    recipient: 'drivers',
    status: 'sent',
    sentAt: '2024-01-05T14:30:00Z',
    recipients_count: 89
  },
  {
    id: 'N003',
    title: 'App Maintenance Notice',
    message: 'App will be under maintenance on Sunday 2-4 AM. Please plan accordingly.',
    recipient: 'all',
    status: 'scheduled',
    sentAt: '2024-01-20T02:00:00Z',
    recipients_count: 334
  }
];

const statusColors = {
  sent: "bg-success/10 text-success border-success/20",
  draft: "bg-muted/10 text-muted-foreground border-muted/20",
  scheduled: "bg-warning/10 text-warning border-warning/20"
};

const recipientColors = {
  all: "bg-primary/10 text-primary border-primary/20",
  drivers: "bg-secondary/10 text-secondary border-secondary/20",
  customers: "bg-danger/10 text-danger border-danger/20"
};

export default function Notifications() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState<string>("all");
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!title || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${recipient === 'all' ? 'all users' : recipient}`,
    });

    setTitle("");
    setMessage("");
    setRecipient("all");
    setIsCreateOpen(false);
  };

  const totalSent = notifications.filter(n => n.status === 'sent').length;
  const totalRecipients = notifications.reduce((acc, n) => acc + n.recipients_count, 0);
  const scheduledCount = notifications.filter(n => n.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Send notifications to drivers, customers, or all users
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="recipient">Send To</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="drivers">Drivers Only</SelectItem>
                    <SelectItem value="customers">Customers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSendNotification}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">{totalSent}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bell className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold text-success">{totalRecipients}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-warning">{scheduledCount}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-lift cursor-pointer border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Notify All Users</h3>
                <p className="text-sm text-muted-foreground">Send to drivers & customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer border-secondary/20 bg-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Car className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Notify Drivers</h3>
                <p className="text-sm text-muted-foreground">Send to drivers only</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer border-danger/20 bg-danger/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-danger/10 rounded-lg">
                <Users className="w-6 h-6 text-danger" />
              </div>
              <div>
                <h3 className="font-semibold">Notify Customers</h3>
                <p className="text-sm text-muted-foreground">Send to customers only</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium">
                      {notification.title}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {notification.message}
                    </TableCell>
                    <TableCell>
                      <Badge className={recipientColors[notification.recipient]}>
                        {notification.recipient}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[notification.status]}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {notification.recipients_count}
                    </TableCell>
                    <TableCell>
                      {notification.status === 'scheduled' ? (
                        <span className="text-warning">
                          Scheduled: {new Date(notification.sentAt).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        new Date(notification.sentAt).toLocaleString('en-IN')
                      )}
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