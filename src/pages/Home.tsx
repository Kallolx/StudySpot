import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  BarChart, 
  CheckCircle,
  PlayCircle,
  GraduationCap,
  Trophy,
  Target,
  ClipboardCheck,
  BarChart2,
  Check,
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  {
    label: 'Active Students',
    value: '15K+',
    description: 'Students learning daily',
    icon: Users,
    color: 'text-primary-500'
  },
  {
    label: 'Expert Teachers',
    value: '200+',
    description: 'Qualified instructors',
    icon: GraduationCap,
    color: 'text-accent-500'
  },
  {
    label: 'Success Rate',
    value: '95%',
    description: 'In university admissions',
    icon: Trophy,
    color: 'text-yellow-500'
  },
  {
    label: 'Practice Questions',
    value: '50K+',
    description: 'Across all subjects',
    icon: CheckCircle,
    color: 'text-green-500'
  }
];

const features = [
  {
    title: 'Comprehensive Study Materials',
    description: 'Access detailed notes, video lectures, and practice materials for all subjects',
    icon: BookOpen,
    color: 'text-primary-500',
    benefits: ['Updated content', 'Expert-reviewed', 'Structured learning path']
  },
  {
    title: 'Interactive Practice Sessions',
    description: 'Test your knowledge with our adaptive practice system',
    icon: Target,
    color: 'text-accent-500',
    benefits: ['Real-time feedback', 'Performance tracking', 'Personalized questions']
  },
  {
    title: 'Mock Tests & Assessments',
    description: 'Prepare with full-length mock tests designed by experts',
    icon: ClipboardCheck,
    color: 'text-yellow-500',
    benefits: ['Exam patterns', 'Timed tests', 'Detailed analysis']
  },
  {
    title: 'Performance Analytics',
    description: 'Track your progress with detailed insights and recommendations',
    icon: BarChart2,
    color: 'text-green-500',
    benefits: ['Visual reports', 'Improvement areas', 'Progress tracking']
  }
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-background to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full">
                <GraduationCap className="w-5 h-5 text-accent-500 mr-2" />
                <span className="text-accent-500 font-medium">148k+ Students Learning</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master New Skills
                  <span className="block text-primary-600 mt-2">with StudySpot</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Are you tired of pulling all-night and still struggling to keep up with your class? Join our platform for a better learning experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lectures"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-500 rounded-2xl hover:bg-primary-600 transition-colors duration-300 shadow-lg shadow-primary-200/50"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white rounded-2xl border-2 border-primary-200 hover:bg-primary-50 transition-colors duration-300">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${i}`}
                      alt="User avatar"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-accent-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    4.9/5 from 2k+ reviews
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative lg:ml-8">
              <div className="relative">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 rounded-[2.5rem] transform rotate-6 scale-95 opacity-20"></div>
                
                {/* Main Content */}
                <div className="relative bg-white rounded-[2.5rem] shadow-xl p-8 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Main Image */}
                    <div className="col-span-2">
                      <div className="relative rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                          alt="Students collaborating"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-sm font-semibold">Live Learning</div>
                          <div className="text-xs opacity-75">Interactive Sessions</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Supporting Images */}
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Student studying"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-primary-500/10"></div>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Library"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-accent-500/10"></div>
                    </div>
                  </div>
                  
                  {/* Decorative Patterns */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply opacity-70 -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-100 rounded-full mix-blend-multiply opacity-70 translate-y-16 -translate-x-16"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 right-6 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Active Learning</div>
                      <div className="text-xs text-gray-500">Join 200+ Students</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 left-6 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-200 to-accent-500 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Certified Courses</div>
                      <div className="text-xs text-gray-500">Get Recognized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact in Numbers</h2>
            <p className="mt-4 text-lg text-gray-600">Join thousands of successful students preparing with StudySpot</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Succeed</h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive tools and resources for your university admission preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 ${feature.color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                        <Check className={`h-3 w-3 ${feature.color}`} />
                      </div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-white">StudySpot</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering students to achieve their academic goals through comprehensive online learning solutions.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Linkedin, href: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-500 transition-colors duration-200"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', href: '#' },
                  { label: 'Our Courses', href: '/lectures' },
                  { label: 'Practice Tests', href: '/practice' },
                  { label: 'Success Stories', href: '#' },
                  { label: 'Blog', href: '#' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Help Center', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'FAQ', href: '#' },
                  { label: 'Contact Us', href: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-4">
                {[
                  { icon: Mail, text: 'support@studyspot.com' },
                  { icon: Phone, text: '+1 (555) 123-4567' },
                  { icon: MapPin, text: '123 Education Street, Learning City, 12345' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <item.icon className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} StudySpot. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Link to="#" className="text-sm text-gray-400 hover:text-white">
                  Terms
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="#" className="text-sm text-gray-400 hover:text-white">
                  Privacy
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="#" className="text-sm text-gray-400 hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}