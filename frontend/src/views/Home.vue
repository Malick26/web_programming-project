<template>
  <div class="main-container">
    <Header />
    
    <!-- Hero Section avec message marketing -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Elevate Your Gaming Experience</h1>
        <p class="hero-subtitle">Join 500,000+ gamers who trust us for the best deals on AAA titles, indie gems, and exclusive collector's editions. Your ultimate gaming destination!</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">50K+</span>
            <span class="stat-label">Games Available</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Customer Support</span>
          </div>
          <div class="stat">
            <span class="stat-number">85%</span>
            <span class="stat-label">Customer Satisfaction</span>
          </div>
        </div>
        <div class="hero-buttons">
          <button class="btn-primary" @click="goToProducts">
            <span class="btn-icon">🎮</span>
            Shop Now - Up to 70% Off!
          </button>
          <button class="btn-secondary" @click="goToFeatured">
            <span class="btn-icon">🔥</span>
            Today's Hot Deals
          </button>
        </div>
        <p class="hero-guarantee">✅ 30-Day Money Back Guarantee | ⚡ Instant Digital Delivery | 🛡️ 100% Secure Checkout</p>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Gaming Setup">
        <div class="hero-overlay">
          <div class="sale-badge">SUMMER SALE<br><strong>UP TO 70% OFF</strong></div>
        </div>
      </div>
    </section>

    <!-- Featured Games avec USP -->
    <section class="featured-section">
      <div class="section-intro">
        <h2>🔥 Editor's Picks: Best Sellers This Week</h2>
        <p class="section-subtitle">These critically acclaimed titles are flying off the virtual shelves! Don't miss out on the games everyone's talking about.</p>
      </div>
      
      <div class="games-grid">
        <div class="game-card" v-for="product in featuredProducts" :key="product.id">
          <div class="game-image">
            <img :src="product.images[0] || 'https://via.placeholder.com/400x200'" :alt="product.name">
            <div class="game-badge" v-if="product.discount">-{{ product.discount }}% OFF</div>
            <div class="editor-badge">EDITOR'S CHOICE</div>
          </div>
          <div class="game-info">
            <div class="game-meta">
              <span class="game-category">{{ getCategoryName(product.category_id) }}</span>
              <span class="game-rating">⭐ {{ product.rating || 4.5 }}/5.0</span>
            </div>
            <h3 class="game-title">{{ product.name }}</h3>
            <p class="game-description">Experience breathtaking graphics, immersive gameplay, and award-winning storytelling. Perfect for both casual players and hardcore enthusiasts.</p>
            <div class="game-price">
              <div class="price-info">
                <span class="current-price">${{ product.price }}</span>
                <span class="original-price" v-if="product.originalPrice">${{ product.originalPrice }}</span>
                <span class="price-save" v-if="product.discount">Save ${{ Math.round(product.originalPrice - product.price) }}</span>
              </div>
              <button class="add-to-cart" @click="addToCart(product)">
                <span class="cart-icon">🛒</span>
                Add to Cart
              </button>
            </div>
            <div class="game-features">
              <span class="feature">🏆 Game of the Year</span>
              <span class="feature">🎮 Multiplayer</span>
              <span class="feature">✨ 4K Support</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-footer">
        <p>All games include: Free updates | Cloud saves | Cross-platform play | 24/7 community support</p>
      </div>
    </section>

    <!-- Categories avec explication -->
    <section class="categories-section">
      <div class="section-intro">
        <h2>🎯 Find Your Perfect Game Genre</h2>
        <p class="section-subtitle">Whether you're a strategic mastermind or an action junkie, we've curated the best games in every category. Explore our hand-picked collections!</p>
      </div>
      
      <div class="categories-grid">
        <div class="category-card" v-for="category in categories" :key="category.id" @click="goToCategory(category.id)">
          <div class="category-icon">
            <span>{{ getCategoryIcon(category.name) }}</span>
          </div>
          <h3 class="category-title">{{ category.name }}</h3>
          <p class="category-description">{{ getCategoryDescription(category.name) }}</p>
          <div class="category-footer">
            <span class="category-count">{{ getProductCount(category.id) }} games</span>
            <span class="category-arrow">→</span>
          </div>
        </div>
      </div>
      
      <div class="category-cta">
        <p>Can't decide? Try our <strong>Personalized Game Recommender</strong> to find games tailored to your play style!</p>
        <button class="btn-recommender" @click="openRecommender">
          🎯 Get Personalized Recommendations
        </button>
      </div>
    </section>

    <section class="for-you-section">
      <div class="section-intro">
        <h2>❤️ Recommended Just For You</h2>
        <p class="section-subtitle">Based on your browsing history and popular choices among similar gamers. These titles are guaranteed to keep you on the edge of your seat!</p>
      </div>
      
    <!--  <div class="recommended-grid">
        <div class="recommended-card" v-for="product in recommendedProducts" :key="product.id">
          <div class="recommended-image">
            <img :src="product.image || 'https://via.placeholder.com/350x200'" :alt="product.name">
            <div class="player-count">👥 15K+ playing now</div>
          </div>
          <div class="recommended-info">
            <div class="recommended-header">
              <div class="header-left">
                <h3>{{ product.name }}</h3>
                <div class="rating">
                  <span class="stars">★★★★★</span>
                  <span class="rating-value">{{ product.rating || 4.5 }}</span>
                  <span class="review-count">({{ product.reviews || '1.2K' }} reviews)</span>
                </div>
              </div>
              <div class="header-right">
                <span class="trending-badge">🔥 TRENDING</span>
              </div>
            </div>
            <p class="recommended-description">{{ getGameDescription(product.name) }}</p>
            <div class="recommended-features">
              <span class="feature-tag">⏱️ {{ product.playtime || '40-60' }} hours gameplay</span>
              <span class="feature-tag">🌐 Online Multiplayer</span>
              <span class="feature-tag">🎵 Original Soundtrack</span>
            </div>
            <div class="recommended-footer">
              <div class="price-section">
                <span class="price">${{ product.price }}</span>
                <span class="price-note">One-time purchase • Lifetime access</span>
              </div>
              <button class="buy-btn" @click="addToCart(product)">
                <span class="btn-text">Buy Now & Start Playing</span>
                <span class="btn-subtext">Instant download</span>
              </button>
            </div>
          </div>
        </div>
      </div> -->
      
      <div class="testimonial">
        <div class="testimonial-content">
          "I've purchased 12 games from ShopVue this year alone. The selection is incredible and the prices beat every other store!"
        </div>
        <div class="testimonial-author">
          <img src="../assets/img/cynthia.jfif" alt="User" class="author-avatar">
          <div class="author-info">
            <strong>Alex Chen</strong>
            <span>Professional Streamer • 50K followers</span>
          </div>
        </div>
      </div>
    </section>

    <section class="value-section">
      <h2>Why Gamers Choose ShopVue</h2>
      <div class="value-grid">
        <div class="value-card">
          <div class="value-icon">⚡</div>
          <h3>Instant Delivery</h3>
          <p>Get your games immediately after purchase. No waiting, no shipping fees.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🛡️</div>
          <h3>100% Safe & Secure</h3>
          <p>Bank-level encryption protects your data. 30-day money back guarantee.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🎁</div>
          <h3>Exclusive Bonuses</h3>
          <p>Free DLCs, soundtracks, and artbooks with selected purchases.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">👑</div>
          <h3>VIP Rewards</h3>
          <p>Earn points with every purchase. Redeem for discounts and free games!</p>
        </div>
      </div>
    </section>

    <section class="newsletter-section">
      <div class="newsletter-content">
        <div class="newsletter-offer">
          <span class="offer-badge">EXCLUSIVE OFFER</span>
          <h2>Get 20% Off Your First Purchase!</h2>
          <p class="newsletter-subtitle">Subscribe to our newsletter and receive a welcome discount code, plus weekly updates on:</p>
          <ul class="newsletter-benefits">
            <li>🎮 New game releases and pre-orders</li>
            <li>🔥 Flash sales and limited-time deals</li>
            <li>🏆 Exclusive content and developer interviews</li>
            <li>✨ Free game giveaways every month</li>
          </ul>
        </div>
        <div class="newsletter-form-container">
          <div class="form-header">
            <h3>Join 250,000+ Gamers</h3>
            <p>Enter your email to claim your discount</p>
          </div>
          <div class="newsletter-form">
            <input type="email" placeholder="Your best email address" v-model="email">
            <button class="subscribe-btn" @click="subscribe">
              <span class="btn-main">Get My 20% Off Code</span>
              <span class="btn-sub">+ Weekly Gaming News</span>
            </button>
          </div>
          <p class="privacy-note">🔒 We respect your privacy. No spam, ever. Unsubscribe anytime.</p>
          <div class="trust-badges">
            <span class="trust-badge">✅ Verified Reviews</span>
            <span class="trust-badge">⭐ 4.8/5 Trustpilot</span>
            <span class="trust-badge">🛡️ SSL Secure</span>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="cta-content">
        <h2>Ready to Level Up Your Game Collection?</h2>
        <p>With thousands of titles, unbeatable prices, and a community of passionate gamers, there's never been a better time to join.</p>
        <div class="cta-buttons">
          <button class="cta-primary" @click="goToProducts">
            🎮 Browse All Games
            <span class="cta-sub">3,500+ titles available</span>
          </button>
          <button class="cta-secondary" @click="scrollToNewsletter">
            💰 Get 20% Off Now
            <span class="cta-sub">New customers only</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from "../components/Header.vue"
