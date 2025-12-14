<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../services/authService.js'

const email = ref('')
const password = ref('')
const message = ref(null)
const type = ref(null)

const router = useRouter()

async function login() {
  try {
    const res = await AuthService.login({
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    type.value = 'success'
    message.value = 'Connexion réussie !'
    setTimeout(() => router.push('/'), 1000)
  } catch (error) {
    type.value = 'error'
    message.value = error.response?.data?.message || 'Erreur lors de la connexion.'
  }
}

function googleLogin() {
  // Ajouter la logique Google OAuth
  console.log('Google login')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome Back!</h1>
      <p class="subtitle">Please enter log in details below</p>

      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required />
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <button type="submit" class="signin-btn">Sign in</button>
      </form>

      <div class="divider">
        <span>or continue</span>
      </div>

      <button @click="googleLogin" class="google-btn">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Log in with Google
      </button>

      <p class="signup-link">
        Don't have an account? <a href="#">Sign Up</a>
      </p>

      <div class="welcome-section">
       
      </div>

      <div v-if="message" :class="['message', type]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  color: #1e293b;
  font-size: 28px;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  margin-bottom: 32px;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

input {
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.forgot-link {
  display: block;
  text-align: right;
  margin-top: 8px;
  color: #3b82f6;
  font-size: 14px;
  text-decoration: none;
}

.signin-btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 8px 0 24px;
  transition: background 0.2s;
}

.signin-btn:hover {
  background: #2563eb;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #94a3b8;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 16px;
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background 0.2s;
}

.google-btn:hover {
  background: #f8fafc;
}

.signup-link {
  color: #64748b;
  margin-bottom: 32px;
}

.signup-link a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}

.welcome-section {
  background: #f1f5f9;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
}

.welcome-section h3 {
  color: #1e293b;
  margin-bottom: 8px;
}

.welcome-section p {
  color: #64748b;
  font-size: 14px;
}

.message {
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
}

.success {
  background: #dcfce7;
  color: #166534;
}

.error {
  background: #fee2e2;
  color: #991b1b;
}
</style>