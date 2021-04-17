<template>
  <div :style="itemStyle" @click="onClickNoteItem" class="root">
    <b-card no-body text-variant="white" class="note-card">
      <div class="p-3 m-lg-auto-auto">
        <span class="h5 text-white">{{ note.tittle | maxLengthTittle }}</span>
        <b-button size="sm" variant="danger" class="float-right" @click="deleteNote">
          <b-icon-trash/>
        </b-button>
      </div>

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    note: Object,
    sizeX: {
      type: Number,
      default: 100
    },
    sizeY: {
      type: Number,
      default: 10,
    },
    primaryColor: {
      type: String,
      default: '#343a40',
    },
    colorOnHover: {
      type: String,
      default: '#414850'
    },
    colorSelected: {
      type: String,
      default: '#484f58'
    },
  },
  computed: {
    itemStyle () {
      return {
        width: `${this.sizeX}%`,
        display: 'inline',
        '--color': this.note.selected ? this.colorSelected : this.primaryColor,
        '--color-hover': this.colorOnHover
      }
    },
  },
  methods: {
    onClickNoteItem () {
      this.$emit('click', this.note)
    },
    deleteNote () {
      this.$emit('delete')
    }
  },
  filters: {
    maxLengthTittle(text) {
      if (text.length > 50) {
        return text.substr(0, 50) + '...';
      }
      return text;
    }
  }
}
</script>

<style scoped>
.note-card {
  background-color: var(--color);
}

.note-card:hover {
  background-color: var(--color-hover);
  cursor: pointer;
}

.root {
  padding-bottom: 0.50%;
}
</style>
