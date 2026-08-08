<script setup>
import { computed } from 'vue'
import HeroInner from '~/components/HeroInner.vue'
import IntroInner from '~/components/IntroInner.vue'
import AboutInnerText from '~/components/AboutInnerText.vue'
import DecoratedQuote from '~/components/DecoratedQuote.vue'
import AboutInnerCollaborated from '~/components/AboutInnerCollaborated.vue'
import Testimonials2 from '~/components/Testimonials2.vue'
import Community from '~/components/Community.vue'
import Banner from '~/components/Banner.vue'

const WP_GRAPHQL_ENDPOINT = 'http://travel-app-backend.local/graphql'

const SINGLE_ABOUT_PAGE_QUERY = `
  query GetUnifiedAboutPage {
    page(id: "about", idType: URI) {
      aboutHero {
        eyebrow
        titleMain
        titleItalic
        intro
        bgImage
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      aboutFields {
        introParagraph
        
        # We fetch the slideshow images here or define them locally below
        slideshowGallery {
          sourceUrl
        }
        
        whyPath {
          eyebrow
          titleMain
          titleHighlight
          paragraph
        }
        philosophyDataJson
        whyChooseMeJson
        howIDesignJson
        quoteData {
          quote
          author
          role
        }
        beyondTravelJson
        collaboratedDesignersJson
      }
      homepageBanner {
        title
        buttonText
        buttonUrl
        galleryImages {
          sourceUrl
        }
      }
    }
  }
`

const { data } = await useFetch(WP_GRAPHQL_ENDPOINT, {
  method: 'POST',
  body: { query: SINGLE_ABOUT_PAGE_QUERY }
})

const parseJsonField = (rawString) => {
  if (!rawString) return null
  try {
    return typeof rawString === 'string' ? JSON.parse(rawString) : rawString
  } catch (e) {
    return null
  }
}

// 1. Hero Data
const heroData = computed(() => {
  const hero = data.value?.data?.page?.aboutHero
  if (!hero) return null
  return {
    ...hero,
    bgImage: hero.bgImage || hero.featuredImage?.node?.sourceUrl
  }
})

// 2. Intro Paragraph
const introData = computed(() => {
  const paragraph = data.value?.data?.page?.aboutFields?.introParagraph
  return paragraph ? { paragraph } : null
})

// 3. Consolidated About Inner Text Data (The 5-section merge)
const aboutInnerTextData = computed(() => {
  const fields = data.value?.data?.page?.aboutFields
  return {
    slideshowImages: fields?.slideshowGallery?.map(img => img.sourceUrl) || [
      '/images/home/itin-1.jpg',
      '/images/home/itin-2.jpg',
      '/images/home/itin-3.jpg'
    ],
    whyPath: fields?.whyPath || null,
    philosophy: parseJsonField(fields?.philosophyDataJson),
    whyChooseMe: parseJsonField(fields?.whyChooseMeJson),
    howIDesign: parseJsonField(fields?.howIDesignJson),
    beyondTravel: parseJsonField(fields?.beyondTravelJson)
  }
})

// 4. Remaining Sections
const quoteData = computed(() => data.value?.data?.page?.aboutFields?.quoteData || null)
const collaboratedData = computed(() => parseJsonField(data.value?.data?.page?.aboutFields?.collaboratedDesignersJson))

// Banner Data
const bannerData = computed(() => {
  const banner = data.value?.data?.page?.homepageBanner
  if (!banner) return null
  return {
    title: banner.title,
    buttonText: banner.buttonText,
    buttonUrl: banner.buttonUrl,
    images: banner.galleryImages?.map(img => img.sourceUrl) || []
  }
})
</script>

<template>
  <main>
    <!-- 1. Inner Hero -->
    <HeroInner :hero-data="heroData" />

    <!-- 2. Intro Paragraph -->
    <IntroInner :data="introData" />

    <!-- 3. The Consolidated 5-Section Core Content -->
    <AboutInnerText :data="aboutInnerTextData" />

    <!-- 4. Decorated Quote -->
    <DecoratedQuote :data="quoteData" />
    
    <!-- 5. Collaborated Travel Designers -->
    <AboutInnerCollaborated :data="collaboratedData" />
    
    <!-- 6. Testimonials Section -->
    <Testimonials2 />
    
    <!-- 7. Community Section -->
    <Community />

    <!-- 8. Banner Section -->
    <Banner :banner-data="bannerData" />
  </main>
</template>