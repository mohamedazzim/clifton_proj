# CLIFTON - Premium Import Export Business Website

## Overview
CLIFTON is a modern, full-stack web application for a premium import-export business based in Spain. It showcases company information, product catalogs, and project portfolios, enabling contact management. The project aims to provide a comprehensive and visually appealing online presence for international trade, combining a robust technical foundation with a sophisticated user experience to attract and engage global clients.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The application features a modern UI with a glass morphism design, incorporating noise textures and gradients. It includes a complete theming system with dark mode support and custom CSS variables for consistent branding. Design principles emphasize responsiveness with a mobile-first approach, interactive 3D graphics for background animations, and an intuitive user experience.

### Technical Implementations
The frontend is built with React 18 and TypeScript, using Vite for fast development and optimized builds. shadcn/ui components, based on Radix UI, are styled with Tailwind CSS. Wouter handles client-side routing, TanStack Query manages server state, and React Hook Form with Zod provides robust form handling.

The backend uses Node.js with Express.js and TypeScript, designed with RESTful API endpoints. Data persistence is managed by PostgreSQL via Drizzle ORM, with Neon Database for serverless deployment. The system features end-to-end TypeScript for type safety and a monorepo structure for shared types and schemas. Internationalization is supported for English and Portuguese.

### Feature Specifications
- **Founders Section**: Displays company leadership profiles with images and bios.
- **Products Section**: Showcases product catalogs with categories, descriptions, and filtering capabilities. Includes a carousel for product navigation and dedicated product category pages.
- **Projects Section**: Presents a portfolio of completed projects (note: currently removed from main navigation).
- **Contact Management**: Features a contact form for inquiries, with submissions stored in the database.
- **Dynamic Content**: Data for founders, products, projects, and contacts is served via RESTful API endpoints.
- **Interactive Elements**: Includes interactive 3D particle system backgrounds and enhanced hover effects on UI components.

### System Design Choices
The architecture follows a monorepo structure, ensuring shared types and schemas across the frontend and backend for improved development efficiency and type safety. Performance is prioritized through optimized images, lazy loading, and code splitting. The application is configured for autoscale deployment on Replit, with internal and external port mapping and environment variable management for database connections.

## Recent Changes (August 1, 2025)

### Product Card UI Cleanup & Individual Product Page Updates
- **Removed min trade volume and min order from agriculture product cards** on `/products/agriculture_product` endpoint as requested
- **Updated individual product pages with specific minimum order requirements**:
  * Coffee: Min 50 MT (changed from 25 MT)
  * Sugar: Min 12500 MT (changed from 100 MT) 
  * Corn: Min 12500 MT (changed from 100 MT)
  * Soybeans: Min 5000 MT (changed from 75 MT)
- **Improved product card layout** by removing trade volume/min order sections for cleaner appearance
- Product cards now focus on product description and call-to-action buttons only
- Individual product detail pages retain all comprehensive information including the updated minimum orders

## Previous Changes (August 1, 2025)

<<<<<<< HEAD
### Hero Section Enhancement & Content Cleanup
- **Removed "cringy icons"** from hero section Import/Export/Delivery text as requested
- Enhanced hero typography with professional fonts and better spacing
- Improved "CLIFTON" brand styling with advanced typography effects
- Made Import/Export/Delivery text more professional and catchy
- Updated founder bio: Joseph Ebenezer emphasizes "TRADING, IMPORT and EXPORT" experience
- Products section title confirmed as "Our Services" with focused messaging

=======
>>>>>>> d19fab30f0fcfcef29b28e81a6288730e829b8c1
### Phone Number Format Update
- Updated all phone numbers from +55 format to 0055 format as requested
- Changed +55 11 4559-3029 → 0055 11 4559-3029
- Changed +55 11 99734-5464 → 0055 11 99734-5464  
- Changed +55 11 96488-9444 → 0055 11 96488-9444
- Applied changes across Footer and Contact components

### Complete Portuguese Translation Implementation
- Expanded translation system for comprehensive end-to-end Portuguese coverage
- Added Portuguese translations for all product categories and descriptions
- Translated Footer services section including "Coffee Trading & Export", "Premium Salt Supply", etc.
- Implemented ProductDetail page translations for specifications, origins, certifications
- Added benefits section translations (Quality Certified, Fast Delivery, Competitive Pricing)
- Updated social media section translation ("Follow Us" → "Siga-nos")
- Ensured all hardcoded English text now uses translation keys for complete PT language support

<<<<<<< HEAD
### Migration to Replit Environment Completed
- Successfully migrated from Replit Agent to standard Replit environment
- Fixed server host binding from 127.0.0.1 to 0.0.0.0 for Replit compatibility
- Verified all API endpoints working correctly (founders, products, contacts)
- Confirmed client-server communication is functioning properly
- All required packages already installed and working
- Application running successfully on port 5000

### UI/UX Header Restoration & Content Updates
- **REVERSED PREVIOUS CHANGE**: Restored transparent glass morphism header design as requested
- Changed from solid milk-white background back to glass effect with backdrop blur
- Updated navigation styling: `glass glass-enhanced backdrop-blur-xl shadow-2xl border border-white/20`
- Removed solid background (`bg-stone-50`) and restored modern translucent appearance
- Header now features the original transparent, blurry view with glass morphism effect
- Enhanced brand styling: "CLIFTON" font with professional typography, letter spacing, and text shadow
- Updated products section title/subtitle: "Our Services" with focused messaging
- Moved "Meet Our Founders" section above Contact Form in main landing page
- Updated founder titles: Benson Clement (CEO), Joseph Ebenezer (COO)
- Added "trading, import and export" experience to Joseph Ebenezer's bio
- Applied changes to both English and Portuguese translations
=======
### UI/UX Improvements
- Fixed navbar background to solid milk-white color for better visibility
- Removed all transparency effects from navigation bar
- Updated main page backgrounds to consistent milk-white tone across all pages
- Ensured navbar text remains dark and visible against any background
- Applied changes to Home, Products, ProductCategory, and ProductDetail pages
- Updated carousel background images to use milk-white theme with improved visibility
- Added navigation dots to hero section carousel for better user interaction
- Enhanced image filters to maintain professional appearance while keeping light theme
>>>>>>> d19fab30f0fcfcef29b28e81a6288730e829b8c1

### Migration to Replit Environment Completed
- Successfully migrated from Replit Agent to standard Replit environment
- Fixed server host binding from 127.0.0.1 to 0.0.0.0 for Replit compatibility
- Verified all API endpoints working correctly (founders, products, contacts)
- Confirmed client-server communication is functioning properly
- All required packages already installed and working
- Application running successfully on port 5000

## Previous Changes (July 31, 2025)

### Contact Information Update
- Updated all contact information throughout the application with real CLIFTON TRADERS details
- Company: CLIFTON TRADERS, São Paulo, Brazil
- Address: Rua Mathias Maciel de Almeida, 55, Centro - 06.730-482, Vargem Grande Paulista
- Phone numbers: +55 11 4559-3029, +55 11 99734-5464, +55 11 96488-9444
- CNPJ: 60.290.109/0001-32
- Updated Footer and Contact components with authentic company information

### Translation System Removal
- Removed OpenAI-powered translation system as requested by user
- Cleaned up translation-related files: translationService, translation routes, LanguageSelector
- Simplified ProductDetail pages to use original English content
- Maintained existing UI/UX design without translation features

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