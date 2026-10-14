const STORAGE_KEYS = {
  COMPLETED_DAYS: 'exec_voice_completed_days_v1',
  STREAK: 'exec_voice_streak_v1',
  LAST_PRACTICE: 'exec_voice_last_practice_v1',
  SAVED_SCRIPTS: 'exec_voice_saved_scripts_v1',
  TOTAL_MINUTES: 'exec_voice_total_minutes_v1',
  DAY_NOTES: 'exec_voice_day_notes_v1',
  USER_PROFILE: 'exec_voice_user_profile_v1'
};

export function getCompletedDays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
    return raw ? JSON.parse(raw) : [1]; // Start with day 1 active or done
  } catch {
    return [1];
  }
}

export function saveCompletedDay(dayNumber) {
  try {
    const current = getCompletedDays();
    if (!current.includes(dayNumber)) {
      current.push(dayNumber);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(current));
    }
    
    // Add 9 minutes to total practice
    const mins = getTotalMinutes() + 9;
    localStorage.setItem(STORAGE_KEYS.TOTAL_MINUTES, mins.toString());
    
    // Update last practice
    localStorage.setItem(STORAGE_KEYS.LAST_PRACTICE, new Date().toISOString());
    return current;
  } catch {
    return [];
  }
}

export function getTotalMinutes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOTAL_MINUTES);
    return raw ? parseInt(raw, 10) : 9;
  } catch {
    return 9;
  }
}

export function getSavedScripts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_SCRIPTS);
    return raw ? JSON.parse(raw) : {
      identity: "I specialize in scaling high-growth technical and operational teams from series B to enterprise maturity, turning complex delivery bottlenecks into predictable revenue engines.",
      wins: "Over the last 4 years, I scaled an engineering org from 22 to 75, cutting customer onboarding time by 60% and directly unlocking $24M in ARR.",
      alignment: "What excites me about this VP opportunity is your international market expansion—building scalable organizational leverage in high-velocity environments is where I deliver the highest commercial ROI."
    };
  } catch {
    return {};
  }
}

export function saveScripts(scripts) {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_SCRIPTS, JSON.stringify(scripts));
  } catch {
    // ignore
  }
}

export function getDayNotes(day) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAY_NOTES);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed[day] || '';
  } catch {
    return '';
  }
}

export function saveDayNotes(day, notes) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAY_NOTES);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[day] = notes;
    localStorage.setItem(STORAGE_KEYS.DAY_NOTES, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

export function getUserProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return raw ? JSON.parse(raw) : {
      name: "Executive Candidate",
      targetRole: "VP / Director of Operations & Engineering",
      currentRole: "Senior Engineering Manager",
      experienceYears: "10+"
    };
  } catch {
    return { name: "Executive Candidate", targetRole: "Director / VP" };
  }
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch {
    // ignore
  }
}
