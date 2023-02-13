<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let videogames = [];
  async function getVideogames() {
    const result = await axios.get("http://localhost:3000/videogames");
    return result.data; // result.data will be an array of the videogames.
  }

  onMount(async function () {
    videogames = await getVideogames();
  });
</script>
<div class="games-container">
{#each videogames as videogame}
  <div class="card">
    <img src={videogame.image} alt={videogame.name} />
    {videogame.name}
  </div>
{/each}
</div>

<style>

  .games-container {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    display: flex;
    flex-direction: column;
    padding: 2em;
  }

  img {
    max-height: 200px;
    border-radius: 8px;
  }
</style>
