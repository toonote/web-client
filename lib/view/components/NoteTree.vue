<template>
<section class="noteTree">
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
    <section class="wrapper">
		<h2>{{data.data.title}}</h2>
		<ul>
			<li
				class="icon folder"
				v-for="(notes,category) in data.data.categories"
                :key="category"
				@click="switchFold(category)"
			>{{category}}
				<transition-group
					name="note-list"
					tag="ul"
					droppable="true"
					v-show="!isFold(category)"
					v-on:drop="drop"
					>
					<li
						draggable="true"
						class="icon note"
						:key="note.id"
						:class="{active:isActive(note.id)}"
						v-for="note in notes"
						@click.stop="switchCurrentNote(note.id)"
						@contextmenu.stop="showContextMenu(note.id)"
						@dragstart="dragStart($event, note.id)"
						@dragover.prevent="dragOver($event, note.id)"
					>{{note.title}}</li>
				</transition-group>
			</li>
		</ul>
	</section>
</section>
</template>
<script>
import { createComponent } from '@vue/composition-api';
import { getData } from '../dataInjector';

export default createComponent({
    setup(){
        const notebook = getData('notebook');

        const switchFold = function(){

        };

        const isFold = function(){
            return false;
        };
        const isActive = function(){
            return false;
        };

        const drop = function(){};

        return {
            data: notebook,
            switchFold,
            isFold,
            isActive,
            drop,
        };
    }
});
</script>
<style scoped>
.wrapper{
	line-height: 24px;
	padding-top: 10px;
}
.wrapper h2,
.wrapper .notFound{
	font-size:12px;
	padding-left:15px;
	font-weight: normal;
}
.wrapper ul{
	list-style: none;
}
.wrapper li{
	font-size:13px;
	text-indent: 25px;
	/*padding-left:25px;*/
	cursor:default;
	white-space: nowrap;
	overflow: hidden;
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
</style>
