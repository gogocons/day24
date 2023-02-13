<script lang="ts">
  const blank = "xbox-one-blank-case.png";
  let imageToDisplay;
  let imageToSave;

  const onFileSelected = (e) => {
    imageToSave = e.target.files[0];
    console.log("this is the image", imageToSave);
    let reader = new FileReader();
    console.log("this is the reader", reader);
    reader.readAsDataURL(imageToSave);
    reader.onload = (e) => {
      imageToDisplay = e.target.result;
    };
  };
</script>

{#if imageToDisplay}
  <img src={imageToDisplay} alt="selected" />
{:else}
  <img src={blank} alt="default" />
{/if}
<br />

<form
  action="http://localhost:3000/cover"
  method="post"
  enctype="multipart/form-data"
>
  <input
    type="file"
    name="cover-art"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
  />
  <input type="submit" value="Submit" />
</form>

<style>
  img {
    max-height: 300px;
    border-radius: 8px;
  }
</style>
