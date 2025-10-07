# 🌐 Pathfinders - Complete Website Specifications

## 📋 **Project Overview**
**Platform Name**: Pathfinders  
**Domain**: pathfinders.gh  
**Purpose**: AI-powered career navigation platform for Ghana  
**Target Users**: Students, Graduates, Employers, Educational Institutions

---

## 🏗️ **System Architecture**

### **High-Level Architecture:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI/ML Engine  │
│   React.js      │◄──►│   Node.js       │◄──►│   Python        │
│   Mobile PWA    │    │   Express.js    │    │   OpenAI API    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Assets    │    │   Database      │    │   Job Scrapers  │
│   CloudFlare    │    │   MongoDB       │    │   BeautifulSoup │
│   Images/CSS/JS │    │   Redis Cache   │    │   Selenium      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🎨 **Frontend Specifications**

### **Framework & Technology Stack:**
```javascript
Core Framework:
├── React.js 18.2+
├── TypeScript 5.0+
├── Vite (Build Tool)
└── PWA (Progressive Web App)

Styling & UI:
├── Tailwind CSS 3.3+
├── Headless UI Components
├── Framer Motion (Animations)
└── React Hook Form

State Management:
├── Redux Toolkit
├── RTK Query (Data Fetching)
├── React Context (Local State)
└── Local Storage (Progress Persistence)

Assessment Features:
├── Auto-save System
│   ├── 30-second intervals
│   └── Progress persistence
├── PDF Generation
│   ├── react-pdf/renderer
│   └── Custom certificate templates
├── Sharing System
│   ├── Direct link sharing
│   ├── Email integration
│   └── Social media sharing
└── Analytics Dashboard
    ├── Real-time progress tracking
    ├── Performance metrics
    └── Historical data visualization
└── Zustand (Alternative)

Routing & Navigation:
├── React Router v6
├── Protected Routes
├── Lazy Loading
└── Route-based Code Splitting
```

### **User Interface Design:**

#### **Design System:**
```css
/* Color Palette */
:root {
  --primary-blue: #1E3A8A;      /* Trust, Navigation */
  --secondary-orange: #F97316;   /* Energy, Discovery */
  --ghana-red: #DC2626;          /* Flag Red */
  --ghana-gold: #FBBF24;         /* Flag Gold */
  --ghana-green: #16A34A;        /* Flag Green */
  --neutral-100: #F3F4F6;        /* Light Gray */
  --neutral-800: #1F2937;        /* Dark Gray */
  --white: #FFFFFF;              /* Pure White */
}

/* Typography Scale */
.text-hero { font-size: 3.5rem; line-height: 1.1; }
.text-h1 { font-size: 2.5rem; line-height: 1.2; }
.text-h2 { font-size: 2rem; line-height: 1.3; }
.text-body { font-size: 1rem; line-height: 1.6; }
.text-small { font-size: 0.875rem; line-height: 1.5; }

/* Spacing System (8px base) */
.space-1 { margin: 0.5rem; }
.space-2 { margin: 1rem; }
.space-4 { margin: 2rem; }
.space-8 { margin: 4rem; }
```

#### **Component Library:**
```typescript
// Core Components
├── Navigation/
│   ├── Header.tsx           // Main navigation bar
│   ├── MobileMenu.tsx       // Hamburger menu for mobile
│   ├── Breadcrumbs.tsx      // Navigation breadcrumbs
│   └── Footer.tsx           // Site footer with links

├── Layout/
│   ├── PageLayout.tsx       // Main page wrapper
│   ├── DashboardLayout.tsx  // Dashboard layout with sidebar
│   ├── Container.tsx        // Content container
│   └── Grid.tsx            // Responsive grid system

├── Forms/
│   ├── Input.tsx           // Text input with validation
│   ├── Select.tsx          // Dropdown selector
│   ├── TextArea.tsx        // Multi-line text input
│   ├── Button.tsx          // Primary/secondary buttons
│   └── FormField.tsx       // Form field wrapper

├── Data Display/
│   ├── Card.tsx            // Content cards
│   ├── Table.tsx           // Data tables
│   ├── Chart.tsx           // Data visualization
│   ├── Badge.tsx           // Status indicators
│   └── ProgressBar.tsx     // Progress indicators

├── Feedback/
│   ├── Alert.tsx           // Success/error messages
│   ├── Modal.tsx           // Dialog modals
│   ├── Toast.tsx           // Notification toasts
│   └── Loading.tsx         // Loading spinners

└── Ghana-Specific/
    ├── LanguageToggle.tsx   // English/Twi/Ga switcher
    ├── CurrencyDisplay.tsx  // Ghana Cedi formatting
    ├── LocationPicker.tsx   // Ghana cities selector
    └── MobileMoneyForm.tsx  // Payment integration
```

