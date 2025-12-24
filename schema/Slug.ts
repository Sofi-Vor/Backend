export async function createSlug(
  title: string,
  context: any
) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  let slug = baseSlug;
  let index = 1;

  while (true) {
    const existing = await context.db.Post.findOne({
      where: { slug },
      query: 'id',
    });

    if (!existing) break;

    slug = `${baseSlug}-${index}`;
    index++;
  }

  return slug;
}
