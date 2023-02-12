<script lang="ts">
  import axios from "axios";
  let name: string = "";
  let age: number = 0;
  let address: string = "0x";

  async function submitForm() {
    const result = await axios.post("http://localhost:3000/user", {
      name: name,
      age: age,
      ethereumAddress: address,
    });

    console.log(result);
  }
</script>

<input bind:value={name} type="text" placeholder="Name" />
<input bind:value={age} type="number" placeholder="Age" />
<input bind:value={address} type="text" placeholder="Ethereum Address" />
<br />
<button on:click={async () => await submitForm()}>Submit</button>
