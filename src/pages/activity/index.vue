<template>
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col mt-3 text-3xl capitalize">
      <span class="font-semibold">Create Activity</span>
    </div>
    <!-- <div class="py-10 mx-auto sm:px-6 lg:px-8" style="max-width: 80rem">
      <FormulateForm v-slot="{ hasErrors }" @submit="submitHandler">
        <div>
          <div
            class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
          >
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium text-gray-900">Class Details</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Create your gamified virtual classroom!
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="px-4 py-5">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="className"
                    >
                      <span>Class Name</span>
                    </label>
                    <FormulateInput
                      name="className"
                      validation-name="Class Name"
                      type="text"
                      validation="required"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="topic"
                    >
                      <span>Topic</span>
                    </label>
                    <FormulateInput
                      name="topic"
                      type="text"
                      validation="required"
                    />
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-end px-4 py-3 text-right sm:px-6 sm:rounded-bl-md sm:rounded-br-md"
              >
                <button
                  class="formulate-button"
                  type="submit"
                  :disabled="hasErrors"
                >
                  <Spinner v-if="loading" />
                  <span v-else>Create</span>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden sm:block">
            <div class="py-8"><div class="border-t border-gray-200"></div></div>
          </div>
        </div>
      </FormulateForm>
    </div> -->
  </main>
</template>

<script>
import { mapActions } from 'vuex'
// import Spinner from '~/assets/svg/spinner.svg?inline'

export default {
  //   components: {
  //     Spinner,
  //   },
  layout(context) {
    return 'homeTeacherLayout'
  },
  data() {
    return {
      loading: false,
    }
  },
  //   async mounted() {
  //     await this.fetchSessions()
  //   },
  methods: {
    ...mapActions('activity', ['createActivity', 'fetchActivities']),
    async submitHandler(data) {
      try {
        this.loading = true
        await this.createSession(data)
        this.$toast.success(
          'Your virtual classroom has been successfully created!'
        )
      } catch (error) {
        this.$toast.error('An error occured. ' + error)
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
