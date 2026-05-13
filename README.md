# TickTick Todo Clone

A modern React Native Todo application inspired by TickTick, built with Expo Router, Zustand, Reanimated, and Shopify Restyle.

The project focuses on scalable architecture, smooth drag-and-drop interactions, and clean separation of concerns.

---

# Features

* Todo list grouped by categories
* Drag & drop between categories
* Create new todo items
* Responsive layout
* Smooth animations using Reanimated
* Lightweight global state management
* Feature-based scalable architecture

---

# Tech Stack

## Core

* React Native
* Expo
* Expo Router

## State Management

* Zustand

## UI / Styling

* Shopify Restyle

## Animations & Gestures

* react-native-reanimated
* react-native-gesture-handler

## Persistence

* AsyncStorage

---

# Architecture

The project follows a feature-based architecture inspired by modern production-grade React Native applications.

The routing layer is isolated from business logic to ensure scalability and maintainability.

```txt
src/
  app/                # Routing layer only
  features/           # Business features
  shared/             # Shared UI and utilities
  entities/           # Domain models
  store/              # Global state
```

## Architectural Principles

* Separation of concerns
* Reusable UI components
* Scalable feature modules
* Isolated business logic
* Predictable global state
* Minimal rerenders during drag interactions

---

# State Management

Global application state is managed with Zustand.

Zustand was selected because it provides:

* minimal boilerplate
* excellent performance
* simple scalable architecture
* predictable state updates

Local UI state (modals, inputs) is handled with React state when appropriate.

---

# Drag & Drop

Drag and drop interactions are implemented using:

* react-native-gesture-handler
* react-native-reanimated

Animations are handled on the UI thread to ensure smooth interactions and avoid unnecessary React rerenders.

---

# Folder Structure

```txt
src/
  app/
  entities/
  features/
    todos/
      model/
      ui/
      lib/
  shared/
    ui/
    theme/
    lib/
  store/
```

---

# Installation

```bash
npm install
```

---

# Run the project

## iOS

```bash
npm run ios
```

## Android

```bash
npm run android
```

## Web

```bash
npm run web
```

---

# Testing

The project includes unit tests for core business logic such as:

* adding todos
* moving todos between categories
* grouping todos

---

# Future Improvements

* Backend synchronization
* Offline-first support
* Todo editing
* Swipe actions
* Advanced filtering
* Dark mode customization

---

# Notes

The goal of this project was not only to recreate a Todo application, but also to demonstrate production-level React Native architecture and maintainable frontend engineering practices.