### **Responsive Design Specifications:**

#### **Breakpoint System:**
```css
/* Mobile First Approach */
/* Base: 320px - 479px (Small Mobile) */
.mobile-sm { max-width: 479px; }

/* Mobile: 480px - 767px (Large Mobile) */
@media (min-width: 480px) { .mobile-lg { } }

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { .tablet { } }

/* Desktop: 1024px - 1279px */
@media (min-width: 1024px) { .desktop { } }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { .desktop-lg { } }
```

#### **Mobile Optimization:**
```javascript
// Performance Optimizations
const MobileOptimizations = {
  // Image Optimization
  imageFormats: ['WebP', 'AVIF', 'JPEG fallback'],
  imageSizes: {
    thumbnail: '150x150',
    mobile: '375x200',
    tablet: '768x400',
    desktop: '1200x600'
  },

  // Font Loading Strategy
  fontDisplay: 'swap',
  fontSubsets: ['latin', 'latin-ext'],
  
  // Code Splitting
  routes: 'lazy-loaded',
  components: 'dynamic-imports',
  
  // Service Worker
  caching: 'cache-first for static assets',
  offline: 'basic functionality available',
  
  // Bundle Size Targets
  initialBundle: '<100KB gzipped',
  chunkSize: '<50KB per route',
  totalAssets: '<500KB first load'
};
```

### **Page Structure:**

#### **Public Pages:**
```typescript
// Authentication
├── /login                   // User login
├── /register               // User registration
├── /forgot-password        // Password recovery
└── /verify-email          // Email verification

// Marketing
├── /                      // Homepage with value proposition
├── /about                 // About Pathfinders mission
├── /how-it-works         // Platform explanation
├── /success-stories      // Graduate testimonials
├── /pricing              // Subscription plans
└── /contact              // Contact information

// Legal
├── /privacy-policy       // GDPR compliant privacy
├── /terms-of-service    // Terms and conditions
├── /cookie-policy       // Cookie usage policy
└── /sdg-impact          // SDG alignment page
```

#### **Authenticated Pages:**
```typescript
// Student Dashboard
├── /dashboard             // Main student overview
├── /profile              // Student profile management
├── /learning-paths       // Available learning paths
├── /my-progress         // Learning progress tracking
├── /job-recommendations // Personalized job suggestions
├── /assessments         // Skills assessments
├── /certificates        // Earned certificates
└── /community           // Peer learning community

// Employer Portal
├── /employer/dashboard   // Employer overview
├── /employer/post-job   // Job posting form
├── /employer/candidates // Candidate browser
├── /employer/interviews // Interview scheduling
└── /employer/analytics  // Hiring analytics

// Admin Panel
├── /admin/users         // User management
├── /admin/jobs          // Job data management
├── /admin/content       // Learning content curation
├── /admin/analytics     // Platform analytics
└── /admin/settings      // System configuration
```

---

## ⚙️ **Backend Specifications**

### **Server Architecture:**
```javascript
// Technology Stack
const BackendStack = {
  runtime: 'Node.js 18+ LTS',
  framework: 'Express.js 4.18+',
  language: 'TypeScript',
  database: 'MongoDB 6.0+',
  cache: 'Redis 7.0+',
  search: 'Elasticsearch 8.0+',
  queue: 'Bull Queue (Redis-based)',
  
  // File Structure
  structure: {
    'src/': {
      'app.ts': 'Main Express application',
      'server.ts': 'Server startup and configuration',
      
      'controllers/': 'Request handlers',
      'middleware/': 'Custom middleware functions',
      'models/': 'Database schemas and models',
      'routes/': 'API route definitions',
      'services/': 'Business logic services',
      'utils/': 'Utility functions',
      'validators/': 'Request validation schemas',
      
      'config/': {
        'database.ts': 'Database configuration',
        'redis.ts': 'Redis cache configuration',
        'openai.ts': 'AI service configuration',
        'environment.ts': 'Environment variables'
      },
      
      'jobs/': 'Background job processors',
      'scrapers/': 'Job scraping modules',
      'ai/': 'AI integration services'
    }
  }
};
```

