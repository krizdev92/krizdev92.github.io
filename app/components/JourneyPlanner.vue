<script setup>
import { reactive } from 'vue'

// ==========================================
// CENTRAL JSON PAYLOAD (Drives entire form)
// ==========================================
const plannerData = {
  header: {
    title: "Design Your Journey",
    subtitle: "Share your preferences with us, and our travel designers will craft a bespoke itinerary perfectly suited to your pace and style."
  },
  questions: [
    { id: 'name', type: 'text', label: 'Legal Name', placeholder: 'E.g. John Doe', required: true, validation: 'name', errorMsg: 'Name must be at least 3 letters and contain no numbers.' },
    { id: 'email', type: 'email', label: 'Email Address', placeholder: 'name@example.com', required: true, validation: 'email', errorMsg: 'Please enter a valid email address.' },
    { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: false, validation: 'phone', errorMsg: 'Please enter a valid phone number.' },
    { id: 'age', type: 'number', label: 'Your Age', placeholder: 'Enter your age', required: true, min: 18, errorMsg: 'You must be at least 18 years old to book.' },
    { id: 'date', type: 'date', label: 'Preferred Start Date', required: false },
    { id: 'interests', type: 'checkbox', label: 'Primary Interests (Select all that apply)', options: ['Culture & Heritage', 'Nature & Wildlife', 'Wellness & Spirit', 'Culinary Flavours', 'Offbeat Adventure', 'Bespoke Luxury'], required: true, errorMsg: 'Please select at least one interest.' },
    { id: 'travelStyle', type: 'radio', label: 'Pace & Travel Style', options: ['Relaxed & Leisurely', 'Balanced & Curated', 'Active & Fast-Paced'], required: true, errorMsg: 'Please select a travel style.' },
    { id: 'destination', type: 'select', label: 'Preferred Region', options: ['Kerala Backwaters', 'Himalayan Foothills', 'Sri Lankan Coast', 'Japanese Alps', 'Open to Suggestions'], placeholder: 'Select a destination', required: true, errorMsg: 'Please select a destination.' },
    { id: 'travelers', type: 'number', label: 'Number of Travelers', placeholder: 'e.g. 2', required: true, min: 1, errorMsg: 'Must be at least 1 traveler.' },
    { id: 'duration', type: 'number', label: 'Duration (Days)', placeholder: 'e.g. 10', required: true, min: 1, errorMsg: 'Must be at least 1 day.' },
    { id: 'notes', type: 'textarea', label: 'Special Requirements & Notes', placeholder: 'Tell us about dietary restrictions, special occasions, or must-see landmarks...', required: false }
  ],
  submitText: 'Submit'
}

// Reactive State (Synchronous initialization)
const answers = reactive({})
const errors = reactive({})

plannerData.questions.forEach(q => {
  answers[q.id] = q.type === 'checkbox' ? [] : ''
  errors[q.id] = ''
})

