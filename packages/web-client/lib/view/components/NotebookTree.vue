<template>
  <section class="notebookTree" v-if="notebook">
		<!-- <h2>{{notebook.title}}</h2> -->
		<ul>
			<li
				v-for="category in notebook.categories"
        :key="category.id"
				@click="switchFold(category)"
			>
        <svg-icon className="icon" icon="notebook/folder" />
        <span>{{category.title}}</span>
				<transition-group
					name="note-list"
					tag="ul"
					droppable="true"
					v-show="!foldMap[category.id]"
					v-on:drop="drop"
					>
					<li
						draggable="true"
						:key="note.id"
						:class="{active:note.id === currentNoteId}"
						v-for="note in category.notes"
						@contextmenu="showContextMenu('note', note.id)"
						@click.stop="switchActiveNote(note.id)"
						@dragstart="dragStart($event, note.id)"
						@dragover.prevent="dragOver($event, note.id)"
					>
            <svg-icon className="icon" icon="notebook/note" />
            <span>{{note.title}}</span>
          </li>
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
						v-on:click="switchActiveNote(note.id)"
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
<script>
import { reactive, ref } from 'vue';
import { getData } from '../viewData';

export default {
  setup(props, ctx){
    const notebook = getData('notebook');
    const foldMap = reactive({});
    const currentNoteId = ref('n2');

    return {
      notebook,
      foldMap,
      currentNoteId,
    };
		/* const state = reactive(getData('state'));
		const notebook = reactive(getData('notebook'));
		const localState = reactive({
			currentContextMenuNoteId: '',
		});



        const switchFold = function(category){
			let value;
			if(!foldMap.value[category]){
				value = true;
			}else{
				value = false;
			}
			foldMap.value = {
				...foldMap.value,
				[category]: value
			};
        }; */

        /* const isFold = function(category){
			console.log('isFold');
			return foldMap[category];
        }; */
        /* const isActive = function(noteId){
			// console.log(noteId, state.currentContextMenuNoteId);
            return noteId === state.currentContextMenuNoteId;
        }; */

		/* const showContextMenu = function(type, id){
			localState.currentContextMenuNoteId = id;
		};

		const hideContextMenu = function(){
			localState.currentContextMenuNoteId = '';
		}

		const drop = function(){};

		const newNote = function(from){
			ctx.root.$webClient.$emit('note.new', {
				from,
				context: {
					type: 'note',
					id: state.currentContextMenuNoteId,
				}
			});
		}

		const deleteNote = function(){
			ctx.root.$webClient.$emit('note.delete', {
				id: localState.currentContextMenuNoteId,
			});
		}

		const switchActiveNote = function(id){
			state.data.currentNoteId = id;
			ctx.root.$webClient.$emit('note.switchActive', {
				id
			});
		}

        return {
			state,
			localState,
            notebook,
            foldMap,
            switchFold,
			showContextMenu,
			hideContextMenu,
			drop,
			newNote,
			deleteNote,
			switchActiveNote,
        }; */
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
    }
  }
}
.wrapper li li{
	text-indent: 44px;
}
.wrapper li.active{
	background: #CECECE;
}
.wrapper li.note::before{
	padding-right:3px;
	background-image:url(../images/icon-file.png);
}
.wrapper li.folder::before{
	padding-right:3px;
	background-image:url(../images/icon-folder.png);
}
.wrapper .note-list-move {
	transition: transform .4s;
}

.contextMenu{
	position: absolute;
	background: #F6F6F6;
	border: 1px solid #E0E0E0;
	font-size: 14px;
}
.contextMenu ul{
	list-style: none;
}
.contextMenu ul li{
	padding: 10px 20px;
	cursor: pointer;
}
.contextMenu ul li:hover,
.contextMenu ul li.active{
	background: #CECECE;
}

.icon {
  font-size: 12px;
}
</style>
