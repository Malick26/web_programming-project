<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" @click="close"></div>

    <div class="modale card">
      <div class="modale-header">
        <h2 class="product-title">{{ product.title }}</h2>
        <button class="btn-close" @click="close">×</button>
      </div>

      <div class="modale-content">
        <div class="product-image">
          <img :src="product.images[0]" :alt="product.title">
        </div>

        <div class="product-info">
          <div class="price-section">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <span class="category">Category {{ product.category_id }}</span>
          </div>

          <div class="description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-actions">
            <button class="btn-add-cart" @click="addToCart">
              🛒 Add to Cart
            </button>
            <button class="btn-buy" @click="buyNow">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import cartService from "../services/cartService.js"

const props = defineProps({
  revele: Boolean,
  product: Object
})

const emit = defineEmits(["close"])

function close() {
  emit("close")
}

function addToCart() {
  cartService.addToCart(props.product)
  alert(`${props.product.title} added to cart!`)
  close()
}

function buyNow() {
  cartService.addToCart(props.product)
  close()
  window.location.href = '/cart'
}
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
}

.modale {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  z-index: 2;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modale-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.product-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.btn-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.modale-content {
  padding: 24px;
}

.product-image {
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: #8b5cf6;
}

.category {
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #6b7280;
}

.description h3 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.description p {
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.product-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-add-cart,
.btn-buy {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.btn-add-cart {
  background: #8b5cf6;
  color: white;
}

.btn-add-cart:hover {
  background: #7c3aed;
  transform: translateY(-2px);
}

.btn-buy {
  background: #1f2937;
  color: white;
}

.btn-buy:hover {
  background: #111827;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 480px) {
  .product-actions {
    flex-direction: column;
  }
  
  .modale {
    width: 95%;
  }
  
  .product-image {
    height: 200px;
  }
}
</style>