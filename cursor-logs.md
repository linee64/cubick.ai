# Cursor Log

## 2025-12-06 — Исправление кнопки "Отправить" в AI Coach
- Проблема: Кнопка "Отправить" вызывала `sendMessage` с объектом события (`onClick={sendMessage}`), что приводило к ошибке `text.trim is not a function` при попытке обработать аргумент как строку.
- Решение: Обновлён обработчик `onClick` в `src/components/AICoach.tsx` на анонимную функцию `onClick={() => sendMessage()}`, чтобы вызывать функцию без аргументов (используя состояние `input`).
- Результат: Отправка сообщений теперь работает корректно, в том числе в мобильной версии.

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
