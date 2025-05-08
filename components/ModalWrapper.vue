<script lang="ts" setup>
// События
defineEmits(["close", "closed"])

// Ссылка на окно
const modalRef = shallowRef<HTMLDialogElement | undefined>()

// Открыть окно
const open = () => modalRef.value?.showModal()

const close = () => modalRef.value?.close()

defineExpose({
  open,
  close,
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="modalRef"
      class="modal modal-bottom sm:modal-middle"
      @close="$emit('closed')">
      <div class="modal-box flex flex-col gap-6">
        <header>
          <h1 class="text-xl font-bold">Обертка окна</h1>
        </header>
        <main class="flex flex-col gap-6">
          <slot name="body" />
        </main>
        <footer class="flex flex-row-reverse">
          <button class="btn btn-error" @click="$emit('closed')">Закрыть</button>
        </footer>
      </div>
    </dialog>
  </Teleport>
</template>
