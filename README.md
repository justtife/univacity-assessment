# Univacity Assessment Application

A modern Angular + Ionic application built to demonstrate dynamic program listing, filtering, and detail viewing, leveraging robust state management and scalable architecture practices.

---

## 🛠 Installation & Setup

### Prerequisites

- Node.js v16+
- npm v8+
- Ionic CLI v7+

## 🚀 Setup Instructions

Follow the steps below to get the application up and running locally:

1. Clone the repository:
   ```bash
   https://github.com/justtife/univacity-assessment.git
   cd univacity-assessment
   ```
2. **Install dependencies:**

   ```bash
   npm run istl
   ```

   _(Note: 'npm install' can also be used.)_

3. **Start the development server:**
   Use either of the following commands:

   ```bash
   ionic serve
   ```

   or

   ```bash
   ng serve
   ```

4. **View the application:**
   - **Locally via:** `http://localhost:8100/`
   - **Online preview:** [https://univacity-assessment.vercel.app/](https://univacity-assessment.vercel.app/)

---

## 🧱 Component Architecture Overview

This project follows a modular and scalable architecture, designed for maintainability and potential integration into monorepo setups like Nx.

### Folder Structure

- **`pages/`**: Contains all feature-based page components.
- **`components/`**: Shared reusable UI components. A root barrel file (`component.ts`) is used to export all components, supporting a DRY (Don't Repeat Yourself) pattern and cleaner imports.
- **`services/`**: Houses all API and data handling logic.
- **`models/`**: Defines TypeScript interfaces and data models.
- **`ngrx/`**: Implements state management using NgRx, organized into:
  - `actions/`
  - `reducers/`
  - `effects/`
  - `selectors/`
  - `state/`

This layered architecture ensures:

- Separation of concerns
- High testability and reusability
- Centralized filter state for cross-component synchronization
- Standalone components for better isolation
- Memoized selectors for state access
- Loose coupling between components and data sources
- Easy integration with Nx-based or Domain-Driven Design (DDD) applications.

State management via NgRx allows for global and reactive handling of program data and filtering logic across components, enabling consistency and a better developer experience.

---

## ✅ Assumptions & Design Decisions

- Responsive layouts using Ionic's grid system
- The filter state is expected to be reusable across various pages and components; hence, global state management (NgRx) was adopted.
- Component reuse was prioritized by centralizing shared elements under the `components/` directory.
- Routes are assumed to follow RESTful ID-based patterns (e.g., `/programs/detail/:id/:title`).
- Styling and responsiveness were handled using Ionic's component library to accelerate UI development.

---

## ⚠ Known Limitations & Areas for Improvement

- **Testing:** Unit and integration tests were not implemented due to time constraints. Future improvements should incorporate testing via Jasmine/Karma or Jest.
- **Caching:** No caching layer was added to reduce repeated API calls. Introducing NgRx Entity or Angular Service Workers could improve performance.
- **Filtering Logic:** A more dynamic filtering mechanism could be implemented if detailed requirements were available.
- **Lazy Loading:** Pages are not lazy-loaded, which could affect performance in larger applications.

Despite these limitations, the development experience was smooth and rewarding.

---

## 💡 Additional Notes

- The codebase is written in TypeScript and uses strict typing for robustness.
- Built using standalone Angular components for cleaner architecture and less module overhead.
- Fully compatible with Ionic Capacitor, making it easily portable to native iOS/Android platforms if needed.
- Ready for deployment using Vercel or other cloud platforms with minimal configuration.

---

## 👨‍💻 Author

This application was developed as part of a coding assessment.
Feel free to fork, contribute, or reach out for improvements and collaborations.

- **Author**: [BOLUWATIFE FARINU](https://www.linkedin.com/in/farinu-boluwatife)
- **Email**: [farinubolu@gmail.com](mailto:farinubolu@gmail.com)
- **GitHub**: [https://github.com/justtife/](https://github.com/justtife/)

---
