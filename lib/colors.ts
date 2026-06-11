
/**
 * Calculates the contrast color (either black or white) for a given hex color.
 * Uses the YIQ formula to determine brightness.
 */
export function getContrastColor(hexcolor: string): string {
  if (!hexcolor || hexcolor === 'transparent') return '#000';
  
  // Remove the hash if it exists
  const hex = hexcolor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate YIQ (brightness)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Return black for light colors, white for dark colors
  return (yiq >= 128) ? '#0f172a' : '#ffffff';
}

/**
 * Checks if a color is light or dark.
 */
export function isLightColor(hexcolor: string): boolean {
  return getContrastColor(hexcolor) === '#0f172a';
}
