<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// State Managers
const expandedSection = ref(null)
const activeTywCategory = ref(null)

const validTywCategories = ['nature', 'culture', 'stays', 'offbeat', 'wellness', 'bespoke']

// ==========================================
// CENTRAL SCROLL FUNCTION
// ==========================================
// Allows you to fine-tune the pixel offset to clear headers.
const scrollToSection = (elementId, yOffset = 0) => {
  const targetElement = document.getElementById(elementId)
  if (targetElement) {
    const yPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset
    window.scrollTo({ top: yPosition, behavior: 'smooth' })
  }
}

// ==========================================
// 1. ROUTING & AUTO-EXPANSION LOGIC
// ==========================================
onMounted(() => {
  const slug0 = route.params.slug ? route.params.slug[0] : null
  const slug1 = route.params.slug && route.params.slug.length > 1 ? route.params.slug[1] : null
  
  if (slug0 === 'signature') {
    expandedSection.value = 'signature'
  } else if (slug0 === 'collaborated') {
    expandedSection.value = 'collaborated'
  } else if (validTywCategories.includes(slug0)) {
    // Direct access to a category (e.g., /itineraries/nature)
    expandedSection.value = 'tyw'
    activeTywCategory.value = slug0
  } else if (slug0 === 'travelyourway') {
    expandedSection.value = 'tyw'
    // If slug1 is a valid category, set it; otherwise, leave null
    activeTywCategory.value = validTywCategories.includes(slug1) ? slug1 : null
  }

  if (expandedSection.value) {
    setTimeout(() => {
      // If we have a category, scroll to content. If not, scroll to section (tabs).
      const targetId = activeTywCategory.value ? 'tyw-tab-content' : 'section-travel-your-way'
      scrollToSection(targetId, -100)
    }, 800)
  }
})

const handleToggle = (section) => {
  if (expandedSection.value === section) {
    // COLLAPSE (View Less)
    expandedSection.value = null
    window.history.pushState({}, '', '/itineraries')
    nextTick(() => {
      scrollToSection(`section-${section}`, -100)
    })
  } else {
    // EXPAND (View All)
    expandedSection.value = section
    activeTywCategory.value = null
    window.history.pushState({}, '', `/itineraries/${section}`)
  }
}

const handleTywExpand = (categoryId) => {
  expandedSection.value = 'tyw'
  activeTywCategory.value = categoryId
  window.history.pushState({}, '', `/itineraries/travelyourway/${categoryId}`)
  nextTick(() => {
    setTimeout(() => scrollToSection('tyw-tab-content', -100), 50)
  })
}

const handleTywClose = () => {
  expandedSection.value = null
  activeTywCategory.value = null
  window.history.pushState({}, '', '/itineraries')
  nextTick(() => scrollToSection('section-travel-your-way', -100))
}

// ==========================================
// 2. GRAPHQL QUERY (Hero, Intro, Banner)
// ==========================================
const WP_GRAPHQL_ENDPOINT = 'http://travel-app-backend.local/graphql'
const ITINERARIES_PAGE_QUERY = `
  query GetItinerariesPage {
    page(id: "itineraries", idType: URI) {
      itinerariesHero { eyebrow, titleMain, titleItalic, intro, bgImage, featuredImage { node { sourceUrl } } }
      itinerariesFields { introParagraph }
      homepageBanner { title, buttonText, buttonUrl, galleryImages { sourceUrl } }
    }
  }
`
const { data } = await useFetch(WP_GRAPHQL_ENDPOINT, { method: 'POST', body: { query: ITINERARIES_PAGE_QUERY } })

const heroData = computed(() => {
  const hero = data.value?.data?.page?.itinerariesHero
  if (!hero) return { eyebrow: 'Itineraries', titleMain: 'Journeys Designed', titleItalic: 'Around You', intro: 'Explore hand-picked routes across subcontinental heritage, coastal sanctuaries, and lush highland retreats.', bgImage: '/images/home/itin-2.jpg' }
  return { ...hero, bgImage: hero.bgImage || hero.featuredImage?.node?.sourceUrl }
})
const introData = computed(() => ({ paragraph: data.value?.data?.page?.itinerariesFields?.introParagraph || 'Whether you seek the deep immersion of our handcrafted Signature Itineraries, the global expertise of our Collaborated Routes, or wish to start by choosing a specific travel style—every path here leads to an experience that is intentional, unhurried, and profoundly authentic.' }))
const bannerData = computed(() => {
  const banner = data.value?.data?.page?.homepageBanner
  if (!banner) return { title: 'Tailor-made journeys designed specifically around your pace.', buttonText: 'Explore Destinations', buttonUrl: '/Itineraries', images: ['/images/home/stay-1.jpeg', '/images/home/stay-2.jpeg', '/images/home/stay-3.jpg'] }
  return { title: banner.title, buttonText: banner.buttonText, buttonUrl: banner.buttonUrl, images: banner.galleryImages?.map(img => img.sourceUrl) || [] }
})