// Validation Engine
const submitForm = () => {
  let isValid = true
  
  plannerData.questions.forEach(q => {
    errors[q.id] = ''
    const val = answers[q.id]
    
    if (q.required) {
      if (val === '' || val === null || (Array.isArray(val) && val.length === 0)) {
        errors[q.id] = 'This field is required.'
        isValid = false
        return
      }
    }
    
    if (val !== '' && val !== null) {
      if (q.validation === 'name') {
        if (!/^[A-Za-z\s]{3,}$/.test(val)) {
          errors[q.id] = q.errorMsg
          isValid = false
        }
      } else if (q.validation === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errors[q.id] = q.errorMsg
          isValid = false
        }
      } else if (q.validation === 'phone') {
        if (!/^[0-9\+\-\(\)\s]{7,20}$/.test(val)) {
          errors[q.id] = q.errorMsg
          isValid = false
        }
      }
      
      if (q.type === 'number' && q.min !== undefined) {
        if (Number(val) < q.min) {
          errors[q.id] = q.errorMsg
          isValid = false
        }
      }
    }
  })
  
  if (isValid) {
    console.log('Final Payload:', answers)
    alert('Thank you! Your journey planner has been successfully submitted.')
  } else {
    setTimeout(() => {
      const firstError = document.querySelector('.error-text')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}
</script>

<template>
  <div class="w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col p-8 md:p-14 lg:p-20 relative z-10">
    
    <!-- Header -->
    <div class="flex flex-col items-center text-center mb-12 md:mb-16">
      <h1 class="text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-4" style="font-family: 'Playfair Display', serif; font-weight: 400;">
        {{ plannerData.header.title }}
      </h1>
      <p class="font-sans text-base md:text-lg text-[#1A1A1A]/80 font-medium max-w-2xl leading-relaxed">
        {{ plannerData.header.subtitle }}
      </p>
    </div>

    <!-- Form Stream -->
    <form @submit.prevent="submitForm" class="flex flex-col max-w-4xl mx-auto w-full">
      
      <div 
        v-for="(q, idx) in plannerData.questions" 
        :key="q.id" 
        class="question-block flex flex-col gap-3 relative pb-10 mb-10 border-b border-[#1A1A1A]/10 last:border-b-0 last:mb-0 last:pb-0"
      >
        <!-- Question Title Area -->
        <div class="flex items-center gap-4">
          <span class="text-xl md:text-2xl font-bold text-[#673b1c] shrink-0">{{ String(idx + 1).padStart(2, '0') }}.</span>
          <label :for="q.id" class="text-base md:text-[17px] font-semibold text-[#1A1A1A] uppercase tracking-wider">
            {{ q.label }} <span v-if="q.required" class="text-[#673b1b] ml-1">*</span>
          </label>
        </div>

        <!-- Validation Error Message -->
        <span v-if="errors[q.id]" class="error-text text-sm font-semibold text-[#673b1b] pl-10 md:pl-12 mt-1">
          * {{ errors[q.id] }}
        </span>

        <!-- Input Area -->
        <div class="pl-10 md:pl-12 mt-3">
          
          <!-- TEXT / EMAIL / TEL / NUMBER -->
          <input 
            v-if="['text', 'email', 'tel', 'number'].includes(q.type)"
            :id="q.id"
            :type="q.type"
            :min="q.min"
            v-model="answers[q.id]"
            :placeholder="q.placeholder"
            class="w-full bg-transparent text-[#1A1A1A] text-xl font-medium pb-3 border-b-2 outline-none transition-colors placeholder:font-medium placeholder:text-[#1A1A1A]/20"
            :class="errors[q.id] ? 'border-[#673b1b]' : 'border-[#1A1A1A]/20 focus:border-[#673b1c]'"
          />

          <!-- DATE -->
          <input 
            v-if="q.type === 'date'"
            :id="q.id"
            type="date"
            v-model="answers[q.id]"
            class="w-full bg-transparent text-[#1A1A1A] text-xl font-medium pb-3 border-b-2 outline-none transition-colors uppercase"
            :class="errors[q.id] ? 'border-[#673b1b]' : 'border-[#1A1A1A]/20 focus:border-[#673b1c]'"
          />

          <!-- TEXTAREA -->
          <textarea 
            v-if="q.type === 'textarea'"
            :id="q.id"
            v-model="answers[q.id]"
            :placeholder="q.placeholder"
            rows="4"
            class="w-full bg-[#F9F8F6] text-[#1A1A1A] text-lg font-medium p-5 border border-[#1A1A1A]/10 outline-none transition-colors placeholder:font-medium placeholder:text-[#1A1A1A]/30 rounded-lg resize-y focus:border-[#673b1c]"
            :class="{'border-[#673b1b]': errors[q.id]}"
          ></textarea>

          <!-- SELECT -->
          <div v-if="q.type === 'select'" class="relative">
            <select 
              :id="q.id"
              v-model="answers[q.id]"
              class="w-full bg-transparent text-[#1A1A1A] text-xl font-medium pb-3 border-b-2 outline-none transition-colors appearance-none cursor-pointer"
              :class="[errors[q.id] ? 'border-[#673b1b]' : 'border-[#1A1A1A]/20 focus:border-[#673b1c]', answers[q.id] === '' ? 'text-[#1A1A1A]/30' : 'text-[#1A1A1A]']"
            >
              <option value="" disabled>{{ q.placeholder }}</option>
              <option v-for="opt in q.options" :key="opt" :value="opt" class="text-[#1A1A1A] font-medium">{{ opt }}</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 absolute right-0 top-1 pointer-events-none text-[#1A1A1A]/50"><path d="M6 9l6 6 6-6"></path></svg>
          </div>

          <!-- CHECKBOXES -->
          <div v-if="q.type === 'checkbox'" class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
            <label v-for="opt in q.options" :key="opt" class="flex items-center gap-4 cursor-pointer group">
              <div class="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors shrink-0"
                   :class="answers[q.id].includes(opt) ? 'bg-[#673b1c] border-[#673b1c]' : 'border-[#1A1A1A]/30 group-hover:border-[#673b1c]'">
                <svg v-if="answers[q.id].includes(opt)" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" class="w-4 h-4"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <input type="checkbox" :value="opt" v-model="answers[q.id]" class="hidden" />
              <span class="text-[17px] font-semibold text-[#1A1A1A]/90">{{ opt }}</span>
            </label>
          </div>

          <!-- RADIO BUTTONS -->
          <div v-if="q.type === 'radio'" class="flex flex-col gap-5 mt-2">
            <label v-for="opt in q.options" :key="opt" class="flex items-center gap-4 cursor-pointer group">
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
                   :class="answers[q.id] === opt ? 'border-[#673b1c]' : 'border-[#1A1A1A]/30 group-hover:border-[#673b1c]'">
                <div class="w-3 h-3 rounded-full bg-[#673b1c] transition-transform scale-0" :class="{'scale-100': answers[q.id] === opt}"></div>
              </div>
              <input type="radio" :value="opt" v-model="answers[q.id]" class="hidden" />
              <span class="text-[17px] font-semibold text-[#1A1A1A]/90">{{ opt }}</span>
            </label>
          </div>

        </div>
      </div>

      <!-- Submit Section -->
      <div class="flex flex-col items-center mt-12 pt-10 border-t-2 border-[#1A1A1A]/10">
        <button type="submit" class="group relative inline-flex items-center gap-3 px-10 py-4 border border-[#673b1b] bg-[#673b1b] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300 rounded-sm shadow-md">
          <span class="text-xs font-sans tracking-[0.25em] text-[#F9F8F6] uppercase font-bold mt-[1px]">
            {{ plannerData.submitText }}
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 stroke-[#F9F8F6] transform transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
        </button>
      </div>

    </form>
  </div>
</template>