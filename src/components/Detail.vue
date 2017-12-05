<template>
    <!-- BINDING STYLES: https://vuejs.org/v2/guide/class-and-style.html -->
    <div class="detail">
        <div :style="{backgroundImage:headerImage}"><h3>{{movie.title}}</h3></div>
        <div>
            <h4>{{movie.director}}, {{movie.producer}}</h4>
            <h5>{{movie.release_date}}</h5>
            <p>{{movie.opening_crawl}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import DataLoader from "../services/DataLoader"

@Component
export default class Detail extends Vue {
    @Prop() movie: Film
    headerImage:string = ""
    created(){
        DataLoader.loadImage(this.movie.title).then(gifurl => { 
            this.headerImage = `url('${gifurl}')`
        })
    }
}
</script>

<style scoped>
.detail {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color:white;
    margin:4vh 10vw;
    width:80vw;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.4);
}
.detail div:nth-child(1){
    background-size:cover;
    background-position: center;
    height:55vh; width:100%;
}

.detail div:nth-child(2){
    padding:12px;
}
h3 {
    color:white;
    font-size:4em;
    margin:2vw;
}
h4{
    font-size:2em;
    font-weight: bold;
}
h5{
    font-size:1.3em;
    font-style: italic;
}
p {
    font-size:1.3em;
}
</style>