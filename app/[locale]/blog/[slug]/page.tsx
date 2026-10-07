import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { BlogRelated } from "@/components/pages/blog";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

// Dynamic article routes render on demand (slug comes from the URL).
export const instant = false;

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const post = await getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations("Blog");

  const all = await getBlogPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[post.date, post.author, `${post.readingTime} min read`]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </header>
          <div
            className="prose prose-neutral max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <BlogRelated posts={related} heading={t("related")} />
      </div>
    </AppLayout>
  );
}
