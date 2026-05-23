# Burro Arab Tili Telegram Mini App — DESIGN.md

## 1. Product overview

Burro Arab Tili is a Telegram Mini App that teaches Arabic letters and sounds to Uzbek-speaking children. Users learn through bite-sized quiz modules, track progress via statistics and a leaderboard, and manage multiple children under a single parent account.

### Visual direction

- **Platform**: Telegram Mini App (WebView), mobile-first, 402×874 canvas.
- **Style**: Bright, playful, gradient-heavy. Blue-to-teal gradients for primary actions, white cards with inset shadows for content, warning-100 (amber) for streak badges.
- **Typography**: System font (SF Pro on iOS, Roboto on Android). Hierarchy: text-display-sm (headings), text-lg (card titles), text-sm (body), text-xs (metadata).
- **Shadows**: `shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]` — a 2px hard bottom edge combined with a subtle white inset highlight, giving a raised-card effect. Buttons get `shadow-[0_4px_0_0_rgb(11,79,164),0_8px_24px_-4px_rgba(18,183,229,0.44)]`.
- **Icons**: boxicons (bxs-* for filled, bx-* for outline) and boxicons logos for social. Custom SVG for language flags and gender icons.
- **Background**: `bg-gradient-to-b from-gray-25 via-white to-gray-200` — a very light gray fade used as the screen backdrop.

## 2. User roles

### Parent

A parent registers via Telegram OAuth, then adds one or more children. The Parent section of the app (node `384-14885`) contains profile settings, child management, language selection, and logout.

- Can view statistics for each child.
- Can add/edit/remove children.
- Can change app language.
- Can toggle notifications.

### Child / Learner

A child is the actual student. They see a role-appropriate UI: home screen with continue-module card, daily task, today's stats; module grid; quiz screens; leaderboard; and their own profile.

- Can start/continue modules.
- Can answer quiz questions (find_sound, find_letter, listen_find_letter, listen_find_sound).
- Can view their statistics and leaderboard position.
- Cannot manage other children or change language.

## 3. Full screen inventory

### Entry and onboarding

| Screen ID | Screen name | Route | Auth |
|-----------|-------------|-------|------|
| — | Telegram Bot Entry | `https://t.me/burro_arab_bot` | — |
| — | Welcome / Boshlash | `/burro/welcome` | Public |
| — | Login / Kirish | `/auth/login` | GuestGuard |
| — | Register / Ro'yxatdan o'tish | `/auth/register` | GuestGuard |
| — | Telegram OAuth Callback | `/auth/telegram/callback` | GuestGuard |

### Main app (Child / Learner)

| Screen ID | Screen name | Route | Auth |
|-----------|-------------|-------|------|
| `384:12481` | Home / Beged | `/burro` | AuthGuard + StudentGuard |
| — | Modules grid | `/burro/modules` | AuthGuard + StudentGuard |
| — | Module map | `/burro/modules/:moduleId` | AuthGuard + StudentGuard |
| — | Lesson detail | `/burro/modules/:moduleId/lesson` | AuthGuard + StudentGuard |
| — | Quiz | `/burro/practice/:moduleId` | AuthGuard + StudentGuard |
| — | Results / Natijalar | `/burro/results/:attemptId` | AuthGuard + StudentGuard |
| — | Module completed | `/burro/modules/:moduleId/complete` | AuthGuard + StudentGuard |
| — | Statistics | `/burro/statistics` | AuthGuard + StudentGuard |
| `384:12516` | Leaderboard / Reyting | `/burro/leaderboard` | AuthGuard + StudentGuard |
| `384:12322` | Leaderboard / Reyting (Parent) | `/burro/leaderboard` | AuthGuard + StudentGuard |

### Parent (Profile & Settings)

| Screen ID | Screen name | Route | Auth |
|-----------|-------------|-------|------|
| `384:12633` | Profile / Settings | `/burro/profile` | AuthGuard + StudentGuard |
| `384:12673` | Language bottom sheet | (on Profile) | AuthGuard + StudentGuard |
| `384:12740` | Logout modal | (on Profile) | AuthGuard + StudentGuard |
| `384:12794` | Children list | `/burro/children` | AuthGuard + StudentGuard |
| `384:12825` | Add / Edit child | `/burro/children/add` | AuthGuard + StudentGuard |
| `384:12860` | Gender bottom sheet | (on Add/Edit child) | AuthGuard + StudentGuard |

