<template>
  <section class="notebookTree" v-if="notebook">
    <!-- <h2>{{notebook.title}}</h2> -->
    <ul>
      <li
        v-for="category in notebook.categories"
        :key="category.id"
        @click="switchFold(category.id)"
      >
        <svg-icon className="icon" icon="notebook/folder" />
        <span v-show="opCategoryAction !== 'rename'">{{category.title}}</span>
        <input
          type="text"
          v-show="opCategoryAction === 'rename'"
          v-model="opCategoryTitle"
          ref="opCategoryTitleInput"
          @click.stop
          @keydown.enter="renameCategory(category.id)"
          @keydown.esc="cancelOpCategory"
        />
        <svg-icon
          className="icon op"
          icon="notebook/op"
          @click.stop="setOpCategoryId(category.id)"
        />
        <height-transition>
          <div
            class="tree-confirm"
            v-if="opCategoryId === category.id && !opCategoryAction"
          >
            <div class="tree-op">
              <button @click.stop="setOpCategoryAction('rename', category.title);">重命名</button>
              <button @click.stop="setOpCategoryAction('delete')">删除</button>
            </div>
          </div>
        </height-transition>
        <height-transition>
          <li
            class="tree-confirm"
            v-if="opCategoryId === category.id && opCategoryAction === 'delete'"
          >
            <p>确认删除分类及所有笔记？</p>
            <div class="tree-op">
              <button class="ui-button danger" @click.stop="deleteCategory(category.id)">确认</button>
              <button class="ui-button" @click.stop="cancelOpCategory">取消</button>
            </div>
          </li>
        </height-transition>
        <ul
          tag="ul"
          name="note-list"
          droppable="true"
          v-show="!foldMap[category.id]"
          >
          <template
            v-for="note in category.notes"
            :key="note.id"
          >
            <li
              draggable="true"
              :class="{active:note.id === currentNoteId}"
              @contextmenu="showContextMenu('note', note.id)"
              @click.stop="switchCurrentNote(note.id)"
              @dragstart="dragStart($event, note.id)"
              @dragover.prevent="dragOver($event, note.id)"
            >
              <svg-icon className="icon" icon="notebook/note" />
              <span>{{note.title}}</span>
              <svg-icon
                className="icon delete"
                icon="notebook/delete"
                @click.stop="pendingDeleteNote(note.id)"
              />
            </li>
            <height-transition>
              <li
                v-if="pendingDeleteNoteId === note.id"
                class="tree-confirm"
              >
                <p>确认删除？</p>
                <div class="tree-op">
                  <button class="ui-button danger" @click.stop="deleteNote(note.id)">确认</button>
                  <button class="ui-button" @click.stop="pendingDeleteNoteId = ''">取消</button>
                </div>
              </li>
            </height-transition>
          </template>
        </ul>
      </li>
      <li class="pendingCreateCategory" v-if="isPendingCreateCategory">
        <svg-icon className="icon" icon="notebook/folder" />
        <input
          v-model="pendingCreateCategoryTitle"
          ref="pendingCreateCategoryTitleInput"
          @keydown.enter="createCategory"
          @keydown.esc="cancelCreateCategory"
        />
      </li>
    </ul>
  </section>
    <!-- <section class="searchWrapper">
    <input type="search" v-model.trim="keyword" placeholder="搜索..." />
  </section>
  <section class="wrapper" v-show="isSearching">
    <div class="notFound" v-show="!searchResults.length">搜的什么鬼 一篇都没有</div>
    <ul v-show="searchResults.length">
      <li
        class="icon folder"
        v-for="(notes,category) in searchResultsWithCategories"
      >{{category}}
        <ul>
          <li
            class="icon note"
            v-bind:class="{active:isActive(note.id)}"
            v-for="note in notes"
            v-on:click="switchCurrentNote(note.id)"
            v-on:contextmenu="showContextMenu(note.id)"
          >{{note.title}}</li>
        </ul>
      </li>
    </ul>
  </section> -->

  <!--<v-contextmenu @hide="hideContextMenu" ref="contextMenu">
    <v-contextmenu-item @click="newNote('menu')">新建笔记</v-contextmenu-item>
    <v-contextmenu-item>重命名</v-contextmenu-item>
    <v-contextmenu-item @click="deleteNote">删除</v-contextmenu-item>
  </v-contextmenu> -->
</template>
<script lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import { getData } from '../viewData';
import { eventHub, EVENTS } from '../../utils/eventHub';
import HeightTransition from './ui/HeightTransition.vue';

const useFold = () => {
  const foldMap = reactive({});
  const switchFold = function(categoryId){
    let value;
    if(!foldMap[categoryId]){
      value = true;
    }else{
      value = false;
    }
    foldMap[categoryId] = value;
    console.log(foldMap);
  };
  return { foldMap, switchFold };
};

