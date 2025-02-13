import { createSignal, onMount } from 'solid-js'

// 创建信号
export const [apiKey, setApiKey] = createSignal(
  typeof localStorage !== 'undefined' ? localStorage.getItem('apiKey') || '' : ''
)
export const [apiBaseUrl, setApiBaseUrl] = createSignal(
  typeof localStorage !== 'undefined' ? localStorage.getItem('apiBaseUrl') || '' : ''
)

export function saveSettings(key: string, baseUrl: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('apiKey', key)
    localStorage.setItem('apiBaseUrl', baseUrl)
  }
  // 直接更新信号
  setApiKey(key)
  setApiBaseUrl(baseUrl)
  
  console.log('Settings saved:', { apiKey: key, apiBaseUrl: baseUrl })
}

// 在组件中使用 onMount 监听 localStorage 的变化
export function setupLocalStorageListener() {
  onMount(() => {
    window.addEventListener('storage', () => {
      setApiKey(localStorage.getItem('apiKey') || '')
      setApiBaseUrl(localStorage.getItem('apiBaseUrl') || '')
    })
  })
} 