## 4. Navigation map

```
Telegram Bot
  └─ Open Mini App ──▶ Welcome (/burro/welcome)
                          ├─ Login (/auth/login) ──▶ Telegram OAuth
                          └─ Register (/auth/register) ──▶ Telegram OAuth
                                └─ OAuth Callback ──▶ Home (/burro)

Home (/burro)
  ├─ Bottom nav: Asosiy ──▶ Home
  ├─ Bottom nav: Modules ──▶ Modules grid (/burro/modules)
  ├─ Bottom nav: Leaderboard ──▶ Leaderboard (/burro/leaderboard)
  ├─ Bottom nav: Profile ──▶ Profile (/burro/profile)
  └─ Child card "Boshlash" ──▶ Resume module (/burro/practice/:moduleId)

Profile (/burro/profile)
  ├─ Statistika ──▶ Statistics (/burro/statistics)
  ├─ Farzandlar ──▶ Children list (/burro/children)
  ├─ Ilova tili ──▶ Language bottom sheet (inline)
  ├─ Eslatmalar ──▶ Toggle (inline)
  └─ Chiqish ──▶ Logout modal (inline) ──▶ Login (/auth/login)

Children list (/burro/children)
  ├─ Child card ──▶ (future: child-specific stats)
  ├─ Edit ──▶ (future: reorder/remove)
  └─ Qo'shish ──▶ Add child (/burro/children/add)

Add child (/burro/children/add)
  ├─ Jinsi ──▶ Gender bottom sheet (inline)
  └─ Saqlash ──▶ POST /children ──▶ Children list (/burro/children)
```

## 5. Screen-by-screen behavior

### 5.1 Telegram Bot Entry

**User can:**
- Find bot via search `@burro_arab_bot` or direct link.
- See /start message with welcome text and "Boshlash" inline button.
- Tap button to open Mini App.

**UX rule:**
- Bot must pass `startapp` parameter with a deep-link to the correct screen.
- If user already has a valid session, skip welcome and go to Home.

### 5.2 Mini App Launch

**User can:**
- See loading state while `initData` is validated.
- If `window.Telegram.WebApp.initData` exists AND `isInitiatingTelegram` is true → show "Telegram login detected" loader.
- On success → redirect to Home (`/burro`).
- On failure → redirect to Register (`/auth/register`).

**Required data conceptually:**
- Telegram `initData` (hash-verified by backend).
- User role (Student or Parent — backend assigns based on config).
- Language preference (from user profile or Telegram locale).

### 5.3 Welcome / Boshlash

**User can:**
- See app logo, tagline "Arab tilini o‘rganishni boshlang".
- See version number at bottom (v{APP_VERSION}).
- Tap "Boshlash" → navigate to Register (`/auth/register`).

**Behavior:**
- If already authenticated → skip to Home (`/burro`).
- Display app version read from `package.json` via `src/libs/version.ts`.

### 5.4 Login / Kirish

**User can:**
- See "Continue with Telegram" button (primary CTA).
- See "Sign up" link if on Login page, or "Sign in" link if on Register page.
- Tap Telegram button → call `GET /auth/telegram/url` → redirect to Telegram OAuth.

**Error behavior:**
- If `telegramUrl()` fails → `toast.error("Unable to start Telegram login. Please try again.")`.
- If Telegram OAuth callback fails → toast error and stay on login page.
- If Mini App auto-login (`POST /auth/telegram` with initData) fails → show "Continue with Telegram" button manually.

**UX rule:**
- Never show email/password forms. Only Telegram login.
- `shouldShowTelegramProgress = isTelegramWebApp && isInitiatingTelegram` — prevents infinite spinner when initData exists but auto-login already failed.

### 5.5 Home / Beged

**User can:**
- See greeting "Hello, {name}!" with user's first name.
- See streak badge: fire emoji + "{N} kun" / "{N} day streak".
- See "Continue module" card (if exists): module title, progress bar (correct/total), "Davom etish" button.
- See "Daily task" card: description, XP reward, progress bar.
- See "Today's stats": time spent (min), XP earned.
- See recent modules list (horizontal scroll or vertical list).
- See child cards (if parent role): avatar, name, streak, class, "Boshlash" / "Statistika" button.
- See app version at bottom.
- See bottom navigation bar.

