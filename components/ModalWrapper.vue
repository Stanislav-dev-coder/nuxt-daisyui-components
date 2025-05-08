<script lang="ts" setup></script>

<template>
  <dialog open class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <header>
        <h3 class="text-lg font-bold">Hello!</h3>
      </header>
      <main>
        <slot name="body" />
      </main>
      <footer class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </footer>
    </div>
  </dialog>
</template>