### **API Design:**

#### **RESTful API Structure:**
```typescript
// Base URL: https://api.pathfinders.gh/v1

// Authentication Endpoints
POST   /auth/register           // User registration
POST   /auth/login              // User login
POST   /auth/logout             // User logout
POST   /auth/refresh            // Token refresh
POST   /auth/forgot-password    // Password reset request
POST   /auth/reset-password     // Password reset confirmation

// User Management
GET    /users/profile           // Get user profile
PUT    /users/profile           // Update user profile
DELETE /users/account           // Delete user account
GET    /users/progress          // Get learning progress
PUT    /users/preferences       // Update user preferences

// Job Market Data
GET    /jobs                    // List available jobs
GET    /jobs/:id                // Get specific job details
GET    /jobs/search             // Search jobs with filters
GET    /jobs/trending           // Get trending job categories
GET    /jobs/stats              // Get job market statistics

// Learning Paths
GET    /learning-paths          // List available paths
POST   /learning-paths/generate // Generate AI-powered path
GET    /learning-paths/:id      // Get specific path details
PUT    /learning-paths/:id      // Update path progress
POST   /learning-paths/:id/complete // Mark path as completed

// AI Services
POST   /ai/analyze-skills       // Analyze user skills
POST   /ai/match-jobs          // Match jobs to user profile
POST   /ai/generate-content    // Generate learning content
POST   /ai/assess-progress     // Assess learning progress

// Employer Services
POST   /employer/jobs           // Post new job
GET    /employer/jobs           // Get employer's jobs
GET    /employer/candidates     // Get matched candidates
POST   /employer/interviews     // Schedule interviews
GET    /employer/analytics      // Get hiring analytics
```

#### **Request/Response Examples:**
```typescript
// Generate Learning Path Request
POST /learning-paths/generate
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "userId": "user_123",
  "targetRole": "React Developer",
  "currentSkills": ["HTML", "CSS", "JavaScript"],
  "location": "Kumasi",
  "timeframe": "8-weeks",
  "experience": "beginner"
}

// Response
{
  "success": true,
  "data": {
    "pathId": "path_456",
    "title": "React Developer Path - Kumasi",
    "duration": "8 weeks",
    "modules": [
      {
        "id": "mod_1",
        "title": "React Fundamentals",
        "duration": "2 weeks",
        "resources": [
          {
            "type": "video",
            "title": "React Crash Course",
            "url": "youtube.com/watch?v=...",
            "duration": "3 hours"
          }
        ]
      }
    ],
    "jobMatches": [
      {
        "id": "job_789",
        "title": "Junior React Developer",
        "company": "Tech Solutions Ghana",
        "location": "Kumasi",
        "salary": "₵3000-₵5000"
      }
    ]
  }
}
```

### **Database Schema:**