import cartService from "../services/cartService.js"
import apiService from "../services/services/ProductService.js"

const router = useRouter()
const email = ref('')
const categories = ref([])
const products = ref([])
const loading = ref(true)

const loadData = async () => {
  try {
    loading.value = true
    const [categoriesData, productsData] = await Promise.all([
      apiService.getCategories(),
      apiService.getProducts()
    ])
    categories.value = categoriesData
    products.value = productsData
  } catch (error) {
    console.error('Error loading data:', error)
    categories.value = [
      { id: 1, name: "Action" },
      { id: 2, name: "RPG" },
      { id: 3, name: "Adventure" },
      { id: 4, name: "Strategy" },
      { id: 5, name: "Sports" },
      { id: 6, name: "Racing" }
    ]
    products.value = [
      { id: 1, name: "Cyberpunk Odyssey", price: 59.99, category_id: 1, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", discount: 25, rating: 4.7 },
      { id: 2, name: "Mystic Realms", price: 49.99, category_id: 2, image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating: 4.8 },
      { id: 3, name: "Ocean Explorer", price: 29.99, category_id: 3, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80", rating: 4.6 },
      { id: 4, name: "Zombie Apocalypse", price: 34.99, category_id: 1, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating: 4.3 },
      { id: 5, name: "Space Commander", price: 44.99, category_id: 4, image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating: 4.8 },
      { id: 6, name: "Nitro Racing Pro", price: 39.99, category_id: 6, image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", discount: 20, rating: 4.5 }
    ]
  } finally {
    loading.value = false
  }
}

const featuredProducts = computed(() => {
  return products.value.slice(0, 3)
})

const recommendedProducts = computed(() => {
  return products.value.slice(3, 6)
})

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Unknown'
}

const getCategoryIcon = (categoryName) => {
  const icons = {
    'Action': '⚔️',
    'RPG': '🧙',
    'Adventure': '🗺️',
    'Strategy': '♟️',
    'Sports': '⚽',
    'Racing': '🏎️',
    'Horror': '👻',
    'Sci-Fi': '🚀',
    'Fantasy': '🐉',
    'Indie': '🎨'
  }
  return icons[categoryName] || '🎮'
}

const getCategoryDescription = (categoryName) => {
  const descriptions = {
    'Action': 'Fast-paced combat and adrenaline-fueled gameplay',
    'RPG': 'Deep stories, character development, and epic quests',
    'Adventure': 'Explore vast worlds and solve intriguing puzzles',
    'Strategy': 'Outsmart opponents with careful planning and tactics',
    'Sports': 'Realistic simulations of your favorite athletic competitions',
    'Racing': 'High-speed thrills and precision driving mechanics'
  }
  return descriptions[categoryName] || 'Amazing games await'
}

const getGameDescription = (gameName) => {
  const descriptions = {
    'Cyberpunk Odyssey': 'A groundbreaking open-world RPG set in a dystopian future',
    'Mystic Realms': 'Epic fantasy adventure with deep lore and magical combat',
    'Ocean Explorer': 'Discover underwater mysteries in this beautiful exploration game',
    'Zombie Apocalypse': 'Survival horror at its finest - can you outlast the undead?',
    'Space Commander': 'Lead fleets in epic space battles across the galaxy',
    'Nitro Racing Pro': 'The most realistic racing simulation ever created'
  }
  return descriptions[gameName] || 'An incredible gaming experience awaits'
}

const getProductCount = (categoryId) => {
  return products.value.filter(p => p.category_id === categoryId).length
}

const goToProducts = () => {
  router.push('/products')
}

const goToFeatured = () => {
  router.push('/products?filter=latest')
}

const goToCategory = (categoryId) => {
  router.push(`/products?category=${categoryId}`)
}

const addToCart = (product) => {
  const cartProduct = {
    id: product.id,
    title: product.name,
    price: product.price,
    images: [product.image || product.images[0]],
    category: getCategoryName(product.category_id)
  }
  cartService.addToCart(cartProduct)
  alert(`🎉 ${product.name} added to cart! Continue shopping or proceed to checkout.`)
}

const openRecommender = () => {
  alert('🎮 Personalized game recommender coming soon! For now, browse our categories.')
}

const scrollToNewsletter = () => {
  const newsletter = document.querySelector('.newsletter-section')
  if (newsletter) {
    newsletter.scrollIntoView({ behavior: 'smooth' })
  }
}

const subscribe = () => {
  if (email.value) {
    alert(`🎁 Welcome to ShopVue! Your 20% discount code has been sent to: ${email.value}\nUse code: WELCOME20 at checkout.`)
    email.value = ''
  } else {
    alert('Please enter your email address to receive your discount')
  }
}

// Charger les données au montage
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Hero Section améliorée */
.hero-section {
  padding: 120px 40px 80px;
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
  background: radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
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
  background: linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6);
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
  color: #8b5cf6;
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #8b5cf6;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #8b5cf6;
  text-align: center;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.btn-primary, .btn-secondary {
  padding: 18px 35px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-icon {
  font-size: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #8b5cf6;
  border: 2px solid rgba(139, 92, 246, 0.4);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  transform: translateY(-2px);
}

.hero-guarantee {
  font-size: 14px;
  color: #8b5cf6;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.hero-image {
  flex: 1;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  position: relative;
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}

.hero-image:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.hero-image img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 25px;
}

.hero-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
}

.sale-badge {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #8b5cf6;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

section {
  padding: 100px 40px;
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
  color: #8b5cf6;
  position: relative;
  display: inline-block;
}

.section-intro h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 18px;
  color: #8b5cf6;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Featured Games amélioré */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.game-card {
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
}

.game-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border-color: rgba(139, 92, 246, 0.4);
}

