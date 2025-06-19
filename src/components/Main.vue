<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import Cart from "./Cart.vue";
import OrderConfirmation from "./OrderConfirmation.vue";
import Product from "./Product.vue";
import data from "../content/products/data.json";
import type { CartItem } from "../types";

type Cart = CartItem[];
const cart = ref<Cart>([]);
const isCartShown = ref(false);
const isDesktop = ref(false);
const isOrderConfirmationShown = ref(false);
const shouldCartShow = computed(() => isDesktop.value || isCartShown.value);

onMounted(() => {
  const checkScreen = () => {
    isDesktop.value = window.innerWidth >= 1024; // Tailwind's lg breakpoint
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);
  onUnmounted(() => window.removeEventListener("resize", checkScreen));
});

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

      <button
        class="fixed bottom-4 left-1/2 z-10 flex w-1/2 -translate-x-1/2 justify-center rounded-full border-2 py-4 font-semibold shadow-xl transition hover:saturate-[0.75] lg:hidden"
        :class="
          isCartShown
            ? 'border-red bg-white text-red'
            : 'border-transparent bg-red text-white'
        "
        type="button"
        @click="isCartShown = !isCartShown"
      >
        {{ isCartShown ? "Hide Cart" : "Show Cart" }}
      </button>

      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <Cart
          v-if="shouldCartShow"
          :items="cart"
          @update-cart="updateCart"
          @confirm-order="
            {
              isCartShown = false;
              isOrderConfirmationShown = true;
            }
          "
        />
      </Transition>

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
