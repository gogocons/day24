<script lang="ts">
  import axios from "axios";
  let name: string = "";
  let platform: string;
  let releaseYear: number;
  let genre: string = "";
  let ratingAgency: string = "";
  let goodGame: boolean = false;

  async function submitForm() {
    const result = await axios.post("http://localhost:3000/videogame", {
      name: name,
      platform: platform,
      releaseYear: releaseYear,
      genre: genre,
      ratingAgency: ratingAgency,
      goodGame: goodGame
    });

    console.log(result);
  }
</script>

<div class="inputs-container">
  <input bind:value={name} type="text" placeholder="Name" />
  <input bind:value={platform} type="text" placeholder="Platform" />
  <input bind:value={releaseYear} type="number" placeholder="Release Year" />
  <input bind:value={genre} type="text" placeholder="Genre" />
  <input bind:value={ratingAgency} type="text" placeholder="ESRB Rating" />
  <div>
    <label for="quality">Is it good?</label>
    <input bind:checked={goodGame} type="checkbox" id="quality" />
  </div>
</div>
<button on:click={async () => await submitForm()}>Submit</button>

<style>
  .inputs-container {
    display: grid;
  }
</style>
