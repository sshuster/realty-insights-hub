
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Building, 
  BarChart3, 
  Calendar, 
  PlayCircle, 
  Clock, 
  TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Mock data for charts
const courseProgress = [
  { id: 1, title: 'Real Estate Fundamentals', progress: 75, totalLessons: 12, completedLessons: 9 },
  { id: 2, title: 'Commercial Property Valuation', progress: 30, totalLessons: 10, completedLessons: 3 },
  { id: 3, title: 'Residential Market Analysis', progress: 15, totalLessons: 8, completedLessons: 1 },
];

const upcomingWebinars = [
  { id: 1, title: 'Understanding Market Trends', date: '2025-04-15', time: '10:00 AM' },
  { id: 2, title: 'Property Investment Strategies', date: '2025-04-22', time: '2:00 PM' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}!</h1>
          <Button 
            className="bg-realty-600 hover:bg-realty-700"
            onClick={() => navigate('/valuation')}
          >
            <Building className="mr-2 h-4 w-4" />
            New Valuation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 completed, 2 in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valuations</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5</div>
              <p className="text-xs text-muted-foreground">
                +5.5 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Track your progress across all enrolled courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/my-courses')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  View All Courses
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Webinars</CardTitle>
              <CardDescription>
                Live training sessions with industry experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingWebinars.map((webinar) => (
                  <div key={webinar.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <Calendar className="h-5 w-5 text-realty-600" />
                    <div className="space-y-1">
                      <div className="font-medium">{webinar.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(webinar.date).toLocaleDateString()} at {webinar.time}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => {}}>
                      <PlayCircle className="h-4 w-4 text-realty-600" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/webinars')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Webinars
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Property Valuation Tool</CardTitle>
              <CardDescription>
                Quickly estimate residential and commercial property values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">Get accurate property valuations</h3>
                  <p className="text-sm text-muted-foreground">
                    Our valuation tool uses advanced algorithms to provide you with accurate
                    property valuations based on market data and comparable sales.
                  </p>
                </div>
                <Button 
                  className="bg-realty-600 hover:bg-realty-700"
                  onClick={() => navigate('/valuation')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Start Valuation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
