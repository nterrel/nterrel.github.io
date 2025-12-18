import { getAllPostMeta, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const { meta, content } = getPostBySlug(slug);

  return (
    <main className="wrap">
      <article className="card">
        <h1>{meta.title}</h1>
        <p className="muted">{meta.date}</p>
        <MDXRemote source={content} />
      </article>
    </main>
  );
}