**Child card should show:**
- Colored avatar circle with initial letter.
- Name (text-lg font-semibold).
- Class with fire badge (e.g. "🔥 3-B sinf").
- XP score (e.g. "2100 XP").
- "Boshlash" button → navigate to that child's home.
- "Statistika" button → navigate to that child's stats.

**UX rule:**
- If no continue module → show "Yangi modulni boshlash" CTA instead.
- If daily task completed → show checkmark, not progress bar.
- Recent modules max 4 items, show scroll hint.

### 5.6 Modules grid

**User can:**
- See all modules as a grid of cards.
- Filter: "Hammasi", "Ochiq", "Yopilgan".
- Tap a module → if status=open → navigate to module map.
- If status=locked → show locked overlay (no navigation).

**Module card should show:**
- Icon letter in colored circle (from `icon_letter`, `icon_color`).
- Module title.
- Status badge: "Yangi" (open), "Boshlandi" (in_progress), "Tugallandi" (completed).
- XP reward (e.g. "+10 XP").
- Estimated time (e.g. "~5 min").
- Lock icon if locked.

**UX rule:**
- Grid: 2 columns on mobile, gap-4.
- Completed modules show a subtle green border.

### 5.7 Module map

**User can:**
- See all lessons/nodes in the module as a connected path.
- Tap an open node → start quiz for that lesson.
- See completed nodes with checkmark.
- See locked nodes with lock icon.
- See back button → modules grid.

**Node states:**
- `locked`: gray, lock icon, not tappable.
- `open`: colored (blue/teal gradient), "Boshlash" label, tappable.
- `in_progress`: partially filled, "Davom etish" label.
- `completed`: green checkmark, "Qayta" label.

### 5.8 Lesson detail

**User can:**
- See lesson title and description.
- See "Boshlash" button → start attempt (`POST /attempts`).
- Resume from where they left off if `is_resumed` is true.

**UX rule:**
- Show best previous attempt stats (accuracy, XP) if available.
- Show lives count (max 5).

### 5.9 Quiz screens

**Supported question types:**
- `find_sound`: Hear a sound, pick the matching letter.
- `find_letter`: See a letter, pick the matching sound.
- `listen_find_letter`: Hear a word, pick the letter that matches.
- `listen_find_sound`: Hear a word, pick the sound that matches.

**Shared quiz shell:**
- Top bar: back, question counter (3/10), lives (❤️ × 5).
- Question area: prompt text, optional audio play button, 4 option buttons.
- Feedback: green flash + checkmark for correct, red flash + X for wrong.
- Auto-advance to next question after 1.5s (correct) or 3s (wrong with tip).

**Feedback behavior:**
- Correct: short haptic, green overlay, checkmark icon, advance after 1.5s.
- Wrong: red overlay, X icon, show tip text, advance after 3s.
- If wrong answer is the last life → show "Failed" overlay → navigate to results.

**UX rule:**
- Option buttons: 2×2 grid, rounded-2xl, white bg, selected state fills with teal for correct or red for wrong.
- Audio button: circle with speaker icon, plays once per tap, shows animated sound waves.
- Lives at 0 → end attempt immediately, show failure screen.

### 5.10 Results / Natijalar

**User can:**
- See attempt result: accuracy percentage (circular progress), correct/wrong counts.
- See wrong questions review list: question text, what they answered, what the correct answer is, tip.
- See XP earned.
- See time spent.
- Tap "Modulga qaytish" → module map.
- Tap "Qayta urinish" → start new attempt.

**Review card should show:**
- Question type icon.
- Arabic letter (if applicable).
- Their answer (red with X icon).
- Correct answer (green with checkmark icon).
- Tip text (if exists).

**UX rule:**
- If 100% accuracy → "Ajoyib!" congratulation text with confetti animation.
- If < 50% → "Yana urinib ko'ring" encouragement text.
- Review list scrollable if more than 3 wrong questions.

### 5.11 Module completed

**User can:**
- See module completion animation.
- See total XP earned for the module.
- See accuracy percentage.
- Tap "Keyingi modul" → next module's map.
- Tap "Bosh sahifa" → Home.

**UX rule:**
- Update module status to `completed`.
- Unlock next module in sequence.
- Show share button (native Telegram share).

### 5.12 Statistics / Statistika

