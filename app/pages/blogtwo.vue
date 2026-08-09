<script setup>
const postData = {
  header: {
    breadcrumbs: ['Home', 'Journal', 'South India'],
    eyebrow: 'Cultural Immersion',
    titleMain: 'Echoes Of The',
    titleHighlight: 'Spice Coast',
    date: 'August 14, 2026',
    coverImg: '/images/home/itin-2.jpg'
  },
  toc: [
    { id: 'intro', label: 'The Maritime Heritage' },
    { id: 'visuals', label: 'Visual Discoveries' },
    { id: 'plantations', label: 'Ascent to the Ghats' },
    { id: 'experiences', label: 'Curated Encounters' },
    { id: 'culinary', label: 'Flavours of the Coast' }
  ],
  contentBlocks: [
    { 
      type: 'paragraph-editorial', 
      sectionId: 'introEdit',
      dropCap: true,
      text: 'Long before motorized houseboats churned the emerald waters of Vembanad, the backwaters were arteries of a global spice trade. Romans, Arabs, and eventually Europeans navigated these labyrinthine canals seeking black gold—pepper. Today, traversing Kerala requires a careful shedding of modern pacing. You do not rush through the backwaters; you allow them to dictate the rhythm of your day.'
    },
    { 
      type: 'paragraph-normal', 
      sectionId: 'introNormal',
      text: 'Long before motorized houseboats churned the emerald waters of Vembanad, the backwaters were arteries of a global spice trade. Romans, Arabs, and eventually Europeans navigated these labyrinthine canals seeking black gold—pepper. Today, traversing Kerala requires a careful shedding of modern pacing. You do not rush through the backwaters; you allow them to dictate the rhythm of your day.'
    },
    {
      type: 'subtitle',
      text: 'Traces of a Colonial Past'
    },
    {
      type: 'split-static',
      align: 'left', // Image Left, Text Right
      title: 'Architectural Remnants',
      text: 'Walking through Fort Kochi is akin to turning the pages of an eclectic colonial manuscript. The cantilevered Chinese fishing nets stand in stark contrast to Portuguese chapels and Dutch warehouses now transformed into contemporary art galleries and boutique cafes.',
      img: '/images/home/stay-1.jpeg'
    },
    {
      type: 'quote-a',
      text: "To truly understand the Malabar coast, one must look beyond the postcard perfection of the palm fringes and listen to the murmurs of its ancient trading courtyards.",
      author: "The Designer's Notebook"
    },
    {
      type: 'slider',
      sectionId: 'visuals',
      autoplay: true, // Autoplay ON
      images: [
        '/images/home/stay-1.jpeg',
        '/images/home/itin-2.jpg',
        '/images/home/stay-2.jpeg',
        '/images/home/itin-3.jpg',
        '/images/home/stay-1.jpeg',
        '/images/home/itin-2.jpg',
        '/images/home/stay-2.jpeg',
        '/images/home/itin-3.jpg',
        '/images/home/stay-1.jpeg',
        '/images/home/itin-2.jpg',
        '/images/home/stay-2.jpeg',
        '/images/home/itin-3.jpg'
      ]
    },
    {
      type: 'split-sticky-list',
      align: 'right', // Image Right (Sticky), List Left
      title: 'Backwater Essentials',
      img: '/images/home/stay-3.jpg',
      items: [
        'Observe traditional coir-weaving techniques passed down for centuries.',
        'Watch Toddy tappers scale towering coconut palms at first light.',
        'Navigate the narrowest un-dredged canals in a wooden punter boat.',
        'Experience the unparalleled silence of a non-motorized sunset.',
        'Dine on fresh pearl-spot fish harvested hours before the meal.'
      ]
    },
    {
      type: 'multi-column',
      text: 'The true luxury of this region lies in its undisturbed tranquility. Far from the commercial hubs, secluded islands host families that have preserved traditional techniques for generations. Exploring these micro-ecosystems requires deep local integration, ensuring that our footprints support rather than disrupt the delicate balance of backwater life. We prioritize family-owned heritage stays over standardized chain hospitality, fostering dialogue where guests and hosts exchange worldviews on equal footing.'
    },
    {
      type: 'masonry',
      images: [
        '/images/home/itin-3.jpg', // 3x4 Left
        '/images/home/stay-4.jpg', // 4x3 Top Right
        '/images/home/itin-1.jpg',  // 4x3 Bottom Right
        '/images/home/itin-2.jpg'  // 3x4 Bottom Right
      ]
    },
    {
      type: 'youtube',
      videoId: 'AjQeohYmg3A' // Will auto-render the iframe
    },
    {
      type: 'tip-box',
      sectionId: 'plantations',
      title: 'When To Travel',
      text: 'While the winter months (November to February) offer crisp, dry weather, the monsoon (June to August) transforms Kerala into a vivid, washed-green paradise, ideal for profound Ayurvedic wellness retreats.'
    },
    {
      type: 'split-sticky',
      align: 'left', // Image Left (Sticky), Long Text Right
      title: 'The Art of Tea Plucking',
      img: '/images/home/stay-2.jpeg',
      paragraphs: [
        'Leaving the coastal heat behind, the route ascends sharply into the Western Ghats. The air grows crisp, scented heavily with eucalyptus and the earthy aroma of damp tea leaves. Munnar is not merely a hill station; it is a meticulously sculpted high-altitude biosphere.',
        'Our preferred sanctuaries are colonial-era plantation bungalows hidden deep within working estates. Here, mornings begin before dawn, watching the mist roll off the manicured slopes while sipping a single-origin brew harvested just miles away.',
        'We orchestrate exclusive walks with master tea-tasters, exploring the intricate chemistry of oxidation and fermentation that transforms a simple green leaf into a world-class beverage.'
      ]
    },
    {
      type: 'list-unordered',
      sectionId: 'culinary',
      title: 'Culinary Signatures',
      items: [
        'Meen Pollichathu: Pearl spot fish marinated in fiery spices and roasted inside a banana leaf.',
        'Appam & Stew: Fermented rice hoppers served with a gentle, coconut-milk based vegetable or meat stew.',
        'Karimeen Fry: The iconic backwater delicacy, crisp on the outside and tender within.'
      ]
    },
    {
      type: 'slider',
      autoplay: false, // Autoplay OFF (Requires manual drag/click)
      images: [
        '/images/home/itin-1.jpg',
        '/images/home/stay-4.jpg',
        '/images/home/itin-2.jpg',
        '/images/home/itin-1.jpg',
        '/images/home/stay-4.jpg',
        '/images/home/itin-2.jpg',
        '/images/home/itin-2.jpg',
        '/images/home/itin-1.jpg',
        '/images/home/stay-4.jpg',
        '/images/home/itin-2.jpg',
        '/images/home/itin-1.jpg',
        '/images/home/stay-4.jpg',
        '/images/home/itin-2.jpg'
      ]
    },
    {
      type: 'quote-b',
      sectionId: 'experiences',
      text: '“We do not merely visit a destination; we seek permission to temporarily inhabit its soul.”',
      author: 'Local Guide Ethos',
      img: '/images/home/stay-3.jpg'
    },
    {
      type: 'list-ordered',
      title: 'The Curated Itinerary Focus',
      items: [
        { title: 'The Silent Dawn Cruise', text: 'Board a traditional wooden punter boat at 5:30 AM before the motorized vessels awake.' },
        { title: 'Ancestral Culinary Masterclass', text: 'Cook alongside a Syrian Christian matriarch in her 200-year-old courtyard kitchen.' },
        { title: 'Private Forest Bathing', text: 'A guided, silent trek through the endemic shola forests of the upper Nilgiris.' }
      ]
    },
    {
      type: 'list-ordered-regular',
      title: 'Packing Essentials',
      items: [
        'Lightweight, breathable linen or cotton clothing for coastal humidity.',
        'A light fleece or sweater for the chilly evenings in the high-altitude tea estates.',
        'Comfortable, enclosed walking shoes for plantation treks.',
        'Eco-friendly, reef-safe sunscreen and mosquito repellent.'
      ]
    },
    {
      type: 'split-static',
      align: 'right', // Image Right, Text Left
      title: 'Responsible Impact',
      text: 'Every logistic decision made on this route is weighed against its environmental impact. By engaging directly with micro-entrepreneurs and family-run fleets, we ensure the economic ecosystem remains entirely localized.',
      img: '/images/home/stay-1.jpeg'
    },
    {
      type: 'cta',
      title: 'Architect Your Spice Coast Journey',
      text: 'Connect with our design team to customize this exact routing based on your preferred pace and travel style.',
      btnText: 'Initiate Contact',
      link: '/planyourjourney'
    }
  ]
}
</script>

<template>
  <main class="w-full bg-[#F9F8F6] overflow-x-clip">
    <BlogTemplateDynamic :post="postData" />
    <RelatedPosts eyebrow="Keep Reading" title-main="More" title-highlight="Journals." />
  </main>
</template>