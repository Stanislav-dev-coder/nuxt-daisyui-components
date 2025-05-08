<script lang="ts" setup>
import type { ButtonConfig } from "~/types/buttons"
import type ModalWrapper from "./ModalWrapper.vue"
import type { HotkeysConfig } from "~/types/hotkeys"

// Ссылка на окно
const modalRef = shallowRef<InstanceType<typeof ModalWrapper> | undefined>()

// Введенный текст
const userText = ref("😃🦆🐶🚌❤️")

// Открыть окно
const open = () => modalRef.value?.open()

// Закрыть окно
const close = () => modalRef.value?.close()

// Кнопки окна
const modalButtons = computed<ButtonConfig[]>(() => [
  {
    label: "Отправить",
    type: "success",
    image: "add-alt",
    action: () => (userText.value = "Sended"),
    keyTrigger: "Enter",
  },
  {
    label: "Отмена",
    type: "error",
    image: "close-outline",
    action: close,
  },
])

// Подсказки окна
const modalHints: HotkeysConfig[] = [
  { kbd: "Esc", text: "закрыть", action: close },
  { kbd: "Enter", text: "отправить", action: () => (userText.value = "Sended") },
  { kbd: "Ctrl + Shift + l", text: "очистить", action: () => (userText.value = "") },
]

onUnmounted(() => {})

defineExpose({
  open,
})
</script>

<template>
  <ModalWrapper
    ref="modalRef"
    title="Заголовок окна"
    :hotkeys="modalHints"
    :buttons="modalButtons"
    @close="close">
    <template #body>
      <section class="flex h-32 flex-col gap-6 overflow-auto">
        <h1 class="text-lg">Пользовательский компонент</h1>
        <p>
          {{ userText }}
        </p>
        <input v-model="userText" class="input" type="text" />
        <button class="btn btn-warning" @click="close">
          Закрыть из пользовательского компонента
        </button>
      </section>
    </template>
  </ModalWrapper>
</template>
