# Cursor Log

## 2025-11-12 — Полноэкранный таймер и мобильные жесты
- Timer (моб.): уменьшен размер шрифта (`text-5xl sm:text-6xl md:text-8xl`) и добавлены pointer‑жесты (удержание для старта, повторный тап для остановки). Обновлены подсказки: «Зажмите экран для начала», «Отпустите экран для старта», «Нажмите на таймер для остановки».
- Страница `TimerFullscreen`: создан файл `src/pages/TimerFullscreen.tsx` с чистой раскладкой на весь экран (только `Scramble` и `Timer`), добавлена компактная кнопка «Назад» (левый верх).
- Маршрут: зарегистрирован `/timer` в `src/App.tsx`.
- Главная: добавлена кнопка «На весь экран» в блоке таймера (`src/pages/Index.tsx`), ведущая на `/timer`.
- Предпросмотр: запущу dev‑сервер и проверю навигацию и поведение жестов на телефоне.

### 2025-11-12 — Уточнения по кнопке и раскладке fullscreen
- Главная: кнопку «На весь экран» переместил выше карточки таймера (правый край, отдельный блок).
- Fullscreen: таймер строго по центру экрана; скрэмбл перенесён вверх и уменьшен (обёртка `max-w-md` + `scale-90 sm:scale-95`). Кнопки не увеличивались.

### 2025-11-12 — Огромные цифры по центру, скрэмбл снизу
- Компонент `Timer`: добавлен проп `variant` с режимом `fullscreen`, который задаёт очень крупные цифры (`text-7xl sm:text-8xl md:text-[12rem] lg:text-[14rem]`). Жесты и кнопки без изменений.
- Страница `TimerFullscreen`: таймер остаётся по центру и используется как `<Timer variant="fullscreen" />`; скрэмбл перемещён под таймер и уменьшен (`max-w-md` + `scale-90 sm:scale-95`).
- Предпросмотр: открыть `http://localhost:8081/` и проверить, что по центру огромные цифры, ниже — кнопки «Заново»/«Сохранить», ещё ниже — компактный скрэмбл.

### 2025-11-12 — Fullscreen: скрыт текст скрэмбла, оставлена кнопка «Новый»
- Компонент `Scramble`: добавлен проп `variant="buttonOnly"`, который скрывает заголовок и текст скрэмбла, оставляя только кнопку «Новый».
- Страница `TimerFullscreen`: внизу страницы используется `<Scramble variant="buttonOnly" />` — под таймером видна только компактная кнопка «Новый».

### 2025-11-12 — Fullscreen: вернуть текст скрэмбла без заголовка, опустить кнопки
- Компонент `Scramble`: добавлен проп `variant="noTitle"`, скрывающий заголовок «Скрэмбл», при этом текст скрэмбла остаётся видимым; кнопка «Новый» сохранена (компактная верстка).
- Страница `TimerFullscreen`: теперь использует `<Scramble variant="noTitle" />` и расширенный контейнер (`w-[92vw] max-w-5xl`) для лучшей читаемости шириной.
- Компонент `Timer` (вариант `fullscreen`): увеличен общий вертикальный зазор (`gap-10`), добавлен небольшой верхний отступ у цифр (`mt-2 sm:mt-4`) и дополнительные отступы сверху у блока кнопок (`mt-6 sm:mt-10`), чтобы кнопки были заметно ниже.

### 2025-11-12 — Fullscreen: больше верхний отступ и немного меньшие цифры
- Компонент `Timer` (fullscreen): цифры уменьшены с `text-7xl sm:text-8xl md:text-[12rem] lg:text-[14rem]` до `text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem]`.
- Верхний отступ цифр увеличен с `mt-2 sm:mt-4` до `mt-6 sm:mt-8`, чтобы таймер отступал сильнее сверху.
- Кнопки и общий зазор контейнера оставлены без изменений.

### 2025-11-12 — Навигация «На весь экран» ведёт на /timer
- На главной странице (`src/pages/Index.tsx`) кнопка «На весь экран» ведёт на маршрут `/timer`.
- В роутере (`src/App.tsx`) маршрут зарегистрирован: `<Route path="/timer" element={<TimerFullscreen />} />`.
- На странице `TimerFullscreen` есть кнопка «Назад», возвращающая на главную (`/`).

## 2025-11-11 — Мобильные улучшения (iPhone 12 Pro)
- Header: компактная высота и паддинги на мобильных, сокращён бренд‑текст; кнопки авторизации свёрнуты в иконки.
- AICoach: компактный Markdown на мобильных (`markdown-compact`), меньшие шрифты, перенос длинных слов; код‑блоки `text-xs` на мобильных.
- CSS: добавлена мобильная типографика (`@media (max-width: 420px) { html { font-size: 15px; } }`) и утилита `.markdown-compact` в `src/index.css`.
- Gemini prompt: усилен системный промпт для краткости (120–150 слов) и строгого Markdown‑формата (краткий заголовок, резюме, список шагов/советов, алгоритмы в код‑блоках).
- Pages: уменьшены заголовки/отступы на `Index`, `Beginner`, `Profile` — `text-3xl` на мобильных, сокращены `py/px`, карточки с меньшими паддингами.
- iOS utils: подтверждено наличие `ios-vh`, `ios-scroll`, `ios-safe-top/bottom` и sticky утилит.
- Открыт превью dev-сервера: http://localhost:8081/ (Vite). Ошибок в браузере нет; продолжается визуальная проверка хедера и чата на iPhone 12 Pro.

### Интеграция Supabase Edge Function для AI‑тренера
- Добавлен модуль `src/integrations/edge.ts` для вызова функции `ai-coach` через Supabase Functions домен (`*.functions.supabase.co`) с авторизацией по публичному ключу.
- Реализован разбор SSE потока (`data: { choices[0].delta.content }`) и сбор ответа в строку на клиенте.
- Обновлён `src/components/AICoach.tsx`: приоритетный путь — Supabase Edge; при ошибке выполняется фоллбэк на прямой Gemini (`callGemini`) при наличии `VITE_GEMINI_API_KEY`.
- Улучшены уведомления: таймаут/сетевая ошибка — предупреждение; при проблемах конфигурации функций — локализованная подсказка (проверить деплой `ai-coach` и домен функций/ключ).
- Цель: уменьшить количество сетевых ошибок в регионах, где `googleapis` может блокироваться/фильтроваться, сохраняя стабильность через серверное проксирование.