**User can:**
- See total XP, accuracy %, modules completed, current streak, longest streak.
- See XP chart (7d / 30d toggle) — line chart.
- See weak letters list: arabic letter, sound, error count.
- Tap "Batafsil" on any stat → (future: detailed breakdown).

**Recommendation card should show:**
- If weak letters exist → "Quyidagi harflarni takrorlang" with letter list.
- If no weak letters → "Ajoyib! Barcha harflarni o'zlashtirdingiz".

**UX rule:**
- Chart uses `StatisticsChartPeriod` toggle: '7d' | '30d'.
- Weak letters sorted by highest error_count first.
- Scrollable page, no bottom nav interference.

### 5.13 Leaderboard

**User can:**
- See period tabs: "Haftalik", "Oylik", "Umumiy" (weekly, monthly, all).
- See Top 3: horizontal row with gold/silver/bronze medals, avatar, name, XP.
- See entries 4+: vertical list with rank number, avatar, name, XP.
- See own position card (if not in top 3).
- Tap period tab → refetch leaderboard for that period.

**UX rule:**
- Top 3: rank 1 (gold, center), rank 2 (silver, left), rank 3 (bronze, right).
- Medal icons: 🥇🥈🥉.
- Current user's row highlighted with teal-50 background.
- Avatar placeholder: gradient initials circle if no avatar_url.

### 5.14 Profile / Settings

**User can:**
- See user card: avatar circle, full name, ID display, streak badge with fire.
- Tap "Statistika" → Statistics screen.
- Tap "Farzandlar" → Children list.
- Tap "Ilova tili" → Language bottom sheet.
- Toggle "Eslatmalar" switch on/off.
- Tap "Chiqish" → Logout confirmation modal.
- Tap "Ota-ona rejimiga o'tish" → (future: parent mode toggle).

**Rows:**
1. **Statistika** — icon (bxs-pie-chart-alt-2), label "Statistika", trailing "Batafsil" link.
2. **Farzandlar** — icon (uil:kid), label "Farzandlar", trailing count (e.g. "2 ta").
3. **Ilova tili** — icon (clarity:language-solid), label "Ilova tili", trailing current language (e.g. "O'zbek").
4. **Eslatmalar** — icon (bxs-bell), label "Eslatmalar", trailing iOS-style toggle switch.
5. **Chiqish** — icon (bxs-exit), label "Chiqish" (text-error-500 color).

### 5.15 Children list

**User can:**
- See all children as cards: avatar (gradient circle with initial), name, class with fire badge.
- Tap back arrow → Profile.
- Tap edit (pencil icon) → (future: reorder/remove mode).
- Tap "Qo'shish" button → Add child form.

**Empty behavior:**
- Show illustration/icon and text "Hali farzand qo'shilmagan".
- Show "Qo'shish" button prominently.
- No skeleton or error state — just empty state with CTA.

### 5.16 Add/Edit child

**Fields:**
1. **Farzand nomi** — text input, icon bxs-user-check, placeholder "Nomni kiriting".
2. **Sinfi** — text input, icon bxs-book-reader, placeholder "Kiriting".
3. **Jinsi** — select button, icon bxs-user-detail, placeholder "Tanlang", trailing chevron-down icon. Opens Gender bottom sheet on tap.

**User can:**
- Enter name (required).
- Enter class (required).
- Select gender via bottom sheet.
- Tap "Saqlash" → submit form.
- Tap back arrow → cancel, go back.

**Validation:**
- Name: required, min 2 chars, max 50 chars.
- Class: required, min 1 char, max 20 chars.
- Gender: required.
- If any field invalid → "Saqlash" button is disabled (gray-300 bg).
- On submit error → toast error message.

**UX rule:**
- Avatar picker: circle with UZ flag icon badge, future: allow photo upload.
- Keyboard type: default for name, default for class.
- Gender: always opens bottom sheet, never shows a native select.

### 5.17 Gender bottom sheet

**Options:**
1. "O'g'il bola" with material-symbols:male icon.
2. "Qiz bola" with material-symbols:female icon.

**Behavior:**
- Opens from bottom, rounded-t-[20px], drag handle bar at top.
- Title "Farzand jinsini tanlash" with close (X) button.
- Selected option highlighted with teal-50 background and teal-600 text.
- Tap option → select + close sheet.
- Tap backdrop or X → close without selecting.
- ESC key closes sheet.

