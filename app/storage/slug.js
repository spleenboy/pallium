export default function slug(value) {
  let trimmed = value.replace(/([^a-z0-9]+)/gi, ' ');
  return trimmed.trim().toLowerCase();
}