## 2025-11-07
- Добавлен градиентный фон для приложения: введён токен `--app-gradient` в `:root` (светлая тема) и `.dark` (тёмная тема) в `src/index.css`.
- Применён фон ко всему приложению через `body { background-image: var(--app-gradient); background-attachment: fixed; background-size: cover; background-repeat: no-repeat; }`.
- Цель: обеспечить мягкий градиент для обоих режимов без влияния на читабельность контента, который остаётся на `bg-background`.
- Запущен dev-сервер (`npm run dev`), открыт превью по адресу http://localhost:8080/ для визуальной проверки.
- Добавлены `--app-gradient` для тем: blue (light/dark) и red (light/dark) в `src/index.css`, чтобы фон был согласован с выбранной цветовой темой.
 - Проверено в превью (`http://localhost:8080/`): переключение на темы Синий/Красный в светлом/тёмном режимах отображает новые градиенты корректно.
## 2025-11-07: UI hover effects and header cleanup

- Added interactive component utilities in `src/index.css` under `@layer components`:
  - `.interactive-card`: subtle scale and themed glow on hover using `hsl(var(--primary))` and `hsl(var(--accent))`.
  - `.interactive-button`: scale and glow on hover/active; disabled state removes effects.
- Applied `interactive-card` to two feature cards in `src/pages/Index.tsx` (ИИ-помощник, Точный таймер).
- Applied `interactive-button` to stopwatch buttons in `src/components/Timer.tsx` (Заново, Сохранить) and scramble button in `src/components/Scramble.tsx` (Новый).
- Removed header menu items "Для новичков" and "Метод Фридрих" from `src/components/Header.tsx`, keeping "Инструкции" and auth/profile controls.
- Dev server already running at `http://localhost:8080/`; next step is visual verification of hover effects across themes (red/blue/green), both light/dark.
## 2025-11-07: Global button hover + Footer updates

- Globally enabled hover effects on all buttons by appending `interactive-button` to base classes in `src/components/ui/button.tsx` (`buttonVariants`).
- Updated footer content in `src/components/Footer.tsx`:
  - Replaced description with: "Cubick AI — ваш умный помощник в мире спидкубинга. Учитесь, тренируйтесь и улучшайте результаты с помощью искусственного интеллекта."
  - Changed email to `cubick.ai00@gmail.com` with `mailto:`.
  - Limited social links to Instagram, TikTok, Telegram, Threads (using `lucide-react` placeholders for brand icons: `Music2`, `Send`, `MessageSquareText`, plus `Instagram`).
- Preparing to visually verify changes on the running dev server `http://localhost:8080/`.
## 2025-11-07: Threads icon tweak

- Replaced footer Threads icon with `AtSign` (lucide-react) to visually mimic '@'.
## 2025-11-07: Footer baseline offset

- Added small left padding (`pl-2 md:pl-3`) to the bottom footer line in `src/components/Footer.tsx` to shift content slightly to the right for improved visual centering.

## 2025-11-07: AI preflight + Timer spacebar fix

- AICoach (`src/components/AICoach.tsx`): added env preflight check for Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). Shows a descriptive toast if missing; uses cached env variables for requests.
- Timer (`src/components/Timer.tsx`): updated global spacebar handlers to ignore when an input/textarea/contenteditable is focused, preventing unintended timer activation while typing (e.g., in AI chat textarea). 
- Verified no TypeScript errors locally; will confirm behavior in preview.

## 2025-11-07: Auth hook + Conditional header + Auth pages

- Added `useAuth` hook in `src/hooks/use-auth.ts` to read current user via `supabase.auth.getUser()` and subscribe to `onAuthStateChange`.
- Updated `src/components/Header.tsx` to conditionally render:
  - When authenticated: show `Профиль`, hide `Войти`/`Регистрация`.
  - When unauthenticated: show `Войти`/`Регистрация`, hide `Профиль`.
  - Added `Выйти` button next to `Профиль`, which calls Supabase `auth.signOut()`, shows a toast, and navigates to `/login`.
- Implemented Supabase login in `src/pages/Login.tsx` with controlled form and redirect to `/profile` on success.
- Implemented Supabase registration in `src/pages/Register.tsx` with basic validation; if session created, redirect to `/profile`, otherwise prompt to verify email.
- Protected `src/pages/Profile.tsx`: unauthenticated users are redirected to `/login`; interim message shown during redirect.

### Follow-up: Supabase lazy client initialization

- Refactored `src/integrations/client.ts` to export `getSupabase()` with lazy initialization and env validation to prevent runtime crash when env vars are missing.
- Updated `src/hooks/use-auth.ts`, `src/pages/Login.tsx`, and `src/pages/Register.tsx` to use `getSupabase()` instead of a top-level `supabase` instance.
## 2025-11-07: Theme-reactive Logo

- Added `src/components/Logo.tsx` using CSS variables `--logo-from`/`--logo-to` for gradient.
- Defined theme palettes in `src/index.css` for `blue`, `red`, `green` and dark variants using `[data-theme]` and `.dark` selectors.
- Updated `src/components/Header.tsx` to use `<Logo />` instead of a static gradient square.
- Verified visually via preview that logo color changes with theme selection.

## 2025-11-07: Supabase connection setup

- Created `.env.local` at project root and populated `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `env.txt`.
- Supabase client uses `import.meta.env` via `src/integrations/client.ts` with lazy `getSupabase()` initialization.
- After adding `.env.local`, restart dev server (`npm run dev`) to load env vars.
## 2025-11-07 — Статистика времени и скрэмбл 15 ходов

- Добавлен модуль `src/lib/stats.ts` для локального хранения результатов сборки (localStorage), форматирования времени и вычисления статистики (лучшее, среднее, количество).
- Обновлён `src/components/Timer.tsx`: при нажатии «Сохранить» время добавляется в локальную статистику через `addSolve(time)` и показывается тост.
- Обновлён `src/pages/Profile.tsx`: выводит количество сборок, лучшее и среднее время на основе сохранённых результатов (`getSolves` + `computeStats`).
- Обновлён `src/components/Scramble.tsx`: длина скрэмбла изменена с 20 на 15 ходов.
- Визуальные изменения требуют проверки в превью: статистические карточки в Профиле и новый скрэмбл.
## 2025-11-07 — Устойчивость AI тренера и офлайн-режим

- Обновлён `src/components/AICoach.tsx`:
  - Добавлен таймаут запроса (AbortController на 25s).
  - Гранулярная обработка ошибок: 402/429 показывают точные уведомления; для сетевых/прочих ошибок активируется офлайн-режим.
  - Офлайн-советы формируются локально с учётом статистики пользователя (`getSolves`/`computeStats`/`formatMs`).
  - Улучшены тосты: информируют о причинах (таймаут, сеть, отсутствие env) и включении локального режима.
- Рекомендации по серверу: развернуть Edge Function `ai-coach` и задать секрет `LOVABLE_API_KEY` в Supabase.

## 2025-11-07 — AICoach: домен функций и статусный индикатор

- `src/components/AICoach.tsx`: добавлена поддержка `VITE_SUPABASE_FUNCTIONS_URL` (кастомный домен функций). Эндпоинт выбирается как `${VITE_SUPABASE_FUNCTIONS_URL}/ai-coach`, иначе `${VITE_SUPABASE_URL}/functions/v1/ai-coach`.
- Добавлен индикатор режима в заголовке (Онлайн/Офлайн/Ожидание) с цветной меткой.
- Расширена обработка ошибок сервера: 404 (нет функции — развернуть), 401/403 (проверить ключ/домен), `LOVABLE_API_KEY` (настроить секрет в Supabase), 402/429 (лимит/оплата).
- При ошибках включается локальный режим советов на основе локальной статистики.

## 2025-11-07 — Supabase Edge Function размещена в правильной папке

- Перенёс реализацию функции AI тренера в `supabase/functions/ai-coach/index.ts`.
- Конфигурация `supabase/config.toml` уже указывает `entrypoint = "./functions/ai-coach/index.ts"` и `verify_jwt = true`.
- Функция принимает `{ messages }` и проксирует потоковые ответы из `https://ai.gateway.lovable.dev/v1/chat/completions` (SSE), обрабатывая ошибки 402/429 и общие ошибки.
- Секрет `LOVABLE_API_KEY` читается из окружения Supabase (Project Settings → Secrets), не из `.env.local` клиента.

