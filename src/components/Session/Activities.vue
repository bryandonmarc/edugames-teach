<template>
  <main class="flex-1 px-10 py-2 overflow-y-auto bg-gray-200">
    <FormulateForm
      v-slot="{ hasErrors }"
      v-model="formData"
      @submit="submitHandler"
    >
      <div
        class="flex flex-col mx-auto mt-3 text-3xl capitalize"
        style="max-width: 80rem"
      >
        <span class="font-semibold">Create Activity</span>
        <div class="grid grid-cols-6 gap-12 mt-4">
          <div class="col-span-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="topic"
            >
              <span>Activity Code</span>
            </label>
            <div class="flex">
              <FormulateInput
                name="activityId"
                type="text"
                class="w-full text-base"
                validation="required"
                validation-name="Activity Id"
                input-class="activity-code"
                readonly
              />
              <button
                type="button"
                class="p-2 px-8 font-bold text-white uppercase bg-purple-500 rounded-r-lg focus:outline-none active:outline-none"
                @click="generateCode"
              >
                <Refresh
                  class="w-6 h-6 duration-1000 transform-gpu"
                  :class="[toggleGenerateCode ? 'rotate-180' : '-rotate-180']"
                />
              </button>
            </div>
          </div>
          <div class="col-span-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="startTime"
            >
              <span>Start Time</span>
            </label>
            <div class="flex">
              <FormulateInput
                name="startTime"
                type="datetime-local"
                class="w-full text-base"
                :validation="'required' + '|' + 'after:' + getToday()"
                validation-name="Start time"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="endTime"
            >
              <span>End Time</span>
            </label>
            <div class="flex">
              <FormulateInput
                name="endTime"
                type="datetime-local"
                class="w-full text-base"
                :validation="'required' + '|' + 'after:' + getToday()"
                validation-name="End time"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="activityName"
            >
              <span>Activity Name</span>
            </label>
            <div class="flex">
              <FormulateInput
                name="activityName"
                type="text"
                class="w-full text-base"
                validation="required"
                validation-name="Activity name"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="activityTopic"
            >
              <span>Activity Topic</span>
            </label>
            <div class="flex">
              <FormulateInput
                name="activityTopic"
                type="text"
                class="w-full text-base"
                validation="required"
                validation-name="Activity topic"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="py-6 mx-auto sm:px-6 lg:px-8" style="max-width: 80rem">
        <FormulateInput
          v-slot="{ index }"
          validation="min:1,length"
          type="group"
          :repeatable="true"
          name="questions"
          add-label="+ Add Question"
          :minimum="1"
          class="py-6 mx-auto sm:px-6 lg:px-8"
          style="max-width: 80rem"
        >
          <div
            class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
          >
            <div class="grid grid-rows-2 md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium text-gray-900">
                  Question {{ index + 1 }}
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  {{
                    formData.questions
                      ? formData.questions[index]
                        ? formData.questions[index].question
                          ? formData.questions[index].question
                          : 'Create your question!'
                        : 'Create your question!'
                      : 'Create your question!'
                  }}
                </p>
              </div>
              <div class="px-4 sm:px-0">
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="scoreWeight"
                >
                  <span>Score Weight</span>
                </label>
                <FormulateInput
                  class="w-24"
                  name="scoreWeight"
                  type="number"
                  validation="required|min:1,value|number"
                  validation-name="Score weight"
                />
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="px-4 py-5">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="question"
                    >
                      <span>Question</span>
                    </label>
                    <FormulateInput
                      name="question"
                      placeholder="How many legs does a cat have?"
                      type="text"
                      validation="required"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="choices"
                    >
                      <span>Choices</span>
                    </label>
                    <FormulateInput
                      validation="min:4,length|max:4,length"
                      group-repeatable-remove-class="choices-remove"
                      group-add-more="choices-add"
                      type="group"
                      :repeatable="true"
                      name="choices"
                      add-label=" "
                      :minimum="4"
                      :limit="4"
                    >
                      <FormulateInput
                        name="choice"
                        placeholder="Choice"
                        type="text"
                        validation="required"
                      />
                    </FormulateInput>
                  </div>
                  <div
                    class="col-span-6 sm:col-span-4"
                    :class="{ hidden: !getChoices(index).length }"
                  >
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="answer"
                    >
                      <span>Correct</span>
                    </label>
                    <FormulateInput
                      name="answer"
                      placeholder="Choose a correct answer"
                      :options="getChoices(index)"
                      type="select"
                      validation="required"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormulateInput>

        <button class="formulate-button" type="submit" :disabled="hasErrors">
          <Spinner v-if="loading" />
          <span v-else>Create</span>
        </button>
      </div>
      <!-- <pre>{{ formData }}</pre> -->
    </FormulateForm>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { haikunator } from '~/assets/js/shortHaikunator'
