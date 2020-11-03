import Vue from "vue"
import Vuex from "vuex"

import {
  SET_ZOOM,
  SET_CURRENTLY_SELECTED_TOOL,
  ADD_OBJECT_TO_LAYER,
  UPDATE_SELECTORS,
  UPDATE_OBJECT,
  SET_CURRENTLY_SELECTED_OBJECT_ID,
  SET_CURRENTLY_HOVERED_OBJECT_ID,
  DELETE_SELECTED_OBJECTS
} from "./mutation-types"

import Tools from "../lib/Tools"
import ShapesFactory from "../lib/ShapesFactory"

Vue.use(Vuex)

const defaultState = () => ({
  canvas: {
    width: 800,
    height: 480
  },
  zoom: 1,
  currentlySelectedTool: { name: "select" },
  tools: [
    {
      name: "select",
      description: "Select a shape"
    },
    {
      name: "circle",
      description: "Draw circle"
    },
    {
      name: "triangle",
      description: "Draw triangle"
    },
    {
      name: "rectangle",
      description: "Draw square / rectangle"
    },
    {
      name: "pentagon",
      description: "Draw pentagon"
    },
    {
      name: "hexagon",
      description: "Draw hexagon"
    }
  ],
  objects: [],
  selectors: [],
  currentlySelectedObjectId: null,
  currentlyHoveredObjectId: null
})

const savedState = () => {
  return JSON.parse(window.localStorage.getItem("__state"))
}

const store = new Vuex.Store({
  state: savedState() || defaultState(),
  mutations: {
    [SET_ZOOM]: (state, zoom) => {
      state.zoom = zoom
    },
    [SET_CURRENTLY_SELECTED_TOOL]: (state, tool) => {
      state.currentlySelectedTool = tool
    },
    [ADD_OBJECT_TO_LAYER]: (state, { object }) => {
      state.objects.push(object)
      state.currentlySelectedObjectId = object.id
    },
    [UPDATE_OBJECT]: (state, object) => {
      state.objects = state.objects.map(item => {
        return item.id === object.id ? {
          ...item,
          ...object
        } : item
      })
    },
    [DELETE_SELECTED_OBJECTS]: (state) => {
      state.objects = state.objects.filter(item => {
        return item.id !== state.currentlySelectedObjectId
      })
      state.currentlySelectedObjectId = null
    },
    [SET_CURRENTLY_SELECTED_OBJECT_ID]: (state, { id }) => {
      state.currentlySelectedObjectId = id
    },
    [SET_CURRENTLY_HOVERED_OBJECT_ID]: (state, { id }) => {
      state.currentlyHoveredObjectId = id
    },
    [UPDATE_SELECTORS]: (state) => {
      state.selectors = []
      for (const objectId of state.objects.map(o => o.id)) {
        const o = document.getElementById(objectId)
        if (!o) {
          continue
        }
        const bbox = o.getBBox()
        const padding = 8
        const selector = ShapesFactory.generateObject("rect", {
          "x": bbox.x - (padding / 2),
          "y": bbox.y - (padding / 2),
          "width": bbox.width + padding,
          "height": bbox.height + padding,
          "fill": "none",
          "stroke-width": 1,
          "stroke": "#4F80FF"
        })
        selector._objectId = objectId
        state.selectors.push(selector)
      }
    }
  },
  actions: {
    activateToolHoverAction ({ state, commit, dispatch }, { coordinates }) {
      const tool = Tools[state.currentlySelectedTool.name]
      const mutations = tool.hoverAction && tool.hoverAction(coordinates, state)
      if (mutations) {
        for (const mutation of mutations) {
          commit(mutation)
        }
      }
    },
    activateToolClickAction ({ state, commit, dispatch }, { coordinates }) {
      const tool = Tools[state.currentlySelectedTool.name]
      const mutations = tool.clickAction && tool.clickAction(coordinates, state)
      if (mutations) {
        for (const mutation of mutations) {
          commit(mutation)
        }
      }
    }
  },
  modules: {}
})

store.watch((state) => {
  return state
}, (state) => {
  window.localStorage.setItem("__state", JSON.stringify(state))
}, { deep: true })

export default store