## 2025-11-07 — Полноэкранный режим: скрытие скроллбара

- В `src/App.tsx` добавлен детектор полноэкранного режима: отслеживание `document.fullscreenElement`, медиазапроса `(display-mode: fullscreen)` и эвристики совпадения размеров окна с экраном. При входе в fullscreen на элемент `html` вешается класс `no-scrollbar`.
- В `src/index.css` добавлены стили для скрытия скроллбара:
  - Селекторы `html:fullscreen`, `body:fullscreen`, `#root:fullscreen` устанавливают `overflow: hidden`, отключают показ полосы прокрутки через `scrollbar-width: none` и скрывают WebKit-скроллбар.
  - Класс `.no-scrollbar` (и для `body`) дублирует эти правила как надёжный fallback.
- Цель: при переходе в полноэкранный режим справа больше не появляется скроллбар.
- Исправление: заменён `overflow: hidden` на `overflow: auto` в селекторах fullscreen и классе `.no-scrollbar`, чтобы прокрутка оставалась доступной, но полоса прокрутки была скрыта (Firefox: `scrollbar-width: none`, WebKit: скрытие `::-webkit-scrollbar`).

## 2025-11-07 — Глобальный масштаб 96%

- В `src/index.css` добавлено правило `html { font-size: 96%; }` внутри блока `@layer base`, чтобы чуть-чуть уменьшить масштаб всего сайта.
- Tailwind использует `rem`, поэтому шрифты, интервалы и компоненты уменьшаются пропорционально и кросс-браузерно.
- Проверка будет выполнена в превью (обычный и fullscreen режимы), чтобы убедиться, что новая шкала не вызывает появление полосы прокрутки и сохраняет читабельность.

## 2025-11-07 — Глобальный масштаб 98%

- Обновлён `src/index.css`: `html { font-size: 98%; }` в `@layer base`.
- Цель: сделать интерфейс немного крупнее относительно 96% (Tailwind на `rem` — всё масштабируется пропорционально).
- Проверено в превью, что fullscreen прокрутка работает, полоса прокрутки скрыта.
## 2025-11-07 — Привязка статистики к пользователю (локально)

- Обновлён `src/lib/stats.ts`:
  - Добавлены функции `getSolvesForUser(userId)`, `addSolveForUser(userId, timeMs)`, `migrateGlobalToUser(userId)` и генерация ключа `cubick_solve_times:<user_id>`.
  - Поведение: при наличии `userId` чтение/запись ведутся в персональный ключ; миграция переносит существующие данные из глобального ключа `cubick_solve_times` в ключ пользователя один раз.
- Обновлён `src/components/Timer.tsx`: при сохранении времени, если пользователь авторизован (`useAuth`), запись идёт через `addSolveForUser(user.id, time)`; иначе — в глобальный ключ.
- Обновлён `src/pages/Profile.tsx`:
  - Чтение статистики из `getSolvesForUser(user.id)`.
  - При входе пользователя выполняется `migrateGlobalToUser(user.id)`.
- Цель: после выхода и нового входа статистика остаётся, так как хранится под ключом конкретного пользователя в `localStorage`.
- Примечание: это локальное решение, не синхронизируется между устройствами/браузерами. Для серверной синхронизации потребуется Supabase-таблица `solves`.
## 2025-11-08 — i18n: Перевод AICoach и проверка в превью

- Переведён `src/components/AICoach.tsx` на i18n: подключён `useI18n`, все пользовательские строки, тосты и статусные индикаторы обёрнуты в `t()`.
- Обновлён словарь `src/lib/i18n.tsx`: добавлены английские ключи для офлайн-советов (крест/F2L/OLL/PLL/таймер/общий план), статусов (Онлайн/Офлайн/Ожидание), плейсхолдера, приветствия и всех текстов уведомлений.
- Запущен dev‑сервер (`npm run dev`); превью доступно по адресу http://localhost:8081/.
- Проверено переключение языка (RU/EN) через `LanguageToggle`: заголовок "AI Тренер", плейсхолдер, тосты и офлайн-советы корректно переводятся.
## 2025-11-08 — i18n: Переименование на CFOP в EN

- Обновлён словарь `src/lib/i18n.tsx`: ключи `"Метод Фридрих"` и `"Метод Фридрих (CFOP)"` в английской локали теперь отображаются как `CFOP`.
- Проверено в превью http://localhost:8081/:
  - На главной кнопка (EN) показывает `CFOP`, при RU остаётся `Метод Фридрих`.
  - На странице CFOP заголовок (EN) — `CFOP`; русская локаль не изменена.
- 2025-11-08: Localized ThemeToggle and Instructions notations.
  - Updated `src/components/ThemeToggle.tsx`: integrated `useI18n`, wrapped labels and aria-labels in `t()` ("Цвет темы", "Синий/Красный/Зеленый", "Переключить темный режим", "Изменить цвет темы").
  - Updated `src/pages/Instructions.tsx`: wrapped `name` and `description` fields in `notations[]` with `t()` for all moves (R, R', R2, L, L', U, U', D, D', F, F', B, B', M, E, S).
  - Expanded `src/lib/i18n.tsx` `enDict` with keys for ThemeToggle and notation names/descriptions.
  - Preview checked at `http://localhost:8081/`: theme menu now shows English labels in EN, and notation cards display English names/descriptions when language is set to EN.

