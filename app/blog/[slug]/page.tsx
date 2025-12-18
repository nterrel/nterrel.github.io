import { getAllPostMeta, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { meta, content } = getPostBySlug(params.slug);

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