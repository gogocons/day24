<script lang="ts">
  import axios from "axios";
  import { fade } from "svelte/transition";

  let fileinput, imageToDisplay;

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
    }, 5000);
  }

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      imageToDisplay = e.target.result;
    };

    uploadImageToBackend();

    // below code will send the form data (which is only an image) to server side via axios
    // first iterations used a bastardized click event which is no longer required.
    async function uploadImageToBackend() {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      try {
        await axios.post("http://localhost:3000/cover", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        color = "green";
        message = "successfully added cover art!";
      } catch (e) {
        color = "red";
        message = e.message;
        clearMessage();
      }
    }
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

{#if message}
  <div class="message-text" style="color:{color}">{message}</div>
{:else}
  <div class="helper-text">Click image to upload cover art!</div>
{/if}

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

  .message-text {
    margin: 5px;
    text-transform: uppercase;
  }

  .helper-text {
    margin: 5px;
  }
</style>
