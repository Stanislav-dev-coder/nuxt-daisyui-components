<script lang="ts" setup>
import ModalWrapper from './ModalWrapper.vue';

</script>

<template>
  <!-- Modals -->
   <section>
    <ModalWrapper/>
   </section>
  <!-- Content -->
  <section >
    <div class="m-auto flex h-screen items-center justify-center flex-col gap-3">
    <h1 >Родительский компонент</h1>
    <button class="btn">Открыть окно</button>
    </div>
  </section>
</template>