### 5.18 Language bottom sheet

**Options:**
1. "O'zbekcha" (uz)
2. "Русский" (ru)
3. "English" (en)
4. "العربية" (ar)

**Behavior:**
- Opens from bottom, rounded-t-[20px], drag handle bar.
- Title "Til tanlash" with close (X) button.
- Current language highlighted with teal-50 bg + teal-600 text + bold.
- Tap option → update language via PATCH /profile + close sheet.
- Tap backdrop or X → close without changing.
- Using Sonner toast on success: "Til o'zgartirildi".

### 5.19 Logout confirmation modal

**Text:**
- Icon: ⚠️ (warning emoji), text-4xl.
- Title: "Ehtiyot bo'ling!" — text-lg font-bold text-gray-900.
- Body: "Haqiqatdan ilovadan chiqishni xohlaysizmi?" — text-sm.
- Hint: "Haqiqatdan ham ilovadan chiqishni xohlasangiz 'Ha, chiqish' ni bosib tasdiqlang." — text-xs text-gray-500.
- Buttons: "Yo'q" (outline, cancel) | "Ha, chiqish" (error-500 bg, white text).

**UX rule:**
- Tapping backdrop does NOT close (only buttons).
- "Yo'q" → close modal.
- "Ha, chiqish" → call `POST /auth/logout`, clear tokens, navigate to `/auth/login`.
- If logout API fails → still clear tokens and redirect (force logout).

## 6. Main user flows

### 6.1 First-time user flow

1. User opens bot → taps "Boshlash" → Mini App launches with initData.
2. App calls `POST /auth/telegram` with initData.
3. No user found → backend returns 401 → app shows Register page.
4. User taps "Continue with Telegram" → `GET /auth/telegram/url` → redirect to Telegram OAuth.
5. User authorizes → Telegram redirects to `/auth/telegram/callback?code=...`.
6. `TelegramCallbackPage` calls `POST /auth/telegram/code` → backend creates user → returns JWT.
7. Frontend stores tokens → navigates to `/burro/welcome`.
8. User sees Welcome screen → taps "Boshlash" → navigates to `/burro`.
9. Home screen loads with empty state (no continue module, no recent modules).

### 6.2 Returning user flow

1. User opens Mini App → `initData` sent to `POST /auth/telegram`.
2. Backend finds existing user → returns new JWT.
3. Frontend stores tokens → navigates to `/burro`.
4. Home screen shows continue module, daily task, today's stats, recent modules.
5. User selects "Davom etish" on continue module → resume quiz.

### 6.3 Start learning flow

1. From Home, tap bottom nav "Modules" → `/burro/modules`.
2. Tap an open module card → navigate to module map.
3. Tap an open lesson node → `POST /attempts` → navigate to quiz screen.
4. Answer questions one by one.
5. Last question answered → navigate to Results.

### 6.4 Quiz completion flow

1. Results screen shows: accuracy, correct/wrong, XP, time.
2. Tap "Modulga qaytish" → module map (lesson now shows completed).
3. Tap "Qayta urinish" → start new attempt on same lesson.
4. If module fully completed → show Module Completed screen.
5. Tap "Keyingi modul" → next module map.
6. Tap "Bosh sahifa" → Home.

### 6.5 Statistics flow

1. From Profile, tap "Statistika" → navigate to `/burro/statistics`.
2. Page loads: total XP, accuracy, modules completed, streaks.
3. Chart section loads with 7d data by default.
4. Tap "30d" toggle → refetch chart data.
5. Weak letters section shows at bottom.
6. Tap back → return to previous screen.

### 6.6 Child management flow

1. From Profile, tap "Farzandlar" → navigate to `/burro/children`.
2. See existing children cards (or empty state).
3. Tap "Qo'shish" → navigate to `/burro/children/add`.
4. Fill name, class, select gender.
5. Tap "Saqlash" → form submits → navigate back to children list.
6. New child appears in the list.

### 6.7 Language change flow

1. From Profile, tap "Ilova tili" → Language bottom sheet appears.
2. Tap desired language (e.g. "Русский").
3. Sheet closes → `PATCH /profile` with language=ru.
4. Toast "Til o'zgartirildi".
5. Profile row updates to show new language label.
6. UI strings should reflect new language on next page navigation.

### 6.8 Logout flow

