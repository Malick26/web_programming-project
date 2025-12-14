<template>
  <div class="main-container">
    <!-- Header -->
    <Header />

    <div class="cart-container">
      <div class="cart-content">
        <!-- Titre -->
        <div class="cart-title">
          <h1>YOUR CART</h1>
        </div>

        <!-- Panier vide -->
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <router-link to="/products" class="continue-shopping-btn">
            Continue Shopping
          </router-link>
        </div>

        <!-- Panier avec articles -->
        <div v-else>
          <div class="horizontal">
            <!-- Section des articles -->
            <div class="liste">
              <!-- Articles du panier -->
              <div v-for="item in cart" :key="item.id" class="cart-item">
                <!-- Image du produit -->
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" v-if="item.image">
                  <div class="image-placeholder" v-else>
                    {{ item.title.charAt(0) }}
                  </div>
                </div>
                
                <!-- Informations du produit -->
                <div class="item-info">
                  <div class="item-header">
                    <h3 class="item-name">{{ item.title }}</h3>
                    <button class="remove-btn-mobile" @click="decrementQuantity(item.id)">×</button>
                  </div>
                    <div class="item-price-mobile">${{ (item.price * item.quantity).toFixed(2) }}</div>
                  <div class="item-details-grid">
                    <p class="item-details" v-if="item.size">Size: {{ item.size }}</p>
                    <p class="item-details" v-if="item.color">Color: {{ item.color }}</p>
                    <div class="quantity-control">
                      <button class="qty-btn" @click="decrementQuantity(item.id)" :disabled="item.quantity <= 1">−</button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button class="qty-btn" @click="incrementQuantity(item.id)">+</button>
                    </div>
                  </div>
                </div>
                
                <!-- Prix et bouton remove -->
                <div class="item-price">
                  <span class="price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  <button class="remove-btn" @click="removeFromCart(item.id)">×</button>
                </div>
              </div>
            </div>

            <!-- Section résumé de commande -->
            <div class="order-summary">
              <h2 class="summary-title">Order Summary</h2>
              
              <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${{ subtotal }}</span>
              </div>
              
              <!-- Remise code promo -->
              <div v-if="discount > 0" class="summary-row discount">
                <span class="summary-label">Discount ({{ discountPercentage }}%)</span>
                <span class="summary-value">-${{ discount }}</span>
              </div>
              
              <div class="summary-row">
                <span class="summary-label">Delivery Fee</span>
                <span class="summary-value">${{ deliveryFee }}</span>
              </div>
              
              <div class="summary-row total">
                <span class="summary-label">Total</span>
                <span class="summary-value">${{ total }}</span>
              </div>

              <!-- Code promo -->
              <div class="promo-section">
                <div class="promo-input">
                  <input 
                    type="text" 
                    v-model="promoCode" 
                    placeholder="Add promo code"
                    @keyup.enter="applyPromoCode"
                  >
                  <button class="apply-btn" @click="applyPromoCode">Apply</button>
                </div>
                <p v-if="promoMessage" class="promo-message" :class="{ error: isPromoError }">
                  {{ promoMessage }}
                </p>
              </div>

              <button class="checkout-btn">
                Go to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const cart = ref([]);
const promoCode = ref("");
const promoMessage = ref("");
const isPromoError = ref(false);
const appliedPromoCode = ref("");

const deliveryFee = 15;
const router = useRouter();

const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  cart.value = savedCart ? JSON.parse(savedCart) : [];
};

const subtotal = computed(() => {
return (cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2);
});

const discountPercentage = computed(() => {
  return appliedPromoCode.value === "EFREI" ? 10 : 0;
});

const discount = computed(() => {
  if (appliedPromoCode.value === "EFREI") {
    return Math.round(subtotal.value * 0.10);
  }
  return 0;
});

const total = computed(() => {
  return subtotal.value - discount.value + deliveryFee;
});

const incrementQuantity = (productId) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    item.quantity++;
    saveCart();
    updateCartEvent();
  }
};

const decrementQuantity = (productId) => {
  const item = cart.value.find(item => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
    saveCart();
    updateCartEvent();
  } else if (item && item.quantity === 1) {
    removeFromCart(productId);
  }
};

