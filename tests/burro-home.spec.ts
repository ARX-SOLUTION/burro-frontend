import { expect, test, type Page } from '@playwright/test';

const userProfile = {
  id: 'student-1',
  email: 'student@example.com',
  fullName: 'Aziz Karimov',
  role: 'student',
  emailVerified: true,
  createdAt: '2026-04-01T10:00:00.000Z',
};

const adminProfile = {
  id: 'admin-1',
  email: 'admin@example.com',
  fullName: 'Admin User',
  role: 'admin',
  emailVerified: true,
  createdAt: '2026-04-01T10:00:00.000Z',
};

const homeResponse = {
  streak: 5,
  language: 'uz',
  continue_module: null,
  daily_task: {
    description: '10 ta savol yeching',
    xp_reward: 20,
    completed: false,
    progress: 2,
    target: 10,
  },
  today_stats: {
    time_spent_min: 14,
    xp_earned: 40,
  },
  recent_modules: [
    {
      id: 'module-1',
      titleUz: 'Alif va Ba',
      titleEn: 'Alif and Ba',
      titleRu: 'Алиф и Ба',
      estimatedMin: 5,
      totalQuestions: 2,
      descriptionUz: 'Boshlang‘ich modul',
    },
  ],
};

const modulesResponse = {
  modules: [
    {
      id: 'module-1',
      title: 'Alif va Ba',
      icon_letter: 'A',
      icon_color: '#12B7E5',
      order_index: 1,
      xp_reward: 20,
      estimated_min: 5,
      total_questions: 2,
      is_free: true,
      status: 'open',
      best_attempt: null,
    },
    {
      id: 'module-2',
      title: 'Ta va Sa',
      icon_letter: 'T',
      icon_color: '#0D9488',
      order_index: 2,
      xp_reward: 20,
      estimated_min: 7,
      total_questions: 3,
      is_free: true,
      status: 'completed',
      best_attempt: {
        accuracy_pct: 100,
        wrong_count: 0,
        time_spent_sec: 120,
        xp_earned: 20,
      },
    },
  ],
};

const attemptStartResponse = {
  attempt_id: 'attempt-1',
  lives: 5,
  total_questions: 2,
  is_resumed: false,
};

const attemptQuestionsResponse = {
  attempt_id: 'attempt-1',
  lives_remaining: 5,
  total_questions: 2,
  questions: [
    {
      id: 'question-1',
      order_index: 1,
      type: 'find_sound',
      arabic_letter: 'ا',
      sound_hint: 'Qaysi tovush to‘g‘ri?',
      audio_url: null,
      options: ['Alif', 'Ba', 'Ta'],
      is_answered: false,
    },
    {
      id: 'question-2',
      order_index: 2,
      type: 'find_sound',
      arabic_letter: 'ب',
      sound_hint: 'Keyingi savol',
      audio_url: null,
      options: ['Ba', 'Ta', 'Sa'],
      is_answered: false,
    },
  ],
};

const audioAttemptQuestionsResponse = {
  attempt_id: 'attempt-1',
  lives_remaining: 5,
  total_questions: 1,
  questions: [
    {
      id: 'question-audio-1',
      order_index: 1,
      type: 'listen_find_sound',
      arabic_letter: null,
      sound_hint: 'Audio orqali to‘g‘ri javobni toping',
      audio_url: 'https://example.com/audio/alif.mp3',
      options: ['Alif', 'Ba', 'Ta'],
      is_answered: false,
    },
  ],
};

const audioAttemptWithoutUrlResponse = {
  attempt_id: 'attempt-1',
  lives_remaining: 5,
  total_questions: 1,
  questions: [
    {
      id: 'question-audio-2',
      order_index: 1,
      type: 'listen_find_letter',
      arabic_letter: null,
      sound_hint: 'Audioni tinglab harfni tanlang',
      audio_url: null,
      options: ['ا', 'ب', 'ت'],
      is_answered: false,
    },
  ],
};

const answerResponse = {
  is_correct: true,
  correct_answer: 'Alif',
  tip: null,
  lives_remaining: 5,
  attempt_status: 'in_progress',
  all_answered: false,
};

