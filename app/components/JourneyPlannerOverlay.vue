<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Determine open state based on URL
const isOpen = computed(() => route.path === '/plan-your-journey')

// Form State
const currentStep = ref(1)
const totalSteps = 4
const errorMsg = ref('')

const form = reactive({
  // Step 1: Identity
  name: '',
  email: '',
  age: null,
  // Step 2: Preferences
  interests: [],
  travelStyle: '',
  // Step 3: Details
  destination: '',
  travelers: null,
  duration: null,
  // Step 4: Final Touches
  notes: ''
})

// Options
const interestOptions = ['Culture & Heritage', 'Nature & Wildlife', 'Wellness & Spirit', 'Culinary', 'Adventure']
const styleOptions = ['Bespoke Luxury', 'Balanced Comfort', 'Rugged Adventure']
const destinationOptions = ['Kerala Backwaters', 'Himalayan Foothills', 'Sri Lankan Coast', 'Japanese Alps', 'Undecided / Open']

const closeOverlay = () => {
  currentStep.value = 1
  form.name = ''; form.email = ''; form.age = null; form.interests = []; form.travelStyle = ''; form.destination = ''; form.travelers = null; form.duration = null; form.notes = ''
  errorMsg.value = ''
  
  // Navigate away to close overlay (back home)
  router.push('/')
}

const nextStep = () => {
  errorMsg.value = ''
  
  // Validation Rules
  if (currentStep.value === 1) {
    if (!form.name || !form.email || !form.age) return errorMsg.value = 'Please complete all fields to continue.'
    if (form.age < 18) return errorMsg.value = 'You must be 18 or older to book directly.'
  }
  if (currentStep.value === 2) {
    if (form.interests.length === 0) return errorMsg.value = 'Please select at least one interest.'
    if (!form.travelStyle) return errorMsg.value = 'Please select a travel style.'
  }
  if (currentStep.value === 3) {
    if (!form.destination || !form.travelers || !form.duration) return errorMsg.value = 'Please complete your journey details.'
  }

  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
  errorMsg.value = ''
}

const submitForm = () => {
  // Final validation and API call logic here
  console.log('Journey Request Submitted:', form)
  alert("Thank you! Your journey planner has been submitted.")
  closeOverlay()
}