1. From Profile, tap "Chiqish" → Logout modal appears.
2. Tap "Ha, chiqish" → `useLogoutMutation.mutate()`.
3. Calls `POST /auth/logout` → on success or error: `clearAuth()`, `toast.success("Logged out successfully")`, navigate to `/auth/login`.
4. Tokens cleared from localStorage.

## 7. Component inventory

### Layout components

| Component | Location | Description |
|-----------|----------|-------------|
| `BottomNav` | `src/modules/arabtilibot/ui/BottomNav.tsx` | Fixed bottom nav with 4 tabs: Asosiy, Modules, Reyting, Profil |
| `MobileStatusBar` | Inline in varios components | Semi-transparent 9:41 time + battery/wifi icons |
| Page container | Inline | `min-h-screen bg-gradient-to-b from-gray-25 via-white to-gray-200` |

### Cards

| Component | Location | Description |
|-----------|----------|-------------|
| Profile header | `Profile.tsx` | Avatar + name + ID + streak badge |
| Profile menu row | `Profile.tsx` | Icon + label + trailing content, `h-14` with `border-b border-gray-100` |
| Child card | `ChildrenList.tsx` | Avatar gradient + name + class fire badge, `rounded-[28px]` |
| Module card | `ModulesList.tsx` | Icon letter + title + status + XP + time |

### Controls

| Component | Location | Description |
|-----------|----------|-------------|
| `Button` | `src/components/base/buttons/button.tsx` | Primary/secondary/ghost variants, size md/lg |
| Toggle switch | `Profile.tsx` | iOS-style: `h-7 w-12 rounded-full`, thumb `size-5` |
| Back button | Inline | `size-10 rounded-full` circle with left-arrow icon |
| Gradient CTA | Inline | `rounded-[28px] bg-gradient-to-r from-blue-600 to-teal-400`, specific shadow |

### Learning components

| Component | Location | Description |
|-----------|----------|-------------|
| `QuestionCard.tsx` | `src/modules/arabtilibot/ui/QuestionCard.tsx` | Renders question with options grid |
| `OptionButton.tsx` | `src/modules/arabtilibot/ui/OptionButton.tsx` | Single option: white bg, selected/highlighted state |
| `PracticePlayer.tsx` | `src/modules/arabtilibot/ui/PracticePlayer.tsx` | Full quiz shell: lives, timer, audio, progress |

### Feedback components

| Component | Location | Description |
|-----------|----------|-------------|
| Toast (sonner) | Global | Error/success toasts triggered from mutations |
| Bottom sheet | `GenderBottomSheet.tsx`, App language sheet | `rounded-t-[20px]` overlay pattern |
| Modal | Logout confirmation | Centered `rounded-[20px]` card with overlay |
| Skeleton | `Profile.tsx`, `ChildrenList.tsx` | `animate-pulse` gray circles and bars |

## 8. Design tokens

### 8.1 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-25` | `rgb(250 250 250)` | Page background start |
| `--color-gray-50` | `rgb(250 250 250)` | Page background |
| `--color-gray-200` | `rgb(229 231 235)` | Background gradient end, borders |
| `--color-gray-700` | `rgb(55 65 81)` | Body text |
| `--color-gray-900` | `rgb(17 24 39)` | Headings |
| `--color-teal-500` | `rgb(21 183 158)` | Primary brand, toggle active |
| `--color-teal-600` | `rgb(13 148 136)` | Link text, selected item text |
| `--color-blue-600` | `rgb(37 99 235)` | Gradient start for CTA buttons |
| `--color-teal-400` | `rgb(45 212 191)` | Gradient end for CTA buttons |
| `--color-warning-100` | `rgb(254 243 199)` | Streak badge background |
| `--color-warning-700` | `rgb(180 83 9)` | Streak badge text |
| `--color-error-500` | `rgb(239 68 68)` | Logout text, destructive actions |
| `--color-white` | `rgb(255 255 255)` | Card backgrounds |

### 8.2 Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-[20px]` | 20px | Menu rows, input containers, bottom sheet |
| `rounded-[28px]` | 28px | Child cards, CTA buttons |
| `rounded-full` | 9999px | Avatars, toggle switch |
| `rounded-t-[20px]` | 20px (top) | Bottom sheet top corners |

