<template>
    <div>
        <navigation :loading="loading" v-on:setgrid="setGrid"></navigation>
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
    loading: boolean = false
    gridstyle:string = "card"
    created(){
        this.loading = true
        // STUDENT JSON - let op data staat in data.items, niet in data.results
        // const url = "http://95.85.35.193:8000/api/movies/"
        // LIVE ONLINE URL
        const url = `https://swapi.co/api/films/`

        DataLoader.loadJSON(url)
            .then(data => {
                this.films = data.results
                this.loading = false
            }, error => {
                console.log("error loading data!")
            })

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