const finalAnswerResponse = {
  is_correct: true,
  correct_answer: 'Alif',
  tip: null,
  lives_remaining: 5,
  attempt_status: 'in_progress',
  all_answered: true,
};

const finishResponse = {
  attempt_id: 'attempt-1',
  module_title: 'Alif va Ba',
  status: 'completed',
  accuracy_pct: 100,
  correct_count: 2,
  wrong_count: 0,
  total_questions: 2,
  xp_earned: 20,
  time_spent_sec: 95,
  wrong_questions: [],
};

const studentProfileResponse = {
  id: 'student-1',
  full_name: 'Aziz Karimov',
  phone: '',
  id_display: '#UDENT1',
  language: 'uz',
  avatar_url: null,
  xp_total: 220,
  streak: {
    current: 5,
    longest: 9,
  },
  notifications_enabled: true,
  telegram_linked: false,
  created_at: '2026-04-01T10:00:00.000Z',
};

const statisticsResponse = {
  total_xp: 220,
  accuracy_pct: 92,
  modules_completed: 4,
  current_streak: 5,
  longest_streak: 9,
  weak_letters: [
    {
      arabic: 'ث',
      sound: 'Tha',
      error_count: 3,
    },
  ],
};

const leaderboardResponse = {
  period: 'weekly',
  generated_at: '2026-04-04T10:00:00.000Z',
  top3: [
    {
      rank: 1,
      user_id: 'student-1',
      full_name: 'Aziz Karimov',
      avatar_url: null,
      xp: 220,
    },
  ],
  others: [
    {
      rank: 2,
      user_id: 'student-2',
      full_name: 'Zilola',
      avatar_url: null,
      xp: 180,
    },
  ],
  my_position: {
    rank: 1,
    full_name: 'Aziz Karimov',
    xp: 220,
  },
};

const mockAuthenticatedStudent = async (
  page: Page,
  options?: {
    attemptQuestionsResponse?: typeof attemptQuestionsResponse;
    answerResponse?: typeof answerResponse;
    finishResponse?: typeof finishResponse;
  },
) => {
  await page.addInitScript(() => {
    localStorage.setItem('access_token', 'test-access-token');
    localStorage.setItem('refresh_token', 'test-refresh-token');
  });

  await page.route('**/api/users/me', async (route) => {
    await route.fulfill({ json: userProfile });
  });

  await page.route('**/api/student/home', async (route) => {
    await route.fulfill({ json: homeResponse });
  });

  await page.route('**/api/modules?*', async (route) => {
    await route.fulfill({ json: modulesResponse });
  });

  await page.route('**/api/modules/module-1/start', async (route) => {
    await route.fulfill({ json: attemptStartResponse });
  });

  await page.route('**/api/attempts/attempt-1/questions', async (route) => {
    await route.fulfill({ json: options?.attemptQuestionsResponse ?? attemptQuestionsResponse });
  });

  await page.route('**/api/attempts/attempt-1/answer', async (route) => {
    await route.fulfill({ json: options?.answerResponse ?? answerResponse });
  });

  await page.route('**/api/attempts/attempt-1/finish', async (route) => {
    await route.fulfill({ json: options?.finishResponse ?? finishResponse });
  });

  await page.route('**/api/student/profile', async (route) => {
    await route.fulfill({ json: studentProfileResponse });
  });

  await page.route('**/api/student/profile/statistics', async (route) => {
    await route.fulfill({ json: statisticsResponse });
  });

  await page.route('**/api/leaderboard?*', async (route) => {
    await route.fulfill({ json: leaderboardResponse });
  });
};

test('guest user is redirected to login for protected Burro routes', async ({ page }) => {
  await page.goto('/burro');
  await expect(page).toHaveURL(/\/auth\/login\?redirect=%2Fburro$/);
});

test('authenticated admin is redirected away from student-only Burro routes', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('access_token', 'admin-access-token');
    localStorage.setItem('refresh_token', 'admin-refresh-token');
  });

  await page.route('**/api/users/me', async (route) => {
    await route.fulfill({ json: adminProfile });
  });

  await page.goto('/burro');

  await expect(page).toHaveURL(/\/dashboard$/);
});