.game-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-card:hover .game-image img {
  transform: scale(1.05);
}

.game-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
}

.editor-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.game-info {
  padding: 25px;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.game-category {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
}

.game-rating {
  color: #fbbf24;
  font-size: 14px;
  font-weight: 600;
}

.game-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 15px;
  color: white;
}

.game-description {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 20px;
  line-height: 1.6;
}

.game-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.current-price {
  font-size: 28px;
  font-weight: 800;
  color: #8b5cf6;
}

.original-price {
  font-size: 16px;
  color: #94a3b8;
  text-decoration: line-through;
}

.price-save {
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
}

.add-to-cart {
  padding: 15px 25px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-to-cart:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
}

.cart-icon {
  font-size: 18px;
}

.game-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.feature {
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  color: #cbd5e1;
}

.section-footer {
  text-align: center;
  padding: 25px;
  background: rgba(139, 92, 246, 0.05);
  border-radius: 15px;
  margin-top: 30px;
  color: #94a3b8;
  font-size: 15px;
}

/* Categories amélioré */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.category-card {
  background: rgba(30, 30, 46, 0.8);
  border-radius: 20px;
  padding: 35px 25px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(139, 92, 246, 0.3);
}

.category-card:hover::before {
  opacity: 1;
}

.category-icon {
  font-size: 50px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.2);
}