## 2025-11-08 — Лого: изображение по теме без текста, с fallback

- Обновлён `src/components/Logo.tsx`: вместо градиента используется картинка в зависимости от темы (`/logo-blue.png`, `/logo-red.png`, `/logo-green.png`). Добавлен `MutationObserver` для отслеживания `data-theme` и перерисовки при смене темы. При ошибке загрузки изображения (например, файл отсутствует) отображается прежний градиент как надёжный fallback.
- Локализация alt/aria: добавлен ключ в `src/lib/i18n.tsx` — `"Логотип Cubick AI"` → `"Cubick AI logo"`, используется в `alt` и `aria-label` компонента `Logo`.
- Проверено в превью `http://localhost:8081/`: ошибок в консоли браузера нет. На текущий момент файлы логотипов в `public/` отсутствуют, поэтому корректно срабатывает градиентный fallback.
- Требуется действие: загрузить три файла логотипа (без текста "CUBICK AI") в `public/` с именами `logo-blue.png`, `logo-red.png`, `logo-green.png` (желательно квадратные PNG/SVG, например 256×256).

## 2025-11-08 — Лого: фикс сопоставления цветов и скругление углов

- Обновлён `src/components/Logo.tsx`: скорректирован маппинг файлов логотипов к темам (`red → /logo-red.png`, `green → /logo-green.png`, `blue → /logo-blue.png`, fallback на `blue` для неизвестных значений).
- Добавлено скругление углов у `<img>` (`rounded-lg`), чтобы картинка визуально согласовывалась с fallback‑градиентом.
- Превью `http://localhost:8081/`: ошибок в браузере нет, визуально проверено переключение тем — красная тема показывает красный логотип, зелёная — зелёный, углы скруглены.

## 2025-11-08 — Соцсети в футере и серый фавикон

- Обновлён `src/components/Footer.tsx`: заменены ссылки на социальные сети согласно предоставленным URL.
  - Instagram → `https://www.instagram.com/cubick.ai/?igsh=MTVmdnY2ZzliazFmOQ==`
  - TikTok → `https://www.tiktok.com/@cubick.ai`
  - Threads → `https://www.threads.com/@cubick.ai`
  - Для внешних ссылок добавлены `target="_blank"` и `rel="noopener noreferrer"`.
- Обновлён `index.html`: добавлены теги фавикона и иконки для iOS, указывающие на `public/logo-grey.png`.
  - `<link rel="icon" href="/logo-grey.png" type="image/png" />`
  - `<link rel="apple-touch-icon" href="/logo-grey.png" />`

## 2025-11-09 — Интеграция Gemini через Supabase Edge Function

- Миграция серверной функции AI тренера на прямой вызов Google Gemini:
  - В `supabase/functions/ai-coach/index.ts` и зеркале `supabase/ai-coach/index.ts` удалён шлюз `lovable.dev` и заменён на прямой REST‑вызов `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`.
  - Секрет `LOVABLE_API_KEY` заменён на `GEMINI_API_KEY`; ключ читается из секретов проекта Supabase (Project Settings → Secrets), не из клиента.
  - Реализован адаптер потоковой передачи (SSE): ответы Gemini транслируются строками `data: ...` c статусом `streaming:chunk`, а финальный блок завершает поток, совместим с парсингом в `src/components/AICoach.tsx`.
- Обновлён фронтенд:
  - `src/components/AICoach.tsx`: тексты ошибок/оффлайн‑подсказок и инструкции теперь ссылаются на `GEMINI_API_KEY` вместо `LOVABLE_API_KEY`.
  - `src/lib/i18n.tsx`: переводы RU/EN обновлены — все упоминания `LOVABLE_API_KEY` заменены на `GEMINI_API_KEY`, сохранены тосты для 402/429/401/403/404.
- Настройка окружения:
  - Клиент: `.env.local` должен содержать `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` и (по желанию) `VITE_SUPABASE_FUNCTIONS_URL` для кастомного домена функций.
  - Сервер: задать секрет `GEMINI_API_KEY` через Supabase Dashboard (Project Settings → Secrets) или CLI: `supabase secrets set GEMINI_API_KEY="<ваш_ключ>"`.
- Проверка:
  - Запущен dev‑сервер, визуально подтверждён вывод обновлённых текстов в AICoach (указание `GEMINI_API_KEY`), оффлайн‑режим активируется при отсутствии/недоступности функций.
  - Функция обрабатывает лимиты (402/429) и доступ (401/403) с корректными SSE‑сообщениями; фронтенд показывает релевантные уведомления.


## 2025-11-08 — Подсветка карточек как секундомер

- Добавлены утилиты подсветки в `src/index.css` (`@layer components`):
  - `.feature-glow` — внешняя тень (box-shadow) и контур (outline) с использованием темовых переменных `--shadow-glow`/`--ring`.
  - `.feature-icon` — текстовая подсветка через `text-shadow: var(--timer-glow)`, совпадает по оттенку с секундомером.
- Применены классы к трём карточкам секции «Features» в `src/pages/Index.tsx`:
  - Каждому `<Card>` добавлен класс `feature-glow` для мягкого свечения и лёгкого подъёма на hover.
  - Внутренним круглым иконкам добавлен класс `feature-icon` для текстового glow.
- Проверено в превью (`http://localhost:5173/`): визуально карточки теперь подсвечиваются аналогично секундомеру; ошибок в консоли не наблюдается.

## 2025-11-08 — Ховер трёх карточек: как в Профиле

- Главная (`src/pages/Index.tsx`): удалены кастомные классы `feature-glow`/`feature-icon` и лишние `hover:shadow-lg transition-shadow` с трёх карточек секции Features.
- Оставлено только `interactive-card`, как в `src/pages/Profile.tsx`, чтобы при наведении карточка слегка поднималась и появлялась цветная размытая тень (зависит от темы: красная/синяя/зелёная), реализованная через `hsl(var(--primary)/...)` и `hsl(var(--accent)/...)` в `src/index.css`.
- Проверено в превью (`http://localhost:8081/`): эффект совпадает с карточками профиля; ошибок в браузере нет.

## 2025-11-08 — Усиленный подъём и glow на главной

- В `src/index.css` добавлен класс `.feature-lift` внутри `@layer components`:
  - `:hover` делает более заметный подъём (`translateY(-3px) scale(1.03)`) и усиливает цветной glow тенью на основе `hsl(var(--ring))`/`hsl(var(--accent))`, чтобы цвет зависел от текущей темы (красная/синяя/зелёная).
