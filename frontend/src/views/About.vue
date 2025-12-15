<template>
  <div class="main-container">
    <Header />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">About ShopVue</h1>
        <p class="hero-subtitle">We are more than just a game store. We are a community of passionate gamers dedicated to bringing you the best digital entertainment experience.</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">2020</span>
            <span class="stat-label">Year Founded</span>
          </div>
          <div class="stat">
            <span class="stat-number">5M+</span>
            <span class="stat-label">Games Sold</span>
          </div>
          <div class="stat">
            <span class="stat-number">50+</span>
            <span class="stat-label">Team Members</span>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Our Team">
        <div class="hero-overlay">
          <div class="sale-badge">EST. 2020<br><strong>GAMERS FIRST</strong></div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="section-intro">
        <h2>🔥 Our Mission</h2>
        <p class="section-subtitle">To revolutionize how players discover and buy games by providing a seamless, secure, and community-driven platform.</p>
      </div>
      
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">❤️</div>
          <h3>Passion for Gaming</h3>
          <p>We play what we sell. Our curated selection comes from genuine love for the medium.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🛡️</div>
          <h3>Trust & Security</h3>
          <p>Your data and transactions are protected by industry-leading security standards.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🤝</div>
          <h3>Community First</h3>
          <p>We listen to our players. Your feedback shapes the future of ShopVue.</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="section-intro">
        <h2>👥 Meet The Team</h2>
        <p class="section-subtitle">The creative minds and technical wizards behind your favorite gaming store.</p>
      </div>

      <div class="team-grid">
        <div class="team-card" v-for="member in team" :key="member.id">
          <div class="member-image">
            <img :src="member.image" :alt="member.name">
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <span class="member-role">{{ member.role }}</span>
            <p>{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="cta-content">
        <h2>Join Our Journey</h2>
        <p>Be part of the fastest growing gaming community on the web.</p>
        <div class="cta-buttons">
          <button class="cta-primary" @click="goToProducts">
            🎮 Start Exploring
          </button>
          <button class="cta-secondary" @click="goToContact">
            📩 Contact Us
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from "../components/Header.vue"
import cynthia from '../assets/img/cynthia.jfif'
import malick from '../assets/img/malick.jfif'
import ema from '../assets/img/ema.jfif'


const router = useRouter()

const team = ref([
  {
    id: 1,
    name: "Emmanuel ",
    role: "CEO & Founder",
    bio: "Former pro gamer turned entrepreneur. ",
    image: ema
  },
  {
    id: 2,
    name: "Malick Wane",
    role: "Head of Technology",
    bio: "Full-stack engineer",
    image: malick
  },
  {
    id: 3,
    name: "Cynthia Ngutsuma",
    role: "Community Manager",
    bio: "The voice of ShopVue. ",
    image: cynthia
  }
])

const goToProducts = () => {
  router.push('/products')
}

const goToContact = () => {
  router.push('/contact')
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
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  z-index: 0;
}

.hero-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 25px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-subtitle {
  font-size: 20px;
  color: #475569;
  margin-bottom: 35px;
  line-height: 1.7;
  max-width: 600px;
  font-weight: 300;
}

.hero-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 35px;
  padding: 20px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  text-align: center;
  font-weight: 600;
}

.hero-image {
  flex: 1;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  transform: perspective(1000px) rotateY(2deg);
  transition: transform 0.5s ease;
}

.hero-image:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.hero-image img {
  width: 100%;
  height: 450px;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.sale-badge {
  background: white;
  color: #3b82f6;
  padding: 15px 25px;
  border-radius: 15px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Mission Section */
section {
  padding: 80px 40px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.section-intro {
  text-align: center;
  margin-bottom: 60px;
}

.section-intro h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1e293b;
  position: relative;
  display: inline-block;
}

.section-intro h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 18px;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.value-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
  border: 1px solid #e2e8f0;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: #3b82f6;
}

.value-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: inline-block;
}

.value-card h3 {
  color: #1e293b;
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 700;
}

.value-card p {
  color: #64748b;
  line-height: 1.6;
}

/* Team Section */
.team-section {
  background: #f8fafc;
  border-radius: 30px;
  margin: 80px auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-10px);
}

.member-image {
  height: 300px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .member-image img {
  transform: scale(1.05);
}

.member-info {
  padding: 25px;
  text-align: center;
}

.member-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 5px;
}

.member-role {
  font-size: 14px;
  color: #3b82f6;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 15px;
}

.member-info p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.final-cta {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 30px;
  margin: 40px auto 80px;
  padding: 80px 40px;
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #fff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cta-content p {
  font-size: 18px;
  color: #94a3b8;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cta-primary {
  padding: 15px 35px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
}

.cta-secondary {
  padding: 15px 35px;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-secondary:hover {
  background: white;
  color: #0f172a;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    padding-top: 40px;
  }
  
  .hero-image {
    width: 100%;
    transform: none;
  }
}
</style>
