<script lang="ts" setup>
import type UserComponent from "./UserComponent.vue"

// Ссылка на окно
const modalRef = shallowRef<InstanceType<typeof UserComponent> | undefined>()

// Статус отображения окна
const isModalVisible = ref(false)

// Открыть окно
const open = async () => {
  isModalVisible.value = true
  await nextTick()
  modalRef.value?.open()
}

// Закрыть окно
const close = () => {
  isModalVisible.value = false
}
</script>

<template>
  <!-- Открытие окна -->
  <section>
    <div class="m-auto flex h-screen flex-col items-center justify-center gap-3">
      <h1>Родительский компонент</h1>
      <button class="btn" @click="open">Открыть окно</button>
    </div>
  </section>

  <!-- Модальные окна -->
  <section>
    <UserComponent v-if="isModalVisible" ref="modalRef" @closed="close" />
  </section>
</template>
