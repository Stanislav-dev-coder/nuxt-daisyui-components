// Интерфейс элементов управления
export interface ButtonConfig {
  label: string
  type?: "disabled" | "info" | "success" | "warning" | "error" | "primary"
  image: string
  keyTrigger?: string
  action: () => void
}