// ==========================================
// 3. MASTER ITINERARY DATABASE (11 Signature, 11 Collaborated)
// ==========================================
const allItineraries = [
  // --- SIGNATURE ITINERARIES (11) ---
  { id: 's1', type: 'signature', featured: true, days: 7, title: 'Malabar Monsoon', tags: ['#Monsoon', '#Nature'], intro: 'A sensory journey through rain-kissed landscapes.', img: '/images/home/itin-1.jpg', url: '/', categoryIds: ['nature', 'culture'] },
  { id: 's2', type: 'signature', featured: true, days: 5, title: 'Southern Temples', tags: ['#Culture', '#Rituals'], intro: 'Immerse in the architectural marvels.', img: '/images/home/itin-2.jpg', url: '/', categoryIds: ['culture', 'bespoke'] },
  { id: 's3', type: 'signature', featured: true, days: 8, title: 'Forgotten Rivers', tags: ['#Rivers', '#Calm'], intro: 'Navigate lush backwaters and discover serene villages.', img: '/images/home/itin-3.jpg', url: '/', categoryIds: ['nature', 'offbeat'] },
  { id: 's4', type: 'signature', featured: true, days: 4, title: 'Coastal Whispers', tags: ['#Coastal', '#Ocean'], intro: 'A short, rejuvenating escape to golden sands.', img: '/images/home/itin-4.jpg', url: '/', categoryIds: ['nature', 'stays'] },
  { id: 's5', type: 'signature', featured: true, days: 6, title: 'Highland Trails', tags: ['#Highland', '#Trek'], intro: 'Trek through mist-covered peaks.', img: '/images/home/itin-5.jpg', url: '/', categoryIds: ['nature', 'offbeat', 'bespoke'] },
  { id: 's6', type: 'signature', featured: false, days: 10, title: 'Spice Routes', tags: ['#History', '#Culinary'], intro: 'Trace the historic pathways of flavor.', img: '/images/home/blog-1.jpeg', url: '/', categoryIds: ['culture', 'stays'] },
  { id: 's7', type: 'signature', featured: false, days: 5, title: 'Ayurveda Reset', tags: ['#Wellness', '#Heal'], intro: 'Deep restorative healing rooted in Vedic sciences.', img: '/images/home/stay-1.jpeg', url: '/', categoryIds: ['wellness', 'stays'] },
  { id: 's8', type: 'signature', featured: false, days: 12, title: 'Grand Keralan', tags: ['#Luxury', '#Comprehensive'], intro: 'The ultimate luxury sweep across the subcontinent.', img: '/images/home/stay-2.jpeg', url: '/', categoryIds: ['luxury', 'culture', 'stays'] },
  { id: 's9', type: 'signature', featured: false, days: 6, title: 'Hidden Valleys', tags: ['#Valleys', '#Remote'], intro: 'Discover secluded valleys away from the modern world.', img: '/images/home/stay-3.jpg', url: '/', categoryIds: ['nature', 'offbeat'] },
  { id: 's10', type: 'signature', featured: false, days: 9, title: 'Palace Echoes', tags: ['#Heritage', '#Royal'], intro: 'Experience the regal lifestyle of historic kingdoms.', img: '/images/home/blog-2.webp', url: '/', categoryIds: ['luxury', 'culture', 'bespoke'] },
  { id: 's11', type: 'signature', featured: false, days: 7, title: 'Backwater Retreat', tags: ['#Serene', '#Slow'], intro: 'Unwind completely on traditional houseboats.', img: '/images/home/itin-5.jpg', url: '/', categoryIds: ['wellness', 'stays', 'nature'] },

  // --- COLLABORATED ITINERARIES (11) ---
  { id: 'c1', type: 'collaborated', featured: true, days: 9, title: 'Kyoto Zen Pathways', tags: ['#Japan', '#Zen'], intro: 'Experience the quiet stillness of ancient temples.', img: '/images/home/itin-3.jpg', url: '/', categoryIds: ['wellness', 'culture'] },
  { id: 'c2', type: 'collaborated', featured: true, days: 12, title: 'Alpine Serenity', tags: ['#Europe', '#Alps'], intro: 'Breathe in the crisp air of the Swiss Alps.', img: '/images/home/itin-5.jpg', url: '/', categoryIds: ['nature', 'bespoke'] },
  { id: 'c3', type: 'collaborated', featured: true, days: 8, title: 'Kathmandu Valley', tags: ['#Nepal', '#Spiritual'], intro: 'Journey through the spiritual heart of Nepal.', img: '/images/home/itin-2.jpg', url: '/', categoryIds: ['culture', 'offbeat'] },
  { id: 'c4', type: 'collaborated', featured: true, days: 6, title: 'Volcanic Shores', tags: ['#Hawaii', '#Remote'], intro: 'Discover the raw, untamed beauty of Hawaii.', img: '/images/home/itin-4.jpg', url: '/', categoryIds: ['nature', 'offbeat'] },
  { id: 'c5', type: 'collaborated', featured: true, days: 14, title: 'Lake Como Retreat', tags: ['#Italy', '#Luxury'], intro: 'A sophisticated escape into timeless elegance.', img: '/images/home/stay-4.jpg', url: '/', categoryIds: ['luxury', 'stays'] },
  { id: 'c6', type: 'collaborated', featured: true, days: 11, title: 'Andean Echoes', tags: ['#Peru', '#History'], intro: 'Follow the footsteps of the Incas.', img: '/images/home/blog-3.webp', url: '/', categoryIds: ['culture', 'offbeat'] },
  { id: 'c7', type: 'collaborated', featured: false, days: 7, title: 'Tuscan Vineyards', tags: ['#Culinary', '#Slow'], intro: 'Private vineyard access and slow culinary living.', img: '/images/home/blog-2.webp', url: '/', categoryIds: ['luxury', 'culture', 'stays'] },
  { id: 'c8', type: 'collaborated', featured: false, days: 9, title: 'Nordic Lights', tags: ['#Arctic', '#Remote'], intro: 'Hunt the aurora in secluded glass igloos.', img: '/images/home/com-3.jpg', url: '/', categoryIds: ['nature', 'luxury', 'offbeat', 'stays'] },
  { id: 'c9', type: 'collaborated', featured: false, days: 10, title: 'Sahara Odyssey', tags: ['#Desert', '#Nomadic'], intro: 'Cross the endless dunes with nomadic guides.', img: '/images/home/blog-1.jpeg', url: '/', categoryIds: ['nature', 'offbeat'] },
  { id: 'c10', type: 'collaborated', featured: false, days: 8, title: 'Bali Wellness', tags: ['#Healing', '#Tropical'], intro: 'Restore your inner peace among lush rice terraces.', img: '/images/home/stay-2.jpeg', url: '/', categoryIds: ['wellness', 'stays'] },
  { id: 'c11', type: 'collaborated', featured: false, days: 13, title: 'Patagonian Peaks', tags: ['#Wild', '#Glaciers'], intro: 'Conquer the edge of the world in raw Patagonia.', img: '/images/home/itin-1.jpg', url: '/', categoryIds: ['nature', 'offbeat', 'bespoke'] }
]

