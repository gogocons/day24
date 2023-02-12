<script lang="ts">
  import UserForm from "./components/UserForm.svelte";
  import UserList from "./components/UserList.svelte";

  let displayForm: boolean = true;
  function changeDisplay() {
    displayForm = !displayForm;
  }
</script>

<main>
  <button on:click={changeDisplay}>Change Display</button>
  {#if displayForm}
    <UserForm />
  {:else}
    <UserList />
  {/if}
</main>