- В `src/pages/Index.tsx` три карточки секции Features получили класс `feature-lift` дополнительно к `interactive-card`.
- Проверено в превью (`http://localhost:8081/`): карточки поднимаются заметнее и подсвечиваются мягким цветом; ошибок не обнаружено.

## 2025-11-08 — Выравнивание интенсивности под профиль

- Удалён класс `feature-lift` из трёх карточек на главной (`src/pages/Index.tsx`), чтобы использовать только базовый `.interactive-card`.
- Удалён CSS-блок `.feature-lift` из `src/index.css`.
- Интенсивность ховера теперь совпадает с профилем: `translateY(-2px) scale(1.02)` и тени `0 10px 24px`/`0 2px 8px` на основе темы.
- Проверено в превью (`http://localhost:8081/`): поведение соответствует профилю; ошибок в браузере нет.

## 2025-11-08 — Размер карточек Features как у скрэмбла

- В `src/pages/Index.tsx` увеличен padding у трёх карточек секции Features: `p-8 md:p-12` вместо `p-6`, чтобы визуально соответствовать карточке скрэмбла/таймера.
- Ховер остаётся из `.interactive-card:hover`: `translateY(-2px) scale(1.02)` и тематические тени.
- Проверено в превью (`http://localhost:8081/`): визуально карточки воспринимаются крупнее, ошибок нет.

## 2025-11-08 — Явный подъём на ховере для карточек Features

- В `src/index.css` добавлен модификатор `.feature-hover` внутри `@layer components`.
- `.feature-hover:hover`: `translateY(-3px) scale(1.03)` и усиленная тень на базе `--ring`/`--accent`.
- В `src/pages/Index.tsx` применён класс `feature-hover` к трём карточкам раздела Features.
- Проверено в превью (`http://localhost:8081/`): подъём заметен, профильные карточки не затронуты; ошибок нет.

## 2025-11-08 — Системные анимации сайта: PageTransition + CSS утилиты

- Создан компонент `src/components/ui/PageTransition.tsx`: при маунте добавляет класс `motion-enter` для плавного появления содержимого страницы.
- В `src/index.css` добавлены keyframes и утилиты:
  - `@keyframes motionEnter` + класс `.motion-enter` (fade + легкий translateY + scale, 400ms, ease‑out).
  - `@keyframes pulseOnce` + класс `.pulse-once` (одиночный мягкий пульс, 240ms, ease‑out).
  - Блок `@media (prefers-reduced-motion: reduce)`: снижает длительность анимаций до 1ms для доступности.
- Все основные страницы обёрнуты в `PageTransition` для единообразного появления:
  - `src/pages/Index.tsx`, `src/pages/Profile.tsx` (обе ветки — guest и main), `src/pages/Beginner.tsx`, `src/pages/Friedrich.tsx`, `src/pages/Instructions.tsx`, `src/pages/Login.tsx`, `src/pages/Register.tsx`, `src/pages/NotFound.tsx`.
- Таймер (`src/components/Timer.tsx`): добавлен одиночный пульс при остановке — состояние `pulse`, сравнение предыдущего `isRunning` через `useRef`, класс `.pulse-once` и `onAnimationEnd` для сброса.
- Визуально проверено в локальном превью: страницы мягко входят, таймер при остановке делает короткий пульс; ошибок в консоли браузера нет.

### 2025-11-08 — Тюнинг анимаций: увеличение длительности и ховер в профиле

- Увеличена длительность входной анимации страниц: `.motion-enter` теперь `600ms` (ранее `400ms`) с тем же `cubic-bezier(0.22, 1, 0.36, 1)`.
- Профиль: добавлен ховер-эффект увеличения для карточек статистики и гостевой карточки — класс `interactive-card` в `src/pages/Profile.tsx`.
- Проверено в превью `http://localhost:8081/`: длительность стала заметно плавнее; карточки профиля увеличиваются при наведении, без артефактов.

### 2025-11-08 — Глобальный hover‑эффект для всех карточек

- Обновлён компонент `src/components/ui/card.tsx`: к корневому элементу добавлен класс `interactive-card`, что включает лёгкое увеличение и тени при наведении для всех карточек во всём проекте.
- Визуальная проверка на страницах (`Index`, `Beginner`, `Friedrich`, `Instructions`, `Login`, `Register`, `Profile`, `NotFound`): все карточки реагируют одинаково, конфликтов со стилями нет.
- Проверено в превью `http://localhost:8081/`: ошибок в консоли нет; фавикон отображается серым логотипом, ссылки в футере ведут на нужные страницы и открываются в новой вкладке.

## 2025-11-08 — Округлённый фавикон

- Добавлен `public/favicon.svg`: внутри SVG используется `<clipPath>` с `rx=12` для скругления углов, изображение `logo-grey.png` вставлено через `<image>` с `preserveAspectRatio="xMidYMid slice"`.
- Обновлён `index.html`: `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />` и сохранён `apple-touch-icon` на `/logo-grey.png`.
- Проверено в превью `http://localhost:8081/`: ошибок в браузере нет; фавикон визуально отображается с округлёнными углами. При необходимости обновления кэша вкладки можно перезагрузить страницу или закрыть/открыть вкладку.

## 2025-11-08 — Фавикон: фикс пустого отображения

- Обновлён `public/favicon.svg`: добавлен `xmlns:xlink` и использован относительный путь `logo-grey.png` в `xlink:href` и `href`; установлен `preserveAspectRatio="none"` для заполнения кадра.
- Обновлён `index.html`: добавлены fallback‑ссылки на PNG (`/logo-grey.png`, `sizes="64x64"`) и ICO (`/favicon.ico`), для SVG задано `sizes="any"`.
- Превью `http://localhost:8081/`: ошибок в браузере нет; фавикон больше не пустой, корректно отображается (SVG или PNG в зависимости от браузера).

## 2025-11-08 — Откат на прежний фавикон без округления

- Обновлён `index.html`: удалена строка подключения SVG фавикона, оставлены PNG (`/logo-grey.png`) и ICO (`/favicon.ico`).
- Причина: пожелание вернуть прежний вид фавикона без округления.
- Проверено в превью `http://localhost:8081/`: ошибок в браузере нет; фавикон отображается как прежнее изображение без скругления.
## 2025-11-08 — Hover карточек, контакты и иконки соцсетей

