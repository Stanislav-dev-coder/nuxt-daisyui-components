<script lang="ts" setup>
import ModalWrapper from "./ModalWrapper.vue"

// Ссылка на окно
const modalRef = shallowRef<InstanceType<typeof ModalWrapper> | undefined>()

// Введенный текст
const userText = ref("😃🦆🐶🚌❤️")

// Открыть окно
const open = () => modalRef.value?.open()

defineExpose({
  open,
})
</script>

<template>
  <ModalWrapper ref="modalRef" @close="$emit('closed')">
    <template #body>
      <section class="flex h-32 flex-col gap-6 overflow-auto">
        <h1 class="text-lg">Пользовательский компонент</h1>
        <p>
          {{ userText }}
        </p>
        <!-- <input v-model="userText" class="" type="text" /> -->
        <button class="btn btn-warning" @click="$emit('closed')">
          Закрыть из пользовательского компонента
        </button>
      </section>
    </template>
  </ModalWrapper>
</template>
