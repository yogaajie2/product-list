<script lang="ts" setup>
import IconAddToCart from "../assets/images/icon-add-to-cart.svg?component";
import IconDecrementQuantity from "../assets/images/icon-decrement-quantity.svg?component";
import IconIncrementQuantity from "../assets/images/icon-increment-quantity.svg?component";
import formatter from "../utils/currencyFormatter";

const props = defineProps<{
  index: number;

  product: {
    category: string;
    image: { desktop: string };
    name: string;
    price: number;
  };
}>();
</script>

<template>
  <div>
    <div class="relative">
      <img
        class="h-[20vh] w-full rounded-xl border-2 object-cover lg:h-[25vh]"
        :class="index === 1 ? 'border-red' : 'border-transparent'"
        :alt="product.name"
        :src="product.image.desktop"
      />

      <button
        v-if="index === 1"
        class="absolute -bottom-6 left-1/2 flex min-w-[60%] -translate-x-1/2 items-center justify-between gap-2 rounded-full bg-red px-2 py-3 text-sm text-white transition-colors"
        type="button"
      >
        <div
          class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red"
        >
          <IconDecrementQuantity stroke="currentColor" />
        </div>

        1

        <div
          class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red"
        >
          <IconIncrementQuantity stroke="currentColor" />
        </div>
      </button>

      <button
        v-else
        class="absolute -bottom-6 left-1/2 flex min-w-[60%] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-rose-500 bg-white py-3 font-semibold transition-colors hover:border-red hover:text-red"
        type="button"
        @click="$emit('addToCart')"
      >
        <IconAddToCart />
        Add to Cart
      </button>
    </div>

    <div class="mt-12 flex flex-col gap-1">
      <p class="text-sm text-rose-400">{{ product.category }}</p>
      <p class="font-semibold">{{ product.name }}</p>

      <p class="price font-semibold text-red">
        {{ formatter.format(product.price) }}
      </p>
    </div>
  </div>
</template>