.category-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.category-description {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 20px;
  line-height: 1.5;
  min-height: 40px;
}

.category-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.category-count {
  color: #8b5cf6;
  font-size: 14px;
  font-weight: 600;
}

.category-arrow {
  color: #8b5cf6;
  font-size: 20px;
  transition: transform 0.3s ease;
}

.category-card:hover .category-arrow {
  transform: translateX(5px);
}

.category-cta {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 20px;
  margin-top: 40px;
}

.category-cta p {
  font-size: 18px;
  color: white;
  margin-bottom: 25px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-recommender {
  padding: 18px 35px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-recommender:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(245, 158, 11, 0.3);
}

/* Recommended Games amélioré */
.recommended-grid {
  display: flex;
  gap: 40px;
  overflow-x: auto;
  padding: 20px 10px;
  margin-bottom: 50px;
  scrollbar-width: thin;
  scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.1);
}

.recommended-grid::-webkit-scrollbar {
  height: 8px;
}

.recommended-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.recommended-grid::-webkit-scrollbar-thumb {
  background: #8b5cf6;
  border-radius: 10px;
}

.recommended-card {
  flex: 0 0 380px;
  background: rgba(30, 30, 46, 0.8);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.recommended-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border-color: rgba(139, 92, 246, 0.3);
}

