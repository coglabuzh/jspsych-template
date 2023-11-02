// jsPsych official plugin
import instructions from "@jspsych/plugin-instructions";

const imagePages: string[] = [];

for (let i = 1; i <= 3; i++) {

  imagePages.push(`<div class="main">
  <img src="assets/images/image${i}.jpg" class="image"></img>
  </div>`);
}


export const instr_line = {
  type: instructions,
  pages: imagePages,
  show_clickable_nav: true,
  data: { screenID: "instruction" },
};