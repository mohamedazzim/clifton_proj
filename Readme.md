# CLIFTON - Premium Import Export Business Website

## Overview

This is a modern, full-stack web application for CLIFTON, a premium import-export business based in Spain. The application serves as a comprehensive business showcase featuring company information, product catalogs, project portfolios, and contact management capabilities. It combines a React-based frontend with an Express.js backend, utilizing PostgreSQL for data persistence and modern UI/UX design principles.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **3D Graphics**: Three.js for interactive background animations
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reloading with custom Vite integration

### Key Design Decisions
- **Monorepo Structure**: Single repository with shared types and schemas
- **Type Safety**: End-to-end TypeScript for better developer experience
- **Modern UI**: Glass morphism design with noise textures and gradients
- **Internationalization**: Built-in support for English and Portuguese
- **Dark Mode**: Complete theming system with CSS variables
- **Performance**: Optimized images, lazy loading, and code splitting

## Key Components

### Database Schema (shared/schema.ts)
- **Founders**: Company leadership information with images and bios
- **Products**: Product catalog with categories and descriptions
- **Projects**: Portfolio of completed projects with filtering capabilities
- **Contacts**: Contact form submissions with timestamps

### API Endpoints (server/routes.ts)
- `GET /api/founders` - Retrieve all company founders
- `GET /api/products` - Retrieve all products
- `GET /api/projects` - Retrieve projects with optional filtering by category/year
- `POST /api/contacts` - Submit contact form data

### Frontend Components
- **Navigation**: Responsive navigation with mobile menu and theme/language switchers
- **HeroSection**: Auto-sliding image carousel with call-to-action buttons
- **VisionMission**: Company vision and mission statements
- **Founders**: Dynamic founder profiles with images and bios
- **Products**: Horizontal scrolling product showcase
- **Projects**: Filterable project grid with category and year filters
- **Contact**: Contact form with validation and submission handling
- **ThreeBackground**: Interactive 3D particle system background

## Data Flow

1. **Client Requests**: Browser requests are handled by the Express server
2. **API Routes**: RESTful endpoints process requests and interact with database
3. **Database Operations**: Drizzle ORM manages PostgreSQL queries and data validation
4. **Response Handling**: JSON responses are sent back to the client
5. **Client State**: TanStack Query manages caching, loading states, and data synchronization
6. **UI Updates**: React components re-render based on data changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **three**: 3D graphics library
- **date-fns**: Date manipulation utilities

### UI Components
- **@radix-ui/react-***: Accessible UI primitives for dialogs, forms, navigation
- **class-variance-authority**: Utility for managing component variants
- **tailwind-merge**: Intelligent Tailwind class merging
- **lucide-react**: Modern icon library

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **postcss**: CSS processing with Tailwind CSS plugin

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development Server**: `npm run dev` starts both frontend and backend
- **Hot Reloading**: Vite middleware integrated with Express
- **Database**: Development database with schema migrations

### Production Build
- **Frontend Build**: Vite builds optimized static assets to `dist/public`
- **Backend Build**: ESBuild bundles server code to `dist/index.js`
- **Database Migration**: `npm run db:push` applies schema changes
- **Static Serving**: Express serves built frontend assets

