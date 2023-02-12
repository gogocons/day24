<script lang="ts">
  const blank = "xbox-one-blank-case.png";
  let imageToSave;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    console.log("this is the image", image);
    let reader = new FileReader();
    console.log("this is the reader", reader);
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      imageToSave = e.target.result;
    };
  };
</script>

{#if imageToSave}
  <img src={imageToSave} alt="uploaded" />
{:else}
  <img src={blank} alt="not uploaded" />
{/if}
<br />
<input
  type="file"
  accept=".jpg, .jpeg, .png"
  on:change={(e) => onFileSelected(e)}
/>

<button on:click={console.log(imageToSave)}>
  log uploaded image
</button>

<style>
  img {
    max-height: 300px;
    border-radius: 8px;
  }
</style>
