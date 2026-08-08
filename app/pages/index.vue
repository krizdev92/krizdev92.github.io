<script setup>

// Setting dynamic SEO meta tags for the Home page
useHead({
  title: 'Home | Sreejith Travels',
  meta: [
    { name: 'description', content: 'Meaningful journeys. Thoughtfully crafted. Deeply connected.' }
  ]
})

const WP_GRAPHQL_ENDPOINT = 'http://travel-app-backend.local/graphql'

const query = `
  query GetHomePage {
    page(id: "home", idType: URI) {
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
  body: { query }
})

// Format GraphQL response into standard Banner format
const homepageBannerData = computed(() => {
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
    <HeroVideoMax />
    <AboutSection />
    <!-- <ItinerariesSignature /> -->
    <!-- <ItinerariesCollaborated /> -->
    <!-- <ItinerariesTravelYourWay /> -->
    <ItinerariesSignature2 />
    <ItinerariesCollaborated2 />
    <ItinerariesTravelYourWay2 />
    <!-- <Services /> -->
    <Services2 />
    <Process />
    <Impact />
    <!-- <Testimonials /> -->
    <Testimonials2 />
    <Blog />
    <Community />
    <!-- Pass dynamic data directly; if GraphQL fails or fields are empty, defaults take over -->
    <Banner :banner-data="homepageBannerData" />
  </main>
</template>