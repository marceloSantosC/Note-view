<template>
    <div class="note-list-container">
      <template style="display: inline" v-for="(note, index) in notes"  >
        <NoteListItem :note="note" :key="note.id" @click="onClickNoteListItem" :primary-color="primaryColor"
                      :color-on-hover="colorOnHover" :color-selected="colorSelected"
                      @delete="onDeleteNote(note.id, index)" />
      </template>
    </div>
</template>

<script>
import NoteListItem from '@/components/NoteListItem'

export default {
  name: 'NoteList',
  components: { NoteListItem },
  props: {
    notes: Array,
    sizeX: {
      type: [Number, String],
      default: 100
    }
  },
  data() {
    return  {
      primaryColor: '#282c30',
      colorOnHover: '#414850',
      colorSelected: '#484f58'
    }
  },
  methods: {
    onClickNoteListItem(note) {
      this.$emit('noteSelected', note);
      this.notes.forEach(note => note.selected = false);
      note.selected = true;
    },
    onDeleteNote(id, index) {
      this.$emit('delete', id, index);
    }
  }
}
</script>

<style scoped>

.note-list-container {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>
