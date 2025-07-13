# Change Log for Index/Permission Debugging

This file tracks temporary changes made to the codebase to resolve Firestore index and permission issues. It will serve as a checklist for reverting the application to a production-ready state.

## 1. `package.json` Modifications

**Original `dev` script:**
```json
"dev": "next dev --turbopack -p 9003" 
```
*(Note: Original port was 9002, but was changed to 9003 due to EADDRINUSE errors).*

**Temporary Changes Made:**
- Removed `NODE_OPTIONS='--inspect'` flag to simplify process logging and avoid debugger port conflicts.

**Final State Target:**
```json
"dev": "next dev --turbopack -p 9003"
```
*(The simplified script is stable and can be kept).*

---

## 2. `firestore.rules` Evolution

1.  **Initial State:** Rules only defined for `/users/{userId}`.
2.  **Problem:** This caused `permission-denied` errors for `posts`, `prayerRequests`, and `journalEntries` collections.
3.  **Attempt 1 & 2:** Added rules for other collections, but they were too complex or had logical errors for `list` and `count` queries.
4.  **Current State (Temporary):** Using wide-open rules for any authenticated user to unblock index creation.
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```
5.  **Final State Target:** Deploy the final, secure ruleset once indexes are created.

---

## Revert Checklist

- [ ] Deploy final, secure `firestore.rules`.
- [ ] Confirm `package.json` `dev` script is stable.
- [ ] Delete `FIREBASE_DEBUG_CHANGES.md`.