<template>
  <div class="main-container">
    <Header />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Get in Touch</h1>
        <p class="hero-subtitle">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        <div class="contact-methods">
          <div class="method-item">
            <span class="method-icon">📍</span>
            <div class="method-info">
              <h3>Headquarters</h3>
              <p>Villejuif<br>Rue Gorky</p>
            </div>
          </div>
          <div class="method-item">
            <span class="method-icon">📧</span>
            <div class="method-info">
              <h3>Email Us</h3>
              <p>support@shopvue.com<br>partners@shopvue.com</p>
            </div>
          </div>
          <div class="method-item">
            <span class="method-icon">📞</span>
            <div class="method-info">
              <h3>Call Us</h3>
              <p>+33 0700000000<br>Mon-Fri, 9am-6pm PT</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-form-container">
        <form @submit.prevent="submitForm" class="contact-form">
          <h2>Send Message</h2>
          
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Your name">
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required placeholder="your.email@example.com">
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <select id="subject" v-model="form.subject">
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="business">Business Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" required rows="5" placeholder="How can we help you?"></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading">Sending...</span>
            <span v-else>Send Message ✈️</span>
          </button>
        </form>
      </div>
    </section>

    <section class="map-section">
      <div class="map-container">
        <div class="map-placeholder">
          <div class="map-content">
            <span class="map-icon">🗺️</span>
            <h3>Find Us on the Map</h3>
            <p>We are located in the heart of Tech Valley.</p>
            <button class="map-btn">Get Directions</button>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="section-intro">
        <h2>Frequently Asked Questions</h2>
        <p class="section-subtitle">Quick answers to common questions.</p>
      </div>

      <div class="faq-grid">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from "../components/Header.vue"

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: 'general',
  message: ''
})

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "Since we sell digital keys, delivery is instant worldwide! Physical collector's items ship to over 50 countries."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, PayPal, and major crypto currencies."
  },
  {
    question: "How do I get my refund?",
    answer: "If the game key hasn't been revealed, you can request a refund within 14 days of purchase."
  }
]

const submitForm = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  alert(`Thank you ${form.value.name}! We have received your message regarding "${form.value.subject}". We'll get back to you at ${form.value.email} shortly.`)
  
  form.value = {
    name: '',
    email: '',
    subject: 'general',
    message: ''
  }
  loading.value = false
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-top: 70px;
}

.hero-section {
  padding: 80px 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.hero-content {
  flex: 1;
  padding-top: 20px;
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  margin-bottom: 25px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 20px;
  color: #475569;
  margin-bottom: 50px;
  line-height: 1.7;
  max-width: 500px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.method-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.method-icon {
  font-size: 24px;
  background: #f1f5f9;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.method-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 5px;
}

.method-info p {
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* Form Styles */
.contact-form-container {
  flex: 1;
  background: white;
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.contact-form h2 {
  font-size: 24px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Map Section */
.map-section {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.map-container {
  border-radius: 25px;
  overflow: hidden;
  height: 400px;
  background: #f8fafc;
  position: relative;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center;
}

.map-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.map-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 15px;
}

.map-content h3 {
  margin: 0 0 10px;
  font-weight: 700;
  color: #1e293b;
}

.map-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* FAQ Section */
.faq-section {
  padding: 80px 40px;
  max-width: 1000px;
  margin: 0 auto 40px;
}

.section-intro {
  text-align: center;
  margin-bottom: 50px;
}

.section-intro h2 {
  font-size: 36px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 15px;
}

.faq-grid {
  display: grid;
  gap: 30px;
}

.faq-item {
  background: white;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
}

.faq-item h3 {
  font-size: 18px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 10px;
}

.faq-item p {
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
  }
}
</style>
