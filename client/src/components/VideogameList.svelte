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
    {videogame.name}
  </div>
{/each}
