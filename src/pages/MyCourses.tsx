import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle, 
  Play, 
  Search,
  Filter,
  ChevronRight,
  Star,
  Calendar
} from 'lucide-react';

// Mock course data
const courses = [
  {
    id: 1,
    title: 'Real Estate Valuation Fundamentals',
    description: 'Learn the basics of property valuation and assessment',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '6 hours',
    lastAccessed: '2025-04-08',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    rating: 4.8,
    reviews: 124,
    isFeatured: true
  },
  {
    id: 2,
    title: 'Commercial Property Analysis',
    description: 'Advanced techniques for valuing commercial real estate',
    instructor: 'Michael Chen, CRE',
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    category: 'Commercial',
    level: 'Advanced',
    duration: '8 hours',
    lastAccessed: '2025-04-07',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    rating: 4.9,
    reviews: 87,
    isFeatured: false
  },
  {
    id: 3,
    title: 'Real Estate Market Analysis',
    description: 'How to analyze market trends and make informed decisions',
    instructor: 'Jennifer Williams, MBA',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    category: 'Market Analysis',
    level: 'Intermediate',
    duration: '5 hours',
    lastAccessed: '2025-04-05',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    rating: 4.7,
    reviews: 156,
    isFeatured: true
  },
  {
    id: 4,
    title: 'Investment Property Valuation',
    description: 'Techniques for evaluating investment properties and ROI',
    instructor: 'Robert Thompson, CFA',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'Investment',
    level: 'Intermediate',
    duration: '7 hours',
    lastAccessed: null,
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    rating: 4.6,
    reviews: 92,
    isFeatured: false
  },
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  const handleContinue = () => {
    toast.success(`Continuing ${course.title}`);
    // In a real app, this would navigate to the course content
    const element = document.getElementById(`course-${course.id}-content`);
    if (element instanceof HTMLElement) {
      element.click();
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-white text-black">
          {course.level}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </div>
        <CardDescription>{course.instructor}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>{course.completedLessons} of {course.totalLessons} lessons</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.category}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {course.rating} ({course.reviews})
          </Badge>
        </div>
        
        <Button 
          onClick={handleContinue}
          className={`w-full ${course.progress === 100 ? 'bg-green-600 hover:bg-green-700' : 'bg-realty-600 hover:bg-realty-700'}`}
        >
          {course.progress === 0 ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Course
            </>
          ) : course.progress === 100 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Course
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Continue
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Filter courses based on search query and filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100;
    if (filter === 'completed') return matchesSearch && course.progress === 100;
    if (filter === 'not-started') return matchesSearch && course.progress === 0;
    
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
            <p className="text-muted-foreground">
              Continue learning and track your progress
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="my-courses">
          <TabsList>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="featured">Featured Courses</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-courses" className="space-y-6">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.isFeatured).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Your Certificates</CardTitle>
                <CardDescription>
                  Certificates earned for completed courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {courses.filter(course => course.progress === 100).length > 0 ? (
                  <div className="space-y-4">
                    {courses.filter(course => course.progress === 100).map(course => (
                      <div key={course.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <Award className="h-10 w-10 text-yellow-500" />
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Completed on {new Date(course.lastAccessed || '').toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Award className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">No certificates yet</h3>
                      <p className="text-muted-foreground">
                        Complete courses to earn certificates
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyCourses;
