<script lang="ts">
  import axios from "axios";

  let fileinput, imageToDisplay;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      imageToDisplay = e.target.result;
    };

    // below code will send the form data (which is only an image) to server side via axios
    // first iterations used a bastardized click event which is no longer required.
    const form = document.querySelector("form");
    const formData = new FormData(form);
    axios.post("http://localhost:3000/cover", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // CODE SEEN BELOW IS LITERALLY JUST LINT REMOVER, I'M DUMB
  // on:keydown={() => {fileinput.click();}}
</script>

{#if imageToDisplay}
  <img
    src={imageToDisplay}
    alt="uploaded"
    on:click={() => {
      fileinput.click();
    }}
    on:keydown={() => {
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
    on:keydown={() => {
      fileinput.click();
    }}
  />
{/if}
<div class="helper-text">Click image to upload cover art!</div>

<form>
  <input
    style="display:none"
    type="file"
    name="cover-art"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
</form>

<style>
  img {
    max-height: 250px;
    border-radius: 8px;
  }

  .helper-text {
    margin: 5px;
  }
</style>
