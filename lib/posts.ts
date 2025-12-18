export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
};

export function getLatestPostMeta(): PostMeta | null {
  // This is a placeholder - you can implement actual blog post fetching later
  // For now, returning null since there are no posts yet
  return null;
}
