<script lang="ts" setup>
// События
const emit = defineEmits(["close", "closed"])

// Ссылка на окно
const modalRef = shallowRef<HTMLDialogElement | undefined>()

// Ссылка на карточку
const cardRef = ref<HTMLDivElement | undefined>()

// Определение мобильного режима
const isMobile = useMediaQuery("(max-width: 767px)")

// Открыть окно
const open = () => {
  modalRef.value?.showModal()
}

// Запретить прокрутку
onMounted(() => {
  document.body.classList.add("overflow-hidden")
  document.documentElement.classList.add("no-refresh")
  document.body.classList.add("no-refresh")
})

// Разрешить прокрутку
onUnmounted(() => {
  document.body.classList.remove("overflow-hidden")
  document.documentElement.classList.remove("no-refresh")
  document.body.classList.remove("no-refresh")
})

// Свайп для закрытия в мобильной версии
const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeToClose({
  cardRef,
  modalRef,
  isMobile,
  closeDialog: () => emit("closed"),
})

defineExpose({
  open,
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="modalRef"
      class="modal modal-bottom md:modal-middle"
      @close="$emit('closed')"
      @click.self="!isMobile && $emit('closed')">
      <div
        ref="cardRef"
        class="modal-box gap-0 bg-base-100 p-0 md:rounded-xl md:border-2 md:border-primary">
        <!-- Заголовок -->
        <header
          class=""
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend.passive="onTouchEnd">
          <div>
            <div class="pt-3 md:p-0">
              <div class="mx-auto h-1 w-12 rounded-full bg-gray-300 md:hidden" />
            </div>
            <div class="flex items-center justify-between gap-6 p-3 md:p-6">
              <h2 class="text-lg font-bold md:text-xl">Заголовок окна</h2>

              <!-- Иконка закрытия -->
              <button
                class="btn btn-circle btn-error btn-sm md:btn-xs md:block"
                @click="$emit('closed')">
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
          <button class="btn btn-error md:btn-sm" @click="$emit('closed')">
            <Icon name="carbon:close-outline" size="18" />
            Закрыть
          </button>
        </footer>

        <!-- Разделитель -->
        <div class="m-0 hidden border-b border-primary p-0 md:block" />

        <!-- Подсказки -->
        <section class="hidden justify-between bg-neutral/5 px-3 py-1 md:flex">
          <div class="cursor-pointer select-none text-xs text-base-content/50">
            <span class="font-bold">Escape</span>
            <span> - закрыть</span>
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
