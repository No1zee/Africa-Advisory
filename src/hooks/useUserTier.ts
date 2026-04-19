"use client";

import { useEffect, useState } from 'react';

export type UserTier = 'STRANGER' | 'ASSOCIATE' | 'PARTNER';

export const useUserTier = () => {
  const [state, setState] = useState<{
    tier: UserTier | null;
    isLoaded: boolean;
  }>({
    tier: null,
    isLoaded: false
  });

  useEffect(() => {
    // Check localStorage for visit history
    const firstVisit = localStorage.getItem('aa_first_visit');
    const visitCountStr = localStorage.getItem('aa_visit_count');
    const lastVisit = localStorage.getItem('aa_last_visit');

    const now = Date.now();
    let visitCount = parseInt(visitCountStr || '0');
    let resolvedTier: UserTier = 'STRANGER';

    // 1. If no first visit, set it and categorize as STRANGER
    if (!firstVisit) {
      localStorage.setItem('aa_first_visit', now.toString());
      localStorage.setItem('aa_visit_count', '1');
      localStorage.setItem('aa_last_visit', now.toString());
      resolvedTier = 'STRANGER';
    } else {
      // 2. Increment visit count (only once per session-ish or every 4 hours)
      const lastVisitTime = parseInt(lastVisit || '0');
      const fourHours = 4 * 60 * 60 * 1000;
      
      if (now - lastVisitTime > fourHours) {
        visitCount += 1;
        localStorage.setItem('aa_visit_count', visitCount.toString());
        localStorage.setItem('aa_last_visit', now.toString());
      }

      // 3. Determine Tier
      if (visitCount === 1) {
        resolvedTier = 'STRANGER';
      } else if (visitCount >= 10 || (now - parseInt(firstVisit) > 7 * 24 * 60 * 60 * 1000 && visitCount >= 3)) {
        resolvedTier = 'PARTNER';
      } else {
        resolvedTier = 'ASSOCIATE';
      }
    }
    requestAnimationFrame(() => {
      setState({ tier: resolvedTier, isLoaded: true });
    });
  }, []);

  return state;
};
