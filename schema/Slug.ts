export function createSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}