<template>
    <b-container :fluid="true" class="m-0 pb-3 min-vh-100 w-100" id="root">
      <b-row  class="w-100 border-bottom border-light" >
        <b-navbar toggleable="lg"  type="dark" class="w-100">
          <b-navbar-brand href="/" tag="h1">NoteR</b-navbar-brand>
          <b-navbar-nav class="ml-auto" >
            <b-button variant="primary" size="sm" @click="newNote"> <b-icon-plus /> </b-button>
            <span class="p-1"/>
            <b-button @click="saveNote" variant="outline-light" >Salvar <b-icon-archive/> </b-button>
          </b-navbar-nav>
        </b-navbar>
      </b-row>
      <b-row class="w-100 pt-4">
        <b-col class="h-100 overflow-auto m-auto custom-scrollbar">
          <NoteList @delete="deleteNote" :notes="sortedNotes" @noteSelected="onSelectNote"/>
        </b-col>
        <b-col cols="7" class="h-100" >
          <NoteDetails :note="selectedNote"/>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>

import NoteList from '@/components/NoteList.vue'
import AxiosMixin from '@/mixins/AxiosMixin'
import NoteDetails from '@/components/NoteDetails'

export default {
  name: 'Home',
  mixins: [AxiosMixin],
  data () {
    return {
      notes: [],
      selectedNote: {},
    }
  },
  components: {
    NoteDetails,
    NoteList,
  },
  computed: {
    sortedNotes() {
      const compareDate = (compare, other) => {
        const date = new Date(compare);
        const otherDate = new Date(other);
        if (date > otherDate) return 1;
        if (date < otherDate) return -1;
        return 0;
      }

      if (this.notes) {
        return this.notes.sort(compareDate);
      }
      return [];
    }
  },
  methods: {
    async getNotes () {
      const response = await this.get('/notes')

      if (response.status >= 200 && response.status < 300) {
        this.showAlertBox('NoteR', 'Notas carregadas com sucesso', 'info')
        this.notes = response.data;
      }
    },
    saveNote() {
      this.post('/notes', this.selectedNote).then(response => {
        if (response?.status >= 200 && response?.status < 300) {
          this.showAlertBox('NoteR', 'Nota salva com sucesso');
          const savedNote = response?.data;
          const index = this.notes.findIndex((note) => note.id === this.selectedNote.id);
          if (index > 0) this.notes[index] = savedNote;
          if (index < 0) this.notes.push(savedNote);
        } else {
          this.showAlertBox('NoteR', 'Ocorreu um erro ao salvar a nota', 'danger');
        }
      });
    },
    deleteNote(id, index) {
      const url = '/notes/' + id;
      this.delete(url).then(response => {
        if (response?.status >= 200 && response?.status < 300) {
          this.sortedNotes.splice(index, 1);
          this.selectedNote = this.createNote();
          this.showAlertBox('NoteR', 'Nota deletada com sucesso')
        } else {
          this.showAlertBox('NoteR', 'Ocorreu um erro ao salvar a nota', 'danger')
        }
      })
    },
    onSelectNote(note) {
      this.selectedNote = note;
    },
    showAlertBox(tittle, message, type = 'success') {
      this.$bvToast.toast(message, {
        title: tittle,
        variant: type,
        toaster: 'b-toaster-bottom-right',
        solid: true,
        appendToast: false
      })
    },
    newNote() {
      this.selectedNote.selected = false;
      this.selectedNote = this.createNote();
    },
    createNote() {
      return {
        content: null,
        date: null,
        id: null,
        selected: false,
        tittle: null,
      }
    }
  },
  created () {
    this.getNotes()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#root {
  background-color: #1e1e1e;
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #8d8e8e;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #515050;
}
</style>
