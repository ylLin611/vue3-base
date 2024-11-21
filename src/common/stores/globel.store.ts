export const useGlobalStore = defineStore('global', () => {
  const loading = ref(false)
  const setLoading = (val: boolean) => {
    loading.value = val
  }

  return { loading, setLoading }
})
