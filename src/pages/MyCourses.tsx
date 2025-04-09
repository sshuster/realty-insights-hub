
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Search, 
  PlayCircle, 
  Clock, 
  Award,
  ChevronRight,
  Building,
  BarChart3,
  Users,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock course data
const enrolledCourses = [
  {
    id: 1,
    title: 'Real Estate Fundamentals',
    description: 'Learn the basics of real estate valuation and investment.',
    instructor: 'Sarah Johnson',
    category: 'Fundamentals',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    duration: '6 hours',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Commercial Property Valuation',
    description: 'Advanced techniques for valuing commercial real estate assets.',
    instructor: 'Michael Chen',
    category: 'Valuation',
    progress: 30,
    totalLessons: 10,
    completedLessons: 3,
    duration: '8 hours',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Residential Market Analysis',
    description: 'How to analyze residential real estate markets for investment opportunities.',
    instructor: 'Jessica Martinez',
    category: 'Analysis',
    progress: 15,
    totalLessons: 8,
    completedLessons: 1,
    duration: '5 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
];

// Mock available courses
const availableCourses = [
  {
    id: 4,
    title: 'Real Estate Investment Strategies',
    description: 'Learn different strategies for investing in various real estate markets.',
    instructor: 'Robert Williams',
    category: 'Investment',
    duration: '7 hours',
    level: 'Intermediate',
    price: 149,
    thumbnail: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Property Development Fundamentals',
    description: 'Understanding the basics of real estate development projects.',
    instructor: 'David Anderson',
    category: 'Development',
    duration: '10 hours',
    level: 'Advanced',
    price: 199,
    thumbnail: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Real Estate Financial Modeling',
    description: 'Creating accurate financial models for real estate investments.',
    instructor: 'Jennifer Lee',
    category: 'Finance',
    duration: '9 hours',
    level: 'Advanced',
    price: 179,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 7,
    title: 'Negotiation Skills for Real Estate',
    description: 'Mastering the art of negotiation in real estate transactions.',
    instructor: 'Thomas Black',
    category: 'Skills',
    duration: '4 hours',
    level: 'Intermediate',
    price: 99,
    thumbnail: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
];

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter enrolled courses based on search query
  const filteredEnrolledCourses = enrolledCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter available courses based on search query
  const filteredAvailableCourses = availableCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
            <p className="text-muted-foreground">
              Access your enrolled courses and discover new learning opportunities
            </p>
          </div>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="enrolled">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="enrolled" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>My Enrolled Courses</span>
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Available Courses</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled">
            {filteredEnrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredEnrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div 
                        className="h-48 md:h-auto md:w-1/3 lg:w-1/4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${course.thumbnail})` }}
                      />
                      <div className="flex flex-col flex-1 p-6">
                        <CardHeader className="p-0 pb-4">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                              <Badge className="mb-2 bg-realty-100 text-realty-800 hover:bg-realty-200">
                                {course.category}
                              </Badge>
                              <CardTitle className="text-xl">{course.title}</CardTitle>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                              <span className="mx-2">•</span>
                              <Award className="h-4 w-4" />
                              <span>{course.level}</span>
                            </div>
                          </div>
                          <CardDescription className="mt-2">
                            {course.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 pb-4">
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                Progress
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {course.completedLessons}/{course.totalLessons} lessons
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <div className="text-sm">
                            Instructor: <span className="font-medium">{course.instructor}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-4 border-t flex gap-4">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Course
                          </Button>
                          <Button 
                            className="flex-1 bg-realty-600 hover:bg-realty-700"
                            onClick={() => navigate(`/courses/${course.id}/continue`)}
                          >
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No enrolled courses found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `No results found for "${searchQuery}". Try a different search term.` 
                    : "You haven't enrolled in any courses yet."}
                </p>
                <Button 
                  className="bg-realty-600 hover:bg-realty-700"
                  onClick={() => {
                    setSearchQuery('');
                    document.querySelector('[data-value="available"]')?.click();
                  }}
                >
                  Browse Available Courses
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAvailableCourses.map((course) => (
                <Card key={course.id} className="flex flex-col overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  />
                  <CardHeader className="flex-1">
                    <Badge className="mb-2 bg-realty-100 text-realty-800 hover:bg-realty-200 w-fit">
                      {course.category}
                    </Badge>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          {course.level}
                        </span>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Instructor: <span className="font-medium">{course.instructor}</span></span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-realty-700">
                      ${course.price}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button 
                      className="w-full bg-realty-600 hover:bg-realty-700"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      View Course Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredAvailableCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No available courses found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `No results found for "${searchQuery}". Try a different search term.` 
                    : "There are no courses available at the moment."}
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Learning Paths</CardTitle>
            <CardDescription>
              Structured learning paths to help you achieve your real estate career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="flex items-start gap-4">
                  <Building className="h-8 w-8 text-realty-600" />
                  <div className="text-left">
                    <div className="font-medium mb-1">Real Estate Agent</div>
                    <div className="text-sm text-muted-foreground">
                      Master residential property valuation and sales
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>5 courses • 28 hours</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="flex items-start gap-4">
                  <BarChart3 className="h-8 w-8 text-realty-600" />
                  <div className="text-left">
                    <div className="font-medium mb-1">Investment Analyst</div>
                    <div className="text-sm text-muted-foreground">
                      Learn to analyze and evaluate investment opportunities
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>6 courses • 35 hours</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 justify-start">
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-realty-600" />
                  <div className="text-left">
                    <div className="font-medium mb-1">Property Appraiser</div>
                    <div className="text-sm text-muted-foreground">
                      Become an expert in property valuation techniques
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>4 courses • 24 hours</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-realty-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Need personalized learning recommendations?</h2>
          <p className="text-muted-foreground mb-4">
            Our education advisors can help you create a customized learning plan based on your goals.
          </p>
          <Button className="bg-realty-600 hover:bg-realty-700">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MyCourses;