### 8.3 Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `px-4` | 1rem | Standard horizontal padding |
| `py-3` | 0.75rem | Menu row vertical padding |
| `py-4` | 1rem | CTA button vertical padding |
| `gap-3` | 0.75rem | Icon-to-label gap |
| `mt-2` | 0.5rem | Between text elements |

### 8.4 Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-display-sm` | 1.875rem | 600 (semibold) | Welcome title |
| `text-lg` | 1.125rem | 600 (semibold) | Card titles, child name |
| `text-base` | 1rem | 700 (bold) | Button labels |
| `text-sm` | 0.875rem | 400/500/700 | Body, menu labels |
| `text-xs` | 0.75rem | 500/600 | Metadata, badges |

## 9. UX rules

1. **No email/password login** — Telegram-only authentication.
2. **Toast for errors** — never inline error messages (sonner).
3. **Auto-login on Mini App launch** — `POST /auth/telegram` with initData at app root.
4. **Optimistic UI for toggles** — notifications toggle updates immediately.
5. **Bottom sheet pattern** — language and gender use bottom sheets, not modals.
6. **Logout requires confirmation** — modal with two-step confirmation.
7. **Skeleton loading** — animate-pulse gray shapes for all loading states.
8. **Empty state with CTA** — never show a blank page.
9. **Gradient buttons** — all primary CTAs use `from-blue-600 to-teal-400` gradient.
10. **Card shadow pattern** — `shadow-[0_2px_0_0_rgb(172,173,176),inset_0_0_6px_0_rgba(255,255,255,0.63)]`.
11. **Mobile-first** — all screens designed for 402×874 viewport.
12. **Uzbek-first labels** — primary UI text in Uzbek, fallback to English.

## 10. Empty, loading, and error states

### 10.1 Loading

- **Profile**: `SkeletonProfile` — avatar pulse circle (size-11), name bar (w-32), 4 skeleton rows.
- **Children list**: `SkeletonList` — 2 skeleton cards with avatar circle, name bar, class bar.
- **Home**: Skeleton greeting header, 2 skeleton cards for continue-module and daily-task.
- **Quiz**: Skeleton for question area, 4 option placeholders.
- **Leaderboard**: 3 skeleton circles for top 3, 5 skeleton rows for list.

### 10.2 Empty states

- **Home (no continue module)**: Show "Yangi modulni boshlash" CTA instead of continue card.
- **Home (no daily task)**: Don't render daily task section.
- **Home (no recent modules)**: Show "Hali modul boshlanmagan" placeholder.
- **Children list (no children)**: Icon + "Hali farzand qo'shilmagan" text + "Qo'shish" button.
- **Leaderboard (no entries)**: "Hali reyting ma'lumotlari yo'q" text.
- **Statistics (no data)**: "Hali statistika ma'lumotlari yetarli emas" text.

### 10.3 Error states

- **API error**: Show error message with "Qayta urinish" button.
- **Network error**: Toast "Tarmoq xatosi. Qayta urinib ko'ring."
- **Telegram login failed**: Toast error, stay on login page with retry button.
- **Profile load failed**: `errorMessage` prop renders inline error card with retry.
- **Quiz submit failed**: Toast error, stay on current question.

## 11. Acceptance criteria

### Global

- [ ] TypeScript strict mode — no `any` types.
- [ ] ESLint zero warnings, zero errors.
- [ ] Production build succeeds (`pnpm build`).
- [ ] All text is i18n-ready (wrapped for future translation).
- [ ] Responsive within mobile viewport (320px–430px).

### Home

- [ ] Greeting shows user's first name from Telegram.
- [ ] Streak badge shows correct count from API.
- [ ] Continue module card shows only if `continue_module` is not null.
- [ ] Daily task shows progress bar if not completed, checkmark if done.
- [ ] Bottom nav has 4 tabs with correct active state.
- [ ] Version displayed at bottom.

### Learning

- [ ] Module grid loads from `GET /modules`.
- [ ] Filter buttons correctly filter module list.
- [ ] Quiz loads questions from `GET /attempts/:id/questions`.
- [ ] Correct answer advances after 1.5s.
- [ ] Wrong answer shows tip and advances after 3s.
- [ ] Lives correctly decrement on wrong answer.
- [ ] Last life lost → end attempt.

### Results

- [ ] Accuracy percentage displayed correctly.
- [ ] Wrong questions review list matches API response.
- [ ] XP earned shown.
- [ ] "Qayta urinish" starts new attempt.
- [ ] "Modulga qaytish" goes to module map.

