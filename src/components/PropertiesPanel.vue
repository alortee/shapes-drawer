<template>
  <div class="flex-shrink-0 relative w-64 bg-gray-darker border-r border-gray-darkest">
    <div v-if="object">
      <div  class="p-4 border-b border-gray-darkest">
        <template v-if="object.attributes.tag === 'circle'">
          <div>
            <label for="radius">radius</label>
            <input v-model="object.attributes['r']" id="radius" class="input" type="number" min="0">
          </div>
        </template>
        <template v-if="object.attributes.tag === 'rect'">
          <div>
            <label for="width">width</label>
            <input v-model="object.attributes['width']" id="width" class="input" type="number" min="0">
          </div>
          <div class="mt-4">
            <label for="height">height</label>
            <input v-model="object.attributes['height']" id="height" class="input" type="number" min="0">
          </div>
        </template>
        <template v-if="object.attributes.tag === 'polygon'">
          <div>
            <label for="sideLength">length of each side</label>
            <input v-model="object['sideLength']" id="sideLength" class="input" type="number" min="0">
          </div>
        </template>
      </div>
      <div class="p-4 border-b border-gray-darkest">
        <div>
          <label for="stroke-width">outline width</label>
          <input v-model="object.attributes['stroke-width']" id="stroke-width" class="input" type="number" min="0">
        </div>
        <div class="mt-4">
          <label for="stroke-color">outline color</label>
          <div
            @click="$refs.stroke.click()"
            class="h-6 w-6 rounded-full bg-red"
            :style="{ backgroundColor: object.attributes['stroke'] }"
          >
            <input
              class="opacity-0 h-6 w-6 rounded-full"
              ref="stroke"
              v-model="object.attributes['stroke']"
              id="stroke-color" type="color"
            >
          </div>
        </div>
        <div class="mt-4">
          <label for="fill-color">fill color</label>
          <div
            @click="$refs.fill.click()"
            class="h-6 w-6 rounded-full"
            :style="{ backgroundColor: object.attributes['fill'] }"
          >
            <input
              class="opacity-0 h-6 w-6 rounded-full"
              ref="fill"
              v-model="object.attributes['fill']"
              id="fill-color" type="color"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex"
  import ShapesFactory from "../lib/ShapesFactory"

  export default {
    name: "PropertiesPanel",
    data: () => ({
      object: null
    }),
    computed: {
      ...mapState([
        "currentlySelectedObjectId",
        "objects"
      ])
    },
    mounted () {
      this.object = this.objects.find(o => o.id === this.currentlySelectedObjectId)
    },
    watch: {
      currentlySelectedObjectId (id) {
        this.object = this.objects.find(o => o.id === id)
      },
      object: {
        handler (object) {
          if (object) {
            if (object.tag === "polygon") {
              const newObject = ShapesFactory.generatePolygon(object.center, object.sideCount, object.sideLength)
              object.attributes.path = newObject.attributes.path
            }
            this.UPDATE_OBJECT(object)
          }
        },
        deep: true
      },
      objects () {
        this.$nextTick(() => {
          this.UPDATE_SELECTORS()
        })
      }
    },
    methods: {
      ...mapMutations([
        "UPDATE_OBJECT",
        "UPDATE_SELECTORS"
      ])
    }
  }
</script>

<style scoped>

</style>
