export default function slug(value, defaultValue = '') {
  let trimmed = value ? value.replace(/([^a-z0-9]+)/gi, '-') : defaultValue;
  return trimmed.trim().toLowerCase();
}
