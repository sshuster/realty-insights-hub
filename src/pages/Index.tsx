
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Building,
  ArrowRight,
  Check,
  PlayCircle,
  BarChart3,
  BookOpen,
  Users,
  Calendar,
  Shield,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const testimonials = [
  {
    name: "Sarah Wilson",
    role: "Real Estate Agent",
    comment: "The valuation tools have completely transformed how I approach property listings. The accuracy is impressive!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "David Chen",
    role: "Commercial Investor",
    comment: "The commercial property valuation course gave me insights I couldn't find anywhere else. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Jennifer Lopez",
    role: "Property Developer",
    comment: "From beginner to confident investor in just two months. The structured learning paths are excellent.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-realty-600" />,
    title: "Accurate Valuations",
    description: "Our advanced algorithms provide precise property valuations using the latest market data."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-realty-600" />,
    title: "Expert-Led Courses",
    description: "Learn from industry veterans with courses designed for all experience levels."
  },
  {
    icon: <Calendar className="h-6 w-6 text-realty-600" />,
    title: "Live Webinars",
    description: "Participate in weekly webinars covering current trends and investment strategies."
  },
  {
    icon: <Shield className="h-6 w-6 text-realty-600" />,
    title: "Secure Platform",
    description: "Your data is always protected with enterprise-grade security measures."
  }
];

const courses = [
  {
    title: "Real Estate Fundamentals",
    level: "Beginner",
    lessons: 12,
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
  },
  {
    title: "Commercial Property Valuation",
    level: "Advanced",
    lessons: 10,
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Residential Market Analysis",
    level: "Intermediate",
    lessons: 8,
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-realty-700" />
            <span className="text-xl font-bold text-realty-700">Realty Insights Hub</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium transition-colors hover:text-realty-700">Home</Link>
            <Link to="/pricing" className="font-medium transition-colors hover:text-realty-700">Pricing</Link>
            <Link to="/my-courses" className="font-medium transition-colors hover:text-realty-700">Courses</Link>
            <Link to="/valuation" className="font-medium transition-colors hover:text-realty-700">Valuation Tool</Link>
            <Link to="/about" className="font-medium transition-colors hover:text-realty-700">About</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard" className="bg-realty-600 hover:bg-realty-700">
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-realty-600 hover:bg-realty-700">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-realty-50 to-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Real Estate Valuation & Investment
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Learn industry-leading techniques for accurately valuing residential and commercial properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-realty-600 hover:bg-realty-700">
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/my-courses">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Explore Courses
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-realty-600" />
                  <span>Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-realty-600" />
                  <span>Accurate Valuations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-realty-600" />
                  <span>Industry Certification</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Real Estate Valuation"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-realty-100 p-2 rounded-full">
                    <BarChart3 className="h-6 w-6 text-realty-700" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Property Valuations</div>
                    <div className="text-2xl font-bold">$2.5B+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Path to Real Estate Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Our comprehensive platform combines powerful valuation tools with expert-led education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border shadow-sm">
                <CardHeader>
                  <div className="bg-realty-50 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Courses Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Comprehensive courses designed by industry experts to help you master real estate valuation.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/my-courses">
                View All Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden bg-white">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-realty-100 text-realty-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {course.level}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} lessons
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardFooter className="border-t flex justify-between items-center pt-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <Button asChild className="bg-realty-600 hover:bg-realty-700">
                    <Link to="/my-courses">View Course</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Valuation Tool Preview */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Powerful Valuation Tools</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Our advanced valuation tools provide accurate estimates for both residential and commercial properties.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-realty-100 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-realty-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Residential Property Valuation</h3>
                    <p className="text-muted-foreground">
                      Accurate valuations based on location, property features, and recent comparables.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-realty-100 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-realty-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Commercial Property Analysis</h3>
                    <p className="text-muted-foreground">
                      Income-based valuations with detailed cap rate and ROI calculations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-realty-100 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-realty-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Market Trend Insights</h3>
                    <p className="text-muted-foreground">
                      Access to historical data and future trend projections for different markets.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="bg-realty-600 hover:bg-realty-700">
                <Link to="/valuation">
                  Try Valuation Tool
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Valuation Tool"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:flex items-center gap-3">
                <div className="bg-realty-100 p-2 rounded-full">
                  <Award className="h-6 w-6 text-realty-700" />
                </div>
                <div>
                  <div className="text-sm font-medium">Accuracy Rate</div>
                  <div className="text-2xl font-bold">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-realty-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who've transformed their real estate career with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-full w-12 h-12 object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-realty-800 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Become a Real Estate Valuation Expert?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our platform today and get access to industry-leading courses and valuation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-realty-800 hover:bg-gray-100">
              <Link to="/register">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-realty-700">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">Realty Insights Hub</span>
              </div>
              <p className="mb-4 text-gray-400">
                The ultimate platform for real estate valuation education and tools.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/my-courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/valuation" className="hover:text-white">Valuation Tool</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Webinars</a></li>
                <li><a href="#" className="hover:text-white">Market Reports</a></li>
                <li><a href="#" className="hover:text-white">Guides & Tutorials</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@realtyinsights.com" className="hover:text-white">
                    info@realtyinsights.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="hover:text-white">
                    +1 (234) 567-890
                  </a>
                </li>
                <li>
                  <span>123 Real Estate Ave,</span><br />
                  <span>New York, NY 10001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Realty Insights Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
