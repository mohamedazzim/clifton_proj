# CLIFTON - Premium Import Export Business Website

## Overview
CLIFTON is a modern, full-stack web application for a premium import-export business based in Spain. It aims to provide a comprehensive and visually appealing online presence for international trade, showcasing company information, product catalogs, and project portfolios, and enabling contact management. The project combines a robust technical foundation with a sophisticated user experience to attract and engage global clients.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The application features a modern UI with a glass morphism design, incorporating noise textures and gradients. It includes a complete theming system with dark mode support and custom CSS variables. Design principles emphasize responsiveness with a mobile-first approach, interactive 3D graphics for background animations, and an intuitive user experience. The design prioritizes a clean, premium look with subtle shadows and professional spacing, including a Tesla-style white theme across the application for enhanced logo visibility and a unified aesthetic. The transparent glass morphism header design has been restored.

### Technical Implementations
The frontend is built with React 18 and TypeScript, using Vite. shadcn/ui components, based on Radix UI, are styled with Tailwind CSS. Wouter handles client-side routing, TanStack Query manages server state, and React Hook Form with Zod provides robust form handling.

The backend uses Node.js with Express.js and TypeScript, designed with RESTful API endpoints. Data persistence is managed by PostgreSQL via Drizzle ORM, with Neon Database for serverless deployment. The system features end-to-end TypeScript for type safety and a monorepo structure for shared types and schemas. Internationalization is supported for English and Portuguese.

### Feature Specifications
- **Founders Section**: Displays company leadership profiles.
- **Products Section**: Showcases product catalogs with categories, descriptions, and filtering capabilities, including a carousel for navigation and dedicated product category pages.
- **Projects Section**: Presents a portfolio of completed projects.
- **Contact Management**: Features a contact form for inquiries, with submissions stored in the database.
- **About Us Page**: Comprehensive company information including story, mission, vision, statistics, unique features, and core values with professional animations.
- **Contact Us Page**: Advanced contact page with multiple contact methods, department-specific contacts, interactive form with inquiry types, Google Maps integration, and business hours.
- **Navigation Enhancement**: Updated navigation system to support dedicated About Us and Contact Us pages with proper routing.
- **Navigation Scroll Fix**: Updated header navigation to scroll with user content instead of being fixed at the top, improving user experience.
- **Dynamic Content**: Data for founders, products, projects, and contacts is served via RESTful API endpoints.
- **Interactive Elements**: Includes interactive 3D particle system backgrounds and enhanced hover effects on UI components.
- **Tesla-Style Textiles**: The textiles_fashion category features a Tesla-inspired design with smooth animations, clean typography, and premium presentation.
- **Fixed CSS Issues**: Resolved malformed dark mode keyframes syntax errors that were causing build warnings.
- **Fixed React Hooks**: Corrected hooks ordering in ProductCategory component to prevent runtime errors.
- **UI/UX Fixes**: Added proper product headings on landing page and category pages, reused founder images consistently across CEO and COO profiles, and fixed coffee product font styling for visual consistency.
- **Project Migration**: Successfully migrated from Replit Agent to Replit environment with proper workflow configuration and verified API endpoints.
- **Favicon Setup**: Added CLIFTON logo as favicon with proper HTML meta tags for better branding.
- **Render Deployment Fix**: Fixed deployment issues for Render hosting including port configuration, missing API endpoints, CORS setup, and build optimization. Updated render.yaml to use standard build process with proper directory structure.
- **Debug Endpoints Added**: Added `/api/health` health check endpoint and `/api/debug/routes` for troubleshooting Render deployment issues. Confirmed code works locally but APIs return 404 on Render - issue is deployment configuration, not code.
- **Navigation Enhancement**: Updated header navigation to scroll with user content instead of being fixed at the top, improving user experience.
- **Founder Images**: Updated both CEO and COO positions to use the real owner's professional photograph.
- **Products Section**: Fixed invisible heading issue by removing problematic GSAP animation that was setting opacity to 0.
- **Heading Conflicts**: Resolved "productCategory.ourProducts" display issue on agriculture_product page.
- **Corn Image Update**: Updated corn product image to use external high-quality Freepik URL in ProductCategory and ProductDetail components.
- **Replit Environment Migration**: Successfully completed migration from Replit Agent to standard Replit environment with proper dependency installation and workflow configuration.
- **Corn Image Update**: Updated corn product image to use external high-quality Freepik URL in ProductCategory and ProductDetail components.

### System Design Choices
The architecture follows a monorepo structure, ensuring shared types and schemas across the frontend and backend for improved development efficiency and type safety. Performance is prioritized through optimized images, lazy loading, and code splitting. The application is configured for autoscale deployment on Replit, with internal and external port mapping and environment variable management for database connections. All phone numbers are formatted as 0055.

## External Dependencies

### Core Dependencies
- `@neondatabase/serverless`: For serverless PostgreSQL connections.
- `drizzle-orm`: Type-safe ORM for PostgreSQL.
- `@tanstack/react-query`: Server state management for React.
- `@hookform/resolvers`: Integration for form validation.
- `three`: 3D graphics library for interactive animations.
- `date-fns`: Utilities for date manipulation.

### UI Components
- `@radix-ui/react-*`: Accessible UI primitives (e.g., dialogs, forms).
- `class-variance-authority`: Manages component variants for styling.
- `tailwind-merge`: Intelligently merges Tailwind CSS classes.
- `lucide-react`: Modern icon library.

### Development Tools
- `tsx`: TypeScript execution for development.
- `esbuild`: Fast JavaScript bundler.
- `postcss`: CSS processing, including Tailwind CSS plugin.