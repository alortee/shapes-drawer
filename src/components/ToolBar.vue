<template>
  <div
    id="tool-bar"
    class="px-2 py-4 flex-shrink-0 w-12 bg-gray-darker border-r border-gray-darkest"
  >
    <div
      v-for="tool in tools"
      :key="tool.name"
      class="tool-btn mb-6"
      :class="[currentlySelectedTool.name === tool.name && 'tool-btn--active']"
      @click="SET_CURRENTLY_SELECTED_TOOL(tool)"
      :title="tool.description"
    >
      <img :src="require(`../assets/images/svg/tools/${tool.name}.svg`)" alt="">
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex"

  export default {
    name: "ToolBar",
    computed: {
      ...mapState([
        "tools",
        "currentlySelectedTool"
      ])
    },
    methods: {
      ...mapMutations([
        "SET_CURRENTLY_SELECTED_TOOL"
      ])
    }
  }
</script>

<style scoped>
  #tool-bar svg {
    @apply text-gray-light;
  }
</style>
