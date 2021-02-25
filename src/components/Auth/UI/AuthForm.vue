<template>
  <FormulateForm
    v-slot="{ hasErrors }"
    class="flex flex-col items-center content-center justify-center h-full px-5 py-12 bg-white py-14"
    :name="formName"
    @submit="submitHandler"
  >
    <slot name="header"></slot>
    <div class="w-full my-3">
      <FormulateInput
        v-for="(item, index) in inputs"
        :key="index"
        input-class="formulate-textfield"
        :name="item.name"
        :validation="item.rules"
        :placeholder="item.placeholder"
        :type="item.type || 'text'"
        input-is-valid-class="is-valid"
        input-has-errors-class="has-error"
        :validation-rules="item.validationRule"
        :validation-messages="item.validationMessage"
        error-behavior="value"
      />
    </div>
    <slot
      name="submit"
      :hasErrors="hasErrors"
      class="formulate-formbutton"
    ></slot>
    <slot></slot>
  </FormulateForm>
</template>

<script>
export default {
  props: {
    inputs: {
      type: Array,
      default: () => [
        { name: 'email', rules: 'required|email', placeholder: 'Email' },
        {
          name: 'password',
          rules: 'required',
          placeholder: 'Password',
          type: 'password',
        },
      ],
    },
    formName: {
      type: String,
      default: '',
    },
    submitHandler: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-input::v-deep {
  .formulate-input-wrapper {
    .formulate-input-element {
      input[type='text'],
      input[type='password'] {
        @apply w-full p-3 mt-2 mb-0 rounded-md bg-gray-50;

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
    }
  }

  .formulate-input-errors {
    .formulate-input-error {
      @apply text-xs text-red-500;
    }
  }
}
</style>
