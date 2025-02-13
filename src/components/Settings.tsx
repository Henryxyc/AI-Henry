import { Show, createSignal } from 'solid-js'
import { apiKey, apiBaseUrl, saveSettings } from '@/store/settings'

export default () => {
  const [showModal, setShowModal] = createSignal(false)
  const [formData, setFormData] = createSignal({
    apiKey: apiKey() || '',
    apiBaseUrl: apiBaseUrl() || 'https://api.lkeap.cloud.tencent.com/v1',
    model: localStorage.getItem('model') || 'deepseek-r1',
    maxHistory: localStorage.getItem('maxHistory') || '4',
    password: localStorage.getItem('password') || '',
    httpsProxy: localStorage.getItem('httpsProxy') || ''
  })

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const data = formData()
    localStorage.setItem('model', data.model)
    localStorage.setItem('maxHistory', data.maxHistory)
    localStorage.setItem('password', data.password)
    localStorage.setItem('httpsProxy', data.httpsProxy)
    saveSettings(data.apiKey, data.apiBaseUrl)
    setShowModal(false)
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)} class="gen-slate-btn">设置</button>
      
      <Show when={showModal()}>
        <div class="fixed inset-0 bg-black/50 z-40">
          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 class="text-lg font-bold mb-4">API 设置</h2>
                <form onSubmit={handleSubmit}>
                  <div class="space-y-4">
                    <div>
                      <label>API Key</label>
                      <input
                        type="password"
                        value={formData().apiKey}
                        onInput={(e) => setFormData({ ...formData(), apiKey: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label>API Base URL</label>
                      <input
                        type="text"
                        value={formData().apiBaseUrl}
                        onInput={(e) => setFormData({ ...formData(), apiBaseUrl: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label>Model</label>
                      <input
                        type="text"
                        value={formData().model}
                        onInput={(e) => setFormData({ ...formData(), model: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div>
                    {/* <div>
                      <label>Max History</label>
                      <input
                        type="number"
                        value={formData().maxHistory}
                        onInput={(e) => setFormData({ ...formData(), maxHistory: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label>Password</label>
                      <input
                        type="password"
                        value={formData().password}
                        onInput={(e) => setFormData({ ...formData(), password: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label>HTTPS Proxy</label>
                      <input
                        type="text"
                        value={formData().httpsProxy}
                        onInput={(e) => setFormData({ ...formData(), httpsProxy: e.currentTarget.value })}
                        class="w-full border rounded p-2"
                      />
                    </div> */}
                  </div>
                  <div class="mt-4 flex justify-end space-x-2">
                    <button type="button" class="gen-slate-btn" onClick={() => setShowModal(false)}>取消</button>
                    <button type="submit" class="gen-slate-btn">保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
} 