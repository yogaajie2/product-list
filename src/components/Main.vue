<script setup lang="ts">
import { ref } from "vue";
import Cart from "./Cart.vue";
import OrderConfirmation from "./OrderConfirmation.vue";
import Product from "./Product.vue";
import data from "../content/products/data.json";
import type { CartItem } from "../types";

type Cart = CartItem[];
const cart = ref<Cart>([]);
const isOrderConfirmationShown = ref(false);

function startNewOrder() {
  cart.value = [];
  isOrderConfirmationShown.value = false;
}

function updateCart(item: CartItem, operation: "add" | "decrease" | "remove") {
  const index = cart.value.findIndex((cartItem) => cartItem.name === item.name);

  switch (operation) {
    case "add":
      if (index !== -1) {
        cart.value[index].quantity++;
      } else {
        cart.value.push(item);
      }

      break;

    case "decrease":
      if (index !== -1) {
        if (cart.value[index].quantity === 1) {
          cart.value = cart.value.filter(
            (cartItem) => cartItem.name !== item.name,
          );
        } else {
          cart.value[index].quantity--;
        }
      }

      break;

    case "remove":
      cart.value = cart.value.filter((cartItem) => cartItem.name !== item.name);
      break;

    default:
      break;
  }
}
</script>

<template>
  <main class="bg-rose-50 py-8 text-rose-900">
    <div class="container flex w-full flex-col lg:flex-row lg:gap-6">
      <section class="lg:w-2/3">
        <header>
          <h1 class="text-5xl font-bold">Desserts</h1>
        </header>

        <section class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Product
            v-for="(product, index) in data"
            :cart="cart"
            :index="index"
            :key="index"
            :product="product"
            @update-cart="updateCart"
          />
        </section>
      </section>

      <Cart
        :items="cart"
        @update-cart="updateCart"
        @confirm-order="isOrderConfirmationShown = true"
      />

      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <OrderConfirmation
          v-if="isOrderConfirmationShown"
          :cart="cart"
          @start-new-order="startNewOrder"
        />
      </Transition>
    </div>
  </main>
</template>
