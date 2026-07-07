# Angular 21 Admin Template

A production-grade Angular admin dashboard template built with **Angular 21**, **PrimeNG**, and **Tailwind CSS**. This project demonstrates enterprise-level architecture patterns, reactive state management, and modern frontend best practices.

---

## 🎯 Project Overview

This is a **feature-complete admin template** designed to showcase professional Angular development skills. It implements modular architecture, reactive state management, and follows industry-standard design patterns.

### Key Technical Highlights

| Feature | Implementation |
|---------|---------------|
| **State Management** | RxJS BehaviorSubject with modular store pattern |
| **Architecture** | Layered modular design with separation of concerns |
| **UI Framework** | PrimeNG 21 + Tailwind CSS 4.x integration |
| **Security** | JWT authentication with guards and interceptors |
| **Testing** | Vitest with comprehensive test coverage |
| **Code Quality** | ESLint + Prettier + EditorConfig |

---

## 🛠️ Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Framework                      │
│  Angular 21  │  TypeScript 5.9  │  RxJS 7.8              │
├─────────────────────────────────────────────────────────────┤
│                      UI Layer                              │
│  PrimeNG 21.1  │  Tailwind CSS 4.3  │  PrimeIcons 7.0      │
├─────────────────────────────────────────────────────────────┤
│                    Development Tools                        │
│  Vitest 4.0  │  ESLint  │  Prettier  │  EditorConfig       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architecture Design

### Modular State Management Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                      AppStore (Global)                      │
│  • Shared Dictionaries  • Global Notifications             │
│  • Cross-module Filters  • App Initialization State        │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   FactoryStore  │  │  NewhouseStore  │  │   FeatureStores │
│  • State: factories[] │  • State: estates[]  │  • Scalable pattern │
│  • Actions: CRUD       │  • Actions: CRUD     │  • Reactive updates │
│  • Selectors: filters  │  • Selectors: queries│  • Type-safe        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Presentation Layer                                          │
│  • Components (pages, layouts, shared components)          │
├─────────────────────────────────────────────────────────────┤
│ Business Logic Layer                                        │
│  • Services (API, authentication, business logic)          │
│  • Stores (reactive state management)                      │
├─────────────────────────────────────────────────────────────┤
│ Data Layer                                                  │
│  • Models (TypeScript interfaces)                          │
│  • Data Services (API integration, mock data)              │
├─────────────────────────────────────────────────────────────┤
│ Infrastructure Layer                                        │
│  • Guards, Interceptors, Configuration                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Shared UI components
│   │   ├── base-dialog/     # Reusable dialog wrapper
│   │   └── common-tree/     # Tree component with recursion
│   ├── core/                # Core infrastructure
│   │   ├── guards/          # AuthGuard for route protection
│   │   ├── interceptors/    # HTTP interceptor (JWT handling)
│   │   ├── services/        # AuthService, ApiService
│   │   └── store/           # AppStore (global state)
│   ├── layouts/             # Layout components
│   │   ├── header/          # Responsive nav header
│   │   ├── sidebar/         # Collapsible sidebar with routing
│   │   └── layout/          # Main layout container
│   ├── modules/             # Feature modules
│   │   ├── factory/         # Factory management module
│   │   │   ├── data/        # API + mock implementations
│   │   │   ├── models/      # TypeScript interfaces
│   │   │   ├── pages/       # Page components
│   │   │   ├── store/       # FactoryStore
│   │   │   ├── utils/       # Module-specific utilities
│   │   │   └── factory.routes.ts
│   │   └── newhouse/        # New house management module
│   │       └── ...          # Same structure as factory
│   ├── pages/               # Standalone pages
│   │   ├── dashboard/       # Dashboard with data visualization
│   │   └── login/           # Authentication page
│   ├── services/            # Shared services
│   ├── styles/              # Global styles (Tailwind)
│   ├── utils/               # Utility functions
│   │   ├── date-utils.ts    # Date formatting utilities
│   │   ├── validation-utils.ts # Regex validation
│   │   └── tree-utils.ts    # Tree data structure helpers
│   ├── app.config.ts        # Angular configuration
│   ├── app.routes.ts        # Route configuration
│   └── app.ts               # Application entry
└── assets/                  # Static assets
```

---

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/your-username/angular21-admin.git
cd angular21-admin
npm install

# Development
npm start          # http://localhost:4200
npm run watch      # Auto-reload

# Build
npm run build      # Production build
npm run build:dev  # Development build

# Testing
npm test           # Run unit tests
npm test:watch     # Test watch mode

# Code Quality
npm run lint       # ESLint
npm run format     # Prettier formatting
```

---

## 🧰 Core Features Implemented

### 1. Reactive State Management
- **Modular Stores**: FactoryStore, NewhouseStore with type-safe state
- **Global State**: AppStore for cross-module data sharing
- **RxJS Integration**: BehaviorSubject with Observable streams
- **State Immutability**: Immutable state updates with spread operators

### 2. Security Implementation
- **JWT Authentication**: Token-based auth flow
- **Route Guards**: AuthGuard protecting authenticated routes
- **HTTP Interceptor**: Automatic token injection and refresh handling
- **Secure Storage**: Token management with session storage

### 3. UI/UX Components
- **PrimeNG Integration**: Full component library
- **Tailwind CSS 4.x**: Utility-first styling with CSS variables
- **Responsive Design**: Mobile-first layout approach
- **Dynamic Navigation**: Role-based menu rendering

### 4. Development Best Practices
- **TypeScript Strict Mode**: Full type safety
- **Standalone Components**: Angular 14+ standalone pattern
- **Dependency Injection**: Angular DI best practices
- **Error Handling**: Global error handling strategy

### 5. Testing Strategy
- **Unit Tests**: Component and service tests with Vitest
- **Mock Data**: Comprehensive mock implementations
- **Test Coverage**: High coverage targets

---

## 📊 Code Quality & Standards

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **ESLint** | Code linting | Angular-specific rules |
| **Prettier** | Code formatting | 100 char line width, single quotes |
| **EditorConfig** | IDE consistency | 2-space indentation |
| **TypeScript** | Type safety | Strict mode enabled |

---

## 🔧 Available Scripts

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss}\""
  }
}
```

---

## 📈 Performance Optimizations

- **Lazy Loading**: Module-level lazy loading configured
- **Tree Shaking**: Production builds optimized
- **Change Detection**: OnPush strategy where applicable
- **Bundle Analysis**: Built-in Angular CLI bundle reporting

---

## 🤝 Contributing

This project follows industry-standard contribution guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** with conventional commits (`feat(module): description`)
4. **Test** thoroughly
5. **Submit** a pull request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 📧 Contact

For professional inquiries:
- **Email**: wuc939727@gmail.com

---

*Built with Angular 21 | PrimeNG | Tailwind CSS*

---

## 🎯 What This Demonstrates

To potential employers, this project showcases:

1. **Advanced Angular Knowledge**: Modern Angular patterns and best practices
2. **Architecture Design**: Enterprise-level modular architecture
3. **Reactive Programming**: RxJS state management expertise
4. **Security Implementation**: Authentication and authorization
5. **Code Quality**: Commitment to clean, maintainable code
6. **Testing Practices**: Comprehensive test coverage
7. **Tooling Proficiency**: Modern development toolchain
8. **Documentation**: Clear project documentation

---

*This project was built from scratch to demonstrate professional frontend development skills.*