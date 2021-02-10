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

<style lang="postcss">
.formulate-textfield {
  @apply rounded-md mb-0 mt-2 w-full px-3 py-3 bg-gray-50;
}

.formulate-textfield:focus,
.formulate-textfield:active {
  @apply ring-4 ring-purple-300 ring-opacity-50 border-2 border-purple-400 mb-1 outline-none;
}

.formulate-textfield.is-valid {
  @apply ring-4 ring-green-300 ring-opacity-50 border-2 border-green-400 mb-1;
}

.formulate-textfield.has-error {
  @apply ring-4 ring-red-300 ring-opacity-50 border-2 border-red-400 mb-1;
}

.formulate-formbutton {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full;
}

.formulate-formbutton:disabled {
  @apply pointer-events-none select-none opacity-50 bg-gray-400 text-white font-bold;
}

.formulate-formbutton:not(.ghost):not(:disabled) {
  @apply bg-purple-600 text-white;
}

.formulate-input-error {
  @apply text-xs text-red-500;
}
</style>
