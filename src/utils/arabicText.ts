// Shared helper for detecting Arabic-script text so components can apply
// the "Traditional Arabic" font (via the .font-arabic / .arabic-text CSS
// classes) only to the parts of the UI that actually render Arabic.

const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;

/**
 * Returns true if a given string contains any Arabic-script characters.
 */
export const containsArabic = (text: string): boolean => {
  if (!text) return false;
  return ARABIC_CHAR_REGEX.test(text);
};

/**
 * Returns true if a given string is primarily Arabic (more Arabic
 * characters than Latin characters). Useful for mixed-language blocks
 * where we only want to switch to the Arabic font when the line/segment
 * is mostly Arabic script.
 */
export const isPrimarilyArabic = (text: string): boolean => {
  if (!text) return false;
  const arabicMatches = text.match(ARABIC_CHAR_REGEX) || [];
  const latinMatches = text.match(/[a-zA-Z]/g) || [];
  return arabicMatches.length > 0 && arabicMatches.length >= latinMatches.length;
};