### Replit Configuration
- **Autoscale Deployment**: Configured for automatic scaling
- **Port Configuration**: Internal port 5000 mapped to external port 80
- **Build Process**: Two-stage build (frontend + backend bundling)
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
- June 23, 2025. Enhanced with advanced Three.js animations, parallax effects, and moving vector graphics throughout the page
- June 23, 2025. Updated branding to CLIFTON with new eagle logo and company identity
- June 23, 2025. Updated content to Clifton Traders import-export business with new services, vision, mission, and background images
- June 25, 2025. Added social media icons to founders section with professional contact information
- June 25, 2025. Updated "What We Do" section with colorful gradient icons and removed "Learn More" buttons
- June 25, 2025. Transformed "Why Choose Us?" section with key business benefits and colorful icons (Global Network, Expertise, Reliability, Customer-Centric Approach)
- June 25, 2025. Added ultra-thin text borders (0.2px) to hero subtitle for enhanced readability
- June 25, 2025. Implemented sharp geometric edges on both sides of hero section in light mode
- June 25, 2025. Updated "Vision & Mission" section to "About Us" with new company description highlighting Agro-commodity, Solar Energy & pharmaceuticals expertise
- June 25, 2025. Fixed static background image in About Us section by removing parallax movement effect
- June 25, 2025. Updated founders section with new leadership team: Benson Clement (Managing Director) and Joseph Ebenezer (Technical Director) with their qualifications and experience
- June 25, 2025. Enhanced "Why Choose Us?" section by removing floating elements and adding curved bottom accent lines that match card border radius for improved hover animations
- June 25, 2025. Added side edge glow effects to "Why Choose Us?" cards with gradient colors and scale animations on hover
- June 25, 2025. Removed projects section from navigation menu for cleaner navigation
- June 25, 2025. Added modern Premium Commodities section featuring Coffee, Salt, Sugar, and Soye with gradient cards, hover animations, floating elements, and custom icons
- June 25, 2025. Updated products section to use local images from /images/products/ and increased card image size to full width
- June 25, 2025. Simplified products section by removing detailed content and adding circular "view details" buttons on each card
- June 25, 2025. Added auto-rotating testimonials section after "Why Choose Us?" with circular animation, 6 client testimonials, and interactive navigation dots
- June 25, 2025. Added "Our Clients" section under testimonials featuring 4 client company logos with modern hover effects, grayscale to color transitions, and shine animations
- June 25, 2025. Updated footer by removing CLIFTON text next to logo and shortened tagline to "Excellence in international trade solutions"
- June 25, 2025. Enhanced footer with social media icons (Twitter, LinkedIn, Instagram, YouTube), contact icons for location/phone/email, updated services list to match commodity products, and added certification information
- June 25, 2025. Updated footer to black and white design, removing colored icons in favor of monochromatic gray scheme for professional appearance
- January 24, 2025. Migration from Replit Agent to standard Replit environment completed
- January 24, 2025. Created separate products page (/products) with same theme and navigation
- January 24, 2025. Added dedicated commodity showcase for Coffee, Salt, Sugar, and Soye
- January 24, 2025. Implemented "Why Choose CLIFTON" section with quality certifications and benefits
- January 24, 2025. Added trade volumes information and contact CTA section
- January 24, 2025. Enhanced products page hero section with sliding background images, fade in/out effects, and left/right movement animations
- January 24, 2025. Updated home page product cards eye icon to navigate to products page instead of individual product pages
- January 24, 2025. Enhanced About Us section background to be more white with reduced image opacity
- January 24, 2025. Removed dual background overlays in About Us section for cleaner appearance
- January 24, 2025. Fixed background image opacity to use custom 0.1 value instead of Tailwind's opacity-15 class
- January 24, 2025. Updated About Us background image opacity to 0.2 for optimal visibility
- January 24, 2025. Added white background overlay with 0.3 opacity to hero section for better text readability
- January 24, 2025. Fixed animated arrow overflow in Vision & Mission cards by adjusting positioning and viewBox dimensions
- January 24, 2025. Made founder cards darker with gray background overlay for better contrast against the white background
- January 24, 2025. Added comprehensive 3D effects to founder cards including hover transforms, shadows, profile image scaling, and interactive social media icons
- January 24, 2025. Replaced products section with horizontal scrolling carousel featuring Consumer Electronics, Agricultural Products, Textiles & Fashion, and Automotive Components with navigation arrows and "Saiba Mais" buttons
- January 24, 2025. Fixed carousel navigation buttons functionality and added glass card styling with noise-grid, gradient-border, and backdrop-blur effects to match founders section
- January 24, 2025. Made products carousel fully responsive: 4 cards on desktop, 2 on tablets, 1 on mobile with proper navigation and improved card content spacing
- January 24, 2025. Applied glass effect styling to product cards with noise-grid, gradient-border, and backdrop-blur while maintaining padded rounded images
- June 28, 2025. Updated product cards to match glassmorphism design with clean layout, category badges, and "Saiba Mais" buttons positioned at bottom
- June 28, 2025. Positioned navigation buttons on sides of cards with glassmorphism styling, backdrop blur, and enhanced hover effects
- June 28, 2025. Added gradient background and improved card contrast for better visibility with enhanced glassmorphism effect
- June 28, 2025. Enhanced navigation button visibility with higher opacity, stronger borders, custom arrow symbols, and improved positioning
- June 28, 2025. Added custom glassmorphism navigation buttons with Lucide icons for products slider with proper positioning and hover effects
- June 28, 2025. Updated "Saiba Mais" buttons to glass design with backdrop blur, semi-transparent backgrounds, and consistent glassmorphism styling
- June 28, 2025. Applied complete glassmorphism design to navigation buttons with semi-transparent backgrounds, glass borders, and backdrop blur effects
- June 28, 2025. Enhanced transparency across all glass elements - reduced card opacity to 30%, buttons to 10% for cleaner, more transparent glass aesthetic
- June 28, 2025. Updated section header to "Premium Commodities" with gradient text, blue pill badge, and agricultural products description
- June 28, 2025. Changed button text from "Saiba Mais" to "Learn More" in English across all product cards
- June 28, 2025. Updated Client Testimonials for mobile devices below 800px: previous/next testimonials at 50% opacity, main testimonial at 100% opacity with horizontal layout
- June 28, 2025. Fixed desktop testimonials centering with improved flex container, increased height to 500px, and larger circle radius for proper circular layout
- June 28, 2025. Reduced inner padding for client logos from p-8/p-10/p-12 to p-4/p-5/p-6 for better logo visibility and reduced white space
- June 28, 2025. Updated products carousel responsive design: 1 card visible below 770px with navigation buttons, 2 cards from 770px+
- June 28, 2025. Inverted footer colors: black background in light mode, white background in dark mode
- June 28, 2025. Made footer fully responsive with optimized layouts, typography scaling, and proper spacing for all device sizes
- June 28, 2025. Updated Products navigation to go to dedicated products page and scroll to top header automatically
- June 28, 2025. Successfully migrated project from Replit Agent to standard Replit environment with full compatibility
- June 28, 2025. Implemented dynamic product category pages system with individual routes for each product category (/products/agriculture_product, /products/consumer_electronics, etc.)
- June 28, 2025. Added comprehensive product category pages featuring sliding hero backgrounds, product grids with trade volumes, and request quote functionality
- June 28, 2025. Updated home page product cards to navigate to specific category pages instead of general products page
- June 28, 2025. Implemented automatic scroll-to-top functionality for all page navigations ensuring pages start from header section
- June 28, 2025. Applied glassmorphism styling to Agricultural Products page cards with box shadows and rounded image corners
- June 28, 2025. Added black and white Three.js floating animation to product category pages for professional aesthetic
- June 28, 2025. Successfully completed migration from Replit Agent to standard Replit environment with full project compatibility
- June 28, 2025. Fixed mobile grid layouts across all components: improved responsive spacing, proper padding scales, and optimal grid columns for different screen sizes
- June 28, 2025. Optimized mobile font sizes across all homepage sections: reduced text sizes for mobile devices while maintaining readability and visual hierarchy
- June 28, 2025. Successfully completed migration from Replit Agent to standard Replit environment with full project compatibility
- June 28, 2025. Fixed product card navigation on both home page and Products page - cards now properly navigate to respective category pages with console logging and smooth scrolling
- June 28, 2025. Added consistent CLIFTON logo blinking loading screen to Products page to hide navigation during page load, maintaining brand consistency across all pages
- June 28, 2025. Applied CLIFTON logo loading screen to all product category pages (/products/agriculture_product, /products/consumer_electronics, etc.) with proper React hooks structure to prevent navigation visibility during page loads
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```