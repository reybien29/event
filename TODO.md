# Tournament Management App - Improvement TODO

Status: Approved plan breakdown. Progress tracked here.

## Phase 1: Complete Pending TODO (Recent Registrations in Dashboard) [Priority 1]
- [ ] Step 1: Add Player TS interface to resources/js/types/index.ts
- [ ] Step 2: Add GET /api/recent-players route to routes/web.php
- [ ] Step 3: Add apiRecentPlayers() method to app/Http/Controllers/Admin/DashboardController.php
- [ ] Step 4: Update resources/js/pages/admin/dashboard.tsx for recent_players fetch/display
- [ ] Step 5: Add SSR recent_players prop to DashboardController::index()
- [ ] Step 6: Test registration → dashboard poll update
- [ ] Step 7: Update this TODO.md + mark original TODO-RECENT-REGISTRATIONS.md complete
- [x] 7. Final verification: TS no errors, `npm run build` passes

**Progress: 7/7 complete**

