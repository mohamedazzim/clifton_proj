import { 
  founders, 
  products, 
  projects, 
  contacts,
  type Founder, 
  type InsertFounder,
  type Product,
  type InsertProduct,
  type Project,
  type InsertProject,
  type Contact,
  type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Founders
  getFounders(): Promise<Founder[]>;
  createFounder(founder: InsertFounder): Promise<Founder>;
  
  // Products
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectsByYear(year: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private founders: Map<number, Founder>;
  private products: Map<number, Product>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentFounderId: number;
  private currentProductId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.founders = new Map();
    this.products = new Map();
    this.projects = new Map();
    this.contacts = new Map();
    this.currentFounderId = 1;
    this.currentProductId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed founders
    const foundersData: InsertFounder[] = [
      {
        name: "Benson Clement",
        position: "Managing Director",
        bio: "BA English Literature, MBA HR and Marketing. With 12 years of experience in textiles, trading, import and export, Benson leads strategic operations and business development.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        email: "benson@cliftontraders.com",
        linkedin: "https://linkedin.com/in/benson-clement-clifton",
        twitter: "https://twitter.com/bensonclement_md",
        instagram: "https://instagram.com/bensonclement_director",
        facebook: "https://facebook.com/benson.clement.clifton",
        order: 1
      },
      {
        name: "Joseph Ebenezer",
        position: "Technical Director",
        bio: "B.Sc (Physics), MBA (HR & Marketing). With 10 years of experience in sales & marketing in IT & Non-IT sector services, Joseph drives technical strategy and market expansion.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        email: "joseph@cliftontraders.com",
        linkedin: "https://linkedin.com/in/joseph-ebenezer-clifton",
        twitter: "https://twitter.com/josephebenezer_td",
        instagram: "https://instagram.com/josephebenezer_tech",
        facebook: "https://facebook.com/joseph.ebenezer.clifton",
        order: 2
      }
    ];

    foundersData.forEach(founder => {
      const id = this.currentFounderId++;
      this.founders.set(id, { ...founder, id, order: founder.order });
    });

    // Seed products/services
    const productsData: InsertProduct[] = [
      {
        name: "Import Services",
        description: "Sourcing high-quality products from trusted suppliers worldwide.",
        category: "Import",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 1
      },
      {
        name: "Export Services",
        description: "Helping businesses expand their reach by connecting them with international markets.",
        category: "Export",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 2
      },
      {
        name: "Logistics & Supply Chain Management",
        description: "Ensuring efficient transportation, warehousing, and delivery of goods.",
        category: "Logistics",
        imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 3
      },
      {
        name: "Customs Clearance",
        description: "Navigating complex regulations to ensure hassle-free trade.",
        category: "Customs",
        imageUrl: "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 4
      },
      {
        name: "Market Research & Consulting",
        description: "Providing insights and strategies to help businesses succeed in global markets.",
        category: "Consulting",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 5
      }
    ];

    productsData.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id, order: product.order });
    });

    // Seed projects
    const projectsData: InsertProject[] = [
      {
        title: "Brazilian Manufacturing Partnership",
        description: "Successfully exported €2.5M worth of industrial machinery to establish manufacturing capabilities in São Paulo.",
        category: "industrial",
        location: "São Paulo, Brazil",
        year: 2024,
        status: "Completed",
        imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 1
      },
      {
        title: "European Electronics Network",
        description: "Establishing distribution channels for consumer electronics across 5 European markets with local partners.",
        category: "technology",
        location: "Multiple European Cities",
        year: 2024,
        status: "In Progress",
        imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 2
      },
      {
        title: "Asian Agricultural Partnership",
        description: "Launched premium Spanish agricultural products export program to high-end markets in Japan and South Korea.",
        category: "agriculture",
        location: "Tokyo & Seoul",
        year: 2023,
        status: "Completed",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        order: 3
      }
    ];

    projectsData.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id, order: project.order });
    });
  }

  // Founders methods
  async getFounders(): Promise<Founder[]> {
    return Array.from(this.founders.values()).sort((a, b) => a.order - b.order);
  }

  async createFounder(insertFounder: InsertFounder): Promise<Founder> {
    const id = this.currentFounderId++;
    const founder: Founder = { ...insertFounder, id, order: insertFounder.order || 0 };
    this.founders.set(id, founder);
    return founder;
  }

  // Products methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => a.order - b.order);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id, order: insertProduct.order || 0 };
    this.products.set(id, product);
    return product;
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async getProjectsByYear(year: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.year === year)
      .sort((a, b) => a.order - b.order);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id, order: insertProject.order || 0 };
    this.projects.set(id, project);
    return project;
  }

  // Contacts methods
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
