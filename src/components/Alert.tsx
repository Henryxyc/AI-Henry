import { Show, createSignal } from 'solid-js'

export const [showAlert, setShowAlert] = createSignal(false)
export const [alertMessage, setAlertMessage] = createSignal('')

export default function Alert() {
  return (
    <Show when={showAlert()}>
      <div class="fixed inset-0 bg-black/50 z-50">
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div class="text-lg mb-4">{alertMessage()}</div>
            <div class="flex justify-end">
              <button 
                class="gen-slate-btn" 
                onClick={() => setShowAlert(false)}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
} 