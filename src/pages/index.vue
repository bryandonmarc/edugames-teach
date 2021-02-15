<template>
  <div>
    <main class="bg-white font-montserrat">
      <header class="flex items-center h-24 sm:h-32">
        <div
          class="container flex items-center justify-between px-6 mx-auto sm:px-12"
        >
          <div class="flex items-center text-2xl font-bold text-black">
            <Logo class="w-6 h-6 mr-4" />
            eduGames Teach
          </div>
          <div class="flex items-center">
            <nav class="items-center hidden text-lg text-black lg:flex">
              <nuxt-link
                to="login"
                class="flex px-6 py-2 hover:text-purple-500"
              >
                Login
              </nuxt-link>
              <nuxt-link
                to="signup"
                class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-indigo-500 rounded-full shadow outline-none active:bg-indigo-600 hover:shadow-lg focus:outline-none"
                style="transition: all 0.15s ease"
              >
                Register
              </nuxt-link>
            </nav>
            <button class="flex flex-col lg:hidden">
              <span class="w-6 h-px mb-1 bg-gray-900"></span>
              <span class="w-6 h-px mb-1 bg-gray-900"></span>
              <span class="w-6 h-px mb-1 bg-gray-900"></span>
            </button>
          </div>
        </div>
      </header>
      <div
        class="container flex flex-col-reverse items-center px-6 mx-auto sm:px-12 sm:flex-row"
      >
        <div class="flex flex-col items-start mt-8 sm:w-2/5 sm:mt-0">
          <h1 class="mb-4 text-4xl leading-none lg:text-6xl">
            <strong class="font-black">Education System</strong> Reimagined.
          </h1>
          <p class="mb-4 lg:text-lg sm:mb-12">
            Experience a new way of learning for your students using this
            teaching companion service featuring gamified learning with a fun,
            interactive educational game!
          </p>
          <nuxt-link
            to="/signup"
            class="px-10 py-3 text-lg font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-400"
            >TRY NOW</nuxt-link
          >
        </div>
        <div class="sm:w-3/5">
          <Landing />
        </div>
      </div>
    </main>
    <div class="container px-6 pt-8 pb-20 mx-auto sm:pt-16">
      <div class="flex flex-col w-full mb-16 sm:flex-row sm:mb-32">
        <div class="relative sm:w-1/3">
          <span class="absolute top-0 left-0 text-6xl font-black text-gray-200"
            >1</span
          >
          <div class="relative z-10 flex flex-col mt-8 ml-6">
            <h4 class="font-bold leading-none text-gray-400 uppercase font-xs">
              Getting started
            </h4>
            <p class="mt-2 text-3xl leading-none text-gray-800">
              Lorem ipsum dolor
            </p>
            <a href="#" class="mt-2 text-purple-500">See more</a>
          </div>
        </div>
        <div class="relative sm:w-1/3">
          <span class="absolute top-0 left-0 text-6xl font-black text-gray-200"
            >2</span
          >
          <div class="relative z-10 flex flex-col mt-8 ml-6">
            <h4 class="font-bold leading-none text-gray-400 uppercase font-xs">
              Getting started
            </h4>
            <p class="mt-2 text-3xl leading-none text-gray-800">
              Lorem ipsum dolor
            </p>
            <a href="#" class="mt-2 text-purple-500">See more</a>
          </div>
        </div>
        <div class="relative sm:w-1/3">
          <span class="absolute top-0 left-0 text-6xl font-black text-gray-200"
            >3</span
          >
          <div class="relative z-10 flex flex-col mt-8 ml-6">
            <h4 class="font-bold leading-none text-gray-400 uppercase font-xs">
              Getting started
            </h4>
            <p class="mt-2 text-3xl leading-none text-gray-800">
              Lorem ipsum dolor
            </p>
            <a href="#" class="mt-2 text-purple-500">See more</a>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:px-12 sm:flex-row">
        <div class="sm:w-1/2 sm:pr-16">
          <img src="http://placehold.it/552x300" class="rounded-lg" />
        </div>
        <div class="pt-4 sm:w-1/2">
          <h3 class="mb-4 text-2xl text-gray-800">
            Lorem ipsum dolor sit amet.
          </h3>
          <p class="mb-4 text-lg leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            ipsum eu nunc commodo posuere et sit amet ligula.
          </p>
          <button
            class="px-8 py-2 mx-auto text-white bg-purple-600 rounded shadow-lg hover:bg-purple-500"
          >
            Action
          </button>
        </div>
      </div>
    </div>
    <div class="py-20 bg-gray-100">
      <div class="container flex flex-col items-center px-6 mx-auto">
        <h3 class="mb-4 text-4xl font-bold text-center text-gray-800">
          Lorem ipsum dolor sit amet
        </h3>
        <p class="mb-8 text-lg leading-relaxed text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          ipsum eu nunc commodo posuere et sit amet ligula.
        </p>
        <button
          class="px-8 py-3 mx-auto text-xl text-white bg-purple-600 rounded shadow-lg hover:bg-purple-500"
        >
          Action
        </button>
      </div>
    </div>
    <footer class="pt-16 bg-gray-800">
      <div class="container px-6 mx-auto">
        <div class="flex flex-col items-center justify-end sm:flex-row">
          <div class="sm:w-2/3">
            <h4
              class="text-3xl leading-tight text-center text-white sm:text-left"
            >
              Nulla mollis, odio ac imperdiet <br class="hidden sm:block" />
              aliquet, nulla
              <span class="font-bold underline">ante vulputate elit</span>
            </h4>
          </div>
          <div class="flex justify-end mt-12 sm:w-1/3 sm:mt-0">
            <button
              class="px-8 py-3 text-xl text-white bg-purple-600 rounded shadow-lg hover:bg-purple-500"
            >
              Contact us
            </button>
          </div>
        </div>
        <div
          class="flex justify-center py-10 mt-16 mb-8 border-t border-gray-700 sm:justify-end"
        >
          <a href="#" class="mx-2 text-white">Home</a>
          <a href="#" class="mx-2 text-white">Link1</a>
          <a href="#" class="mx-2 text-white">Link2</a>
          <a href="#" class="mx-2 text-white">Link3</a>
          <a href="#" class="mx-2 text-white">Link4</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Landing from '~/assets/svg/landing.svg?inline'
import Logo from '~/static/icon.svg?inline'

export default {
  components: { Landing, Logo },
}
</script>
