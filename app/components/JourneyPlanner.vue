<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const plannerData = {
  header: {
    eyebrow: 'Initiate Contact',
    titleMain: 'Design Your',
    titleHighlight: 'Journey.',
    intro: 'Share your vision with us. Whether you are a discerning traveler seeking a bespoke escape or an agency looking for a seamless ground partner, our travel designers are ready to assist.'
  },
  roleSelection: {
    title: 'Tell us who you are:',
    options: [
      { id: 'traveler', label: 'I am a Traveler', desc: 'Planning a personal or family journey.' },
      { id: 'partner', label: 'I am a Partner', desc: 'Boutique agency, concierge, or corporate.' }
    ]
  },
  questions: {
    traveler: [
      { id: 't_name', type: 'text', label: 'Full Legal Name', placeholder: 'E.g. John Doe', required: true, validation: 'name', errorMsg: 'Name must be at least 3 letters and contain no numbers.' },
      { id: 't_email', type: 'email', label: 'Email Address', placeholder: 'name@example.com', required: true, validation: 'email', errorMsg: 'Please enter a valid email address.' },
      { id: 't_phone', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: true, validation: 'phone', errorMsg: 'Please enter a valid international phone number.' },
      { id: 't_age', type: 'number', label: 'Your Age', placeholder: 'E.g. 35', required: true, min: 18, errorMsg: 'You must be at least 18 years old.' },
      { id: 't_date', type: 'date', label: 'Preferred Start Date', required: false },
      { id: 't_travelers', type: 'number', label: 'Number of Travelers', placeholder: 'E.g. 2', required: true, min: 1, errorMsg: 'Must be at least 1 traveler.' },
      { id: 't_duration', type: 'number', label: 'Duration (Days)', placeholder: 'E.g. 10', required: true, min: 1, errorMsg: 'Must be at least 1 day.' },
      { id: 't_interests', type: 'checkbox', label: 'Primary Interests (Select all that apply)', options: ['Culture & Heritage', 'Nature & Wildlife', 'Wellness & Spirit', 'Culinary Flavours', 'Offbeat Adventure', 'Bespoke Luxury'], required: true, errorMsg: 'Please select at least one interest.' },
      { id: 't_travelStyle', type: 'radio', label: 'Pace & Travel Style', options: ['Relaxed & Leisurely', 'Balanced & Curated', 'Active & Fast-Paced'], required: true, errorMsg: 'Please select a travel style.' },
      { id: 't_destination', type: 'select', label: 'Preferred Region', options: ['Kerala Backwaters', 'Himalayan Foothills', 'Sri Lankan Coast', 'Rajasthan Heritage', 'Open to Suggestions'], placeholder: 'Select a destination', required: true, errorMsg: 'Please select a destination.' },
      { id: 't_notes', type: 'textarea', label: 'Special Requirements & Notes', placeholder: 'Tell us about dietary restrictions, special occasions, or must-see landmarks...', required: false }
    ],
    partner: [
      { id: 'p_agencyName', type: 'text', label: 'Agency / Company Name', placeholder: 'E.g. Luxe Retreats Ltd.', required: true, validation: 'name', errorMsg: 'Please enter a valid company name.' },
      { id: 'p_contactName', type: 'text', label: 'Primary Contact Name', placeholder: 'E.g. Jane Smith', required: true, validation: 'name', errorMsg: 'Name must be at least 3 letters and contain no numbers.' },
      { id: 'p_email', type: 'email', label: 'Business Email', placeholder: 'jane@agency.com', required: true, validation: 'email', errorMsg: 'Please enter a valid email address.' },
      { id: 'p_phone', type: 'tel', label: 'Direct Phone Number', placeholder: '+44 20 7946 0958', required: true, validation: 'phone', errorMsg: 'Please enter a valid phone number.' },
      { id: 'p_type', type: 'radio', label: 'Partnership Category', options: ['Boutique Travel Agency', 'Luxury Concierge', 'Corporate Retreats', 'Wellness Collective', 'Other'], required: true, errorMsg: 'Please select a partnership category.' },
      { id: 'p_volume', type: 'select', label: 'Expected Client Volume (Annual)', options: ['1 - 10 Journeys', '11 - 30 Journeys', '30+ Journeys', 'Single Group Buyout'], placeholder: 'Select estimated volume', required: true, errorMsg: 'Please select an estimated volume.' },
      { id: 'p_regions', type: 'checkbox', label: 'Regions of Interest', options: ['South India', 'North & Himalayas', 'Sri Lanka', 'Cross-Border Circuits'], required: true, errorMsg: 'Please select at least one region.' },
      { id: 'p_proposal', type: 'textarea', label: 'Collaboration Proposal / Inquiry', placeholder: 'Briefly describe how we can assist your clientele...', required: true, errorMsg: 'Please provide brief details of your inquiry.' }
    ]
  },
  submitText: 'Submit Inquiry'
}