import Spinner from '~/assets/svg/spinner.svg?inline'
import Refresh from '~/assets/svg/refresh.svg?inline'

export default {
  components: {
    Spinner,
    Refresh,
  },
  data() {
    return {
      formData: {
        activityId: '',
        startTime: new Date(),
        endTime: new Date(),
      },
      loading: false,
      toggleGenerateCode: false,
    }
  },
  computed: {
    ...mapGetters('activity', ['getActivitiesBySessionId']),
    getActivities() {
      return this.getActivitiesBySessionId(this.$route.params.id)
    },
  },
  beforeMount() {
    this.generateCode()
  },
  methods: {
    ...mapActions('question', ['createActivityWithQuestions']),
    async submitHandler(data) {
      try {
        this.loading = true
        const formData = data
        formData.questions = formData.questions.map((question) => {
          question.choices = question.choices.map(({ choice }) => choice)
          return question
        })
        formData.sessionId = this.$route.params.id
        formData.startTime = new Date(formData.startTime)
        formData.endTime = new Date(formData.endTime)
        console.log(formData)
        await this.createActivityWithQuestions(formData)
        this.$toast.success('Your activity has been successfully created!')
        this.$emit('success')
      } catch (error) {
        this.$toast.error('An error occured. ' + error)
      }
      this.loading = false
    },
    getChoices(index) {
      if (
        this.formData.questions &&
        this.formData.questions[index] &&
        this.formData.questions[index].choices &&
        this.formData.questions[index].choices.length
      ) {
        return this.formData.questions[index].choices
          .map(({ choice }) => choice)
          .filter((choice) => choice != null)
      }
      return []
    },
    getToday() {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      const yyyy = today.getFullYear()

      return mm + '/' + dd + '/' + yyyy
    },
    generateCode() {
      let activityId = haikunator.haikunate()
      while (
        activityId.includes('69') ||
        activityId.includes('420') ||
        activityId.includes('1337') ||
        activityId.includes('616') ||
        activityId.includes('666')
      ) {
        let adjective = ''
        let noun = ''
        let number
        ;[adjective, noun, number] = activityId.split('-')
        number = (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1)
        activityId = [adjective, noun, number].join('-')
      }

      this.formData.activityId = activityId
      this.toggleGenerateCode = !this.toggleGenerateCode
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-input::v-deep {
  .formulate-input-wrapper {
    .formulate-input-element {
      input[type='text'],
      input[type='number'],
      input[type='datetime-local'],
      select {
        @apply w-full py-2 px-1 mt-2 rounded-md bg-gray-50;

        &:focus,
        &:active {
          @apply mb-1 border-2 border-purple-400 outline-none ring-4 ring-purple-300 ring-opacity-50;
        }

        &.has-error {
          @apply mb-1 border-2 border-red-400 ring-4 ring-red-300 ring-opacity-50;
        }

        &.is-valid {
          @apply mb-1 border-2 border-green-400 ring-4 ring-green-300 ring-opacity-50;
        }
      }

      .activity-code {
        margin: 0 !important;
        border-right-width: 0 !important;
        padding: 0.5rem !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;

        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;

        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000) !important;
      }

      .formulate-input-grouping {
        .formulate-input-group-repeatable {
          .choices-remove {
            @apply hidden;
          }
        }
      }

      .choices-add {
        @apply hidden;
      }
    }
  }

  .formulate-input-errors {
    .formulate-input-error {
      @apply text-xs text-red-500;
    }
  }
}

button.formulate-button {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500 text-white outline-none;

  &:disabled {
    @apply font-bold bg-gray-400 opacity-50 pointer-events-none select-none;
  }
}
</style>
