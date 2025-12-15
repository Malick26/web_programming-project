<template>
  <div class="main-container">
    <Header />
    
    <div class="checkout-container">
      <div class="checkout-title">
        <h1>CHECKOUT</h1>
      </div>

      <div class="checkout-content">
        <div class="checkout-forms">
          <section class="form-section">
            <h2>Shipping Details</h2>
            <form @submit.prevent>
              <div class="form-row">
                <div class="form-group half">
                  <label>First Name</label>
                  <input type="text" v-model="form.firstName" placeholder="John" required>
                </div>
                <div class="form-group half">
                  <label>Last Name</label>
                  <input type="text" v-model="form.lastName" placeholder="Doe" required>
                </div>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="form.address" placeholder="123 Gaming Street" required>
              </div>
              <div class="form-row">
                <div class="form-group half">
                  <label>City</label>
                  <input type="text" v-model="form.city" placeholder="New York" required>
                </div>
                <div class="form-group half">
                  <label>Zip Code</label>
                  <input type="text" v-model="form.zip" placeholder="10001" required>
                </div>
              </div>
              <div class="form-group">
                <label>Country</label>
                <select v-model="form.country">
                  <option value="US">United States</option>
                  <option value="FR">France</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
            </form>
          </section>

          <section class="form-section">
            <h2>Payment Details</h2>
            <div class="card-preview">
              <div class="card-front">
                <div class="card-chip"></div>
                <div class="card-number">{{ form.cardNumber || '•••• •••• •••• ••••' }}</div>
                <div class="card-details">
                  <div class="card-holder">
                    <span>Card Holder</span>
                    <div>{{ (form.firstName + ' ' + form.lastName).toUpperCase() || 'YOUR NAME' }}</div>
                  </div>
                  <div class="card-expiry">
                    <span>Expires</span>
                    <div>{{ form.expiry || 'MM/YY' }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <form @submit.prevent>
              <div class="form-group">
                <label>Card Number</label>
                <input type="text" v-model="form.cardNumber" placeholder="0000 0000 0000 0000" maxlength="19">
              </div>
              <div class="form-row">
                <div class="form-group half">
                  <label>Expiry Date</label>
                  <input type="text" v-model="form.expiry" placeholder="MM/YY" maxlength="5">
                </div>
                <div class="form-group half">
                  <label>CVV</label>
                  <input type="password" v-model="form.cvv" placeholder="123" maxlength="3">
                </div>
              </div>
            </form>
          </section>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            <div v-for="item in cart" :key="item.id" class="summary-item">
              <div class="item-info">
                <span class="item-name">{{ item.title }}</span>
                <span class="item-qty">x{{ item.quantity }}</span>
              </div>
              <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ subtotal }}</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span>${{ deliveryFee }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ total }}</span>
            </div>
          </div>

          <button class="place-order-btn" @click="placeOrder" :disabled="loading">
            <span v-if="loading">Processing...</span>
            <span v-else>Place Order (${{ total }})</span>
          </button>
          
          <p class="secure-note">🔒 Secure 256-bit SSL Encrypted Payment</p>
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
const cart = ref([])
const loading = ref(false)
const deliveryFee = 15

const form = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  country: 'US',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const loadCart = () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []
  
  if (cart.value.length === 0) {
    router.push('/cart')
  }
}

const subtotal = computed(() => {
  return (cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)
})

const total = computed(() => {
  return (parseFloat(subtotal.value) + deliveryFee).toFixed(2)
})

const placeOrder = async () => {
  if (!form.value.firstName || !form.value.address || !form.value.cardNumber) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  localStorage.removeItem('cart')
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cartLength: 0 } }))
  
  alert(`Order Placed Successfully! \nThank you ${form.value.firstName} for your purchase.`)
  router.push('/')
  loading.value = false
}

onMounted(() => {
  loadCart()
})
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 70px;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.checkout-title {
  text-align: center;
  margin-bottom: 40px;
}

.checkout-title h1 {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: 1px;
}

.checkout-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.checkout-forms {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
  flex: 1;
}

.form-group.half {
  flex: 1;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.card-preview {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 25px;
  max-width: 350px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.card-chip {
  width: 50px;
  height: 35px;
  background: linear-gradient(135deg, #d4af37, #f9e38d, #d4af37);
  border-radius: 5px;
  margin-bottom: 25px;
}

.card-number {
  font-size: 22px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 25px;
}

.card-details {
  display: flex;
  justify-content: space-between;
}

.card-details span {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.7;
}

/* Order Summary */
.order-summary {
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 90px;
}

.order-summary h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 25px;
}

.summary-items {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 25px;
  padding-right: 5px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f5f9;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 600;
  color: #333;
}

.item-qty {
  font-size: 13px;
  color: #64748b;
}

.item-price {
  font-weight: 600;
}

.summary-totals {
  border-top: 2px solid #e2e8f0;
  padding-top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #64748b;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
  font-size: 20px;
  font-weight: 800;
  color: #1e293b;
}

.place-order-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 25px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.place-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.place-order-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.secure-note {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 15px;
}

@media (max-width: 900px) {
  .checkout-content {
    flex-direction: column;
  }
  
  .order-summary {
    width: 100%;
    position: static;
  }
}
</style>