.recommended-image {
  height: 220px;
  position: relative;
}

.recommended-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-count {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  backdrop-filter: blur(5px);
}

.recommended-info {
  padding: 25px;
}

.recommended-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.header-left h3 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  color: white;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #fbbf24;
  font-size: 16px;
}

.rating-value {
  color: white;
  font-weight: 700;
}

.review-count {
  color: #94a3b8;
  font-size: 13px;
}

.trending-badge {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 700;
}

.recommended-description {
  font-size: 14px;
  color: #cbd5e1;
  margin-bottom: 20px;
  line-height: 1.6;
  min-height: 60px;
}

.recommended-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
}

.feature-tag {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.recommended-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.price-section {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: #8b5cf6;
  margin-bottom: 3px;
}

.price-note {
  font-size: 12px;
  color: #94a3b8;
}

.buy-btn {
  padding: 15px 25px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
}

.buy-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.btn-text {
  font-size: 14px;
}

.btn-subtext {
  font-size: 11px;
  opacity: 0.8;
}

.testimonial {
  background: rgba(139, 92, 246, 0.05);
  border-radius: 20px;
  padding: 35px;
  margin-top: 40px;
  border-left: 4px solid #8b5cf6;
}

.testimonial-content {
  font-size: 18px;
  color: white;
  font-style: italic;
  margin-bottom: 25px;
  line-height: 1.6;
  position: relative;
  padding-left: 25px;
}

.testimonial-content::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -15px;
  font-size: 60px;
  color: #8b5cf6;
  opacity: 0.3;
  font-family: serif;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #8b5cf6;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  color: white;
  font-size: 16px;
}

.author-info span {
  color: #94a3b8;
  font-size: 14px;
}

/* Value Proposition Section */
.value-section {
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(30, 30, 46, 0.8), rgba(26, 26, 46, 0.9));
  border-radius: 25px;
  margin: 60px auto;
  max-width: 1400px;
}

