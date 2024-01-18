// locale-service.ts
import { ref, readonly } from 'vue';
import { defaultLocale } from './locales';

const userLocale = ref({ ...defaultLocale });

export function useUserLocale() {
  return {
    userLocale: readonly(userLocale),
    updateUserLocale(updates: Record<string, string>) {
      Object.assign(userLocale.value, updates);
    },
  };
}
