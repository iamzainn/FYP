export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const slug = (await params).domain
  return <div>My domain: {slug}</div>
}