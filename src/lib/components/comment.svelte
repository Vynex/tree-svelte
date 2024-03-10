<script lang="ts">
  import type { Comment as CommentType } from "$lib/types";

  export let value: string, expanded: boolean, children: Array<CommentType>;
  export let depth: number;

  let isRootThread: boolean; 
  $: isRootThread = depth === 0;

  let isExpandable: boolean; 
  $: isExpandable = !!(children.length);

  function handleToggle(): void {
    expanded = !expanded;
  }
</script>

<div class="node" class:root={isRootThread}>
  <div class="leaf">
    {#if !isRootThread}
      <span class="hr" />
    {/if}

    {value}

    {#if isExpandable}
      <button class="toggle" on:click={handleToggle}>
        {expanded ? "-" : "+"}
      </button>
    {/if}
  </div>

  <div class="content" style:position="relative">
    {#if (isExpandable && expanded)}
    <span class="vr" on:click={handleToggle} role="presentation" />

    {#each children as child, i}
      <div class="branch">
        {#if i === (children.length - 1)}
          <div class="ghost" />
        {/if}

        <svelte:self
          value={child.value}
          bind:expanded={child.expanded}
          children={child.children}
          depth={depth + 1}
        />
      </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .root:not(:first-child) {
    margin-top: 24px;
  }

  .root :global(.node) {
    margin-left: 16px;
  }

  .leaf {
    min-height: 25px;
    padding-left: 16px;
    position: relative;
  }

  .hr {
    height: 1px; width: 24px;
    position: absolute;
    top: 50%; left: -16px;
    transform: translateY(-50%);

    display: inline-block;
    background-color: #AAAAAA;
    z-index: 15;
  }

  .toggle {
    height: 18px; width: 18px;
    position: absolute;
    left: -8px; top: 50%;
    transform: translateY(-50%);

    display: inline-flex;
    justify-content: center;
    align-items: center;

    border: 0.5px solid #000000;
    border-radius: 50%;

    pointer-events: all;
    z-index: 20;
  }

  .content {
    position: relative;
  }

  .vr {
    height: 100%; width: 1px;
    position: absolute;
    top: -12px;

    background-color: #AAAAAA;
    pointer-events: all; cursor: pointer;
  }

  .vr:hover {
    background-color: #000000;
  }

  .branch {
    position: relative;
    pointer-events: none;
  }

  .ghost {
    height: 100%; width: 10px;
    position: absolute;
    top: 12.5px; left: -5px;

    background-color: #FFFFFF;
    z-index: 10;
  }
</style>