import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const PORT = 3000;

// Helper to safely read JSON files
async function readJsonFile<T>(filePath: string, defaultData: T): Promise<T> {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const data = await fs.readFile(absolutePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    // If the file doesn't exist, try to create it with default data
    try {
      const absolutePath = path.resolve(process.cwd(), filePath);
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });
      await fs.writeFile(absolutePath, JSON.stringify(defaultData, null, 2), "utf-8");
    } catch (writeErr) {
      console.error(`Error creating default file at ${filePath}:`, writeErr);
    }
    return defaultData;
  }
}

// Helper to safely write JSON files
async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    return false;
  }
}

async function startServer() {
  const app = express();
  
  // Parse incoming JSON payloads
  app.use(express.json());

  // -------------------------------------------------------------
  // API Endpoints
  // -------------------------------------------------------------

  // --- Student Certificate Verification ---
  
  // Verify a certificate by Roll Number
  app.get("/api/certificates/:roll", async (req, res) => {
    const { roll } = req.params;
    const certs = await readJsonFile<any[]>("./data/certificates.json", []);
    const student = certs.find(c => String(c.rollNo).trim().toLowerCase() === String(roll).trim().toLowerCase());
    
    if (student) {
      res.json({ success: true, student });
    } else {
      res.status(404).json({ success: false, message: "Invalid Roll Number" });
    }
  });

  // Get all certificates (Admin)
  app.get("/api/certificates", async (req, res) => {
    const certs = await readJsonFile<any[]>("./data/certificates.json", []);
    res.json(certs);
  });

  // Create a new certificate (Admin)
  app.post("/api/certificates", async (req, res) => {
    const { rollNo, name, course, duration, status } = req.body;
    
    if (!rollNo || !name || !course || !duration || !status) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const certs = await readJsonFile<any[]>("./data/certificates.json", []);
    
    // Check if roll number already exists
    const exists = certs.some(c => String(c.rollNo).trim().toLowerCase() === String(rollNo).trim().toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: "Roll Number already exists" });
    }

    const newCert = {
      id: "cert-" + Date.now(),
      rollNo,
      name,
      course,
      duration,
      status
    };

    certs.push(newCert);
    await writeJsonFile("./data/certificates.json", certs);
    res.status(201).json({ success: true, student: newCert });
  });

  // Update a certificate (Admin)
  app.put("/api/certificates/:id", async (req, res) => {
    const { id } = req.params;
    const { rollNo, name, course, duration, status } = req.body;
    const certs = await readJsonFile<any[]>("./data/certificates.json", []);
    
    const index = certs.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    // Check if new roll number belongs to someone else
    if (rollNo && rollNo !== certs[index].rollNo) {
      const exists = certs.some(c => c.id !== id && String(c.rollNo).trim().toLowerCase() === String(rollNo).trim().toLowerCase());
      if (exists) {
        return res.status(400).json({ success: false, message: "Roll Number already exists" });
      }
    }

    certs[index] = {
      ...certs[index],
      ...(rollNo && { rollNo }),
      ...(name && { name }),
      ...(course && { course }),
      ...(duration && { duration }),
      ...(status && { status })
    };

    await writeJsonFile("./data/certificates.json", certs);
    res.json({ success: true, student: certs[index] });
  });

  // Delete a certificate (Admin)
  app.delete("/api/certificates/:id", async (req, res) => {
    const { id } = req.params;
    let certs = await readJsonFile<any[]>("./data/certificates.json", []);
    const initialLength = certs.length;
    
    certs = certs.filter(c => c.id !== id);
    
    if (certs.length === initialLength) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    await writeJsonFile("./data/certificates.json", certs);
    res.json({ success: true, message: "Certificate deleted successfully" });
  });


  // --- Course Inquiries (Enrollments) ---

  // Submit a course inquiry / enrollment
  app.post("/api/inquiries", async (req, res) => {
    const { name, phone, email, course } = req.body;

    if (!name || !phone || !email || !course) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const inquiries = await readJsonFile<any[]>("./data/inquiries.json", []);
    const newInquiry = {
      id: "inq-" + Date.now(),
      name,
      phone,
      email,
      course,
      createdAt: new Date().toISOString(),
      status: "New"
    };

    inquiries.push(newInquiry);
    await writeJsonFile("./data/inquiries.json", inquiries);
    res.status(201).json({ success: true, inquiry: newInquiry });
  });

  // Get all inquiries (Admin)
  app.get("/api/inquiries", async (req, res) => {
    const inquiries = await readJsonFile<any[]>("./data/inquiries.json", []);
    res.json(inquiries);
  });

  // Update inquiry status (Admin)
  app.put("/api/inquiries/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const inquiries = await readJsonFile<any[]>("./data/inquiries.json", []);
    
    const index = inquiries.findIndex(i => i.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    inquiries[index].status = status || inquiries[index].status;
    await writeJsonFile("./data/inquiries.json", inquiries);
    res.json({ success: true, inquiry: inquiries[index] });
  });

  // Delete an inquiry (Admin)
  app.delete("/api/inquiries/:id", async (req, res) => {
    const { id } = req.params;
    let inquiries = await readJsonFile<any[]>("./data/inquiries.json", []);
    const initialLength = inquiries.length;
    
    inquiries = inquiries.filter(i => i.id !== id);
    
    if (inquiries.length === initialLength) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    await writeJsonFile("./data/inquiries.json", inquiries);
    res.json({ success: true, message: "Inquiry deleted successfully" });
  });


  // --- Contact Messages ---

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const contacts = await readJsonFile<any[]>("./data/contacts.json", []);
    const newContact = {
      id: "msg-" + Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: "Unread"
    };

    contacts.push(newContact);
    await writeJsonFile("./data/contacts.json", contacts);
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  });

  // Get all contact messages (Admin)
  app.get("/api/contact", async (req, res) => {
    const contacts = await readJsonFile<any[]>("./data/contacts.json", []);
    res.json(contacts);
  });

  // Update contact message status (Admin)
  app.put("/api/contact/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const contacts = await readJsonFile<any[]>("./data/contacts.json", []);
    
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    contacts[index].status = status || contacts[index].status;
    await writeJsonFile("./data/contacts.json", contacts);
    res.json({ success: true, message: contacts[index] });
  });

  // Delete a contact message (Admin)
  app.delete("/api/contact/:id", async (req, res) => {
    const { id } = req.params;
    let contacts = await readJsonFile<any[]>("./data/contacts.json", []);
    const initialLength = contacts.length;
    
    contacts = contacts.filter(c => c.id !== id);
    
    if (contacts.length === initialLength) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    await writeJsonFile("./data/contacts.json", contacts);
    res.json({ success: true, message: "Message deleted successfully" });
  });


  // --- Admin Login ---

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials (simple, robust validation for AI Studio workspace environment)
    if (username === "admin" && password === "admin123") {
      res.json({ success: true, token: "best-center-token-" + Date.now() });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  });


  // -------------------------------------------------------------
  // Integration of Vite middleware for dev / express.static for prod
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Express listener
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
