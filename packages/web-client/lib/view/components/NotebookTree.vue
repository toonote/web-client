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
        <span>{{category.title}}</span>
				<transition-group
					name="note-list"
					tag="ul"
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
                icon="notebook/note"
                @click.stop="pendingDeleteNote(note.id)"
              />
            </li>
            <li
              v-if="pendingDeleteNoteId === note.id"
              class="note-delete-confirm"
            >
              <p>确认删除？</p>
              <div class="note-delete-op">
                <button class="ui-button danger" @click.stop="deleteNote(note.id)">确认</button>
                <button class="ui-button" @click.stop="pendingDeleteNoteId = ''">取消</button>
              </div>
            </li>
          </template>
				</transition-group>
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
import { computed, reactive, ref } from 'vue';
import { getData } from '../viewData';
import { eventHub, EVENTS } from '../../utils/eventHub';

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

export default {
  setup(props, ctx){
    const notebook = getData('notebook');

    const { currentNoteId, switchCurrentNote } = useCurrentNote();
    const { pendingDeleteNoteId, pendingDeleteNote, deleteNote } = useDeleteNote();
    console.log(pendingDeleteNoteId);
    const { foldMap, switchFold } = useFold();

    return {
      notebook,
      foldMap,
      currentNoteId,
      switchCurrentNote,
      switchFold,
      pendingDeleteNoteId,
      pendingDeleteNote,
      deleteNote,
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

.note-delete-confirm{
  text-align: center;
  .note-delete-op{
    @include buttonGroup;
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
