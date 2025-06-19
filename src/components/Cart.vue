<script setup lang="ts">
import { computed } from "vue";
import IconCarbonNeutral from "../assets/images/icon-carbon-neutral.svg?component";
import IconRemoveItem from "../assets/images/icon-remove-item.svg?component";
import IllustrationEmptyCart from "../assets/images/illustration-empty-cart.svg?component";
import type { CartItem } from "../types";
import formatter from "../utils/currencyFormatter";

const props = defineProps<{
  items: CartItem[];
}>();

const orderTotal = computed(() => {
  return props.items.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0,
  );
});

function countItemTotal(price: number, quantity: number) {
  return formatter.format(price * quantity);
}
</script>

<template>
  <section class="mt-8 rounded-xl bg-white p-6 lg:mt-0 lg:h-fit lg:w-1/3">
    <p class="text-3xl font-bold text-red">Your Cart ({{ items.length }})</p>

    <section
      class="mt-12 flex flex-col items-center gap-6"
      v-if="!items.length"
    >
      <IllustrationEmptyCart />

      <p class="text-sm font-bold text-rose-400">
        Your added items will appear here
      </p>
    </section>

    <section class="mt-4" v-else>
      <div v-for="item in items">
        <div class="relative border-b border-rose-100 py-4">
          <p class="font-semibold">{{ item.name }}</p>

          <div class="mt-2 flex items-center">
            <p class="font-semibold text-red">{{ item.quantity }}x</p>

            <p class="ml-4 text-rose-400">
              @ {{ formatter.format(item.price) }}
            </p>

            <p class="ml-2 font-semibold text-rose-500">
              {{ countItemTotal(item.price, item.quantity) }}
            </p>
          </div>

          <button
            class="absolute top-1/2 right-0 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-rose-400 p-1 text-rose-400 transition-colors hover:border-rose-900 hover:text-rose-900"
            type="button"
            @click="
              $emit(
                'updateCart',

                {
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                },

                'remove',
              )
            "
          >
            <IconRemoveItem stroke="currentColor" />
          </button>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-between">
        <p>Order Total</p>
        <p class="text-2xl font-bold">{{ formatter.format(orderTotal) }}</p>
      </div>

      <div
        class="mt-8 flex w-full items-center gap-4 rounded-xl bg-rose-50 p-4 text-center"
      >
        <IconCarbonNeutral />

        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>

      <button
        class="mt-8 flex w-full justify-center rounded-full bg-red py-4 text-white transition hover:saturate-[0.75]"
        type="button"
      >
        Confirm Order
      </button>
    </section>
  </section>
</template>