- Index.tsx: добавлен класс `interactive-card` на третью карточку в секции «Функции», чтобы hover-анимация (подъём, тень) работала одинаково у всех трёх.
- Footer.tsx (Контакты): скрыт номер телефона, оставлен только email.
- Footer.tsx (Соцсети): заменены иконки TikTok и Threads на более подходящие (`Clapperboard`, `MessageCircle` из lucide-react) при сохранении размеров и hover-стилей.
- В превью `http://localhost:8081/`: ошибок в браузере нет, визуальные изменения подтверждены.
## 2025-11-08 — Брендовые иконки TikTok и Threads

- Footer.tsx: заменены универсальные иконки на встроенные брендовые монохромные SVG (`TikTokIcon`, `ThreadsIcon`) с `fill="currentColor"` для корректной перекраски при hover.
- Ссылки и `aria-label` сохранены, размеры (`h-5 w-5`) не изменены.
- В превью `http://localhost:8081/`: ошибок в браузере нет, иконки отображаются и реагируют на наведение.
## 2025-11-08 — Добавлены брендовые SVG-файлы иконок

- В `public/icons/` созданы:
  - `tiktok.svg` — монохромная брендовая иконка TikTok (`fill="currentColor"`, `viewBox="0 0 24 24"`).
  - `threads.svg` — монохромная брендовая иконка Threads (`fill="currentColor"`, `viewBox="0 0 24 24"`).
- UI не изменён: на странице по-прежнему используются встроенные SVG-компоненты в `Footer.tsx`, чтобы иконки корректно перекрашивались на hover.
## 2025-11-08 — Замена соц.иконок на tiktok1/threads1

- В `src/components/Footer.tsx` заменены встроенные SVG-компоненты `TikTokIcon` и `ThreadsIcon` на версии из `public/icons/tiktok1.svg` и `public/icons/threads1.svg`.
- Используется `viewBox="0 0 50 50"`, `fill="currentColor"`, чтобы корректно перекрашиваться при `hover` в контейнерах `w-10 h-10`.
- Размер иконок установлен через классы `h-5 w-5` (вариант A = ~20px) для консистентности с Instagram/Telegram.
- Визуально проверено в превью: иконки центрированы, меняют цвет на `hover`, ошибок в браузере не обнаружено.
## 2025-11-08 — Размер соц.иконок TikTok/Threads = 25px

- В `src/components/Footer.tsx` обновлены классы размеров для `TikTokIcon` и `ThreadsIcon`: `h-[25px] w-[25px]`.
- Контейнеры ссылок оставлены `w-10 h-10`; hover-перекраска через `currentColor` работает.
- Проверено в локальном превью: выравнивание по центру корректное, ошибок нет.
2025-11-08: Добавлена мини-анимация перехода на главную по клику на бренд "Cubick AI" в Header.

- Файл: src/components/Header.tsx
- Изменения:
  - Импортирован useState из react и добавлено состояние brandAnimating.
  - Реализован обработчик handleBrandActivate: отменяет стандартный переход, включает анимацию, затем через 200ms выполняет navigate("/").
  - На <Link to="/"> добавлены onClick и onKeyDown (Enter/Space) для активации анимации.
  - Добавлены классы Tailwind: transition-opacity, transition-transform, duration-200; при анимации применяется scale-95 и opacity-70.

- Проверка: в локальном превью анимация (легкий scale+fade) отрабатывает при клике/Enter, после ~200ms происходит переход на главную, ошибок в консоли браузера нет.
2025-11-08: Обновление анимации бренда "Cubick AI".

- Файл: src/components/Header.tsx
  - Увеличена длительность выходной анимации до 300ms.
  - Добавлен флаг sessionStorage("brand-entry") перед navigate("/") для входной анимации после перехода.
  - Подключены useLocation/useEffect: на главной при наличии флага включается состояние brandEntering на 300ms.
  - В Link добавлены классы: duration-300 и условный класс brand-enter.

- Файл: src/index.css
  - Добавлены keyframes brandEnter и класс .brand-enter (opacity 0→1, scale 1.05→1, 300ms ease).

- Проверка: в локальном превью выходная анимация 300ms срабатывает при клике/Enter, после перехода и при перезагрузке на главной запускается входная анимация (brand-enter). Ошибок в консоли нет.
## UI: Staggered features and wider auth cards

- Added `.stagger-enter` utility in `src/index.css` to apply sequential `motionEnter` animations to direct children, with delays 80/160/240ms and `prefers-reduced-motion` fallback.
- Applied `stagger-enter` to the three feature cards grid in `src/pages/Index.tsx` to achieve a consistent, engaging entrance effect.
- Widened auth page cards:
  - `src/pages/Login.tsx`: `Card` changed from `max-w-md p-8` to `max-w-xl md:max-w-2xl p-10` for a more horizontally rectangular shape.
  - `src/pages/Register.tsx`: `Card` changed from `max-w-md p-8` to `max-w-xl md:max-w-2xl p-10` to match login.
- Verified via local preview (`http://localhost:8081/`): stagger animations work on main page; login/register cards appear wider and more rectangular horizontally; no runtime errors observed.
## UI: Wider auth cards (second pass)

- Increased width of auth cards for more horizontal, rectangular shape:
  - `src/pages/Login.tsx`: `Card` widened from `max-w-xl md:max-w-2xl p-10` to `max-w-3xl md:max-w-4xl p-12`. Wrapped inner content in `div.max-w-xl.mx-auto` to keep form fields readable.
  - `src/pages/Register.tsx`: same widening and inner constraint applied for consistency.
- Verified in preview (`http://localhost:8081/`): layout looks wider and balanced; inputs remain comfortably readable; no runtime errors observed.
## UI: Wider auth cards (third pass)

- Per request to only make cards wider without other changes:
  - `src/pages/Login.tsx`: increased outer `Card` width from `max-w-3xl md:max-w-4xl` to `max-w-5xl md:max-w-6xl` (kept `p-12`).
  - `src/pages/Register.tsx`: same width increase for consistency; inner `div.max-w-xl.mx-auto` retained.
- Verified visually at `http://localhost:8081/`: cards are noticeably wider; no console errors.
## UI: Minimal Elevated style for auth cards

- Added `.auth-card` utility in `src/index.css` within `@layer components`:
  - Rounded corners (~`rounded-2xl`), subtle `ring-1 ring-white/10` outline.
  - Dark translucent background (`slate-900/70` equivalent) and soft elevation shadow.
  - Gentle hover: slight scale and stronger shadow; `prefers-reduced-motion` respected by using brief transitions and no forced large movement.
- Applied `.auth-card` to `Card` in `src/pages/Login.tsx` and `src/pages/Register.tsx` while keeping widths `w-full max-w-5xl md:max-w-6xl p-12` and inner `div.max-w-xl.mx-auto` for readability.
- Verified in preview (`http://localhost:8081/`): cards now have a minimal elevated look with a subtle hover and remain wide; no browser console errors observed.
## UI: Wider auth cards (fourth pass) + expanded placeholders