### Statistics

- [ ] All stat cards show correct data from API.
- [ ] Chart toggles between 7d and 30d.
- [ ] Weak letters list renders correctly.
- [ ] Recommendation card shows weak letters or "Ajoyib!" message.

### Profile

- [ ] User card shows correct name and ID.
- [ ] All 5 menu rows render with icons.
- [ ] Language sheet has 4 options and correctly updates language.
- [ ] Notifications toggle calls PATCH /profile.
- [ ] Logout modal shows warning text and two buttons.
- [ ] "Ha, chiqish" clears auth and redirects to login.

### Child management

- [ ] Children list loads and shows cards.
- [ ] Empty state shows when no children.
- [ ] Add child form validates all fields.
- [ ] Gender sheet has 2 options.
- [ ] Save calls POST /children API.

### Language

- [ ] Language sheet opens and closes correctly.
- [ ] Selected language is highlighted.
- [ ] PATCH /profile is called on selection.
- [ ] Toast confirms language change.
- [ ] UI labels update on next navigation.

## 12. Implementation notes

### 12.1 Frontend

- **No comments in code** — self-documenting through naming and structure.
- **No `any` types** — all API responses have strict TypeScript types.
- **Import order**: React → external libs → `@/modules/*` → `@/components/*` → `@/libs/*` → relative.
- **CSS**: Tailwind utilities only, no `styles.module.css` for new components.
- **API calls**: Through module `api/*` files, never direct axios in components.
- **Mutations**: TanStack Query `useMutation` for all write operations.
- **Toast**: `sonner` for all user-facing messages.
- **Version**: Read from `package.json` via `src/libs/version.ts`.

### 12.2 Backend

- **NestJS** with `setGlobalPrefix('api')`.
- **Auth**: Telegram initData validation (`POST /auth/telegram`) and OAuth code exchange (`POST /auth/telegram/code`).
- **Session**: JWT access (15min) + refresh (7d) with auto-refresh interceptor.
- **Roles**: `superadmin` if Telegram ID matches `TELEGRAM_ADMIN_ID`, otherwise `student`.
- **User creation**: Upsert on `telegramId` field.
- **Database**: PostgreSQL via Prisma, `User` model with `telegramId` unique field.

### 12.3 Data concepts

- **User**: one-to-many with Child (future: parent manages multiple children).
- **Attempt**: belongs to User, has many Answers, belongs to Module.
- **Module**: has many Lessons (questions), has order_index for sequencing.
- **Leaderboard**: computed from XP aggregated by period (weekly/monthly/all).
- **Language**: stored on User profile, affects UI labels.

## 13. Fixed flow gaps

1. **Auto-login vs manual login**: Mini App auto-login via initData may fail silently. The `isInitiatingTelegram` flag prevents infinite spinner state.
2. **Parent vs Student UI**: Same role for now (`student`), but Parent section UI renders settings/child management. Future: separate role with distinct API responses.
3. **No child-switching yet**: "Ota-ona rejimiga o'tish" button is visual-only. Future flow: parent selects a child → app reloads with child's context.
4. **Children API not built**: POST/GET/DELETE /children endpoints need backend implementation. Frontend uses mock data.
5. **Arabic language option**: Added to language sheet (العربية) but no Arabic translations exist in the codebase yet.
6. **Edit child** not implemented: Gender sheet and form support both add and edit, but the edit flow (populate form with existing data) is not wired.

## 14. Handoff checklist

- [x] Figma node `384-14885` (Parent section) analyzed — 11 frames.
- [x] Figma screenshots downloaded to `public/figma/`.
- [x] Profile/settings screen implemented with 5 menu rows.
- [x] Language bottom sheet with 4 options.
- [x] Logout confirmation modal.
- [x] Children list screen with child cards.
- [x] Add child form with 3 fields.
- [x] Gender bottom sheet.
- [x] Home screen with continue module, daily task, stats.
- [x] Leaderboard with Top 3 + ranked list.
- [ ] Children API endpoints (backend) — `GET /children`, `POST /children`, `DELETE /children`.
- [ ] Parent role separation — distinct API responses for parent vs student.
- [ ] Arabic translations (i18n).
- [ ] Edit child flow (form pre-population).
- [ ] Ota-ona rejimiga o'tish (parent mode toggle).
