module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      colors: {
        gray: {
          lightest: "#f4f4f2",
          lighter: "#e8e8e8",
          light: "#bbbfca",
          default: "#525252",
          darker: "#414141",
          darkest: "#313131"
        },
        red: "#ca3e47",
        blue: "#4f80ff"
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    layers: ["utilities"],
    content: [
      "src/**/*.vue"
    ]
  }
}
