<script setup>
// Hero Data
const heroData = {
  eyebrow: 'Wildlife Expedition',
  titleMain: 'Tracking The',
  titleItalic: 'Snow Leopard.',
  intro: 'A high-altitude journey into the freezing deserts of the Himalayas in search of the ghost of the mountains.',
  bgImage: '/images/home/itin-1.jpg'
}

// Intro Center Data
const introData = {
  eyebrow: 'Field Notes',
  titleMain: 'The Silent',
  titleHighlight: 'Heights.',
  paragraph: 'Documenting a rare winter expedition across the high-altitude landscapes of Spiti Valley with our regional wildlife guides.'
}

// Custom Post Data Payload (Optional override passed to Template Classic)
const postData = {
  title: 'Tracking the Elusive Snow Leopard in Spiti Valley',
  subtitle: 'A high-altitude journey into the freezing deserts of the Himalayas in search of the ghost of the mountains.',
  date: 'August 12, 2026',
  readTime: '6 min read',
  author: {
    name: 'Sreejith Raghavan',
    role: 'Founder & Lead Designer',
    avatar: '/images/home/itin-1.jpg'
  },
  heroImg: '/images/home/itin-1.jpg',
  tags: ['#Wildlife', '#Himalayas', '#Expedition'],
  contentSections: [
    {
      type: 'paragraph',
      text: 'The air at fourteen thousand feet does not merely enter your lungs; it introduces itself with a sharp, crisp bite that reminds you of your absolute fragility. In the high-altitude cold desert of Spiti Valley, winter is not a season—it is a sovereign state of existence. For months, the passes are choked with snow, villages are cut off from the lower plains, and the mountains belong entirely to the wind, the blue sheep, and the grey ghost.'
    },
    {
      type: 'heading',
      text: 'The Silence of the High Passes'
    },
    {
      type: 'paragraph',
      text: 'Tracking leopards requires a fundamental surrender of modern pacing. You do not conquer a mountain here; you wait for it to acknowledge you. Our local guide, Tenzin, has spent forty winters scanning these jagged shale slopes. His eyes can distinguish between a wind-blown boulder and the amber-ringed gaze of a predator at eight hundred meters with terrifying precision.'
    },
    {
      type: 'quote',
      text: 'In the realm of the snow leopard, silence is not an absence of sound; it is the primary language of survival.'
    },
    {
      type: 'paragraph',
      text: 'Days blend together in a meditative rhythm of dawn scans with high-powered spotting scopes, steaming cups of butter tea shared in stone-walled kitchens, and long evening conversations around iron wood-stoves about ancient trade routes that once connected India to Tibet.'
    }
  ]
}

// Related Posts Payload
const relatedPosts = [
  { id: 'b2', title: 'The Silent Backwaters at Dawn', date: 'August 05, 2026', tags: ['#Photography', '#Kerala'], intro: 'Capturing the golden hour across the serene Vembanad lake.', img: '/images/home/itin-2.jpg', url: '/' },
  { id: 'b9', title: 'Into the Heart of Ranthambore', date: 'June 25, 2026', tags: ['#Wildlife', '#Tigers'], intro: 'A thrilling jeep safari through ancient ruins tracking tigers.', img: '/images/home/itin-3.jpg', url: '/' },
  { id: 'b13', title: 'Trekking the Markha Valley', date: 'May 28, 2026', tags: ['#Adventure', '#Ladakh'], intro: 'A high-altitude journey crossing rugged mountain passes.', img: '/images/home/itin-1.jpg', url: '/' }
]

const bannerData = {
  title: 'Ready to witness the raw majesty of the Himalayas firsthand?',
  buttonText: 'Plan Your Expedition',
  buttonUrl: '/planyourjourney',
  images: ['/images/home/stay-1.jpeg', '/images/home/stay-2.jpeg', '/images/home/stay-3.jpg']
}
</script>

<template>
  <main class="page-container w-full bg-[#F9F8F6] overflow-hidden">
    <!-- <HeroInner :hero-data="heroData" /> -->
    <!-- <IntroInnerCenter :data="introData" /> -->
    
    <!-- Template Classic Component -->
    <BlogTemplateClassic :post="postData" />

    <RelatedPosts eyebrow="More From The Field" title-main="Explore Further" title-highlight="Expeditions." :posts="relatedPosts" />
    <Banner :banner-data="bannerData" />
  </main>
</template>