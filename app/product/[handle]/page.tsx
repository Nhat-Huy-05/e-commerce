import { redirect } from 'next/navigation';

interface Params {
  params: Promise<{ handle: string }>;
}

export default async function ProductHandlePage({ params }: Params) {
  const { handle } = await params;
  redirect(`/products/${handle}`);
}
