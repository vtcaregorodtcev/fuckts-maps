<script>
  export let handleCreateFuckt = () => {
    throw new Error('handleCreateFuckt is required');
  };

  let value = '';

  const handleClick = () => {
    handleCreateFuckt(value);

    value = '';
  };
</script>

<style>
  .create-fuckt {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
  }

  .create-fuckt input {
    width: calc(100% - 80px);
    border-radius: 8px;
  }

  :root {
    background: #f5f6fa;
    color: #9c9c9c;
    font: 1rem 'PT Sans', sans-serif;
  }

  .btn {
    display: inline-block;
    background: transparent;
    color: inherit;
    font: inherit;
    border: 0;
    outline: 0;
    padding: 0;
    transition: all 200ms ease-in;
    cursor: pointer;
  }
  .btn--primary {
    background: #7f8ff4;
    color: #fff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 12px 36px;
  }
  .btn--primary:hover {
    background: #6c7ff2;
  }
  .btn--primary:active {
    background: #7f8ff4;
    box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
  }
  .btn--inside {
    margin-left: -96px;
  }

  .form__field {
    width: 360px;
    background: #fff;
    color: #a3a3a3;
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
</style>

<svelte:options tag="svelte-create-fuckt" />

<form>
  <div class="create-fuckt">
    <input class="form__field" bind:value type="text" />
    <button
      type="submit"
      class="btn btn--inside btn--primary"
      on:click={handleClick}>
      Добавить
    </button>
  </div>
</form>