const useCurrentNote = () => {

  const editorData = getData('editor').value;
  const currentNoteId = computed(() => {
    if(!editorData || !editorData[0]){ return ''; }
    return editorData[0].id;
  });

  const switchCurrentNote = function(id: string){
    if (!id) return;
    eventHub.emit(EVENTS.SWITCH_CURRENT_NOTE, id);
  }

  return { currentNoteId, switchCurrentNote };
};

const useDeleteNote = () => {
  const pendingDeleteNoteId = ref('');

  const pendingDeleteNote = function(id: string) {
    pendingDeleteNoteId.value = id;
  };

  const deleteNote = function(id: string) {
    eventHub.emit(EVENTS.DELETE_NOTE, id);
    pendingDeleteNoteId.value = '';
  };

  return { pendingDeleteNoteId, pendingDeleteNote, deleteNote };
};

const useOpCategory = () => {
  const opCategoryId = ref('');
  const opCategoryAction = ref('');
  const opCategoryTitle = ref('');
  const opCategoryTitleInput = ref(null);

  const setOpCategoryId = function(id: string){
    if (opCategoryId.value !== id) {
      opCategoryId.value = id;
    } else {
      opCategoryId.value = '';
    }
    opCategoryAction.value = '';
  };

  const setOpCategoryAction = function(action: string, title?: string){
    opCategoryAction.value = action;
    if (title) {
      opCategoryTitle.value = title;
      nextTick(() => {
        opCategoryTitleInput.value.focus();
      });
    }
  };

  const cancelOpCategory = function() {
    opCategoryId.value = '';
    opCategoryAction.value = '';
  };

  const deleteCategory = function(id: string) {
    eventHub.emit(EVENTS.DELETE_CATEGORY, id);
    cancelOpCategory();
  };

  const renameCategory = function(id: string) {
    if(opCategoryTitle.value){
      eventHub.emit(EVENTS.UPDATE_CATEGORY, { id, title: opCategoryTitle.value });
    }
    cancelOpCategory();
  };

  return {
    opCategoryId, opCategoryAction, opCategoryTitle, opCategoryTitleInput, setOpCategoryId,
    setOpCategoryAction, cancelOpCategory, deleteCategory, renameCategory,
  };
};

const useCreateCategory = () => {
  const isPendingCreateCategory = ref(false);
  const pendingCreateCategoryTitle = ref('');
  const pendingCreateCategoryTitleInput = ref(null);

  const cancelCreateCategory = () => {
    isPendingCreateCategory.value = false;
    pendingCreateCategoryTitle.value = '';
  };

  const createCategory = () => {
    if (pendingCreateCategoryTitle.value) {
      eventHub.emit(EVENTS.CREATE_CATEGORY, pendingCreateCategoryTitle.value);
    }
    cancelCreateCategory();
  }

  eventHub.on(EVENTS.PENDING_CREATE_CATEGORY, () => {
    isPendingCreateCategory.value = true;
    nextTick(() => {
      pendingCreateCategoryTitleInput.value.focus();
    });
  });

  return { isPendingCreateCategory, pendingCreateCategoryTitle, pendingCreateCategoryTitleInput, createCategory, cancelCreateCategory };
};

export default {
  components: {
    HeightTransition,
  },
  setup(props, ctx){
    const notebook = getData('notebook');

    const currentNote = useCurrentNote();
    const deleteNote = useDeleteNote();
    const createCategory = useCreateCategory();
    const opCategory = useOpCategory();
    const fold = useFold();

    return {
      notebook,
      ...fold,
      ...currentNote,
      ...deleteNote,
      ...createCategory,
      ...opCategory,
    };
  }
};
</script>
<style scoped lang="scss">
@import '../styles/ui.scss';
@import '../styles/variables.scss';

.notebookTree{
  font-size: 14px;
  line-height: 30px;
  color: $textColor;
}
/* .wrapper h2,
.wrapper .notFound{
  font-size:14px;
  padding-left:15px;
  font-weight: normal;
} */
ul{
  list-style: none;
  li{
    cursor:default;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    span {
      padding-left: 5px;
    }
    .op {
      float: right;
      margin-top: 8px;
      display: none;
    }
    &:hover .op {
      display: block;
    }
    li {
      padding-left: 20px;
      &.active {
        color: $themeColor;
      }
      .delete {
        float: right;
        margin-top: 8px;
        display: none;
      }
      &:hover .delete{
        display: block;
      }
    }
  }
}

.tree-confirm{
  border-left: 2px solid $themeColor;
  box-sizing: border-box;
  // padding-left: 10px;
  // text-align: center;
  .tree-op{
    @include buttonGroup;
    text-align: left;
    padding: 5px 10px;
    button {
      @include smallButton;
    }
  }
}
.wrapper li li{
  text-indent: 44px;
}
.wrapper li.active{
  background: #CECECE;
}

.wrapper .note-list-move {
  transition: transform .4s;
}

</style>
