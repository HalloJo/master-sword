import ScrollSetup from '@/components/ScrollSetup'
import ClientOnly from '@/components/ClientOnly'
import ChapterOverlay from '@/components/ChapterOverlay'

export default function Home() {
  return (
    <>
      <ScrollSetup />
      <ClientOnly />
      <ChapterOverlay />
    </>
  )
}
