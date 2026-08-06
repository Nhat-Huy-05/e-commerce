import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const staticPages: Record<string, { title: string; body: string; updatedAt: string }> = {
  about: {
    title: 'Về chúng tôi (Niên luận Next.js App Router)',
    body: '<p>Dự án Niên luận được thực hiện bởi sinh viên Bùi Nguyễn Nhật Huy (HUSC K47). Đề tài nghiên cứu và áp dụng các chiến lược rendering Hybrid (SSG, ISR, SSR, CSR) với Next.js 15, TypeScript và Prisma ORM.</p>',
    updatedAt: new Date().toISOString(),
  },
  terms: {
    title: 'Điều khoản dịch vụ',
    body: '<p>Đây là website demo phục vụ mục đích báo cáo học thuật niên luận, không phát sinh giao dịch tài chính thực tế.</p>',
    updatedAt: new Date().toISOString(),
  },
};

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = staticPages[params.page];

  if (!page) return notFound();

  return {
    title: page.title,
    description: page.title,
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const page = staticPages[params.page];

  if (!page) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-4xl font-extrabold text-white">{page.title}</h1>
      <div
        className="text-slate-300 leading-relaxed text-sm space-y-4"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </div>
  );
}
