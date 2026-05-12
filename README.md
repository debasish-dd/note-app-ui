# React Native Notes App

A simple Notes App UI built with React Native and Expo.

This project was created while learning React Native fundamentals such as:

- State management using `useState`
- Dynamic theming (Dark/Light mode)
- Form handling
- FlatList rendering
- Search functionality
- Conditional rendering
- Reusable components
- React Native styling
- Navigation through state-based rendering

---

# Features

- Create notes
- Search notes by title or description
- Dark / Light mode toggle
- Dynamic UI rendering
- View full note details
- KeyboardAvoidingView support
- FlatList optimization
- Custom theme styling

---

# Tech Stack

- React Native
- Expo
- TypeScript
- Lucide React Native Icons

---

# Screenshots

## Light Mode

(Add screenshot here)

## Dark Mode

(Add screenshot here)

## Search Functionality

(Add screenshot here)

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Move into the project directory:

```bash
cd your-repo-name
```

Install dependencies:

```bash
npm install
```

Start Expo server:

```bash
npx expo start
```

---

# Project Structure

```bash
.
├── app
│   └── index.tsx
├── components
│   └── Note.tsx
├── assets
├── package.json
└── README.md
```

---

# Core Concepts Used

## 1. State Management

The project uses `useState` extensively for:

- Theme state
- Form state
- Notes state
- Search state
- Selected note state

---

## 2. Search Functionality

Search is implemented using:

```tsx
noteData.filter()
```

The app filters notes dynamically while typing.

Search supports:

- Title matching
- Description matching
- Case-insensitive search

---

## 3. Conditional Rendering

Example:

```tsx
if (selectedNote) {
  return <Note />
}
```

The app switches screens without React Navigation.

---

## 4. Dynamic Theme System

Theme colors are generated dynamically using:

```tsx
StyleSheet.create()
```

based on dark/light mode state.

---

# Challenges Faced

- Managing multiple UI states
- Implementing dynamic search
- Conditional rendering logic
- Theme synchronization
- Handling FlatList rendering
- Responsive styling

---



# Learning Outcome

This project helped me understand:

- React Native fundamentals
- Component architecture
- State-driven UI
- List rendering
- Dynamic styling
- Search/filter logic
- Mobile UI patterns

---

# Reviewer Notes

This project focuses primarily on learning React Native fundamentals rather than production-level architecture.

Main areas demonstrated:

- Clean state updates
- Functional React patterns
- Dynamic rendering
- Reusable UI components
- User interaction handling

---

# Author

Debasish Das

GitHub:
https://github.com/debasish-dd
