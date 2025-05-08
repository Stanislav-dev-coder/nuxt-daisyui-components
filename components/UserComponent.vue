<script lang="ts" setup>
import ModalWrapper from "./ModalWrapper.vue"

// Ссылка на окно
const modalRef = shallowRef<InstanceType<typeof ModalWrapper> | undefined>()

// Введенный текст
const userText = ref("😃🦆🐶🚌❤️")

// Открыть окно
const open = () => modalRef.value?.open()

const close = () => modalRef.value?.close()

defineExpose({
  open,
  close,
})
</script>

<template>
  <ModalWrapper ref="modalRef" @close="$emit('closed')">
    <template #body>
      <section class="flex flex-col gap-6">
        <h1 class="text-lg">Пользовательский компонент</h1>
        <p>
          {{ userText }}
        </p>
        <input v-model="userText" class="input" type="text" />
        <button class="btn btn-warning" @click="$emit('closed')">
          Закрыть из пользовательского компонента
        </button>
      </section>
    </template>
  </ModalWrapper>
</template>
