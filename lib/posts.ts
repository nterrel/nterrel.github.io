import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPostMeta(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const metas = files.map((filename) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data } = matter(raw);

    const slug = filename.replace(/\.mdx$/, "");
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
    };
  });

  metas.sort((a, b) => (a.date < b.date ? 1 : -1));
  return metas;
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
    },
    content,
  };
}

export function getLatestPostMeta(): PostMeta | null {
  const all = getAllPostMeta();
  return all.length ? all[0] : null;
}