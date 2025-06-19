<script setup lang="ts">
import { computed } from "vue";
import IconOrderConfirmed from "../assets/images/icon-order-confirmed.svg?component";
import data from "../content/products/data.json";
import type { CartItem } from "../types";
import formatter from "../utils/currencyFormatter";

const props = defineProps<{
  cart: CartItem[];
}>();

const orderTotal = computed(() => {
  return formatter.format(
    props.cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    ),
  );
});

function countItemTotal(price: number, quantity: number) {
  return formatter.format(price * quantity);
}

function getProductImage(name: string) {
  const index = data.findIndex((item) => item.name === name);
  return data[index].image.thumbnail;
}
</script>

<template>
  <section
    class="fixed top-0 left-0 z-20 flex h-screen w-screen items-end bg-black/50 pt-40 backdrop-opacity-25 md:items-center md:justify-center md:pt-0"
  >
    <div class="rounded-xl bg-white px-6 py-8">
      <header>
        <IconOrderConfirmed />
        <p class="mt-6 text-5xl font-bold">Order Confirmed</p>
        <p class="mt-4 text-rose-400">We hope you enjoy your food!</p>
      </header>

      <div class="mt-8 rounded-xl bg-rose-50 p-6 lg:min-w-[40vw]">
        <div class="h-[35vh] overflow-y-auto">
          <div
            v-for="item in cart"
            class="relative flex items-center border-b border-rose-100 py-4 first:pt-0"
          >
            <img
              class="h-14 w-14 rounded"
              :alt="item.name"
              :src="getProductImage(item.name)"
            />

            <div class="ml-4">
              <p class="font-semibold">{{ item.name }}</p>

              <div class="mt-2 flex items-center">
                <p class="font-semibold text-red">{{ item.quantity }}x</p>

                <p class="ml-4 text-rose-400">
                  @ {{ formatter.format(item.price) }}
                </p>
              </div>
            </div>

            <p class="ml-auto text-lg font-bold">
              {{ countItemTotal(item.price, item.quantity) }}
            </p>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-between">
          <p>Order Total</p>
          <p class="text-2xl font-bold">{{ orderTotal }}</p>
        </div>
      </div>

      <footer>
        <button
          class="mt-8 flex w-full justify-center rounded-full bg-red py-4 text-white transition hover:saturate-[0.75]"
          type="button"
          @click="$emit('startNewOrder')"
        >
          Start New Order
        </button>
      </footer>
    </div>
  </section>
</template>
