<template>
  <div ref="workspace" class="workspace bg-gray-darkest">
    <div
      tabindex="0"
      :style="workspaceCanvasStyle"
      @mousemove="handleMouseMove"
      @mousedown="handleMouseDown"
      @keypress.delete="DELETE_SELECTED_OBJECTS"
    >
      <svg
        id="root" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"
      >
        <svg
          id="canvas"
          :width="canvasDimensions.width"
          :height="canvasDimensions.height"
          :x="canvasPosition.x"
          :y="canvasPosition.y"
          overflow="none"
          style="pointer-events:none"
        >
          <defs id="placeholder_defs">
            <pattern id="checkerPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"
                     viewBox="0 0 10 10">
              <rect x="0" y="0" width="10" height="10" fill="#fff"></rect>
              <rect x="0" y="0" width="5" height="5" fill="#eee"></rect>
              <rect x="5" y="5" width="5" height="5" fill="#eee"></rect>
            </pattern>
            <pattern id="gridpattern" patternUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <image x="0" y="0" width="100" height="100"></image>
            </pattern>
          </defs>
          <rect
            width="100%" height="100%" x="0" y="0" stroke="#000" fill="url(#checkerPattern)"
            style="pointer-events:none"
          ></rect>
        </svg>
        <svg
          :width="canvasDimensions.width"
          :height="canvasDimensions.height"
          :x="canvasPosition.x"
          :y="canvasPosition.y"
          overflow="hidden"
          :viewBox="`0 0 ${canvas.width} ${canvas.height}`"
        >
          <g>
            <component
              v-for="object in objects"
              :key="object.id"
              :is="object.tag"
              :id="object.id"
              v-bind="object.attributes"
            >
            </component>
          </g>
          <g>
            <component
              v-for="selector in selectors"
              :key="selector.id"
              :is="'g'"
            >
              <component
                :is="selector.tag"
                v-bind="selector.attributes"
                v-if="[currentlySelectedObjectId, currentlyHoveredObjectId].includes(selector._objectId)"
              ></component>
            </component>
          </g>
        </svg>
      </svg>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex"

  export default {
    name: "Workspace",
    data: () => ({
      workspaceDimensions: {
        height: 0,
        width: 0
      },
      coordinates: {
        x: 0,
        y: 0
      }
    }),
    computed: {
      ...mapState([
        "zoom",
        "canvas",
        "layers",
        "objects",
        "selectors",
        "currentlySelectedTool",
        "currentlySelectedObjectId",
        "currentlyHoveredObjectId"
      ]),
      canvasDimensions () {
        return {
          width: this.canvas.width * this.zoom,
          height: this.canvas.height * this.zoom
        }
      },
      canvasPosition () {
        const x = (this.workspaceDimensions.width - this.canvasDimensions.width) / 2
        const y = (this.workspaceDimensions.height - this.canvasDimensions.height) / 2
        return {
          x: Math.max(0, x),
          y: Math.max(0, y)
        }
      },
      workspaceCanvasStyle () {
        const height = Math.max(this.workspaceDimensions.height - 2, this.canvasDimensions.height)
        const width = Math.max(this.workspaceDimensions.width - 2, this.canvasDimensions.width)
        return {
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          height: height + "px",
          width: width + "px",
          outline: "none",
          cursor: this.currentlySelectedTool.name === "select" ? "auto" : "crosshair"
        }
      }
    },
    mounted () {
      this.setWorkSpaceDimensions()
      window.addEventListener("resize", () => {
        this.setWorkSpaceDimensions()
      })
    },
    methods: {
      ...mapMutations([
        "UPDATE_SELECTORS",
        "DELETE_SELECTED_OBJECTS"
      ]),
      ...mapActions([
        "activateToolHoverAction",
        "activateToolClickAction"
      ]),
      setWorkSpaceDimensions () {
        const workspace = this.$refs.workspace
        const bounds = workspace.getBoundingClientRect()
        this.workspaceDimensions.height = bounds.height
        this.workspaceDimensions.width = bounds.width
      },
      handleMouseMove (e) {
        const cBound = document.getElementById("canvas").getBoundingClientRect()
        this.coordinates = {
          x: (e.clientX - cBound.left) / this.zoom,
          y: (e.clientY - cBound.top) / this.zoom
        }
        this.activateToolHoverAction({
          coordinates: this.coordinates
        })
      },
      handleMouseDown () {
        this.activateToolClickAction({
          coordinates: this.coordinates
        })
      }
    }
  }
</script>

<style scoped>
  .workspace {
    flex-grow: 1;
    line-height: calc(100vh - 3rem);
    text-align: center;
    overflow: auto;
  }

  .workspace::-webkit-scrollbar {
    display: none;
  }

  .workspace {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
