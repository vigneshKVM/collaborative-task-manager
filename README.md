# 🧩 Collaborative Task Manager

A modern, user-friendly task management tool built with **Next.js App Router**, **React**, **Zustand**, and **ShadCN UI**, allowing real-time collaboration with task filtering, sorting, drag-and-drop reordering, and more.

---

## Features

- Add, update, and delete tasks
- Search and filter tasks by status, priority, and title
- Sort tasks by due date or priority (ascending/descending)
- Drag-and-drop task reordering (column-based)
- UI built using [ShadCN UI](https://ui.shadcn.com/)
- State management via [Zustand](https://zustand-demo.pmnd.rs/)
- Data fetching and mutation using [TanStack Query](https://tanstack.com/query)

---

## Tech Stack

- **Next.js 14+ App Router**
- **React 18+**
- **TypeScript**
- **Zustand** – for local task state
- **TanStack Query** – for async task state
- **ShadCN UI** – for consistent, accessible UI components
- **Hello Pangea DnD** – for drag-and-drop support
- **Tailwind CSS** – for styling

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/collaborative-task-manager.git
cd collaborative-task-manager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action.

---

## Folder Structure

```
src/
├── app/                   # Next.js App Router structure
│   ├── api/               # In-memory API handlers
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks (useTasks, etc.)
├── lib/                   # Zustand store, utils, helpers
├── types/                 # TypeScript interfaces
```

---

## Development Notes

- All API operations (CRUD) are handled in-memory via `taskStore.ts`
- No database or persistent backend — suitable for demos or enhancements
- SSR-safe design — resolves hydration issues

---

## Future Improvements

- Persistent backend (e.g., Supabase, MongoDB)
- Auth support (NextAuth.js)
- Real-time sync with websockets
- Tagging and project-level grouping

---

## Author

**Vignesh Moorthy**  
[GitHub](https://github.com/vignesh-moorthy) • [LinkedIn](https://linkedin.com/in/vignesh-moorthy)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Recipes Route (`/recipies`)

This route is added to demonstrate integration with an external API.

### Endpoint

```
GET /recipies
```

### Description

Fetches a list of recipe data from an external API and renders it within the app. This is useful for demonstrating:

- External API consumption using Next.js
- Server-side fetching and rendering
- Custom pages outside of the core task manager

### Example Usage

Visit [http://localhost:3000/recipies](http://localhost:3000/recipies) in your browser to explore sample recipes.

---

