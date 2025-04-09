
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  BookOpen,
  UserX,
  UserPlus,
  Laptop,
  BarChart3,
  Calendar,
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock user data
const recentUsers = [
  { id: 1, username: 'johndoe', role: 'user', joined: '2025-04-01', lastActive: '2025-04-09' },
  { id: 2, username: 'janedoe', role: 'user', joined: '2025-04-03', lastActive: '2025-04-08' },
  { id: 3, username: 'muser', role: 'user', joined: '2025-04-05', lastActive: '2025-04-09' },
  { id: 4, username: 'mvc', role: 'admin', joined: '2025-03-15', lastActive: '2025-04-09' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button
            className="bg-realty-600 hover:bg-realty-700"
            onClick={() => navigate('/users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +8 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">
                +$2,100 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                +5 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>
                    Newly registered and recently active users
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <UserX className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>
                        <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                          user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/users')}>
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/courses')}
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-5 w-5 text-realty-600" />
                    <div className="space-y-1 text-left">
                      <div className="font-medium">Manage Courses</div>
                      <div className="text-sm text-muted-foreground">
                        Add, edit, or remove course content
                      </div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/users')}
                >
                  <div className="flex items-start gap-4">
                    <Users className="h-5 w-5 text-realty-600" />
                    <div className="space-y-1 text-left">
                      <div className="font-medium">User Management</div>
                      <div className="text-sm text-muted-foreground">
                        Add or remove users from the system
                      </div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/reports')}
                >
                  <div className="flex items-start gap-4">
                    <BarChart3 className="h-5 w-5 text-realty-600" />
                    <div className="space-y-1 text-left">
                      <div className="font-medium">Analytics & Reports</div>
                      <div className="text-sm text-muted-foreground">
                        View system usage and performance metrics
                      </div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/schedule')}
                >
                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-realty-600" />
                    <div className="space-y-1 text-left">
                      <div className="font-medium">Webinar Schedule</div>
                      <div className="text-sm text-muted-foreground">
                        Schedule and manage upcoming webinars
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
