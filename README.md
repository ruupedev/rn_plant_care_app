# Plant Care App

A React Native app that identifies a houseplant from a photo and fetches care instructions for it.
Users can sign in and save their plants to their own list.

Final project for the Mobile Programming course at Haaga-Helia University of Applied Sciences, 2026.

## Features

- Take a photo with the camera or pick one from the gallery
- Identify the plant with the Pl@ntNet API
- Fetch care instructions from the Open Plantbook API
- Register and sign in with Firebase Authentication
- Save, list and delete plants (Firestore)
- View each plant on its own details page

## Tech stack

- React Native, Expo, Expo Router
- TypeScript
- React Native Paper
- Firebase (Authentication, Firestore)
- Pl@ntNet API, Open Plantbook API

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_PLANTNET_API_KEY=
   EXPO_PUBLIC_PLANTBOOK_API_KEY=
   EXPO_PUBLIC_FIREBASE_API_KEY=
   ```
3. Start the development server:
   ```
   npx expo start
   ```
4. Open the app on your phone with Expo Go.

## Project structure

```
app/
  _layout.tsx      Root layout, navigation and auth redirect
  index.tsx        Plant list
  add.tsx          Identify a plant and save it
  login.tsx        Sign in and registration
  plant/[id].tsx   Plant details page
services/
  firebase.ts      Firebase setup
  plants.ts        Firestore functions
  plantbook.ts     Open Plantbook API
styles/
  style.ts         Shared styles
types/
  plant.ts         Plant type
```
