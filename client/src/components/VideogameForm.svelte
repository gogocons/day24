<script lang="ts">
  import axios from "axios";
  import { fade } from "svelte/transition";

  let name: string;
  let platform: string;
  let releaseYear: number;
  let genre: string;
  let ratingAgency: string;
  let goodGame: boolean = false;

  let color: string;
  let message: string;

  // this a timer script to reset the message clearing if a user spams the button
  // it only appears on error, successful uploads are handled in a different way
  let timer = null;
  function clearMessage() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      message = undefined;
    }, 1600);
  }

  // this variable will be used to not let a user spam the submit button
  // it is only utilized for successful submissions, to prevent repeats.
  let submitSuccess: boolean = false;

  async function submitForm() {
    if (!submitSuccess) {
      try {
        await axios.post("http://localhost:3000/videogame", {
          name: name,
          platform: platform,
          releaseYear: releaseYear,
          genre: genre,
          ratingAgency: ratingAgency,
          goodGame: goodGame,
        });
        submitSuccess = true;
        color = "green";
        message = "successfully added game!";
        // this will reload the page after successful submission to reset the form
        // lazy mans approach currently... TODO: find a better way!
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (e) {
        color = "red";
        message = e.response.data.error;
        clearMessage();
      }
    }
  }
</script>

<div class="inputs-container">
  <input bind:value={name} type="text" placeholder="Name" />
  <input bind:value={platform} type="text" placeholder="Platform" />
  <input bind:value={releaseYear} type="number" placeholder="Release Year" />
  <input bind:value={genre} type="text" placeholder="Genre" />
  <input bind:value={ratingAgency} type="text" placeholder="ESRB Rating" />
  <div>
    <label for="quality">Did you enjoy it?</label>
    <input bind:checked={goodGame} type="checkbox" id="quality" />
  </div>
</div>
<button on:click={submitForm}>Submit</button>

{#if message}
  <h3 style="color:{color}" out:fade>
    {message}
  </h3>
{/if}

<style>
  .inputs-container {
    display: grid;
  }

  button {
    margin: 5px;
  }

  h3 {
    text-transform: uppercase;
  }
</style>
