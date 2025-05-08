<script lang="ts" setup>
import type { ButtonConfig } from "~/types/buttons"
import type { HotkeysConfig } from "~/types/hotkeys"

// Пропсы компонента
const props = defineProps<{
  title: string
  hotkeys?: HotkeysConfig[]
  buttons?: ButtonConfig[]
}>()

// События
const emit = defineEmits(["close", "closed"])

// Ссылка на окно
const modalRef = shallowRef<HTMLDialogElement | undefined>()

// Ссылка на тело
const bodyRef = ref<HTMLDivElement | undefined>()

// Мобильный режим
const isMobile = useMediaQuery("(max-width: 767px)")

// Кнопки
const keys = useMagicKeys()

// Обработка горячих клавиш
props.hotkeys?.forEach((hint) => {
  const keyCombination = keys[hint.kbd]

  watch(keyCombination, (value) => {
    if (value) {
      console.log(`${hint.kbd} have been pressed`)
      hint.action()
    }
  })
})

// Открыть окно
const open = () => {
  modalRef.value?.showModal()
}

// Закрыть окно
const close = () => {
  emit("closed")
}

// Свайп для закрытия в мобильной версии
const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeToClose({
  cardRef: bodyRef,
  modalRef,
  isMobile,
  closeDialog: () => emit("closed"),
})

onMounted(() => {
  // Запретить прокрутку
  document.body.classList.add("overflow-hidden")

  // Запретить обновление
  document.documentElement.classList.add("no-refresh")
  document.body.classList.add("no-refresh")
})

onUnmounted(() => {
  // Разрешить прокрутку
  document.body.classList.remove("overflow-hidden")

  // Разрешить обновление
  document.documentElement.classList.remove("no-refresh")
  document.body.classList.remove("no-refresh")
})

defineExpose({
  open,
  close,
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="modalRef"
      class="modal modal-bottom md:modal-middle"
      @close="close"
      @click.self="!isMobile && close()">
      <div
        ref="bodyRef"
        class="modal-box gap-0 bg-base-100 p-0 md:rounded-xl md:border-2 md:border-primary">
        <!-- Шапка -->
        <header
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend.passive="onTouchEnd">
          <div>
            <!-- Тянуть -->
            <div class="pt-3 md:p-0">
              <div class="mx-auto h-1 w-12 rounded-full bg-gray-300 md:hidden" />
            </div>

            <!-- Заголовок -->
            <div class="flex items-center justify-between gap-6 p-3 md:p-6">
              <h2 class="text-lg font-bold md:text-xl">{{ title }}</h2>

              <button
                class="btn btn-circle btn-error btn-sm md:btn-xs md:block"
                @click="close">
                <Icon name="carbon:close" size="18" />
              </button>
            </div>
          </div>
        </header>

        <!-- Тело -->
        <main class="flex flex-col gap-3 px-3 md:px-6">
          <h3 class="font-bold">Заголовок тела</h3>
          <slot name="body" />
        </main>

        <!-- Разделитель -->
        <div class="m-0 border-b border-dashed border-primary/30 p-0 pt-3 md:pt-6" />

        <!-- Управление -->
        <footer class="grid grid-cols-2 gap-3 p-3">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            :class="['btn md:btn-sm', button.type ? `btn-${button.type}` : '']"
            @click="button.action">
            <Icon :name="'carbon:' + button.image" size="18" />
            {{ button.label }}
          </button>
        </footer>

        <!-- Разделитель -->
        <div class="m-0 hidden border-b border-primary p-0 md:block" />

        <!-- Подсказки -->
        <section class="hidden justify-between bg-neutral/5 px-3 py-1 md:flex">
          <div
            v-for="(hint, index) in hotkeys"
            :key="index"
            class="cursor-pointer select-none text-xs text-base-content/50"
            :class="index % 2 === 1 ? 'text-right' : ''"
            @click="hint.action">
            <span class="kbd">{{ hint.kbd }}</span>
            <span> - {{ hint.text }}</span>
          </div>
        </section>
      </div>
    </dialog>
  </Teleport>
</template>

<style>
.no-refresh {
  overscroll-behavior-y: contain;
  touch-action: pan-x pan-y;
}
</style>