#### **MongoDB Collections:**
```javascript
// Users Collection
const UserSchema = {
  _id: ObjectId,
  email: String,
  password: String, // bcrypt hashed
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    location: String, // Ghana city
    dateOfBirth: Date,
    education: [{
      institution: String,
      degree: String,
      field: String,
      graduationYear: Number
    }],
    skills: [String],
    interests: [String],
    preferredLanguage: String // en, tw, ga
  },
  progress: {
    completedPaths: [ObjectId],
    currentPaths: [{
      pathId: ObjectId,
      startDate: Date,
      progress: Number, // 0-100
      lastActivity: Date
    }],
    certificates: [ObjectId],
    assessmentScores: [{
      skill: String,
      score: Number,
      date: Date
    }]
  },
  settings: {
    notifications: {
      email: Boolean,
      sms: Boolean,
      whatsapp: Boolean
    },
    privacy: {
      profileVisible: Boolean,
      allowEmployerContact: Boolean
    }
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date
  }
};

// Jobs Collection
const JobSchema = {
  _id: ObjectId,
  title: String,
  company: {
    name: String,
    logo: String,
    website: String,
    size: String,
    industry: String
  },
  description: String,
  requirements: {
    skills: [String],
    experience: String,
    education: String,
    languages: [String]
  },
  details: {
    type: String, // full-time, part-time, contract
    salary: {
      min: Number,
      max: Number,
      currency: String
    },
    location: {
      city: String,
      region: String,
      remote: Boolean
    },
    benefits: [String]
  },
  application: {
    method: String, // email, website, platform
    contact: String,
    deadline: Date,
    instructions: String
  },
  metadata: {
    source: String, // indeed, linkedin, jobberman
    sourceUrl: String,
    scrapedAt: Date,
    active: Boolean,
    views: Number,
    applications: Number
  },
  aiAnalysis: {
    category: String,
    skillsExtracted: [String],
    experienceLevel: String,
    confidence: Number
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date,
    expiresAt: Date
  }
};

// Learning Paths Collection
const LearningPathSchema = {
  _id: ObjectId,
  title: String,
  description: String,
  targetRole: String,
  difficulty: String, // beginner, intermediate, advanced
  duration: {
    estimated: Number, // weeks
    flexible: Boolean
  },
  prerequisites: [String],
  outcomes: [String],
  modules: [{
    id: String,
    title: String,
    description: String,
    order: Number,
    duration: Number, // hours
    resources: [{
      type: String, // video, article, course, project
      title: String,
      url: String,
      provider: String,
      duration: Number,
      free: Boolean,
      language: String
    }],
    assessment: {
      type: String,
      questions: Number,
      passingScore: Number
    }
  }],
  jobMatches: [ObjectId], // Reference to matched jobs
  aiGenerated: {
    prompt: String,
    model: String,
    confidence: Number,
    generatedAt: Date
  },
  analytics: {
    enrollments: Number,
    completions: Number,
    averageRating: Number,
    completionRate: Number
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
};
```

### **Security Implementation:**

#### **Authentication & Authorization:**
```typescript
// JWT Token Configuration
const JWTConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m',
    algorithm: 'HS256'
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',
    algorithm: 'HS256'
  }
};

// Password Security
const PasswordSecurity = {
  hashing: 'bcrypt',
  saltRounds: 12,
  requirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true
  }
};

// API Rate Limiting
const RateLimiting = {
  authentication: '5 attempts per 15 minutes',
  apiCalls: '1000 requests per hour per user',
  jobScraping: '100 requests per minute',
  aiGeneration: '10 requests per minute per user'
};
```

#### **Data Protection:**
```typescript
// GDPR Compliance
const DataProtection = {
  encryption: {
    atRest: 'AES-256',
    inTransit: 'TLS 1.3',
    database: 'MongoDB encryption',
    backups: 'Encrypted storage'
  },
  
  privacy: {
    dataRetention: '7 years or user deletion',
    rightToBeForgotten: 'Complete data deletion',
    dataPortability: 'JSON export available',
    consentManagement: 'Granular permissions'
  },
  
  monitoring: {
    accessLogs: 'All data access logged',
    auditTrail: 'Complete audit trail',
    alerting: 'Suspicious activity alerts',
    reporting: 'Regular security reports'
  }
};
```

---

## 🤖 **AI/ML Engine Specifications**

