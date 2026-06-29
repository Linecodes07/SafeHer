# SafeHer - Web Foundation Architecture

This repository contains the architecture and project foundation for **SafeHer**, a domestic violence safety and support platform.

> **Note:** The AI Studio environment strictly supports Web applications (React, Vite, TypeScript). The architectural requirements (Clean Architecture, Feature-first, strict security, MVVM/Hooks, etc.) requested for Flutter have been meticulously translated into a highly scalable, enterprise-grade React Web application foundation.

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Material 3 inspired design system)
- **State Management:** Zustand (Global State) + React Context (Local/Auth State)
- **Routing:** React Router v7
- **Backend/BaaS:** Firebase (Auth, Firestore, Storage)
- **Networking:** Axios (with interceptors, retry logic)
- **Storage:** LocalForage (IndexedDB for offline capabilities)
- **AI:** @google/genai (Gemini API)
- **Security:** AES Encryption (CryptoJS/WebCrypto), Route Guards

## Architecture Pattern

We follow a **Feature-First Clean Architecture**:

```text
src/
âââ features/              # Feature modules (Auth, SOS, AI Assistant, etc.)
â   âââ [feature_name]/
â       âââ components/    # Feature-specific UI
â       âââ hooks/         # Feature-specific business logic
â       âââ services/      # Data fetching, Firebase interactions
â       âââ types/         # Domain entities
âââ core/                  # Application core services
â   âââ api/               # Axios clients, interceptors
â   âââ firebase/          # Firebase config and wrappers
â   âââ routing/           # Global route definitions
â   âââ errors/            # Centralized error handling
â   âââ security/          # Encryption, sanitization
â   âââ storage/           # Local storage interfaces
âââ components/            # Shared, reusable UI components (Buttons, Cards)
âââ constants/             # App-wide constants (Strings, Endpoints)
âââ store/                 # Global state (Zustand)
âââ utils/                 # Helpers (Logger, Date formatters)
```

## Database Design (Firestore Schema)

The database is designed for scale and security.

### 1. `users` (Collection)
- `id` (String, PK)
- `email` (String, encrypted/hashed)
- `displayName` (String, optional/fake name for safety)
- `createdAt` (Timestamp)
- `settings` (Map: dark mode, stealth mode)

### 2. `trusted_contacts` (Subcollection under `users`)
- `id` (String, PK)
- `name` (String)
- `phone` (String, encrypted)
- `email` (String, encrypted)
- `isEmergency` (Boolean)

### 3. `emergency_alerts` (Collection)
- `id` (String, PK)
- `userId` (String, FK)
- `timestamp` (Timestamp)
- `location` (GeoPoint, encrypted/fuzzed)
- `status` (String: "active", "resolved")

### 4. `evidence_vault` (Subcollection under `users`)
- `id` (String, PK)
- `type` (String: "image", "audio", "note")
- `storageUrl` (String, pointing to Firebase Storage)
- `timestamp` (Timestamp)
- `isEncrypted` (Boolean) - *Client-side encryption flag*

### 5. `journal_entries` (Subcollection under `users`)
- `id` (String, PK)
- `title` (String, encrypted)
- `content` (String, encrypted)
- `createdAt` (Timestamp)

## Security Architecture

1. **Authentication:** Firebase Auth handles session management.
2. **Data Encryption:** Sensitive fields (journal entries, evidence metadata) are encrypted client-side using the `core/security/encryption.ts` service before being sent to Firestore.
3. **Route Guards:** React Router uses an `AuthGuard` wrapper to prevent unauthorized access.
4. **Stealth Mode:** UI components can instantly switch to an innocuous "decoy" screen via a panic button or gesture.
5. **No Hardcoded Secrets:** All API keys are loaded via `.env` and injected at build time.

## Testing Structure

- **Unit Testing:** Vitest for utility functions, hooks, and services.
- **Component Testing:** React Testing Library for reusable UI widgets.
- **E2E Testing:** Playwright or Cypress for critical user flows (e.g., triggering an SOS).

## Code Quality

- Strict TypeScript (`"strict": true` in `tsconfig.json`).
- ESLint + Prettier for formatting.
- Conventional Commits enforced.
