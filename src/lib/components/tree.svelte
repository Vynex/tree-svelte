<script lang="ts">
  import Comment from "./comment.svelte";
  import type { Comment as CommentType } from "$lib/types";

  const tree:Array<CommentType> = [
    { value: "Root Comment 1", expanded: true, children: [
      { value: "Child Comment 1", expanded: true, children: [] },
      { value: "Child Comment 2", expanded: true, children: [
        { value: "Child Comment 1", expanded: true, children: [] },
        { value: "Child Comment 2", expanded: true, children: [
          { value: "Child Comment 1", expanded: true, children: [] },
          { value: "Child Comment 2", expanded: true, children: [] },
        ] },
        { value: "Child Comment 3", expanded: true, children: [] },
      ] },
    ] },
    { value: "Root Comment 2", expanded: false, children: [
      { value: "Child Comment 1", expanded: true, children: [] },
    ] },
  ];
</script>

{#each tree as branch}
  <Comment {...branch} depth={0} />
{/each}
