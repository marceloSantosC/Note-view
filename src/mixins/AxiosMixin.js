export default {
  methods: {
    async get (url, config = this.defaultHeadersAxios) {
      return this.axios.get(url, config)
    },
    async post (url, data, config = this.defaultHeadersAxios) {
      return this.axios.post(url, data, config)
    },
    async delete (url, config = this.defaultHeadersAxios) {
      return this.axios.delete(url, config)
    },
    async update (url, data, config = this.defaultHeadersAxios) {
      return this.axios.put(url, data, config)
    }
  },
  computed: {
    defaultHeadersAxios () {
      return {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Accept-Language": "pt-BR",
        }
      }
    }
  }
}
