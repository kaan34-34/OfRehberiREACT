/**
 * Checks if a business is currently open based on device time.
 * Handles overnight hours (e.g., 09:00 - 01:00).
 *
 * @param {object} business - Must have is724, openTime, closeTime
 * @returns {boolean}
 */
export function isBusinessOpen(business) {
  if (business.is724) return true;

  const { openTime, closeTime } = business;
  if (!openTime || !closeTime) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (closeMinutes > openMinutes) {
    // Normal range (e.g., 08:00 - 23:00)
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  } else if (closeMinutes < openMinutes) {
    // Overnight range (e.g., 09:00 - 01:00)
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  } else {
    // openTime === closeTime (e.g., 00:00 - 00:00 means always open for non-724)
    return true;
  }
}
