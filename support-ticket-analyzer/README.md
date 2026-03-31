# 🎫 Support Ticket Analyzer
### *An AI-Powered, Production-Grade Micro-Architecture for Support Automation*
This repository implements a modular, type-safe, and highly scalable Node.js backend designed to analyze support tickets using Large Language Models (LLMs). Built with **Domain-Driven Design (DDD)** principles and a focus on developer experience through strict TypeScript inference.
---
## 🚀 Key Features
*   **Modular Architecture**: Organized by domain (features). Each route contains its own controllers, services, schemas, and logic, making it easy to grow and maintain.
*   **Production-Grade Validation**: Implements a reusable **Zod Validation Middleware** that provides:
    *   Automatic type inference in controllers.
    *   Strict request body/params parsing (strips unknown fields).
    *   Standardized error responses for validation failures.
*   **Provider Pattern**: Decoupled LLM logic using an interface-based provider pattern. Easily swap between OpenAI, Anthropic, or local models without touching business logic.
*   **Fully Type-Safe**: 100% TypeScript with zero manual "double-typing" of request schemas and interfaces.
*   **RESTful Best Practices**: Standardized success/error response wrappers for a clean and predictable API.
## 🛠️ Built With
*   **Runtime**: Node.js (v20+ Recommended)
*   **Language**: TypeScript 
*   **Web Framework**: Express.js
*   **Data Validation**: Zod
*   **AI Integration**: OpenAI SDK (Expandable via Provider Pattern)
*   **Dev Tools**: Nodemon, ts-node
## 🏗️ Project Structure
```text
src/
├── config/             # App & Provider configurations
├── providers/          # AI Implementation (OpenAI, etc.)
├── routes/             # Core Business Modules
│   └── analyzer/       # <--- Modular Feature Example
│       ├── controller  # Request Handling
│       ├── service     # Business Logic
│       ├── routes      # Route Definitions
│       └── schema      # Zod validation & Type inference
├── utils/              
│   ├── middleware/     # Reusable logic (Validation, Auth)
│   └── apiResponse/    # Standardized JSON wrappers
└── app.ts              # Main Express configuration
🛠️ Getting Started
Install dependencies:
bash
npm install
Setup environment: Create a .env file with your OPENAI_API_KEY.
Run in development:
bash
npm run dev
