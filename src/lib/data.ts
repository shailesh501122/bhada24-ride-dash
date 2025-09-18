// Dummy data for Bhada24 Admin Panel

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  driverId?: string;
  driverName?: string;
  pickupLocation: string;
  dropLocation: string;
  fare: number;
  status: 'pending' | 'assigned' | 'ongoing' | 'completed' | 'cancelled';
  bookingTime: string;
  distance?: number;
  duration?: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleNumber: string;
  vehicleType: string;
  status: 'active' | 'inactive' | 'busy';
  rating: number;
  totalRides: number;
  earnings: number;
  documentsStatus: 'verified' | 'pending' | 'rejected';
  joinDate: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalRides: number;
  totalSpent: number;
  rating: number;
  status: 'active' | 'blocked';
  joinDate: string;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  number: string;
  type: string;
  model: string;
  year: number;
  driverId: string;
  driverName: string;
  status: 'active' | 'maintenance' | 'inactive';
  insurance: string;
  permit: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  commission: number;
  driverPayout: number;
  status: 'completed' | 'pending' | 'failed';
  method: 'cash' | 'card' | 'upi';
  date: string;
}

// Dummy Data
export const bookings: Booking[] = [
  {
    id: 'BK001',
    customerId: 'CU001',
    customerName: 'Raj Patel',
    driverId: 'DR001',
    driverName: 'Amit Singh',
    pickupLocation: 'Rajkot Railway Station',
    dropLocation: 'Morbi Bus Stand',
    fare: 850,
    status: 'completed',
    bookingTime: '2024-01-15T09:30:00Z',
    distance: 65,
    duration: 75
  },
  {
    id: 'BK002',
    customerId: 'CU002',
    customerName: 'Priya Shah',
    pickupLocation: 'Ahmedabad Airport',
    dropLocation: 'Surat City',
    fare: 1200,
    status: 'pending',
    bookingTime: '2024-01-15T14:20:00Z',
    distance: 280,
    duration: 300
  },
  {
    id: 'BK003',
    customerId: 'CU003',
    customerName: 'Kiran Modi',
    driverId: 'DR002',
    driverName: 'Rohit Sharma',
    pickupLocation: 'Vadodara Central',
    dropLocation: 'Bharuch GIDC',
    fare: 650,
    status: 'ongoing',
    bookingTime: '2024-01-15T16:45:00Z',
    distance: 48,
    duration: 60
  }
];

export const drivers: Driver[] = [
  {
    id: 'DR001',
    name: 'Amit Singh',
    phone: '+91 98765 43210',
    email: 'amit.singh@email.com',
    vehicleNumber: 'GJ-01-AB-1234',
    vehicleType: 'Sedan',
    status: 'active',
    rating: 4.7,
    totalRides: 245,
    earnings: 125000,
    documentsStatus: 'verified',
    joinDate: '2023-06-15T00:00:00Z'
  },
  {
    id: 'DR002',
    name: 'Rohit Sharma',
    phone: '+91 87654 32109',
    email: 'rohit.sharma@email.com',
    vehicleNumber: 'GJ-02-CD-5678',
    vehicleType: 'SUV',
    status: 'busy',
    rating: 4.8,
    totalRides: 189,
    earnings: 98000,
    documentsStatus: 'verified',
    joinDate: '2023-08-22T00:00:00Z'
  }
];

export const customers: Customer[] = [
  {
    id: 'CU001',
    name: 'Raj Patel',
    phone: '+91 99887 76543',
    email: 'raj.patel@email.com',
    totalRides: 23,
    totalSpent: 18500,
    rating: 4.5,
    status: 'active',
    joinDate: '2023-03-10T00:00:00Z'
  },
  {
    id: 'CU002',
    name: 'Priya Shah',
    phone: '+91 88776 65432',
    email: 'priya.shah@email.com',
    totalRides: 45,
    totalSpent: 32000,
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-20T00:00:00Z'
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'V001',
    number: 'GJ-01-AB-1234',
    type: 'Sedan',
    model: 'Maruti Dzire',
    year: 2021,
    driverId: 'DR001',
    driverName: 'Amit Singh',
    status: 'active',
    insurance: '2024-12-31',
    permit: '2024-10-15'
  },
  {
    id: 'V002',
    number: 'GJ-02-CD-5678',
    type: 'SUV',
    model: 'Mahindra Scorpio',
    year: 2020,
    driverId: 'DR002',
    driverName: 'Rohit Sharma',
    status: 'active',
    insurance: '2024-11-20',
    permit: '2024-09-30'
  }
];

export const payments: Payment[] = [
  {
    id: 'PAY001',
    bookingId: 'BK001',
    amount: 850,
    commission: 85,
    driverPayout: 765,
    status: 'completed',
    method: 'upi',
    date: '2024-01-15T10:45:00Z'
  },
  {
    id: 'PAY002',
    bookingId: 'BK003',
    amount: 650,
    commission: 65,
    driverPayout: 585,
    status: 'pending',
    method: 'cash',
    date: '2024-01-15T17:30:00Z'
  }
];

// Chart data
export const bookingTrendData = [
  { date: '2024-01-08', bookings: 45 },
  { date: '2024-01-09', bookings: 52 },
  { date: '2024-01-10', bookings: 38 },
  { date: '2024-01-11', bookings: 67 },
  { date: '2024-01-12', bookings: 73 },
  { date: '2024-01-13', bookings: 59 },
  { date: '2024-01-14', bookings: 81 },
  { date: '2024-01-15', bookings: 92 }
];

export const rideStatusData = [
  { name: 'Completed', value: 65, color: 'hsl(var(--success))' },
  { name: 'Ongoing', value: 15, color: 'hsl(var(--primary))' },
  { name: 'Pending', value: 12, color: 'hsl(var(--warning))' },
  { name: 'Cancelled', value: 8, color: 'hsl(var(--danger))' }
];

export const dashboardStats = {
  totalBookings: 1247,
  activeRides: 23,
  completedRides: 1156,
  totalRevenue: 485600,
  todayBookings: 92,
  todayRevenue: 45600,
  totalDrivers: 89,
  activeDrivers: 67
};