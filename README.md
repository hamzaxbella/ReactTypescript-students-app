# Student Manager

A small React and TypeScript CRUD exercise for managing student names and marks.

[Open the demo](https://students-app-one.vercel.app) · [Browse the code](https://github.com/hamzaxbella/ReactTypescript-students-app)

## Features

- Add and edit student records through modal forms.
- Confirm deletion before removing a record.
- Keep the list in browser `localStorage` across refreshes.

Built with React, TypeScript, Vite, and Font Awesome.

## Run locally

```bash
git clone https://github.com/hamzaxbella/ReactTypescript-students-app.git
cd ReactTypescript-students-app
npm ci
npm run dev
```

Open <http://localhost:5173> (or the address printed in the terminal).

```bash
npm run build
```

Use the build script to generate production output.

## Scope

`src/App.tsx` owns the list and persistence. `src/components/` contains forms, list items, and deletion confirmation. This is a learning project with local browser data, not a school administration system. Use sample records; there is no account system, server sync, or access control.
