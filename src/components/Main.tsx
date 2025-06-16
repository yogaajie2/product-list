import IconAddToCart from "../assets/images/icon-add-to-cart.svg?react";
import IconCarbonNeutral from "../assets/images/icon-carbon-neutral.svg?react";
import IconDecrementQuantity from "../assets/images/icon-decrement-quantity.svg?react";
import IconIncrementQuantity from "../assets/images/icon-increment-quantity.svg?react";
import IconOrderConfirmed from "../assets/images/icon-order-confirmed.svg?react";
import IconRemoveItem from "../assets/images/icon-remove-item.svg?react";
import IllustrationEmptyCart from "../assets/images/illustration-empty-cart.svg?react";
import data from "../content/products/data.json";

const Main = () => {
  return (
    <main class="bg-rose-50 py-8 text-rose-900">
      <div class="container flex w-full flex-col lg:flex-row lg:gap-6">
        <section class="lg:w-2/3">
          <header>
            <h1 class="text-5xl font-bold">Desserts</h1>
          </header>

          <section class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((product, index) => (
              <div>
                <div
                  class={`relative h-[20vh] w-full rounded-xl border-2 bg-rose-400 lg:h-[25vh] ${index === 1 ? "border-red" : "border-transparent"}`}
                >
                  {index === 1 ? (
                    <button
                      class="absolute -bottom-6 left-1/2 flex min-w-[60%] -translate-x-1/2 items-center justify-between gap-2 rounded-full bg-red px-2 py-3 text-xs text-white transition-colors"
                      type="button"
                    >
                      <div class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red">
                        <IconDecrementQuantity stroke="currentColor" />
                      </div>
                      1
                      <div class="flex h-5 w-5 items-center justify-center rounded-full border border-white p-1 transition-colors hover:bg-white hover:text-red">
                        <IconIncrementQuantity stroke="currentColor" />
                      </div>
                    </button>
                  ) : (
                    <button
                      class="absolute -bottom-6 left-1/2 flex min-w-[60%] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-rose-500 bg-white py-3 font-semibold transition-colors hover:border-red hover:text-red"
                      type="button"
                    >
                      <IconAddToCart />
                      Add to Cart
                    </button>
                  )}
                </div>

                <div class="mt-12 flex flex-col gap-1">
                  <p class="text-sm text-rose-400">{product.category}</p>
                  <p class="font-semibold">{product.name}</p>
                  <p class="price font-semibold text-red">${product.price}</p>
                </div>
              </div>
            ))}
          </section>
        </section>

        <section class="mt-8 rounded-xl bg-white p-6 lg:mt-0 lg:h-fit lg:w-1/3">
          <p class="text-3xl font-bold text-red">Your Cart (1)</p>

          {/* <div class="mt-12 flex flex-col items-center gap-6">
            <IllustrationEmptyCart />

            <p class="text-sm font-bold text-rose-400">
              Your added items will appear here
            </p>
          </div> */}

          <div class="mt-4">
            <div class="relative border-b border-rose-100 py-4">
              <p class="font-semibold">Classic Tiramisu</p>

              <div class="mt-2 flex items-center">
                <p class="font-semibold text-red">1x</p>
                <p class="ml-4 text-rose-400">@ $5.5</p>
                <p class="ml-2 font-semibold text-rose-500">$5.5</p>
              </div>

              <button
                class="absolute top-1/2 right-0 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-rose-400 p-1 text-rose-400 transition-colors hover:border-rose-900 hover:text-rose-900"
                type="button"
              >
                <IconRemoveItem stroke="currentColor" />
              </button>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-between">
            <p>Order Total</p>
            <p class="text-2xl font-bold">$46.5</p>
          </div>

          <div class="mt-8 flex w-full items-center gap-4 rounded-xl bg-rose-50 p-4 text-center">
            <IconCarbonNeutral />

            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button
            class="mt-8 flex w-full justify-center rounded-full bg-red py-4 text-white transition hover:saturate-[0.75]"
            type="button"
          >
            Confirm Order
          </button>
        </section>

        {/* <section
          class="fixed top-0 left-0 flex h-screen w-screen items-end bg-black/50 pt-40 backdrop-opacity-25 md:items-center md:justify-center md:pt-0"
        >
          <div class="rounded-xl bg-white px-6 py-8">
            <header>
              <IconOrderConfirmed />
              <p class="mt-6 text-5xl font-bold">Order Confirmed</p>
              <p class="mt-4 text-rose-400">We hope you enjoy your food!</p>
            </header>

            <div class="mt-8 rounded-xl bg-rose-50 p-6 lg:min-w-[40vw]">
              <div
                class="relative flex items-center border-b border-rose-100 py-4 first:pt-0"
              >
                <div class="relative h-14 w-14 rounded bg-rose-400"></div>

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
                type="button"
              >
                Confirm Order
              </button>
            </footer>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default Main;
