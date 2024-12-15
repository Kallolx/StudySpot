import React, { useState } from "react";
import {
  PlayCircle,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  ChevronDown,
  BookmarkPlus,
  BarChart,
} from "lucide-react";

type Category = "all" | "engineering" | "medical" | "general";
type Level = "all" | "beginner" | "intermediate" | "advanced";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: Exclude<Category, "all">;
  level: Exclude<Level, "all">;
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  image: string;
  progress?: number;
  description: string;
  tags: string[];
}

const courses: Course[] = [
  {
    id: "1",
    title: "Physics: Motion and Forces",
    instructor: "Dr. Sarah Chen",
    category: "engineering",
    level: "intermediate",
    duration: "2 hours",
    students: 1234,
    rating: 4.8,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Master the fundamentals of motion, forces, and Newton's laws with practical examples and interactive simulations.",
    tags: ["Physics", "Mechanics", "Engineering"],
    progress: 45,
  },
  {
    id: "2",
    title: "Human Anatomy & Physiology",
    instructor: "Dr. Michael Rodriguez",
    category: "medical",
    level: "advanced",
    duration: "2.5 hours",
    students: 892,
    rating: 4.9,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Comprehensive study of human body systems with 3D models and detailed explanations.",
    tags: ["Anatomy", "Medical", "Biology"],
    progress: 75,
  },
  {
    id: "3",
    title: "Calculus: Differentiation",
    instructor: "Prof. Emily Watson",
    category: "engineering",
    level: "beginner",
    duration: "1.5 hours",
    students: 2156,
    rating: 4.7,
    reviews: 342,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Learn the fundamentals of differentiation with step-by-step problem solving.",
    tags: ["Mathematics", "Calculus", "Engineering"],
    progress: 20,
  },
  {
    id: "4",
    title: "Organic Chemistry Basics",
    instructor: "Dr. James Lee",
    category: "medical",
    level: "intermediate",
    duration: "3 hours",
    students: 1567,
    rating: 4.6,
    reviews: 289,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Understanding organic compounds, reactions, and mechanisms with practical examples.",
    tags: ["Chemistry", "Organic", "Medical"],
  },
  {
    id: "5",
    title: "English: Academic Writing",
    instructor: "Prof. Lisa Brown",
    category: "general",
    level: "beginner",
    duration: "1 hour",
    students: 3245,
    rating: 4.8,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1455894127589-22f75500213a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Master academic writing skills with practical exercises and examples.",
    tags: ["English", "Writing", "Academic"],
  },
  {
    id: "6",
    title: "Digital Electronics",
    instructor: "Dr. Robert Chang",
    category: "engineering",
    level: "advanced",
    duration: "2.5 hours",
    students: 945,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Advanced concepts in digital electronics with circuit simulations.",
    tags: ["Electronics", "Engineering", "Digital"],
    progress: 60,
  },
];

// Add sorting functionality
type SortOption = "popular" | "rating" | "newest";

export default function Classes() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedLevel, setSelectedLevel] = useState<Level>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const sortedAndFilteredCourses = filteredCourses.sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">Explore Classes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Learn from expert instructors and advance your academic journey
          </p>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Sort Button */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <BarChart className="h-5 w-5" />
                Sort by
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform ${
                    showSortMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort Menu */}
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                  <div className="py-1">
                    {[
                      { value: "popular", label: "Most Popular" },
                      { value: "rating", label: "Highest Rated" },
                      { value: "newest", label: "Newest" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as SortOption);
                          setShowSortMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as Category)
                }
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as Level)}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Course Grid - Update to use sortedAndFilteredCourses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedAndFilteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAndFilteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                      <BookmarkPlus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  {course.progress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-primary-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/150?u=${course.instructor}`}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {course.instructor}
                      </span>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                      <PlayCircle className="h-5 w-5" />
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
