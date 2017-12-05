<template>
    <div>
        <navigation :loading="loading" v-on:navclicked="showList" v-on:setgrid="setGrid"></navigation>

        <detail v-if="detailVisible" :movie="filmdetail"></detail>

        <div v-else class="cards">
            <card v-for="(f,index) in films" :key="f.episode_id" :movie="f" :display="gridstyle" v-on:movieclicked="selectDetail(index)"></card>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import Card from "./card.vue"
import Navigation from "./navigation.vue"
import Detail from "./detail.vue"
import DataLoader from "../services/DataLoader"

@Component({
    components: {Card, Navigation, Detail}
})

export default class App extends Vue {
    films: Film[] = []
    filmdetail:Film = {} as Film
    loading: boolean = false
    gridstyle:string = "card"
    created(){
        this.loadContent("films")
    }
    showList(type:string){
        // TODO actor menu item werkt nog niet
        this.filmdetail = {} as Film;
    }
    loadContent(type:string){
        this.loading = true
        // LIVE ONLINE URL
        // const url = `https://swapi.co/api/${type}/`
        // LOCAL TEST DATA
        const url = `./data/${type}.json`
        DataLoader.loadJSON(url).then(data => { 
            this.films = data.results
            this.loading = false
        })
    }
    selectDetail(i:number){
        this.filmdetail = this.films[i]
    }
    setGrid(s:string){
        this.gridstyle = s
    }
    get detailVisible():boolean {
        return (this.filmdetail.title != undefined)
    }
}
</script>

<style>
body {
    font-family: sans-serif;
    background: linear-gradient(#E64B8C, #95BFD8);
    margin:0px; padding:0px;
}

html {
    min-height: 100%;
}

h1, h2, h3, h4 {
    margin-top:0px;
	font-family: 'Audiowide', cursive;
}

div {
    box-sizing: border-box;
}

.cards {
    width:100vw;
    display:flex;
    flex-wrap: wrap;
}
</style>
