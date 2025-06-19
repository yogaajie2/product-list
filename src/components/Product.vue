<script lang="ts" setup>
import { computed } from "vue";
import IconAddToCart from "../assets/images/icon-add-to-cart.svg?component";
import IconDecrementQuantity from "../assets/images/icon-decrement-quantity.svg?component";
import IconIncrementQuantity from "../assets/images/icon-increment-quantity.svg?component";
import type { CartItem } from "../types";
import formatter from "../utils/currencyFormatter";

const props = defineProps<{
  index: number;
  cart: CartItem[];

  product: {
    category: string;
    image: { desktop: string };
    name: string;
    price: number;
  };
}>();

const isItemInCart = computed(() => {
  return props.cart.some((item) => item.name === props.product.name);
});

const itemQuantity = computed(() => {
  const index = props.cart.findIndex(
    (item) => item.name === props.product.name,
  );

  return props.cart[index].quantity;
});
</script>

<template>
  <div>
    <div class="relative">
      <img
        class="h-[20vh] w-full rounded-xl border-2 object-cover transition-colors lg:h-[25vh]"
        :class="isItemInCart ? 'border-red' : 'border-transparent'"
        :alt="product.name"
        :src="product.image.desktop"
      />

      <button
        v-if="isItemInCart"
        class="absolute -bottom-6 left-1/2 flex min-h-[50px] min-w-[60%] -translate-x-1/2 items-center justify-between gap-2 rounded-full bg-red p-3 text-white transition-colors"
        type="button"
      >
        <div
          class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red"
          @click="
            $emit(
              'updateCart',

              {
                name: product.name,
                price: product.price,
                quantity: 1,
              },

              'decrease',
            )
          "
        >
          <IconDecrementQuantity stroke="currentColor" />
        </div>

        {{ itemQuantity }}

        <div
          class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red"
          @click="
            $emit(
              'updateCart',

              {
                name: product.name,
                price: product.price,
                quantity: 1,
              },

              'add',
            )
          "
        >
          <IconIncrementQuantity stroke="currentColor" />
        </div>
      </button>

      <button
        v-else
        class="absolute -bottom-6 left-1/2 flex min-h-[50px] min-w-[60%] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-rose-500 bg-white py-3 font-semibold transition-colors hover:border-red hover:text-red"
        type="button"
        @click="
          $emit(
            'updateCart',

            {
              name: product.name,
              price: product.price,
              quantity: 1,
            },

            'add',
          )
        "
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
