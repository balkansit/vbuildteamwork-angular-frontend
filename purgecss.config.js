module.exports = {
  content: ["./src/**/*.html", "./src/**/*.ts"],
  css: ["./src/styles.css"],
  safelist: [
    // Add any classes or patterns you want to keep even if unused
    /^cdk-/,
    /^mat-/,
    "some-dynamic-class",
  ],
  output: "./src/assets/", // <--- output folder for cleaned CSS
};