- Per request to make cards a bit wider and expand placeholders:
  - `src/pages/Login.tsx`: widened outer `Card` from `max-w-5xl md:max-w-6xl` to `max-w-6xl md:max-w-7xl`; inner container increased from `max-w-xl` to `max-w-2xl`.
  - `src/pages/Register.tsx`: same width changes applied for consistency.
  - Inputs on both pages updated to use `className="w-full text-base md:text-lg placeholder:text-slate-400"` to make placeholder text larger and utilize full width.
- Verified visually at `http://localhost:8081/`: cards slightly wider; placeholders and input text take advantage of increased width; no console errors.
## UI: Wider auth cards (fifth pass) — 1.5× width

- Per request to increase width by 1.5×:
  - `src/pages/Login.tsx`: `Card` max width changed from `max-w-6xl md:max-w-7xl` to `max-w-[108rem] md:max-w-[120rem]`; inner container increased from `max-w-2xl` to `max-w-[63rem]`.
  - `src/pages/Register.tsx`: applied the same 1.5× changes for consistency.
- Verified in preview (`http://localhost:8081/`): both auth pages show significantly wider cards and content containers; no browser console errors observed.
## 2025-11-08 — Выровнял стили трёх карточек под скрэмбл

- Цель: сделать три карточки на главной полностью аналогичными карточке скрэмбла по визуалу и поведению наведения.
- Изменения:
  - Файл: `src/pages/Index.tsx`
    - Для трёх карточек добавлены классы скрэмбла: `bg-gradient-to-br from-card to-muted/20 shadow-xl border-2`.
    - Удалён модификатор `feature-hover`, чтобы поведение ховера соответствовало базовому `.interactive-card:hover`.
    - Сохранены увеличенные отступы `p-8 md:p-12` и класс `interactive-card`.
- Итог: карточки визуально совпадают со скрэмблом (градиент фона, подчёркнутая рамка, усиленная тень) и поднимаются на ховере согласно стилю `.interactive-card:hover`.
- Проверка: открыта превью `http://localhost:8081/`, ошибок в браузере не обнаружено.
## 2025-11-08 — Локализация бейджа «ИИ» на главной

- Цель: при переключении языка бейдж внутри карточки показывал «ИИ» на русском и «AI» на английском.
- Изменения:
  - Файл: `src/lib/i18n.tsx`
    - Добавлен ключ перевода: `"ИИ": "AI"` в словарь `enDict`.
  - Файл: `src/pages/Index.tsx`
    - Заменён статичный текст `ИИ` в круглой метке на `{t("ИИ")}`.
- Проверка: открыта превью `http://localhost:8081/`, ошибок в браузере не обнаружено; метка корректно отображается в зависимости от языка.
## 2025-11-08 — Тени auth-card стали зависеть от темы

- Проблема: карточки Login/Register имели чёрную тень, не соответствующую выбранной теме (синяя/красная/зелёная).
- Изменения:
  - Файл: `src/index.css`
    - В `.auth-card` базовая тень заменена на `box-shadow: 0 12px 28px hsl(var(--ring) / 0.35)`.
    - В `.auth-card:hover` тени заменены на:
      - `0 16px 36px hsl(var(--ring) / 0.45),`
      - `0 4px 12px hsl(var(--accent) / 0.30)`.
    - Остальные свойства (outline, transition) оставлены без изменений.
- Проверка: открыта превью `http://localhost:8081/`, ошибок в браузере не обнаружено; тени карточек на Login/Register визуально соответствуют активной теме.
2025-11-08: Widen auth cards content width
- Updated inner container `max-w` in `src/pages/Login.tsx` and `src/pages/Register.tsx` from `max-w-[63rem]` to `max-w-[66rem]` to slightly widen the login/register cards while keeping padding and structure unchanged.
- Verified visually in dev preview (`http://localhost:8081/`) across themes; layout remains balanced, inputs and headings read well.
2025-11-08: Increased auth cards width to 75rem
- Updated inner container `max-w` in `src/pages/Login.tsx` and `src/pages/Register.tsx` from `max-w-[66rem]` to `max-w-[75rem]` per user request to make the cards wider.
- Verified in dev preview (`http://localhost:8081/`); layout remains stable, inputs and headings maintain balance.
2025-11-08: Set auth cards width/height per request
- Login/Register cards: changed `<Card>` classes to `max-w-[1500px] h-[550px] overflow-y-auto` and inner container to `w-full mx-auto` to set explicit width and fixed height (50px less than prior estimate), with vertical scroll when needed.
- Verified in dev preview (`http://localhost:8081/`); layout renders with 1500px max width, fixed vertical height, content scrolls if exceeding height.
2025-11-08: Adjust auth cards width to 1000px
- Updated `<Card>` in `Login.tsx` and `Register.tsx` from `max-w-[1500px]` to `max-w-[1000px]`, keeping `h-[550px]` unchanged per request.
- Verified in dev preview (`http://localhost:8081/`); width now capped at 1000px, height remains fixed, layout stable.
## 2025-11-08 — Rollback auth card px constraints

- Reverted Login/Register `<Card>` classes from `max-w-[1000px] h-[550px] overflow-y-auto p-12` back to responsive defaults:
  - `<Card class="auth-card w-full max-w-[108rem] md:max-w-[120rem] p-12">`
  - Inner wrapper restored to `<div class="max-w-[75rem] mx-auto">` (previously `w-full mx-auto`).
- Rationale: user requested to remove the latest actions and keep the prior state.
- Verified in dev preview (`http://localhost:8081/`) that cards render with responsive width, auto height, and inner content constrained to `75rem` as before.

## 2025-11-09 — Прямой чат без Supabase (Frontend → Gemini)

- `.env`: добавлен `VITE_GEMINI_API_KEY` (пробрасывает существующий `GEMINI_API_KEY` в клиент).
- `src/integrations/gemini.ts`: модуль прямого вызова Google Gemini (`gemini-1.5-flash`), конвертация истории сообщений, обработка ошибок 429/401/403, извлечение текста из кандидатов.
- `src/components/AICoach.tsx`:
  - Удалены Supabase-эндпоинт, авторизация и парсинг SSE-стрима.
  - Удалены оффлайн-режим и локальные советы на основе статистики.
  - Удалён индикатор режима (Онлайн/Офлайн/Ожидание) в заголовке.
  - Добавлен прямой вызов `callGemini([...messages, userMessage], VITE_GEMINI_API_KEY)` и упрощённая обработка ошибок (только тосты + откат сообщения).
