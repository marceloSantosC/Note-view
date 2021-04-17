<template>
  <b-container :fluid="true" class="note-main-body h-100 w-100">
    <b-form-input type="text" placeholder="Título da nota" v-model="note.tittle" class="mb-3" />
    <b-form-textarea placeholder="Conteúdo da nota" size="sm" :rows="29" no-resize v-model="note.content" />
  </b-container>
</template>

<script>
import AxiosMixin from '@/mixins/AxiosMixin'

export default {
  name: 'NoteDetails',
  props: {
    note: {
      type: Object,
      default: {
        id: null,
        content: null,
        tittle: null,
        date: null,
      }
    }
  },
  mixins: [AxiosMixin],
  methods: {
  }
}
</script>

<style scoped>

* {
  --background-note-body-color: #6c6b6b;
  --background-note-inner-color: #b0afaf;
  --background-note-inner-color-focus: #a7a5a5;
  --text-color: #1e1e1e;
  --text-color-focus: #2b2a2a;
  box-sizing: border-box;
}

</style>