const removeFromCart = (productId) => {
  const index = cart.value.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.value.splice(index, 1);
    saveCart();
    updateCartEvent();
  }
};

const updateCartEvent = () => {
  const event = new CustomEvent('cart-updated', {
    detail: { 
      cartLength: cart.value.reduce((total, item) => total + item.quantity, 0)
    }
  });
  window.dispatchEvent(event);
};

const applyPromoCode = () => {
  const code = promoCode.value.trim().toUpperCase();
  
  if (code === "") {
    promoMessage.value = "Please enter a promo code";
    isPromoError.value = true;
    return;
  }
  
  if (code === "EFREI") {
    appliedPromoCode.value = code;
    promoMessage.value = "Promo code applied! 10% discount";
    isPromoError.value = false;
  } else {
    promoMessage.value = "Invalid promo code";
    isPromoError.value = true;
    appliedPromoCode.value = "";
  }
  
  setTimeout(() => {
    promoMessage.value = "";
  }, 3000);
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

onMounted(() => {
  loadCart();
  
  
  
  
  updateCartEvent();
});

watch(cart, () => {
  updateCartEvent();
}, { deep: true });
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.cart-container {
  flex: 1;
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.cart-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-title {
  text-align: center;
  margin-bottom: 40px;
}

.cart-title h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  letter-spacing: 1px;
  margin: 0;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #2c3e50;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.continue-shopping-btn:hover {
  background-color: #34495e;
}

.horizontal {
  display: flex;
  gap: 80px;
  flex-wrap: wrap;
}

.liste {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 500px;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  gap: 20px;
}

.cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.item-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
}

.remove-btn-mobile {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #e74c3c;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.item-details-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
}

.item-details {
  font-size: 15px;
  color: #666;
  margin: 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.qty-btn:hover:not(:disabled) {
  background-color: #f5f5f5;
  border-color: #999;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-size: 16px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.item-price {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  min-width: 120px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #e74c3c;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

.item-price-mobile {
  display: none;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.order-summary {
  flex: 1;
  background: #fafafa;
  border-radius: 12px;
  padding: 30px;
  min-width: 350px;
  max-width: 400px;
}

.summary-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.summary-row:last-of-type:not(.total) {
  border-bottom: none;
}

.summary-label {
  font-size: 16px;
  color: #666;
}

.summary-value {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.summary-row.discount .summary-value {
  color: #e74c3c;
}

.summary-row.total {
  border-top: 2px solid #333;
  border-bottom: none;
  margin-top: 20px;
  padding-top: 20px;
  font-size: 18px;
}

.summary-row.total .summary-label {
  font-weight: 700;
  color: #333;
  font-size: 18px;
}

.summary-row.total .summary-value {
  font-weight: 700;
  color: #333;
  font-size: 22px;
}

.promo-section {
  margin-top: 30px;
}

.promo-input {
  display: flex;
  gap: 10px;
}

.promo-input input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.promo-input input:focus {
  border-color: #3498db;
}

.apply-btn {
  padding: 12px 24px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apply-btn:hover {
  background-color: #444;
}

.promo-message {
  margin-top: 8px;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
}

.promo-message:not(.error) {
  color: #27ae60;
  background-color: rgba(39, 174, 96, 0.1);
}

.promo-message.error {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.checkout-btn:hover {
  background-color: #34495e;
}

/* Responsive */
@media (max-width: 1200px) {
  .cart-container {
    padding: 30px 15px;
  }
  
  .cart-content {
    padding: 30px;
    max-width: 100%;
  }
}

@media (max-width: 992px) {
  .horizontal {
    flex-direction: column;
    gap: 40px;
  }
  
  .liste {
    min-width: 100%;
  }
  
  .order-summary {
    max-width: 100%;
  }
  
  .cart-content {
    padding: 20px;
  }
  
  .cart-title h1 {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .cart-item {
    position: relative;
    padding-right: 40px;
  }
  
  .item-price {
    display: none;
  }
  
  .item-price-mobile {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  
  .remove-btn {
    display: none;
  }
  
  .remove-btn-mobile {
    display: block;
  }
  
  .item-details-grid {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .quantity-control {
    margin-top: 0;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 576px) {
  .promo-input {
    flex-direction: column;
  }
  
  .apply-btn {
    width: 100%;
  }
  
  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .remove-btn-mobile {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>