### **AI Architecture:**
```python
# Core AI Components
AI_STACK = {
    'language': 'Python 3.9+',
    'framework': 'FastAPI',
    'ml_library': 'scikit-learn',
    'nlp_processing': 'spaCy + NLTK',
    'data_processing': 'pandas + numpy',
    'job_scraping': 'BeautifulSoup + Selenium',
    'database': 'pymongo (MongoDB)',
    'caching': 'redis-py',
    
    # AI Services
    'primary_ai': 'OpenAI GPT-4 API',
    'backup_ai': 'Anthropic Claude API',
    'embedding': 'OpenAI text-embedding-ada-002',
    'translation': 'Google Translate API'
}

# File Structure
PROJECT_STRUCTURE = {
    'ai-ml/': {
        'app.py': 'FastAPI application',
        'requirements.txt': 'Python dependencies',
        
        'job_scraper/': {
            'scraper.py': 'Main scraping orchestrator',
            'sites/': {
                'indeed.py': 'Indeed scraper',
                'linkedin.py': 'LinkedIn scraper', 
                'jobberman.py': 'Jobberman Ghana scraper',
                'ghanaweb.py': 'GhanaWeb Jobs scraper'
            },
            'processors.py': 'Data cleaning and processing',
            'scheduler.py': 'Automated scraping schedule'
        },
        
        'path_generator/': {
            'ai_engine.py': 'OpenAI integration',
            'prompts.py': 'Prompt templates',
            'content_curator.py': 'Educational content selection',
            'skills_matcher.py': 'Job-skills matching'
        },
        
        'models/': {
            'classifiers.py': 'ML classification models',
            'embeddings.py': 'Text embedding utilities',
            'recommender.py': 'Recommendation algorithms'
        },
        
        'utils/': {
            'text_processing.py': 'NLP utilities',
            'data_validation.py': 'Data quality checks',
            'translation.py': 'Local language support'
        }
    }
}
```

### **Learning Path Generation:**
```python
# AI Prompt Engineering
LEARNING_PATH_PROMPT = """
You are an expert career advisor for Ghana's job market. 
Create a personalized learning path for:

User Profile:
- Name: {user_name}
- Current Skills: {current_skills}
- Target Role: {target_role}
- Location: {location}
- Experience Level: {experience_level}
- Time Available: {time_commitment}

Available Jobs in {location}:
{job_listings}

Requirements:
1. Create 4-8 learning modules
2. Each module should be 1-2 weeks duration
3. Include specific skills that match job requirements
4. Prioritize free and local resources
5. Consider Ghana's internet connectivity challenges
6. Include practical projects
7. Add assessment checkpoints

Output format: JSON with modules, resources, timeline, and job matches.
"""

# Skills Extraction Algorithm
def extract_skills_from_job(job_description):
    """
    Extract technical and soft skills from job descriptions
    using NLP and predefined skill taxonomies
    """
    # Technical skills taxonomy
    TECHNICAL_SKILLS = {
        'programming': ['Python', 'JavaScript', 'Java', 'React', 'Node.js'],
        'data': ['Excel', 'SQL', 'Tableau', 'Power BI'],
        'design': ['Photoshop', 'Figma', 'Adobe Creative Suite'],
        'digital_marketing': ['SEO', 'Google Ads', 'Social Media'],
        'business': ['Project Management', 'Accounting', 'Sales']
    }
    
    # Soft skills taxonomy
    SOFT_SKILLS = {
        'communication': ['Communication', 'Presentation', 'Writing'],
        'leadership': ['Leadership', 'Team Management', 'Mentoring'],
        'problem_solving': ['Problem Solving', 'Critical Thinking', 'Analysis']
    }
    
    # NLP processing pipeline
    extracted_skills = nlp_processor.extract_skills(
        text=job_description,
        skill_taxonomy=TECHNICAL_SKILLS | SOFT_SKILLS,
        confidence_threshold=0.8
    )
    
    return extracted_skills
```

