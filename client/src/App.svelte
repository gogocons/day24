<script lang="ts">
  import ImageSelection from "./components/ImageSelection.svelte";
  import VideogameForm from "./components/VideogameForm.svelte";
  import VideogameList from "./components/VideogameList.svelte";

  let displayForm: boolean = true;
  function changeDisplay() {
    displayForm = !displayForm;
  }
</script>

<div class="navwrap">
  <div class="header-text">
    <h1>gogo game tracker</h1>
  </div>
  <div>
    <button on:click={changeDisplay}>Change Display</button>
  </div>
</div>

<main>
  {#if displayForm}
    <h1>Upload Game</h1>
    <ImageSelection />
    <VideogameForm />
  {:else}
    <VideogameList />
  {/if}
</main>

<style>
  .navwrap {
    display: flex;
    justify-content: space-between;
    background: linear-gradient(180deg, #e61fea 0%, #7cb9e8 100%);
    padding: 0 10px 0 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    align-items: center;
  }

  .header-text {
    text-align: center;
    color: #1a1a1a;
    text-transform: uppercase;
  }
</style>