import type { ShallowRef, Ref } from "vue"

export function useSwipeToClose(options: {
  cardRef: ShallowRef<HTMLElement | undefined>
  modalRef: ShallowRef<HTMLDialogElement | undefined>
  isMobile: Ref<boolean>
  closeDialog: () => void
}) {
  const { cardRef, modalRef: dialogRef, isMobile, closeDialog } = options

  let startY = 0
  let currentY = 0
  let isSwiping = false
  let transitionEndHandler: (() => void) | null = null

  const resetCard = () => {
    if (cardRef.value) {
      cardRef.value.style.transition = ""
      cardRef.value.style.transform = ""
    }
  }

  const clearTransitionHandler = () => {
    if (transitionEndHandler && cardRef.value) {
      cardRef.value.removeEventListener("transitionend", transitionEndHandler)
      transitionEndHandler = null
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    if (!isMobile.value) return
    if (!dialogRef.value?.open) return

    clearTransitionHandler()

    startY = e.touches[0].clientY
    isSwiping = true
    currentY = 0

    if (cardRef.value) {
      cardRef.value.style.transition = ""
    }
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return
    currentY = e.touches[0].clientY
    const deltaY = currentY - startY

    if (deltaY > 0 && cardRef.value) {
      cardRef.value.style.transform = `translateY(${deltaY}px)`
    }
  }

  const onTouchEnd = () => {
    if (!isSwiping) return
    const deltaY = currentY - startY
    isSwiping = false

    if (!cardRef.value) return

    cardRef.value.style.transition = "transform 0.1s ease-out"

    if (deltaY > 100) {
      cardRef.value.style.transform = "translateY(100%)"

      transitionEndHandler = () => {
        clearTransitionHandler()
        resetCard()
        closeDialog()
      }
    } else {
      cardRef.value.style.transform = "translateY(0)"

      transitionEndHandler = () => {
        clearTransitionHandler()
        resetCard()
      }
    }

    cardRef.value.addEventListener("transitionend", transitionEndHandler!)
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
