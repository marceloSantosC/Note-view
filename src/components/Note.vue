<template>
  <b-container :style="noteSize" class="note-body">
      <b-form-input v-model="title" placeholder="Título da nota" class="note-tittle" />
      <b-form-textarea class="note-content" id="textarea" v-model="content" placeholder="Conteúdo da nota..."
                       rows="6" max-rows="6" no-resize  />
  </b-container>
</template>

<script>
export default {
  name: 'Note',
  props: {
    title: String,
    content: String,
    sizeX: Number
  },
  computed: {
    noteSize () {
      return {
        width: `${this.sizeX}%`
      }
    }
  }
}
</script>

<style scoped lang="scss">

* {
  --background-note-body-color: #6c6b6b;
  --background-note-inner-color: #b0afaf;
  --background-note-inner-color-focus: #a7a5a5;
  --text-color: #1e1e1e;
  --text-color-focus: #2b2a2a;
}

.note-tittle {
 margin-bottom: 1.5%;
}

.note-tittle, .note-content {
  background-color: var(--background-note-inner-color);
  color: var(--text-color);
}

.note-tittle:focus, .note-content:focus {
  background-color: var(--background-note-inner-color-focus);
  color: var(--text-color-focus);
}

.note-body {
  background-color: var(--background-note-body-color);
  margin: 1.5%;
  border: var(--background-note-body-color) solid 1px;
  border-radius: 1.5%;
  padding: 1%;
}
</style>
