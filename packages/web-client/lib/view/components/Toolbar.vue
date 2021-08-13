<template>
  <div class="toolbar">
    <div class="btn-wrapper btn active">
      <svg-icon icon="toolbar/notebook" />
    </div>
    <popup class="btn-wrapper" :trigger="click">
      <template v-slot>
        <div class="btn">
          <svg-icon icon="toolbar/new" />
        </div>
      </template>
      <template v-slot:popupContent>
        <menu-item @click="createNote">
          <svg-icon className="icon" icon="notebook/note" />
          <span>笔记</span>
        </menu-item>
      </template>
    </popup>
  </div>
</template>

<script lang="ts">
import { ComputedRef } from 'vue';
import { Note, NoteCreate } from '@toonote/shared/interfaces/Store';

import { getData } from '../viewData';
import { eventHub, EVENTS } from '../../utils/eventHub';

import Popup from './ui/Popup.vue';
import MenuItem from './ui/MenuItem.vue';

export default {
  components: {
    Popup,
    MenuItem,
  },
  setup() {
    const editor = getData('editor') as unknown as ComputedRef<Note[]>;
    const createNote = () => {
      const currentNote = editor.value[0] as Note;
      const newNote: NoteCreate = {
        title: '新笔记',
        content: '',
        categoryId: currentNote.categoryId,
      };
      eventHub.emit(EVENTS.CREATE_NOTE, newNote);
    };
    return { createNote };
  },
}
</script>

<style scoped lang="scss">
@import '../styles/ui.scss';
@import '../styles/variables.scss';

.toolbar{
  display: flex;
}

.btn{
  @include button;
  width: $toolbarButtonSize;
  height: $toolbarButtonSize;
  border: 0 none;
  border-radius: 10px;
  font-size: 18px;
  line-height: $toolbarButtonSize;
  &.active, &:hover{
    @include buttonShadow;
  }
}
</style>
<style lang="scss">
.btn-wrapper{
  margin-right: 20px;
}
</style>
