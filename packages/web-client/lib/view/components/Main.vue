<template>
  <div class="layout">
    <div class="row top">
      <toolbar class="toolbar"/>
      <user-info class="userInfo"/>
    </div>
    <div class="row main">
      <notebook-tree class="notebookTree" />
      <div class="editor-wrapper" v-if="editor[0]">
        <div class="title-editor">
          <input type="text" v-model="editor[0].title" />
        </div>
        <editor class="editor" v-model="editor[0].content" @insert-image="insertImage"></editor>
      </div>
    </div>
    <!--
        <preview class="preview" :content="editor.data.content"></preview>-->
    <!-- <login v-if="!userInfo.data.isLogin"></login> -->
    <!-- <span v-if="editor[0]">{{editor[0].content}}</span> -->
  </div>
</template>

<script lang="ts">
import { ComputedRef, watch } from 'vue';
import { Note } from '@toonote/shared/interfaces/Store';
import Editor from '@toonote/editor-tiptap';

import { getData } from '../viewData';
import { eventHub, EVENTS } from '../../utils/eventHub';
import NotebookTree from './NotebookTree.vue';
import Toolbar from './Toolbar.vue';
import UserInfo from './UserInfo.vue';
import { getExtensionByFile } from '../../utils/attachment';
// import Preview from './Preview.vue';
// import Login from './Login.vue';

const isNoteChanged = (newData: Note, oldData: Note): boolean => {
  return true;
  // return newData.title !== oldData.title || newData.content !== oldData.content;
};

export default {
  components: {
    Toolbar,
    UserInfo,
    NotebookTree,
    Editor,
    // Preview,
    // Login,
  },
  setup(props, ctx){
    const editor = getData('editor') as unknown as ComputedRef<Note[]>;

    // oldValue is same as newValue, strange...
    watch(editor.value, (newValue, oldValue) => {
      for (let i = 0; i < newValue.length; i++) {
        if (isNoteChanged(newValue[i], oldValue[i])) {
          eventHub.emit(EVENTS.UPDATE_NOTE, newValue[i]);
        }
      }
    });

    watch(() => editor.value[0] && editor.value[0].title, (newTitle: string, oldTitle: string) => {
      if(typeof newTitle === 'undefined' || typeof oldTitle === 'undefined') return;
      eventHub.emit(EVENTS.UPDATE_NOTE_TITLE, newTitle);
    });

    const insertImage = (file: File) => {
      const ext = getExtensionByFile(file);
      const size = file.size;
      const name = file.name;

      eventHub.emit(EVENTS.CREATE_IMAGE, {
        ext,
        size,
        name,
        file,
      });
    };
      // const editor = reactive(getData('editor'));
      // const userInfo = reactive(getData('userInfo'));

      // let lastContent = editor.data.content;

      // watch(() => {
      //     if(lastContent !== editor.data.content && typeof editor.data.content !== 'undefined'){
      //         ctx.root.$webClient.$emit('editor.change', {
      //             content: editor.data.content
      //         });
      //         lastContent = editor.data.content;
      //     }
      // });

    return {
      editor,
      insertImage,
        // userInfo,
    };
  }
};
</script>

<style>
*{
	padding:0;
	margin:0;
}
html,body,#container{
	height: 100%;
}
body{
	font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
<style lang="scss">
@import "../styles/ui.scss";
/*动画*/
/* .slide-enter-active, .slide-leave-active {
	transition: width .5s;
}
.slide-enter, .slide-leave-active {
	width: 0!important;
}
.slide-flex-enter-active, .slide-flex-leave-active {
	transition: flex .5s;
}
.slide-flex-enter, .slide-flex-leave-active {
	flex: 0!important;
}
 */
.layout{
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background:url('../images/bg.jpg') center 40% no-repeat; */
  .row {
    display: flex;
  }
  .top {
    margin: 20px 30px;
  }
  .main {
    flex: 1;
    display: flex;
  }
  .toolbar{
    flex: 1;
  }
  .notebookTree{
    width: 230px;
    margin: 0 30px;
  }
  .editor-wrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
    // margin-top: 10px;
    margin-right: 30px;
    .title-editor {
      margin-bottom: 30px;
      input[type=text]{
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        width: 100%;
        border: 0 none;
        font-size: 2em;
        color: #666;
        font-weight: bold;
        &:focus {
          outline: 0 none;
        }
      }
    }
  }
}
</style>
