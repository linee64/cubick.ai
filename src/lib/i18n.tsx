import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "ru" | "en";

type I18nContextType = {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (text: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Simple translation dictionary: map Russian source strings to English
const enDict: Record<string, string> = {
  // Header
  "Инструкции": "Instructions",
  "Профиль": "Profile",
  "Выйти": "Logout",
  "Войти": "Login",
  "Регистрация": "Register",

  // Index / Hero
  "Научитесь собирать кубик Рубика с ИИ": "Learn to solve the Rubik's Cube with AI",
  "Cubick AI поможет вам освоить сборку кубика от новичка до продвинутого уровня": "Cubick AI helps you progress from beginner to advanced solving",
  "Для новичков": "For Beginners",
  "Метод Фридрих": "CFOP",
  "На весь экран": "Full screen",
  "Инструкции": "Instructions",
  "Справочник": "Reference",
  "Навигация": "Navigation",
  "Меню": "Menu",
  "Аккаунт": "Account",
  "Настройки": "Settings",
  "Язык": "Language",
  "Тема": "Theme",
  "План действий": "Plan",
  "Скопировать": "Copy",
  "Первые два слоя": "First Two Layers",
  "Ориентация последнего слоя": "Orientation of Last Layer",
  "Перестановка последнего слоя": "Permutation of Last Layer",
  "Схема": "Diagram",
  "Открыть F2L": "Open F2L",
  "Открыть OLL": "Open OLL",
  "Открыть PLL": "Open PLL",
  "Раздел OLL будет заполнен позже": "OLL section will be added later",
  "Раздел PLL будет заполнен позже": "PLL section will be added later",
  "Пара собрана в U, вставка в FR": "Pair assembled in U, insert into FR",
  "Выровнять пару над целевым слотом": "Align pair over target slot",
  "Вставить базовым алгоритмом": "Insert with basic algorithm",
  "Пара разделена, белая наверх, слот FR": "Pair split, white on top, slot FR",
  "Сформировать пару": "Form the pair",
  "Вставить через F перемещение": "Insert using F move",
  "Пара разделена, белая спереди, слот FR": "Pair split, white at front, slot FR",
  "Подвести угол": "Bring corner",
  "Вставить через F": "Insert via F",
  "Пара собрана, ориентация неверна, слот FR": "Pair assembled, wrong orientation, slot FR",
  "Переориентировать пару": "Reorient the pair",
  "Вставить в слот": "Insert into slot",
  "Ребро в средине, угол в U, слот FR": "Edge in middle, corner in U, slot FR",
  "Вывести ребро в U": "Bring edge to U",
  "Угол в слоте неверно, ребро в U": "Corner wrong in slot, edge in U",
  "Вынуть угол": "Extract corner",
  "Ребро в слоте, угол в U": "Edge in slot, corner in U",
  "Вынуть ребро": "Extract edge",
  "Пара собрана над другим слотом": "Pair over wrong slot",
  "Переместить над целевым слотом": "Move over target slot",
  "Пара собрана в U, вставка в FL": "Pair assembled in U, insert into FL",
  "Выровнять над FL": "Align over FL",
  "Вставить базовым зеркальным": "Insert with mirrored basic",
  "Пара разделена для FL": "Pair split for FL",
  "Завершить R последовательностью": "Finish with R sequence",
  "Переориентация пары для BR": "Pair reorientation for BR",
  "Переориентировать": "Reorient",
  "Извлечь и вставить пару для BL": "Extract and insert pair for BL",
  "Извлечь пару": "Extract pair",
  "Сформировать": "Form",
  "Сформировать ориентацию углов": "Orient corners",
  "Довести до полностью ориентированного слоя": "Complete full orientation",
  "Завершить ориентацию слоя": "Finish layer orientation",
  "Переставить ребра по часовой": "Permute edges clockwise",
  "Сохранить ориентацию углов": "Keep corners orientation",
  "Переставить ребра против часовой": "Permute edges counterclockwise",
  "Поменять противоположные ребра": "Swap opposite edges",
  "Завершить перестановку слоя": "Finish layer permutation",
  "Поменять соседние ребра": "Swap adjacent edges",
  "Достроить финальные позиции": "Finalize positions",

// Features
  "ИИ-помощник": "AI Coach",
  "ИИ": "AI",
  "Персональный ИИ-тренер анализирует ваш прогресс и дает советы": "Personal AI coach analyzes your progress and gives advice",
  "Точный таймер": "Accurate Timer",
  "Отслеживайте свое время и улучшайте результаты": "Track your times and improve your results",
  "Два уровня": "Two Levels",
  "От базового метода для новичков до продвинутого Фридриха": "From beginner method to advanced CFOP",

  // Timer
  "Отпустите пробел для старта": "Release Space to start",
  "Нажмите пробел для остановки": "Press Space to stop",
  "Зажмите пробел для начала": "Hold Space to get ready",
  "Отпустите экран для старта": "Release screen to start",
  "Нажмите на таймер для остановки": "Tap timer to stop",
  "Зажмите экран для начала": "Hold screen to start",
  "Заново": "Reset",
  "Сохранить": "Save",
  "Время сохранено!": "Time saved!",
  "Ваше время: ": "Your time: ",

  // Scramble
  "Скрэмбл": "Scramble",
  "Новый": "New",

  // Login
  "Успешный вход": "Login successful",
  "Добро пожаловать!": "Welcome!",
  "Ошибка входа": "Login error",
  "Попробуйте ещё раз": "Please try again",
  "Вход": "Login",
  "Войдите в свой аккаунт Cubick AI": "Sign in to your Cubick AI account",
  "Пароль": "Password",
  "Нет аккаунта? ": "No account? ",
  "Зарегистрироваться": "Register",

  // Register
  "Проверьте данные": "Check your input",
  "Пароли не совпадают": "Passwords do not match",
  "Заполните все поля": "Please fill out all fields",
  "Проверьте почту": "Check your email",
  "Мы отправили ссылку для подтверждения": "We sent a confirmation link",
  "Регистрация успешна": "Registration successful",
  "Ошибка регистрации": "Registration error",
  "Регистрация": "Register",
  "Создайте аккаунт Cubick AI": "Create a Cubick AI account",
  "Имя": "Name",
  "Ваше имя": "Your name",
  "Подтвердите пароль": "Confirm password",
  "Создание...": "Creating...",
  "Создать аккаунт": "Create account",
  "Уже есть аккаунт? ": "Already have an account? ",
  "Войти": "Login",

  // Profile
  "Требуется авторизация": "Authentication required",
  "Перенаправление на страницу входа...": "Redirecting to login...",
  "Профиль": "Profile",
  "Сборок": "Solves",
  "Лучшее время": "Best time",
  "Среднее": "Average",

  // Header logout toasts
  "Вы вышли из аккаунта": "You have logged out",
  "Ошибка выхода": "Logout error",

  // Instructions page
  "Нотация кубика Рубика": "Rubik's Cube Notation",
  "Изучите символы и обозначения для записи алгоритмов сборки": "Learn symbols used to write solving algorithms",
  "Основные правила": "Basic rules",
  "Понимание нотации - ключ к изучению алгоритмов": "Understanding notation is key to learning algorithms",
  "Обозначения:": "Notation:",
  "Буква без знака": "Letter without apostrophe",
  "поворот по часовой стрелке": "turn clockwise",
  "Апостроф (')": "Apostrophe (')",
  "поворот против часовой стрелки": "turn counterclockwise",
  "Цифра 2": "Number 2",
  "двойной поворот (180°)": "double turn (180°)",
  "Как читать:": "How to read:",
  "Направление \"по часовой стрелке\" определяется при взгляде на грань прямо.": "Clockwise is defined when looking directly at the face.",
  "Например, для грани R (правой) - это если смотреть на кубик справа.": "For the R face, imagine looking at the cube from the right.",
  "Примеры алгоритмов": "Algorithm examples",
  "Один из базовых алгоритмов - поворот правой грани вверх и обратно": "A basic algorithm: right face up and back",
  "Алгоритм для создания креста на последнем слое": "Algorithm to create last layer cross",

  // Beginner page
  "Назад": "Back",
  "Метод для новичков": "Beginner Method",
  "Введение": "Introduction",
  "Метод послойной сборки - это самый простой способ научиться собирать кубик Рубика.": "Layer-by-layer method is the simplest way to learn solving.",
  "Вы будете собирать кубик слой за слоем, начиная с белого креста.": "You build layer by layer starting with the white cross.",
  "Белый крест": "White cross",
  "Соберите белый крест на верхней грани, сопоставляя цвета ребер с центрами боковых граней.": "Make a white cross on the top, matching edge colors with centers.",
  "Белые углы": "White corners",
  "Расставьте все белые углы на свои места, завершив первый слой.": "Place all white corners to finish the first layer.",
  "Средний слой": "Middle layer",
  "Расставьте ребра среднего слоя, используя алгоритмы для левой и правой вставки.": "Insert middle layer edges using left/right insertion algorithms.",
  "Желтый крест": "Yellow cross",
  "Сформируйте желтый крест на последней грани (не обращая внимания на совпадение боковых цветов).": "Form a yellow cross on last layer (ignore side color matching).",
  "Желтые углы на места": "Place yellow corners",
  "Расставьте углы последней грани на правильные позиции (ориентация пока не важна).": "Put last layer corners in correct positions (ignore orientation).",
  "Ориентация углов": "Orient corners",
  "Разверните углы правильно, чтобы завершить сборку кубика.": "Twist corners correctly to finish the solve.",
  "💡 Совет от ИИ": "💡 AI Tip",
  "Практикуйтесь регулярно! Начните с медленной сборки, фокусируясь на понимании алгоритмов.": "Practice regularly. Start slow, focus on understanding algorithms.",
  "Скорость придет со временем. Используйте таймер на главной странице для отслеживания прогресса.": "Speed comes with time. Use the timer on the home page to track progress.",

  // Friedrich page
  "Метод Фридрих (CFOP)": "CFOP",
  "О методе": "About the method",
  "Метод Фридрих (CFOP) - самый популярный метод скоростной сборки кубика Рубика.": "CFOP is the most popular speedcubing method.",
  "Используется большинством спидкуберов мирового уровня.": "Used by most top speedcubers.",
  "расшифровывается как: Cross - F2L - OLL - PLL": "stands for: Cross - F2L - OLL - PLL",
  "Cross (Крест)": "Cross",
  "Соберите крест на нижней грани за минимальное количество ходов (обычно 8 или меньше).": "Build the cross on the bottom in minimal moves (<= 8).",
  "Продвинутые спидкуберы планируют крест заранее во время инспекции.": "Advanced cubers plan the cross during inspection.",
  "First Two Layers (Первые два слоя)": "First Two Layers",
  "Одновременно вставляйте пары угол-ребро, завершая первые два слоя за один шаг.": "Insert corner-edge pairs, finishing the first two layers in one step.",
  "41 базовый случай F2L. Цель - научиться распознавать и решать их интуитивно.": "41 base F2L cases; learn to recognize and solve intuitively.",
  "Orientation of Last Layer (Ориентация последнего слоя)": "Orientation of Last Layer",
  "Ориентируйте все элементы последнего слоя правильной стороной вверх.": "Orient all last layer pieces face-up.",
  "57 различных алгоритмов OLL. Начинайте с изучения самых частых случаев.": "57 OLL algs; start with most common cases.",
  "Permutation of Last Layer (Перестановка последнего слоя)": "Permutation of Last Layer",
  "Расставьте элементы последнего слоя на их финальные позиции.": "Permute last layer pieces into final positions.",
  "21 алгоритм PLL. Это последний шаг сборки!": "21 PLL algs. The final step!",
  "🚀 Советы от ИИ для освоения CFOP": "🚀 AI Tips for mastering CFOP",
  "Учите поэтапно:": "Learn in stages:",
  "Сначала освойте интуитивный F2L, затем постепенно добавляйте OLL и PLL": "Master intuitive F2L, then add OLL and PLL",
  "Практикуйте look-ahead:": "Practice look-ahead:",
  "Учитесь планировать следующую пару F2L во время выполнения текущей": "Plan the next F2L pair while executing the current",
  "Finger tricks:": "Finger tricks:",
  "Правильные движения пальцев критичны для скорости": "Proper finger tricks are critical for speed",
  "Распознавание паттернов:": "Pattern recognition:",
  "Тренируйтесь быстро узнавать случаи OLL и PLL": "Train to quickly recognize OLL and PLL cases",
  "Используйте таймер:": "Use a timer:",
  "Регулярно засекайте время, чтобы отслеживать прогресс": "Time your solves regularly to track progress",
  "📊 Целевое время по этапам": "📊 Target times by stage",
  "Эти показатели приведут вас к результату sub-20 (меньше 20 секунд на сборку)": "These targets lead to sub-20 solves",

  // Footer
  "Cubick AI — ваш умный помощник в мире спидкубинга. Учитесь, тренируйтесь и улучшайте результаты с помощью искусственного интеллекта.": "Cubick AI — your smart speedcubing assistant. Learn, train, and improve with AI.",
  "Контакты": "Contacts",
  "Мы в соцсетях": "Follow us",
  "Все права защищены.": "All rights reserved.",

  // AI Coach nav and CTA
  "ИИ‑тренер": "AI Coach",
  "Поговорить с ИИ на отдельной странице": "Chat with AI on a dedicated page",
  "Перейти к чату с ИИ": "Go to AI chat",

  // Feedback
  "Поделиться отзывом": "Share your feedback",
  "Мы очень уважаем мнение наших юзеров и верим, что они помогут сделать сайт лучше": "We value our users' opinions and believe they help make the site better",
  "Напишите отзыв...": "Write your feedback...",
  "Отправить": "Submit",
  "Отправить отзыв": "Submit feedback",
  "Отзыв отправлен": "Feedback submitted",
  "Спасибо за ваш отзыв!": "Thank you for your feedback!",
  "Ошибка отправки": "Submission error",
  "Пустой отзыв": "Empty feedback",
  "Пожалуйста, напишите ваш отзыв": "Please write your feedback",
  "Слишком длинный отзыв": "Feedback too long",
  "Сократите текст до 2000 символов": "Please shorten to 2000 characters",

  // Common units
  "сек": "sec",

  // NotFound
  "Упс! Страница не найдена": "Oops! Page not found",
  "Вернуться на главную": "Return to Home",
  
  // AI Coach (AICoach)
  "нет данных": "no data",
  "Ваши результаты": "Your results",
  "сборок": "solves",
  "лучшее": "best",
  "среднее": "average",
  "Советы по кресту: планируйте крест на инспекцию, старайтесь собирать без поворотов куба, закрепляйте ориентиры (базовые цвета), тренируйте X-cross при возможности. Цель: 2–3 сек.": "Cross tips: plan during inspection, minimize cube rotations, lock color references, and practice X-cross when possible. Goal: 2–3 sec.",
  "Советы по F2L: работайте над look-ahead (смотрите вперёд), избегайте вывода пары на верхнюю грань без необходимости, учите несколько альтернативных вставок для типовых случаев, тренируйте finger tricks. Цель: 8–12 сек.": "F2L tips: practice look-ahead, avoid lifting pairs to the top unnecessarily, learn alternate inserts for common cases, and drill finger tricks. Goal: 8–12 sec.",
  "Советы по OLL: разделите случаи на группы, учите алгоритмы с удобными вращениями, используйте двуручные фингертрики. Цель: 1–2 сек.": "OLL tips: group cases, learn algorithms with comfortable turns, and use two-handed finger tricks. Goal: 1–2 sec.",
  "Советы по PLL: распознавайте AUF заранее, оптимизируйте стартовое хватание, учите быстрые алгоритмы для J, T, Y, упростите вращения под вашу хватку. Цель: 1–2 сек.": "PLL tips: recognize AUF early, optimize starting grip, learn fast algs for J, T, Y, and simplify turns to match your grip. Goal: 1–2 sec.",
  "Тренировки с таймером: делайте серии из 12–20 сборок, фиксируйте среднее (ao12/ao50), анализируйте лучшие попытки и ошибки, чередуйте быстрые серии и техники на качество look-ahead.": "Timer practice: run 12–20 solve sessions, track averages (ao12/ao50), analyze best solves and mistakes, alternate fast sessions with look-ahead quality drills.",
  "Общий план: 10–15 мин крест, 20–30 мин F2L (look-ahead), 10–15 мин OLL/PLL, 10–15 мин серий с таймером. Фокус — плавность, минимизация вращений и стабильная техника.": "General plan: 10–15 min Cross, 20–30 min F2L (look-ahead), 10–15 min OLL/PLL, 10–15 min timer sessions. Focus on smoothness, fewer rotations, and consistent technique.",
  "Сервер сейчас недоступен, поэтому включён локальный режим советов. Разверните Edge Function 'ai-coach' и задайте секрет GEMINI_API_KEY в Supabase для онлайн-диалога.": "Server is unavailable; local advice mode enabled. Deploy the 'ai-coach' Edge Function and set the GEMINI_API_KEY secret in Supabase for online chat.",
  "Локальный тренер активирован": "Local coach activated",
  "Отсутствует URL функций или ключ. Проверьте VITE_SUPABASE_URL/VITE_SUPABASE_FUNCTIONS_URL и VITE_SUPABASE_PUBLISHABLE_KEY.": "Missing functions URL or key. Check VITE_SUPABASE_URL/VITE_SUPABASE_FUNCTIONS_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
  "Лимит / Оплата": "Limit / Billing",
  "Функция не найдена (404)": "Function not found (404)",
  "Проверьте, что Edge Function 'ai-coach' развернута в Supabase.": "Ensure the 'ai-coach' Edge Function is deployed in Supabase.",
  "Нет доступа (401/403)": "Unauthorized (401/403)",
  "Проверьте 'VITE_SUPABASE_PUBLISHABLE_KEY' и домен функций.": "Verify 'VITE_SUPABASE_PUBLISHABLE_KEY' and functions domain.",
  "GEMINI_API_KEY не настроен": "GEMINI_API_KEY not configured",
  "Добавьте секрет 'GEMINI_API_KEY' в Supabase: Project Settings → Secrets.": "Add the 'GEMINI_API_KEY' secret in Supabase: Project Settings → Secrets.",
  "Сервер недоступен": "Server unavailable",
  "Ошибка": "Error",
  "Включён локальный режим советов.": "Local advice mode enabled.",
  "Нет потока данных": "No data stream",
  "Сервер не вернул поток. Включён локальный режим советов.": "Server returned no stream. Local advice mode enabled.",
  "Истек таймаут запроса. Показаны офлайн-советы.": "Request timed out. Offline advice shown.",
  "Сетевая ошибка. Показаны офлайн-советы.": "Network error. Offline advice shown.",
  "Не удалось получить ответ от AI": "Failed to receive AI response",
  "AI Тренер": "AI Coach",
  "Режим:": "Mode:",
  "Онлайн": "Online",
  "Офлайн": "Offline",
  "Ожидание": "Idle",
  "Привет! Я AI тренер по сборке кубика Рубика.": "Hi! I'm an AI coach for solving the Rubik's Cube.",
  "Задай мне вопрос или попроси совет!": "Ask me a question or request advice!",
  "Напиши свой вопрос...": "Type your question...",

  // ThemeToggle
  "Переключить темный режим": "Toggle dark mode",
  "Изменить цвет темы": "Change theme color",
  "Цвет темы": "Theme color",
  "Синий": "Blue",
  "Красный": "Red",
  "Зеленый": "Green",

  // Logo
  "Логотип Cubick AI": "Cubick AI logo",

  // Instructions — notation names
  "Right (Правая)": "Right",
  "Right Prime": "Right prime",
  "Right Double": "Right double",
  "Left (Левая)": "Left",
  "Left Prime": "Left prime",
  "Up (Верхняя)": "Up",
  "Up Prime": "Up prime",
  "Down (Нижняя)": "Down",
  "Down Prime": "Down prime",
  "Front (Передняя)": "Front",
  "Front Prime": "Front prime",
  "Back (Задняя)": "Back",
  "Back Prime": "Back prime",
  "Middle (Средняя)": "Middle",
  "Equator (Экватор)": "Equator",
  "Standing (Стоячий)": "Standing",

  // Instructions — notation descriptions
  "Поворот правой грани по часовой стрелке на 90°": "Turn right face clockwise 90°",
  "Поворот правой грани против часовой стрелки на 90°": "Turn right face counterclockwise 90°",
  "Поворот правой грани на 180°": "Turn right face 180°",
  "Поворот левой грани по часовой стрелке на 90°": "Turn left face clockwise 90°",
  "Поворот левой грани против часовой стрелки на 90°": "Turn left face counterclockwise 90°",
  "Поворот верхней грани по часовой стрелке на 90°": "Turn top face clockwise 90°",
  "Поворот верхней грани против часовой стрелки на 90°": "Turn top face counterclockwise 90°",
  "Поворот нижней грани по часовой стрелке на 90°": "Turn bottom face clockwise 90°",
  "Поворот нижней грани против часовой стрелки на 90°": "Turn bottom face counterclockwise 90°",
  "Поворот передней грани по часовой стрелке на 90°": "Turn front face clockwise 90°",
  "Поворот передней грани против часовой стрелки на 90°": "Turn front face counterclockwise 90°",
  "Поворот задней грани по часовой стрелке на 90°": "Turn back face clockwise 90°",
  "Поворот задней грани против часовой стрелки на 90°": "Turn back face counterclockwise 90°",
  "Поворот среднего слоя между L и R (как L)": "Turn middle layer between L and R (like L)",
  "Поворот среднего слоя между U и D (как D)": "Turn middle layer between U and D (like D)",
  "Поворот среднего слоя между F и B (как F)": "Turn middle layer between F and B (like F)",
};

function detectInitialLanguage(): Lang {
  const saved = localStorage.getItem("language") as Lang | null;
  if (saved === "ru" || saved === "en") return saved;
  const nav = navigator.language || (navigator as any).userLanguage || "en";
  return nav.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Lang>(detectInitialLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Lang) => setLanguageState(lang);

  const t = useMemo(() => {
    return (text: string) => {
      if (language === "ru") return text;
      return enDict[text] ?? text;
    };
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}