const signatureItems = computed(() => allItineraries.filter(i => i.type === 'signature'))
const collaboratedItems = computed(() => allItineraries.filter(i => i.type === 'collaborated'))
</script>

<template>
  <main class="page-container w-full bg-[#F9F8F6] overflow-hidden">
    
    <HeroInner :hero-data="heroData" />
    <IntroInnerCenter :data="introData" />

    <!-- 1. Signature Section -->
    <ItineraryInnerSignature 
      id="section-signature"
      :items="signatureItems" 
      :is-expanded="expandedSection === 'signature'" 
      @toggle="handleToggle('signature')" 
    />

    <!-- 2. Collaborated Section -->
    <ItineraryInnerCollaborated 
      id="section-collaborated"
      :items="collaboratedItems" 
      :is-expanded="expandedSection === 'collaborated'" 
      @toggle="handleToggle('collaborated')" 
    />

    <!-- 3. Travel Your Way (Categories) Section -->
    <ItineraryInnerTravelYourWay 
      id="section-travel-your-way"
      :all-itineraries="allItineraries"
      :is-expanded="expandedSection === 'tyw'"
      :active-category-id="activeTywCategory"
      @expand="handleTywExpand"
      @close="handleTywClose"
    />

    <Banner :banner-data="bannerData" />

  </main>
</template>