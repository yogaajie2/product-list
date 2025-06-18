<script setup lang="ts">
import { ref } from "vue";
import Cart from "./Cart.vue";
import Product from "./Product.vue";
import IconOrderConfirmed from "../assets/images/icon-order-confirmed.svg?component";
import data from "../content/products/data.json";
import type { CartItem } from "../types";

type Cart = CartItem[];
const cart = ref<Cart>([]);

function addToCart(item: CartItem) {
  cart.value.push(item);
}

function removeFromCart(itemName: string) {
  cart.value = cart.value.filter((item) => item.name !== itemName);
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
            @add-to-cart="
              addToCart({
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            "
          />
        </section>
      </section>

      <Cart :items="cart" @remove-from-cart="removeFromCart" />

      <!-- <section
        class="fixed top-0 left-0 flex h-screen w-screen items-end bg-black/50 pt-40 backdrop-opacity-25 md:items-center md:justify-center md:pt-0">
        <div class="rounded-xl bg-white px-6 py-8">
          <header>
            <IconOrderConfirmed />
            <p class="mt-6 text-5xl font-bold">Order Confirmed</p>
            <p class="mt-4 text-rose-400">We hope you enjoy your food!</p>
          </header>

          <div class="mt-8 rounded-xl bg-rose-50 p-6 lg:min-w-[40vw]">
            <div class="relative flex items-center border-b border-rose-100 py-4 first:pt-0">
              <img class="h-14 w-14 rounded bg-rose-400" src="/images/image-tiramisu-thumbnail.jpg"
                alt="Classic Tiramisu" />

              <div class="ml-4">
                <p class="font-semibold">Classic Tiramisu</p>

                <div class="mt-2 flex items-center">
                  <p class="font-semibold text-red">1x</p>
                  <p class="ml-4 text-rose-400">@ $5.5</p>
                </div>
              </div>

              <p class="ml-auto text-lg font-bold">$5.5</p>
            </div>

            <div class="mt-8 flex items-center justify-between">
              <p>Order Total</p>
              <p class="text-2xl font-bold">$46.5</p>
            </div>
          </div>

          <footer>
            <button
              class="mt-8 flex w-full justify-center rounded-full bg-red py-4 text-white transition hover:saturate-[0.75]"
              type="button">
              Confirm Order
            </button>
          </footer>
        </div>
      </section> -->
    </div>
  </main>
</template>
