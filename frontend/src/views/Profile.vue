<template>
  <div class="main-container">
    <Header />
    
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-placeholder">
            {{ userInitials }}
          </div>
          <h1 class="user-name">{{ user.name || 'User' }}</h1>
          <p class="user-email">{{ user.email || 'user@example.com' }}</p>
        </div>

        <div class="profile-content">
          <div class="info-section">
            <h2>My Account</h2>
            <div class="info-item">
              <span class="label">Member since</span>
              <span class="value">December 2024</span>
            </div>
            <div class="info-item">
              <span class="label">Status</span>
              <span class="badg active">Active</span>
            </div>
          </div>

          <div class="actions-section">
            <button class="action-btn" @click="mockAction">
              📦 My Orders
            </button>
            <button class="action-btn" @click="mockAction">
              ⚙️ Settings
            </button>
            <button class="logout-btn" @click="logout">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from "../components/Header.vue"

const router = useRouter()
const user = ref({
  name: 'Gamer One',
  email: 'gamer@shopvue.com'
})

const userInitials = computed(() => {
  const name = user.value.name || 'User'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  
  alert('You have been logged out successfully.')
  router.push('/login')
}

const mockAction = () => {
  alert('Feature coming soon!')
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
  
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background-color: #f1f5f9;
  padding-top: 70px;
}

.profile-container {
  width: 70%;
  margin: 60px auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .profile-container {
    width: 95%;
    margin: 40px auto;
  }
}

.profile-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.profile-header {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  backdrop-filter: blur(5px);
}

.user-name {
  margin: 0 0 5px;
  font-size: 24px;
  font-weight: 700;
}

.user-email {
  margin: 0;
  opacity: 0.9;
  font-size: 15px;
}

.profile-content {
  padding: 30px;
}

.info-section {
  margin-bottom: 30px;
}

.info-section h2 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 15px;
}

.label {
  color: #64748b;
}

.value {
  color: #1e293b;
  font-weight: 600;
}

.badg {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.badg.active {
  background: #dcfce7;
  color: #166534;
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-btn, .logout-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  padding-left: 20px;
}

.action-btn {
  background: #f8fafc;
  color: #334155;
}

.action-btn:hover {
  background: #e2e8f0;
}

.logout-btn {
  background: #fee2e2;
  color: #ef4444;
  margin-top: 10px;
  text-align: center;
  padding-left: 0;
}

.logout-btn:hover {
  background: #fecaca;
}
</style>