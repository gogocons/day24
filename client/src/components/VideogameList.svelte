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

{#each videogames as videogame}
  <div class="card">
    <img src={videogame.image} alt={videogame.name} />
    {videogame.name}
  </div>
{/each}

<style>
  .card {
    display: flex;
    flex-direction: column;
  padding: 2em;
}
</style>
