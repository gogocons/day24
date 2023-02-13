<script lang="ts">
  let fileinput, submit, imageToDisplay;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      imageToDisplay = e.target.result;
    };
    submit.click();
  };

  // TODO: FIX SPINNER OF DOOM
  // TODO: FIX LINT
</script>

{#if imageToDisplay}
  <img
    src={imageToDisplay}
    alt="uploaded"
    on:click={() => {
      fileinput.click();
    }}
  />
{:else}
  <img
    src="./xbox-one-blank-case.png"
    alt="default"
    on:click={() => {
      fileinput.click();
    }}
  />
{/if}
<div class="helper-text">Click image to upload cover art!</div>

<form
  action="http://localhost:3000/cover"
  method="post"
  enctype="multipart/form-data"
>
  <input
    style="display:none"
    type="file"
    name="cover-art"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
  <input style="display:none" type="submit" value="Submit" bind:this={submit} />
</form>

<style>
  img {
    max-height: 300px;
    border-radius: 8px;
  }

  .helper-text {
    margin: 5px;
  }
</style>