.value-section h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 50px;
  color: white;
  position: relative;
  display: inline-block;
}

.value-section h2::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  border-radius: 2px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 50px;
}

.value-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 40px 25px;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.value-card:hover {
  transform: translateY(-10px);
  background: rgba(139, 92, 246, 0.05);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.value-icon {
  font-size: 50px;
  margin-bottom: 25px;
  display: inline-block;
  background: rgba(139, 92, 246, 0.1);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  text-align: center;
}

.value-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
}

.value-card p {
  font-size: 16px;
  color: #cbd5e1;
  line-height: 1.6;
}

/* Newsletter améliorée */
.newsletter-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%);
  border-radius: 30px;
  padding: 80px;
  margin: 80px auto;
  max-width: 1400px;
  width: calc(100% - 80px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  z-index: 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  position: relative;
  z-index: 1;
}

.newsletter-offer {
  text-align: left;
}

.offer-badge {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 25px;
}

.newsletter-offer h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 20px;
  color: white;
  line-height: 1.2;
}

.newsletter-subtitle {
  font-size: 18px;
  color: #cbd5e1;
  margin-bottom: 30px;
  line-height: 1.6;
}

.newsletter-benefits {
  list-style: none;
  padding: 0;
}

.newsletter-benefits li {
  font-size: 16px;
  color: white;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.newsletter-form-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.form-header p {
  color: #94a3b8;
  font-size: 16px;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.newsletter-form input {
  padding: 20px 25px;
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.08);
}

.newsletter-form input::placeholder {
  color: #94a3b8;
}

.subscribe-btn {
  padding: 22px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subscribe-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(139, 92, 246, 0.3);
}

.btn-main {
  font-size: 17px;
}

.btn-sub {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 5px;
}

.privacy-note {
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.trust-badge {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 18px;
  border-radius: 15px;
  font-size: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Final CTA */
.final-cta {
  text-align: center;
  padding: 100px 40px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 30px;
  margin: 80px auto;
  max-width: 1400px;
  width: calc(100% - 80px);
}

.cta-content h2 {
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 25px;
  color: white;
}

.cta-content p {
  font-size: 20px;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 25px;
  justify-content: center;
}

.cta-primary, .cta-secondary {
  padding: 25px 40px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
}

.cta-primary {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.3);
}

.cta-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 2px solid rgba(139, 92, 246, 0.4);
  backdrop-filter: blur(10px);
}

.cta-secondary:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  transform: translateY(-3px);
}

.cta-sub {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 8px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1400px) {
  .hero-section,
  section {
    max-width: 1200px;
  }
  
  .newsletter-section,
  .final-cta {
    max-width: 1200px;
    width: calc(100% - 80px);
  }
}

@media (max-width: 1200px) {
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .hero-title {
    font-size: 48px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary, .cta-secondary {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 100px 20px 60px;
    max-width: 100%;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-title {
    font-size: 40px;
  }
  
  section {
    padding: 60px 20px;
    max-width: 100%;
  }
  
  .section-intro h2 {
    font-size: 36px;
  }
  
  .newsletter-section,
  .final-cta {
    max-width: calc(100% - 40px);
    width: calc(100% - 40px);
    margin: 60px 20px;
    padding: 60px 40px;
  }
  
  .value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 90px 20px 50px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .section-intro h2 {
    font-size: 30px;
  }
  
  .section-subtitle {
    font-size: 16px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .newsletter-section {
    padding: 40px 25px;
  }
  
  .newsletter-offer h2 {
    font-size: 32px;
  }
  
  .value-grid {
    grid-template-columns: 1fr;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .recommended-card {
    flex: 0 0 320px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 28px;
  }
  
  .section-intro h2 {
    font-size: 26px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .newsletter-form-container {
    padding: 25px;
  }
  
  .trust-badges {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-content h2 {
    font-size: 36px;
  }
  
  .final-cta {
    padding: 60px 25px;
  }
}
</style>