- Dev: запущен локальный сервер на `http://localhost:8082/`, визуально проверены изменения; ошибок в браузере не обнаружено.

Итог: чат AI работает напрямую без Supabase и других сервисов; требуется валидный `VITE_GEMINI_API_KEY` в `.env` и перезапуск dev-сервера.

## 2025-11-09 — Markdown-рендер ответов AI, фильтр тематики и аналитика

- Установлены пакеты `react-markdown` и `remark-gfm` для поддержки Markdown в ответах ассистента.
- Обновлён `src/components/AICoach.tsx`:
  - Сообщения ассистента рендерятся через `ReactMarkdown` с `remarkGfm` (поддержка таблиц, списков и чекбоксов).
  - Отключён произвольный HTML для безопасности; ссылки открываются в новой вкладке (`target="_blank" rel="noopener noreferrer"`).
  - Добавлена базовая стилизация блоков кода для лучшей читаемости.
- Добавлен клиентский фильтр тематики (в `AICoach.tsx`): если запрос не относится к спидкубингу, показывается тост и запрос не отправляется на Gemini.
- Обновлён системный промпт в `src/integrations/gemini.ts`:
  - Ассистент строго ограничен доменом «спидкубинг»; вежливо отказывает на вопросы вне тематики и предлагает сформулировать запрос про сборку кубика.
  - Требование выдавать ответы в формате Markdown (заголовки, списки, таблицы, код-блоки для алгоритмов).
- Интеграция аналитики Vercel:
  - Первая попытка подключения компонента `<Analytics />` из `@vercel/analytics/react` вызвала ошибку «Invalid hook call» в окружении Vite/React 18; компонент удалён из `src/App.tsx`.
  - Создан модуль событийного трекинга `src/lib/analytics.ts` на базе `@vercel/analytics` (`va.track`) с безопасным `try/catch`.
  - В `AICoach.tsx` добавлены события: `ai_user_message`, `ai_response_ok`, `ai_response_error` с полезными полями (длина сообщения, длительность ответа, тип ошибки).
- Проверено в превью (`http://localhost:8082/`):
  - Ошибок в консоли браузера нет; Markdown корректно отображает заголовки/списки/таблицы/код.
  - Фильтр тематики блокирует нерелевантные запросы; ассистент отвечает только по спидкубингу.
  - События аналитики вызываются без ошибок.
- Примечание: текущая модель Gemini на фронтенде остаётся `gemini-1.5-flash`; миграция на `gemini-2.0-flash` запланирована отдельно.

## 2025-11-10 — Оптимизация для iPhone 12 Pro (iOS Safari)

- Добавлены мобильные утилиты в `src/index.css`:
  - `.ios-safe-top` и `.ios-safe-bottom` — учёт safe-area (вырез и домашняя панель).
  - `.ios-vh` — надёжная высота экрана (fallback на `svh`, при поддержке — `dvh`).
  - `.ios-scroll` — плавная прокрутка (`-webkit-overflow-scrolling: touch`) и `overscroll-behavior`.
  - `.ios-sticky-bottom` — липкий низ для панели ввода с учётом safe-area.
- Обновлён `src/components/Header.tsx` — добавлен класс `ios-safe-top` для корректного отступа сверху.
- Обновлён `src/components/Footer.tsx` — добавлен класс `ios-safe-bottom` для корректного отступа снизу.
- Адаптирован чат `src/components/AICoach.tsx`:
  - Область сообщений стала гибкой (`flex-1 min-h-0`) и прокручиваемой (`ios-scroll`).
  - Панель ввода закреплена внизу (`ios-sticky-bottom ios-safe-bottom`) с фоновой полупрозрачностью и блюром.
- Обновлены основные страницы для iOS-высоты/прокрутки:
  - `src/pages/Index.tsx`, `src/pages/Beginner.tsx`, `src/pages/Profile.tsx` — корневой контейнер заменён на `ios-vh`, основной контент помечен `ios-scroll`.
- Проверено, что в `index.html` уже установлен `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">` и добавлены iOS PWA мета-теги.

Ожидание визуальной проверки на локальном сервере: удостовериться, что на iPhone 12 Pro корректны высота экранов, плавность прокрутки, и панель ввода в чате не перекрывается домашней панелью.
### 2025-11-12 — Фикс сброса темы при перезагрузке
- Причина: страница `TimerFullscreen` не содержит `Header`, поэтому `ThemeToggle` не инициализировал тему на маунте, и после reload дизайн откатывался к дефолту.
- Исправление: ранняя инициализация темы до маунта React.
  - `src/main.tsx`: применяем `data-theme` и класс `dark` из `localStorage` (fallback: `blue` + `prefers-color-scheme`).
  - `index.html`: добавлен inline‑скрипт в `<head>` для pre‑hydration установки темы, чтобы избежать мигания.
- Проверка: после перезагрузки на `/` и `/timer` выбранная тема и режим сохраняются без визуального сброса.
2025-11-12: Fix AI Coach crash on prompt submit

- Added `src/components/ErrorBoundary.tsx` and wrapped App contents to capture render errors and show a fallback instead of a blank page.
- Updated `src/components/AICoach.tsx` to use `onKeyDown` for Enter handling and to inject a safe assistant error message on failures, avoiding empty UI states.
- Hardened `src/components/ui/sonner.tsx` to derive theme from `document.documentElement` instead of `next-themes`, removing dependency that could throw without a provider.
- Verified Supabase Edge function (`supabase/functions/ai-coach/index.ts`) stays unchanged; client now surfaces errors gracefully.
- Purpose: prevent full-page blank screen and ensure predictable UI behavior when AI request fails or misconfigurations occur.
2025-11-12: Remove Markdown rendering from AI Coach

- AICoach: replaced ReactMarkdown with plain text rendering; removed remark-gfm import.
- Client prompt (src/integrations/gemini.ts): updated system prompt to forbid Markdown; require plain text only.
- Edge Function (supabase/ai-coach/index.ts): aligned system prompt to forbid Markdown and enforce plain text responses.
- Goal: ensure AI replies display as simple text without headings/lists/code blocks; preserve line breaks.
## 2025-11-17 — Добавлен раздел F2L в Инструкции

- Внедрены вкладки F2L/OLL/PLL на странице `src/pages/Instructions.tsx:114`.
- Реализована карточка случая F2L с SVG‑диаграммой и копированием алгоритма.
- Заполнено 12 базовых случаев F2L с названиями, планом действий и алгоритмами.
- Добавлены ключи локализации для F2L UI в `src/lib/i18n.tsx:28-61`.
- Оставлены заглушки для OLL/PLL, план дальнейшего наполнения сохранён.