test('authenticated student can load dynamic Burro home and practice flow', async ({ page }) => {
  await mockAuthenticatedStudent(page);

  await page.goto('/burro');

  await expect(page.getByRole('button', { name: 'Barchasi' })).toBeVisible();
  const homeStartButton = page.getByRole('button', { name: 'Darsni boshlash' }).first();
  await expect(homeStartButton).toBeVisible();
  await expect(page.getByText('Alif va Ba').first()).toBeVisible();

  await homeStartButton.click();
  await expect(page).toHaveURL(/\/burro\/practice\/module-1$/);

  await expect(page.getByText('Qaysi tovush to‘g‘ri?')).toBeVisible();
  await page.getByRole('button', { name: 'Alif' }).click();
  await page.getByRole('button', { name: 'Tekshirish' }).click();

  await expect(page.getByText('To‘g‘ri javob')).toBeVisible();
  await page.getByRole('button', { name: 'Keyingi' }).click();
});

test('authenticated student can load profile and leaderboard data', async ({ page }) => {
  await mockAuthenticatedStudent(page);

  await page.goto('/burro/profile');
  await expect(page.getByText('Aziz Karimov')).toBeVisible();
  await expect(page.getByText('Aniqlik: 92%')).toBeVisible();

  await page.goto('/burro/leaderboard');
  await expect(page.getByText('Sizning o‘rningiz')).toBeVisible();
  await expect(page.getByText('1. Aziz Karimov').first()).toBeVisible();
  await expect(page.getByText('2. Zilola')).toBeVisible();
});

test('authenticated student sees audio question UI for listen-based practice questions', async ({
  page,
}) => {
  await mockAuthenticatedStudent(page, {
    attemptQuestionsResponse: audioAttemptQuestionsResponse,
  });

  await page.goto('/burro/practice/module-1');

  await expect(page.getByText('Audioni tinglang va to‘g‘ri javobni tanlang')).toBeVisible();
  await expect(page.getByText('Tovushni eshiting')).toBeVisible();
  await expect(page.locator('audio')).toBeVisible();
});

test('authenticated student sees safe fallback when listen question has no audio URL', async ({
  page,
}) => {
  await mockAuthenticatedStudent(page, {
    attemptQuestionsResponse: audioAttemptWithoutUrlResponse,
  });

  await page.goto('/burro/practice/module-1');

  await expect(page.getByText('Audioni tinglang va to‘g‘ri harfni tanlang')).toBeVisible();
  await expect(page.getByText('Tovushni eshiting')).toBeVisible();
  await expect(
    page.getByText('Audio havolasi hozircha mavjud emas. Variantlar orqali davom etishingiz mumkin.'),
  ).toBeVisible();
  await expect(page.locator('audio')).toHaveCount(0);
});

test('practice finish flow renders summary from finish endpoint without using module result endpoint', async ({
  page,
}) => {
  await mockAuthenticatedStudent(page, {
    attemptQuestionsResponse: {
      attempt_id: 'attempt-1',
      lives_remaining: 5,
      total_questions: 1,
      questions: [attemptQuestionsResponse.questions[0]],
    },
    answerResponse: finalAnswerResponse,
  });

  let moduleResultRequestCount = 0;

  await page.route('**/api/modules/module-1/result', async (route) => {
    moduleResultRequestCount += 1;
    await route.fulfill({
      status: 500,
      json: { message: 'result endpoint should not be used in active finish flow' },
    });
  });

  await page.goto('/burro/practice/module-1');

  await expect(page.getByText('Qaysi tovush to‘g‘ri?')).toBeVisible();
  await page.getByRole('button', { name: 'Alif' }).click();
  await page.getByRole('button', { name: 'Tekshirish' }).click();
  await expect(page.getByText('To‘g‘ri javob')).toBeVisible();

  await page.getByRole('button', { name: 'Darsni tugatish' }).click();

  await expect(page.getByText('Mashq muvaffaqiyatli yakunlandi.')).toBeVisible();
  await expect(page.getByText('Aniqlik')).toBeVisible();
  await expect(page.getByText('+20')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bosh sahifaga qaytish' })).toBeVisible();
  expect(moduleResultRequestCount).toBe(0);
});
