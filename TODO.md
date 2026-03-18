# Dynamic Division Integration for Registration Forms

## Plan Overview
Connect Classification/Division field to Admin module via dynamic API fetch.

## Steps
- [x] 1. Add `Division` TS interface to `resources/js/types/index.ts`
- [x] 2. Add API route `GET /api/divisions` to `routes/web.php`
- [x] 3. Add `apiIndex()` method to `app/Http/Controllers/Admin/DivisionController.php`
- [x] 4. Update `resources/js/Components/Landing/RegistrationForm.tsx` for useEffect fetch + merge SSR
- [x] 5. Update `resources/js/pages/registration/create.tsx` for useEffect fetch + merge SSR
- [x] 6. Test: Check dynamic load, form submit, admin CRUD reflection
- [x] 7. Final verification: TS no errors, `npm run build` passes

**Progress: 7/7 complete**

