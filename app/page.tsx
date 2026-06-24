import ScrollSetup from '@/components/ScrollSetup'
import ClientOnly from '@/components/ClientOnly'
import ChapterOverlay from '@/components/ChapterOverlay'
import ScrollPrompt from '@/components/ScrollPrompt'

export default function Home() {
  return (
    <>
      <ScrollSetup />
      <ClientOnly />
      <ChapterOverlay />
      <ScrollPrompt />
    </>
  )
}
