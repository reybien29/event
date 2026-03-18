# Recent Registration Players Feature

Dynamic display of latest registered players in admin dashboard.

## Steps
- [ ] 1. Add `Player` TS interface to `resources/js/types/index.ts`
- [ ] 2. Add API route `GET /api/recent-players` to `routes/web.php`
- [ ] 3. Add `apiRecentPlayers()` method to `app/Http/Controllers/Admin/DashboardController.php`
- [ ] 4. Update `resources/js/pages/admin/dashboard.tsx` for useEffect fetch + display responsive table/grid
- [ ] 5. Add SSR `recent_players` prop to DashboardController::index()
- [ ] 6. Test: Register new team/players → dynamic update in dashboard
- [ ] 7. Final: `npm run build` passes

**Progress: 0/7 complete**

