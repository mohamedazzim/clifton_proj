// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  founders;
  products;
  projects;
  contacts;
  currentFounderId;
  currentProductId;
  currentProjectId;
  currentContactId;
  constructor() {
    this.founders = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.currentFounderId = 1;
    this.currentProductId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    this.seedData();
  }
  seedData() {
    const foundersData = [
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
    foundersData.forEach((founder) => {
      const id = this.currentFounderId++;
      this.founders.set(id, { ...founder, id, order: founder.order });
    });
    const productsData = [
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
    productsData.forEach((product) => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id, order: product.order });
    });
    const projectsData = [
      {
        title: "Brazilian Manufacturing Partnership",
        description: "Successfully exported \u20AC2.5M worth of industrial machinery to establish manufacturing capabilities in S\xE3o Paulo.",
        category: "industrial",
        location: "S\xE3o Paulo, Brazil",
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
    projectsData.forEach((project) => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id, order: project.order });
    });
  }
  // Founders methods
  async getFounders() {
    return Array.from(this.founders.values()).sort((a, b) => a.order - b.order);
  }
  async createFounder(insertFounder) {
    const id = this.currentFounderId++;
    const founder = { ...insertFounder, id, order: insertFounder.order || 0 };
    this.founders.set(id, founder);
    return founder;
  }
  // Products methods
  async getProducts() {
    return Array.from(this.products.values()).sort((a, b) => a.order - b.order);
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = { ...insertProduct, id, order: insertProduct.order || 0 };
    this.products.set(id, product);
    return product;
  }
  // Projects methods
  async getProjects() {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }
  async getProjectsByCategory(category) {
    return Array.from(this.projects.values()).filter((project) => project.category === category).sort((a, b) => a.order - b.order);
  }
  async getProjectsByYear(year) {
    return Array.from(this.projects.values()).filter((project) => project.year === year).sort((a, b) => a.order - b.order);
  }
  async createProject(insertProject) {
    const id = this.currentProjectId++;
    const project = { ...insertProject, id, order: insertProject.order || 0 };
    this.projects.set(id, project);
    return project;
  }
  // Contacts methods
  async getContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var founders = pgTable("founders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  email: text("email"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  facebook: text("facebook"),
  order: integer("order").notNull().default(0)
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0)
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  year: integer("year").notNull(),
  status: text("status").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0)
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertFounderSchema = createInsertSchema(founders).omit({
  id: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/founders", async (req, res) => {
    try {
      const founders2 = await storage.getFounders();
      res.json(founders2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch founders" });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const { category, year } = req.query;
      let projects2;
      if (category && category !== "all") {
        projects2 = await storage.getProjectsByCategory(category);
      } else if (year) {
        projects2 = await storage.getProjectsByYear(parseInt(year));
      } else {
        projects2 = await storage.getProjects();
      }
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ message: "Invalid contact data", errors: error });
      } else {
        res.status(500).json({ message: "Failed to create contact" });
      }
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