// Lock body scroll when open
watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <transition name="fade-overlay">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-md p-4 md:p-6">
      
      <!-- Overlay Card Container -->
      <div class="relative w-full max-w-3xl bg-[#F9F8F6] rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 md:px-10 md:py-8 border-b border-[#1A1A1A]/10 bg-[#F9F8F6] z-10 shrink-0">
          <div class="flex flex-col">
            <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#673b1c] uppercase font-bold mb-1">
              Step {{ currentStep }} of {{ totalSteps }}
            </span>
            <h2 class="text-2xl md:text-3xl text-[#1A1A1A] leading-tight" style="font-family: 'Noto Serif', serif; font-weight: 400;">
              Plan Your Journey
            </h2>
          </div>
          
          <button @click="closeOverlay" class="w-10 h-10 rounded-full bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 flex items-center justify-center transition-colors shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-[#1A1A1A]"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Form Body Area -->
        <div class="flex-grow overflow-y-auto px-6 py-8 md:px-10 md:py-10 relative custom-scrollbar">
          
          <!-- Crossfade Transition between steps -->
          <transition name="slide-step" mode="out-in">
            
            <!-- STEP 1: IDENTITY -->
            <div v-if="currentStep === 1" :key="1" class="flex flex-col gap-8 md:gap-10">
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Legal Name</label>
                <input v-model="form.name" type="text" placeholder="How should we address you?" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30" />
              </div>
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Email Address</label>
                <input v-model="form.email" type="email" placeholder="Where should we send your itinerary?" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30" />
              </div>
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Your Age</label>
                <input v-model="form.age" type="number" placeholder="Enter age" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30" />
              </div>
            </div>

            <!-- STEP 2: PREFERENCES -->
            <div v-else-if="currentStep === 2" :key="2" class="flex flex-col gap-10">
              
              <!-- Checkboxes -->
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-5">Primary Interests (Select all that apply)</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label v-for="interest in interestOptions" :key="interest" class="flex items-center gap-3 cursor-pointer group">
                    <div class="w-5 h-5 rounded-sm border border-[#1A1A1A]/30 flex items-center justify-center transition-colors group-hover:border-[#673b1c]" :class="{'bg-[#673b1c] border-[#673b1c]': form.interests.includes(interest)}">
                      <svg v-if="form.interests.includes(interest)" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-3.5 h-3.5"><path d="M20 6L9 17l-5-5"></path></svg>
                    </div>
                    <input type="checkbox" :value="interest" v-model="form.interests" class="hidden" />
                    <span class="text-[14px] md:text-[15px] font-sans text-[#1A1A1A]/80">{{ interest }}</span>
                  </label>
                </div>
                <div class="w-full border-b border-[#1A1A1A]/10 mt-6"></div>
              </div>

              <!-- Radio Buttons -->
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-5">Travel Style</label>
                <div class="flex flex-col gap-4">
                  <label v-for="style in styleOptions" :key="style" class="flex items-center gap-3 cursor-pointer group">
                    <div class="w-5 h-5 rounded-full border border-[#1A1A1A]/30 flex items-center justify-center transition-colors group-hover:border-[#673b1c]" :class="{'border-[#673b1c]': form.travelStyle === style}">
                      <div class="w-2.5 h-2.5 rounded-full bg-[#673b1c] transition-transform scale-0" :class="{'scale-100': form.travelStyle === style}"></div>
                    </div>
                    <input type="radio" :value="style" v-model="form.travelStyle" class="hidden" />
                    <span class="text-[14px] md:text-[15px] font-sans text-[#1A1A1A]/80">{{ style }}</span>
                  </label>
                </div>
                <div class="w-full border-b border-[#1A1A1A]/10 mt-6"></div>
              </div>

            </div>

            <!-- STEP 3: DETAILS -->
            <div v-else-if="currentStep === 3" :key="3" class="flex flex-col gap-8 md:gap-10">
              
              <!-- Select -->
              <div class="input-group relative">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Preferred Region</label>
                <select v-model="form.destination" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors appearance-none cursor-pointer">
                  <option value="" disabled selected>Select a destination</option>
                  <option v-for="dest in destinationOptions" :key="dest" :value="dest" class="text-base">{{ dest }}</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5 absolute right-0 top-6 pointer-events-none text-[#1A1A1A]/50"><path d="M6 9l6 6 6-6"></path></svg>
              </div>

              <!-- Numbers -->
              <div class="grid grid-cols-2 gap-6">
                <div class="input-group">
                  <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Travelers</label>
                  <input v-model="form.travelers" type="number" min="1" placeholder="e.g. 2" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30" />
                </div>
                <div class="input-group">
                  <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Duration (Days)</label>
                  <input v-model="form.duration" type="number" min="1" placeholder="e.g. 10" class="w-full bg-transparent text-[#1A1A1A] text-lg md:text-xl font-light pb-2 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30" />
                </div>
              </div>
            </div>

            <!-- STEP 4: FINAL TOUCHES -->
            <div v-else :key="4" class="flex flex-col gap-6">
              <div class="input-group">
                <label class="block text-[10px] tracking-[0.2em] font-sans text-[#1A1A1A]/60 uppercase mb-2">Special Requirements & Notes</label>
                <textarea v-model="form.notes" rows="5" placeholder="Tell us about dietary restrictions, special occasions, or must-see landmarks..." class="w-full bg-transparent text-[#1A1A1A] text-[15px] font-light py-3 border-b border-[#1A1A1A]/20 outline-none focus:border-[#673b1c] transition-colors placeholder:text-[#1A1A1A]/30 resize-none"></textarea>
              </div>
            </div>

          </transition>

        </div>

        <!-- Error Message Bar -->
        <div v-if="errorMsg" class="px-6 md:px-10 py-2 bg-red-50 text-red-600 text-xs font-sans tracking-wide">
          * {{ errorMsg }}
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-between p-6 md:px-10 md:py-6 border-t border-[#1A1A1A]/10 bg-[#F9F8F6] z-10 shrink-0">
          
          <!-- Back Button -->
          <button @click="prevStep" :class="{'invisible': currentStep === 1}" class="group relative inline-flex items-center gap-2 px-5 py-2.5 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-colors duration-300 rounded-sm bg-transparent">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-300 stroke-[#1A1A1A] group-hover:-translate-x-1"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            <span class="text-[9px] font-sans tracking-[0.2em] text-[#1A1A1A] uppercase font-bold">Back</span>
          </button>

          <!-- Next / Submit Button -->
          <button v-if="currentStep < totalSteps" @click="nextStep" class="group relative inline-flex items-center gap-2.5 px-6 py-2.5 border border-[#673b1c] bg-[#673b1c] hover:bg-[#08374d] hover:border-[#08374d] transition-colors duration-300 rounded-sm">
            <span class="text-[9px] font-sans tracking-[0.2em] text-[#F9F8F6] uppercase font-bold">Next Step</span>
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-300 stroke-[#F9F8F6] group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </button>

          <button v-else @click="submitForm" class="group relative inline-flex items-center gap-2.5 px-6 py-2.5 border border-[#673b1b] bg-[#673b1b] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300 rounded-sm">
            <span class="text-[9px] font-sans tracking-[0.2em] text-[#F9F8F6] uppercase font-bold">Submit Journey</span>
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 stroke-[#F9F8F6]"><path d="M20 6L9 17l-5-5"></path></svg>
          </button>

        </div>

      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Overlay Backdrop Transition */
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.4s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

/* Step Sliding Transition */
.slide-step-enter-active,
.slide-step-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Custom neat scrollbar for internal form area */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #1A1A1A20;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #1A1A1A40;
}
</style>