// ==========================================
// STATE MANAGEMENT
// ==========================================
const selectedRole = ref(null) // 'traveler' | 'partner'
const answers = reactive({})
const errors = reactive({})
const isDirty = ref(false)
const isSubmitted = ref(false)

// Pre-fill answers reactive object
const initAnswers = () => {
  const allQuestions = [...plannerData.questions.traveler, ...plannerData.questions.partner]
  allQuestions.forEach(q => {
    answers[q.id] = q.type === 'checkbox' ? [] : ''
    errors[q.id] = ''
  })
}
initAnswers()

// Get questions based on role
const activeQuestions = computed(() => {
  if (!selectedRole.value) return []
  return plannerData.questions[selectedRole.value]
})

// Track Unsaved Changes
watch(answers, () => {
  if (!isSubmitted.value) isDirty.value = true
}, { deep: true })

// ==========================================
// UNSAVED CHANGES PROTECTION (Router & Window)
// ==========================================
const handleBeforeUnload = (e) => {
  if (isDirty.value && !isSubmitted.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// If using Vue Router (Nuxt), intercept route changes
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value && !isSubmitted.value) {
    const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this page without submitting?')
    if (confirmLeave) next()
    else next(false)
  } else {
    next()
  }
})

// ==========================================
// VALIDATION & SUBMISSION
// ==========================================
const validateField = (q, val) => {
  if (q.required) {
    if (val === '' || val === null || (Array.isArray(val) && val.length === 0)) {
      return 'This field is required.'
    }
  }
  if (val !== '' && val !== null && (!Array.isArray(val) || val.length > 0)) {
    if (q.validation === 'name' && !/^[A-Za-z\s\.\-]{3,}$/.test(val)) return q.errorMsg
    if (q.validation === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return q.errorMsg
    // Robust Phone Regex (allows +, -, spaces, parentheses, numbers)
    if (q.validation === 'phone' && !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{7,15}$/.test(val)) return q.errorMsg
    if (q.type === 'number' && q.min !== undefined && Number(val) < q.min) return q.errorMsg
  }
  return ''
}

const submitForm = () => {
  let isValid = true
  
  activeQuestions.value.forEach(q => {
    const error = validateField(q, answers[q.id])
    errors[q.id] = error
    if (error) isValid = false
  })
  
  if (isValid) {
    isSubmitted.value = true // Prevent beforeunload warnings
    
    // Extract only the answers for the selected role
    const finalPayload = {
      role: selectedRole.value,
      data: {}
    }
    activeQuestions.value.forEach(q => {
      finalPayload.data[q.id] = answers[q.id]
    })

    console.log('Form Submitted Successfully:', finalPayload)
    alert('Thank you! Your details have been successfully submitted. Our team will reach out shortly.')
    
    // Reset Form (Optional)
    selectedRole.value = null
    initAnswers()
    isDirty.value = false
    isSubmitted.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } else {
    setTimeout(() => {
      const firstError = document.querySelector('.error-text')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}
</script>

<template>
  <div class="w-full bg-white rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col p-8 md:p-14 lg:p-20 relative z-10 border border-[#1A1A1A]/5">
    
    <!-- Header -->
    <div class="flex flex-col items-center text-center mb-12 md:mb-16">
      <h3 class="flex items-center gap-4 mb-3 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
        <span class="w-8 h-[1px] bg-[#1A1A1A]/20"></span>
        <span>{{ plannerData.header.eyebrow }}</span>
        <span class="w-8 h-[1px] bg-[#1A1A1A]/20"></span>
      </h3>
      <h1 class="text-3xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.15] text-[#703e19] mb-5 font-serif font-light">
        {{ plannerData.header.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ plannerData.header.titleHighlight }}</span>
      </h1>
      <p class="font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light max-w-2xl">
        {{ plannerData.header.intro }}
      </p>
    </div>

    <!-- Preliminary Role Selection -->
    <div class="w-full max-w-3xl mx-auto mb-16">
      <h4 class="font-serif text-xl md:text-2xl text-[#703e19] text-center mb-6">{{ plannerData.roleSelection.title }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <button 
          v-for="role in plannerData.roleSelection.options" 
          :key="role.id"
          @click="selectedRole = role.id"
          class="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border transition-all duration-300 group outline-none"
          :class="selectedRole === role.id ? 'bg-[#703e19]/5 border-[#703e19] shadow-[0_8px_20px_rgba(112,62,25,0.08)]' : 'bg-white border-[#1A1A1A]/10 hover:border-[#703e19]/40 hover:shadow-md'"
        >
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center mb-4 transition-colors"
               :class="selectedRole === role.id ? 'border-[#703e19]' : 'border-[#1A1A1A]/20 group-hover:border-[#703e19]'">
            <div class="w-3 h-3 rounded-full bg-[#703e19] transition-transform duration-300" :class="selectedRole === role.id ? 'scale-100' : 'scale-0'"></div>
          </div>
          <span class="font-serif text-lg md:text-xl text-[#1A1A1A] font-medium mb-1 transition-colors group-hover:text-[#703e19]">
            {{ role.label }}
          </span>
          <span class="font-sans text-xs md:text-sm text-[#1A1A1A]/60 font-light">
            {{ role.desc }}
          </span>
        </button>
      </div>
    </div>

    <!-- Form Stream (Only shows after role is selected) -->
    <transition name="fade-slide">
      <form v-if="selectedRole" @submit.prevent="submitForm" class="flex flex-col max-w-4xl mx-auto w-full">
        
        <div 
          v-for="(q, idx) in activeQuestions" 
          :key="q.id" 
          class="question-block flex flex-col gap-3 relative pb-10 mb-10 border-b border-[#1A1A1A]/10 last:border-b-0 last:mb-0 last:pb-0"
        >
          <!-- Question Title Area -->
          <div class="flex items-center gap-4">
            <span class="text-xl md:text-2xl font-bold text-[#703e19] shrink-0">{{ String(idx + 1).padStart(2, '0') }}.</span>
            <label :for="q.id" class="text-base md:text-[17px] font-semibold text-[#1A1A1A] uppercase tracking-wider">
              {{ q.label }} <span v-if="q.required" class="text-[#C47551] ml-1">*</span>
            </label>
          </div>

          <!-- Validation Error Message -->
          <span v-if="errors[q.id]" class="error-text text-sm font-semibold text-[#C47551] pl-10 md:pl-12 mt-1">
            * {{ errors[q.id] }}
          </span>

          <!-- Input Area -->
          <div class="pl-10 md:pl-12 mt-3 w-full max-w-3xl">
            
            <!-- TEXT / EMAIL / TEL / NUMBER -->
            <input 
              v-if="['text', 'email', 'tel', 'number'].includes(q.type)"
              :id="q.id"
              :type="q.type"
              :min="q.min"
              v-model="answers[q.id]"
              :placeholder="q.placeholder"
              class="w-full bg-transparent text-[#1A1A1A] text-lg lg:text-xl font-medium pb-3 border-b-2 outline-none transition-colors placeholder:font-light placeholder:text-[#1A1A1A]/30"
              :class="errors[q.id] ? 'border-[#C47551]' : 'border-[#1A1A1A]/20 focus:border-[#703e19]'"
            />

            <!-- DATE -->
            <input 
              v-if="q.type === 'date'"
              :id="q.id"
              type="date"
              v-model="answers[q.id]"
              class="w-full bg-transparent text-[#1A1A1A] text-lg lg:text-xl font-medium pb-3 border-b-2 outline-none transition-colors uppercase"
              :class="errors[q.id] ? 'border-[#C47551]' : 'border-[#1A1A1A]/20 focus:border-[#703e19]'"
            />

            <!-- TEXTAREA -->
            <textarea 
              v-if="q.type === 'textarea'"
              :id="q.id"
              v-model="answers[q.id]"
              :placeholder="q.placeholder"
              rows="4"
              class="w-full bg-[#FAF9F5] text-[#1A1A1A] text-[15px] md:text-base font-light leading-relaxed p-5 border border-[#1A1A1A]/10 outline-none transition-colors placeholder:font-light placeholder:text-[#1A1A1A]/40 rounded-xl resize-y focus:border-[#703e19] shadow-inner"
              :class="{'border-[#C47551]': errors[q.id]}"
            ></textarea>

            <!-- SELECT -->
            <div v-if="q.type === 'select'" class="relative">
              <select 
                :id="q.id"
                v-model="answers[q.id]"
                class="w-full bg-transparent text-lg lg:text-xl font-medium pb-3 border-b-2 outline-none transition-colors appearance-none cursor-pointer"
                :class="[errors[q.id] ? 'border-[#C47551]' : 'border-[#1A1A1A]/20 focus:border-[#703e19]', answers[q.id] === '' ? 'text-[#1A1A1A]/30 font-light' : 'text-[#1A1A1A]']"
              >
                <option value="" disabled>{{ q.placeholder }}</option>
                <option v-for="opt in q.options" :key="opt" :value="opt" class="text-[#1A1A1A] font-medium">{{ opt }}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 absolute right-0 top-1 pointer-events-none text-[#1A1A1A]/50"><path d="M6 9l6 6 6-6"></path></svg>
            </div>

            <!-- CHECKBOXES -->
            <div v-if="q.type === 'checkbox'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <label v-for="opt in q.options" :key="opt" class="flex items-center gap-4 cursor-pointer group select-none">
                <div class="w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors shrink-0"
                     :class="answers[q.id].includes(opt) ? 'bg-[#703e19] border-[#703e19]' : 'border-[#1A1A1A]/30 group-hover:border-[#703e19]'">
                  <svg v-if="answers[q.id].includes(opt)" viewBox="0 0 24 24" fill="none" stroke="#F9F8F6" stroke-width="3" class="w-3.5 h-3.5"><path d="M20 6L9 17l-5-5"></path></svg>
                </div>
                <input type="checkbox" :value="opt" v-model="answers[q.id]" class="hidden" />
                <span class="text-base md:text-[17px] font-medium text-[#1A1A1A]/80 transition-colors group-hover:text-[#703e19]">{{ opt }}</span>
              </label>
            </div>

            <!-- RADIO BUTTONS -->
            <div v-if="q.type === 'radio'" class="flex flex-col gap-4 mt-2">
              <label v-for="opt in q.options" :key="opt" class="flex items-center gap-4 cursor-pointer group select-none">
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
                     :class="answers[q.id] === opt ? 'border-[#703e19]' : 'border-[#1A1A1A]/30 group-hover:border-[#703e19]'">
                  <div class="w-2.5 h-2.5 rounded-full bg-[#703e19] transition-transform scale-0" :class="{'scale-100': answers[q.id] === opt}"></div>
                </div>
                <input type="radio" :value="opt" v-model="answers[q.id]" class="hidden" />
                <span class="text-base md:text-[17px] font-medium text-[#1A1A1A]/80 transition-colors group-hover:text-[#703e19]">{{ opt }}</span>
              </label>
            </div>

          </div>
        </div>

        <!-- Submit Section -->
        <div class="flex flex-col items-center mt-12 pt-10 border-t border-[#1A1A1A]/10">
          <button type="submit" class="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 border border-[#703e19] bg-[#703e19] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-500 rounded-sm shadow-[0_4px_15px_rgba(112,62,25,0.2)] hover:shadow-lg">
            <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] uppercase font-bold mt-[1px]">
              {{ plannerData.submitText }}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 stroke-[#F9F8F6] transform transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </form>
    </transition>

  </div>
</template>

<style scoped>
/* Vue Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>