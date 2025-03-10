export default async function Page({
  params,
}: {
  params: Promise<{ path: string }>
}) {
  const slug = (await params).path
  return <div>My path: {slug}</div>
}