### **Job Market Intelligence:**
```python
# Real-time Job Scraping
class JobScraper:
    def __init__(self):
        self.sites = {
            'indeed': IndeedScraper(),
            'linkedin': LinkedInScraper(),
            'jobberman': JobbermanScraper(),
            'ghanaweb': GhanaWebScraper()
        }
        
    def scrape_all_sites(self, location='Ghana'):
        """Scrape all job sites and aggregate results"""
        all_jobs = []
        
        for site_name, scraper in self.sites.items():
            try:
                jobs = scraper.scrape_jobs(location=location)
                for job in jobs:
                    job['source'] = site_name
                    job['scraped_at'] = datetime.now()
                    all_jobs.append(job)
                    
                logger.info(f"Scraped {len(jobs)} jobs from {site_name}")
                
            except Exception as e:
                logger.error(f"Error scraping {site_name}: {e}")
                
        return all_jobs
        
    def analyze_job_trends(self, jobs_data):
        """Analyze job market trends and demands"""
        trends = {
            'top_skills': Counter(),
            'salary_ranges': {},
            'location_distribution': Counter(),
            'experience_levels': Counter(),
            'job_categories': Counter()
        }
        
        for job in jobs_data:
            # Extract and count skills
            skills = extract_skills_from_job(job['description'])
            trends['top_skills'].update(skills)
            
            # Analyze salary ranges
            if job.get('salary'):
                category = categorize_salary(job['salary'])
                trends['salary_ranges'][category] = trends['salary_ranges'].get(category, 0) + 1
            
            # Count locations
            trends['location_distribution'][job['location']] += 1
            
            # Analyze experience requirements
            exp_level = extract_experience_level(job['description'])
            trends['experience_levels'][exp_level] += 1
            
        return trends

# Automated Scheduling
def schedule_job_scraping():
    """Schedule regular job scraping"""
    scheduler = BackgroundScheduler()
    
    # Scrape jobs every 4 hours
    scheduler.add_job(
        func=scrape_and_update_jobs,
        trigger="interval",
        hours=4,
        id='job_scraping'
    )
    
    # Analyze trends daily
    scheduler.add_job(
        func=analyze_and_update_trends,
        trigger="cron",
        hour=2,
        minute=0,
        id='trend_analysis'
    )
    
    scheduler.start()
```

---

## 🔗 **Third-Party Integrations**

### **Educational Content APIs:**
```typescript
// YouTube Data API Integration
const YouTubeAPI = {
  endpoint: 'https://www.googleapis.com/youtube/v3',
  apiKey: process.env.YOUTUBE_API_KEY,
  
  searchVideos: async (query: string, maxResults: number = 10) => {
    const response = await fetch(
      `${endpoint}/search?` +
      `part=snippet&` +
      `q=${encodeURIComponent(query)}&` +
      `type=video&` +
      `maxResults=${maxResults}&` +
      `key=${apiKey}`
    );
    
    return response.json();
  },
  
  getVideoDetails: async (videoId: string) => {
    const response = await fetch(
      `${endpoint}/videos?` +
      `part=contentDetails,statistics&` +
      `id=${videoId}&` +
      `key=${apiKey}`
    );
    
    return response.json();
  }
};

// Khan Academy API Integration  
const KhanAcademyAPI = {
  endpoint: 'https://www.khanacademy.org/api/v1',
  
  searchContent: async (query: string, topic: string) => {
    const response = await fetch(
      `${endpoint}/search?` +
      `q=${encodeURIComponent(query)}&` +
      `topic=${topic}&` +
      `limit=20`
    );
    
    return response.json();
  }
};
```

### **Communication APIs:**
```typescript
// WhatsApp Business API Integration
const WhatsAppAPI = {
  endpoint: 'https://api.twilio.com/2010-04-01/Accounts',
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  
  sendMessage: async (to: string, message: string) => {
    const client = twilio(accountSid, authToken);
    
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${to}`
    });
    
    return response;
  },
  
  sendLearningUpdate: async (userId: string, progress: number) => {
    const user = await User.findById(userId);
    const message = `
🎯 Learning Progress Update

Hi ${user.profile.firstName}!

You're ${progress}% through your learning path. Keep going!

Next: Complete the React Components module
⏰ Estimated time: 2 hours

View Progress: ${process.env.FRONTEND_URL}/my-progress

Stay strong, pathfinder! 🧭
    `;
    
    return this.sendMessage(user.profile.phone, message);
  }
};

