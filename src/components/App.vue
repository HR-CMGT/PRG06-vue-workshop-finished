<template>
    <div>
        <navigation v-on:setgrid="setGrid"></navigation>
        <div class="columns">
            <div class="cards">
                <card v-for="(f,index) in films" :key="f.episode_id" :movie="f" :display="gridstyle" v-on:movieclicked="addToList(index)"></card>
            </div>
            <watchlist v-if="watchlater.length > 0" :watchlater="watchlater" v-on:listitemclicked="removeFromList"></watchlist>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import Card from "./card.vue"
import Navigation from "./navigation.vue"
import Watchlist from "./watchlist.vue"
import DataLoader from "../services/DataLoader"

@Component({
    components: {Card, Navigation, Watchlist}
})

export default class App extends Vue {
    films: Film[] = []
    watchlater :Film[] = []
    gridstyle:string = "card"
    created(){
        this.loadData()
    }
    async loadData(){
        this.films = (await DataLoader.loadJSON(`https://swapi.co/api/films/`)).results
    }
    addToList(i:number){
        this.watchlater.push(this.films[i])
    }
    removeFromList(i:number){
        this.watchlater.splice(i,1)
    }
    setGrid(s:string){
        this.gridstyle = s
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
    flex-wrap: wrap;  /*cards can go to the next line*/
}
.columns {
    display:flex;
}
</style>
