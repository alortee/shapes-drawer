<template>
  <div class="h-screen overflow-hidden">
    <div class="h-12 flex justify-center items-center bg-gray-darker border-b border-gray-darkest">
      <select
        v-model="zoom"
        name="zoom"
        class="appearance-none text-xs bg-transparent py-1 px-2 text-gray-lightest rounded border border-gray-darkest"
        title="Change zoom level"
      >
        <option
          class="text-black"
          v-for="level in [0.25, 0.50, 0.75, 1, 1.25, 1.50, 2.00]"
          :key="level"
          :value="level"
        >
          {{ level * 100 }}%
        </option>
      </select>
    </div>
    <div class="flex justify-between" style="height: calc(100% - 3rem);">
      <tool-bar></tool-bar>
      <workspace></workspace>
      <properties-panel></properties-panel>
    </div>
  </div>
</template>

<script>
  import ToolBar from "../components/ToolBar"
  import Workspace from "../components/Workspace"
  import PropertiesPanel from "../components/PropertiesPanel"

  export default {
    name: "Draw",
    components: {
      PropertiesPanel,
      ToolBar,
      Workspace
    },
    computed: {
      zoom: {
        get () {
          return this.$store.state.zoom
        },
        set (val) {
          this.$store.commit("SET_ZOOM", val)
        }
      }
    }
  }
</script>

<style scoped>
</style>
