# React Native Mid 

## Goal
- Consume a **public API with no API key**
- Render a **list** with clean UX (loading / error / retry)
- Open a **details view** when selecting an item

> Focus on shipping something **working and clean**, not perfect.

---

## API (free, no key)
Use **Random User API** https://randomuser.me/:

---

## Requirements (Must-have)

### 1) Main screen: “User Directory”
- Fetch the API on screen mount.
- Render a `FlatList` showing:
  - Photo (thumbnail)
  - Full name
  - City + Country
- States:
  - **Loading**: `ActivityIndicator`
  - **Error**: message + **Retry** button
  - **Empty**: “No results” when there are no items

### 2) Refresh
- Implement **pull-to-refresh** (reload data keeping the same `seed`).

### 3) Details
When tapping a user, show details (can be a `Modal` or navigation):
- Email
- Phone
- Location (simple string)

---

## Bonus (if you have extra time)
- Name search:
  - `TextInput` + **~300ms debounce** (no libraries)
- Pagination
- Basic performance
  
---

## Constraints
- TypeScript (avoid `any`)
- No “weird” extra libraries (use RN/Expo built-ins)
- Keep code readable (minimum: separate an `api.ts` or a `useUsers` hook)