// Mobile Money API Integration (Ghana)
const MobileMoneyAPI = {
  // MTN Mobile Money
  mtn: {
    endpoint: 'https://sandbox.momodeveloper.mtn.com',
    apiKey: process.env.MTN_API_KEY,
    
    requestPayment: async (amount: number, phone: string) => {
      const response = await fetch(`${endpoint}/collection/v1_0/requesttopay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Reference-Id': generateUUID(),
          'X-Target-Environment': 'sandbox',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amount.toString(),
          currency: 'GHS',
          externalId: generateTransactionId(),
          payer: {
            partyIdType: 'MSISDN',
            partyId: phone
          },
          payerMessage: 'Pathfinders subscription payment',
          payeeNote: 'Thank you for choosing Pathfinders!'
        })
      });
      
      return response.json();
    }
  },
  
  // AirtelTigo Money API would follow similar pattern
  // Vodafone Cash API would follow similar pattern
};
```

### **Translation & Localization:**
```typescript
// Google Translate API for Local Languages
const TranslationAPI = {
  endpoint: 'https://translation.googleapis.com/language/translate/v2',
  apiKey: process.env.GOOGLE_TRANSLATE_KEY,
  
  supportedLanguages: {
    'en': 'English',
    'tw': 'Twi (Akan)',
    'ga': 'Ga',
    'ee': 'Ewe'
  },
  
  translateText: async (text: string, targetLanguage: string) => {
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: 'en',
        format: 'text'
      })
    });
    
    return response.json();
  },
  
  // Pre-translate common phrases for performance
  commonPhrases: {
    'en': {
      welcome: 'Welcome to Pathfinders',
      progress: 'Your learning progress',
      complete: 'Complete this module'
    },
    'tw': {
      welcome: 'Akwaaba wɔ Pathfinders',
      progress: 'W\'adwumayɛ mu nkɔso',
      complete: 'Wie saa adesuakuw yi'
    }
    // Additional translations for Ga and Ewe
  }
};
```

---

## 📊 **Analytics & Monitoring**

### **User Analytics:**
```typescript
// Google Analytics 4 Integration
const GoogleAnalytics = {
  measurementId: process.env.GA4_MEASUREMENT_ID,
  
  trackEvents: {
    // User Registration
    signup: (method: string) => ({
      event_name: 'sign_up',
      parameters: {
        method: method // google, email, facebook
      }
    }),
    
    // Learning Path Events
    path_start: (pathId: string, pathName: string) => ({
      event_name: 'begin_checkout', // Using ecommerce event
      parameters: {
        currency: 'GHS',
        value: 0, // Free paths
        items: [{
          item_id: pathId,
          item_name: pathName,
          item_category: 'learning_path'
        }]
      }
    }),
    
    path_complete: (pathId: string, duration: number) => ({
      event_name: 'purchase', // Conversion event
      parameters: {
        currency: 'GHS',
        value: 100, // Estimated value of completion
        transaction_id: `path_${pathId}_${Date.now()}`,
        items: [{
          item_id: pathId,
          item_name: 'Learning Path Completion',
          quantity: 1
        }]
      }
    }),
    
    // Job Application Events
    job_view: (jobId: string, jobTitle: string) => ({
      event_name: 'view_item',
      parameters: {
        currency: 'GHS',
        value: 0,
        items: [{
          item_id: jobId,
          item_name: jobTitle,
          item_category: 'job_listing'
        }]
      }
    }),
    
    job_apply: (jobId: string) => ({
      event_name: 'add_to_cart', // Interest shown
      parameters: {
        currency: 'GHS',
        value: 1,
        items: [{
          item_id: jobId,
          item_category: 'job_application'
        }]
      }
    })
  }
};

// Mixpanel Integration for Product Analytics
const MixpanelAnalytics = {
  token: process.env.MIXPANEL_TOKEN,
  
  trackUserJourney: {
    // Funnel Analysis
    registration_funnel: [
      'landing_page_view',
      'signup_form_view',
      'signup_form_submit',
      'email_verification',
      'profile_completion',
      'first_path_selection'
    ],
    
    learning_funnel: [
      'path_selection',
      'module_start',
      'resource_access',
      'assessment_attempt',
      'module_completion',
      'path_completion'
    ],
    
    job_application_funnel: [
      'job_search',
      'job_view',
      'application_intent',
      'application_submit',
      'interview_scheduled'
    ]
  },
  
  userProperties: {
    // Demographics
    age_group: 'calculated from date_of_birth',
    location: 'user_city',
    education_level: 'highest_degree',
    
    // Engagement
    days_since_signup: 'calculated',
    learning_paths_completed: 'count',
    total_learning_hours: 'sum',
    jobs_applied_to: 'count',
    
    // Success Metrics
    employment_status: 'employed/unemployed/student',
    salary_improvement: 'percentage_increase',
    skills_acquired: 'array_of_skills'
  }
};
```

### **System Monitoring:**
```typescript
// Application Performance Monitoring
const APMConfig = {
  // New Relic Integration
  newRelic: {
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
    appName: 'Pathfinders-API',
    
    customMetrics: {
      'AI/LearningPathGeneration': 'time_to_generate_path',
      'Jobs/ScrapeSuccess': 'successful_scrapes_per_hour',
      'Users/RegistrationRate': 'new_users_per_day',
      'Learning/CompletionRate': 'percentage_paths_completed'
    }
  },
  
  // Sentry Error Tracking
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    
    errorFiltering: {
      ignoreErrors: [
        'Non-Error promise rejection captured',
        'Network Error',
        'Request timeout'
      ],
      
      beforeSend: (event) => {
        // Filter out sensitive data
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers?.authorization;
        }
        return event;
      }
    }
  },
  
  // Custom Health Checks
  healthChecks: {
    database: async () => {
      try {
        await mongoose.connection.db.admin().ping();
        return { status: 'healthy', latency: '< 50ms' };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    },
    
    redis: async () => {
      try {
        const start = Date.now();
        await redisClient.ping();
        const latency = Date.now() - start;
        return { status: 'healthy', latency: `${latency}ms` };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    },
    
    openai: async () => {
      try {
        const response = await openai.listModels();
        return { status: 'healthy', models: response.data.length };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    }
  }
};
```

---

## 🚀 **Deployment & DevOps**

### **Hosting Infrastructure:**
```yaml
# Docker Configuration
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=${API_URL}
      - REACT_APP_GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
    volumes:
      - ./frontend:/app
      - /app/node_modules
    
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=${NODE_ENV}
      - DATABASE_URL=${MONGODB_URI}
      - REDIS_URL=${REDIS_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - mongodb
      - redis
    
  ai-ml:
    build: ./ai-ml
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - MONGODB_URI=${MONGODB_URI}
    depends_on:
      - mongodb
    
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

### **CI/CD Pipeline:**
```yaml
# GitHub Actions Workflow
name: Deploy Pathfinders
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Frontend Tests
      - name: Test Frontend
        run: |
          cd frontend
          npm ci
          npm run test:coverage
          npm run build
      
      # Backend Tests
      - name: Test Backend
        run: |
          cd backend
          npm ci
          npm run test
          npm run lint
      
      # AI/ML Tests
      - name: Test AI/ML
        run: |
          cd ai-ml
          pip install -r requirements.txt
          python -m pytest tests/
          python -m flake8 .
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      # Deploy to Railway/Heroku
      - name: Deploy to Production
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          railway login --token $RAILWAY_TOKEN
          railway up
          
      # Update CDN
      - name: Purge CloudFlare Cache
        env:
          CLOUDFLARE_ZONE: ${{ secrets.CLOUDFLARE_ZONE }}
          CLOUDFLARE_TOKEN: ${{ secrets.CLOUDFLARE_TOKEN }}
        run: |
          curl -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/purge_cache" \
            -H "Authorization: Bearer ${CLOUDFLARE_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{"purge_everything":true}'
```

### **Environment Configuration:**
```bash
# Production Environment Variables
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pathfinders
REDIS_URL=redis://redis-prod.railway.app:6379

# API Keys
OPENAI_API_KEY=sk-...
YOUTUBE_API_KEY=AIza...
GOOGLE_TRANSLATE_KEY=AIza...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...

# Authentication
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
BCRYPT_SALT_ROUNDS=12

# Third-party Services
SENTRY_DSN=https://...@sentry.io/...
NEW_RELIC_LICENSE_KEY=...
GA4_MEASUREMENT_ID=G-...

# Payment Gateways
MTN_API_KEY=...
PAYSTACK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...

# CDN & Storage
CLOUDFLARE_ZONE=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=pathfinders-assets

# Application
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://pathfinders.gh
API_URL=https://api.pathfinders.gh
```

---

This comprehensive specification provides everything needed to build Pathfinders as a world-class platform. The combination of **SDG 8 alignment**, **cutting-edge technology**, and **Ghana-specific focus** positions this project for hackathon victory and real-world impact! 🧭🏆