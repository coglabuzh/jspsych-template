// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { expInfo } from "../settings";


export const language_screen = {
  type: htmlButtonResponse,
  stimulus: `<p class="title">Welcome/Willkommen!</p>
      <div class="main">
        <p class="fb-text">
          Thank you very much for participating in this experiment.<br>
          Vielen Dank, dass Sie sich an diesem Experiment beteiligen.<br>
          Please select your preferred language below.<br>
          Bitte wählen Sie unten Ihre bevorzugte Sprache aus.
        </p>
      </div>`,
  choices: ["English", "Deutsch"],
  data: { screenID: "language" },
  on_finish: function (data) {
    // set the language
    expInfo.LANG = ["en", "de"][data.response];
  },
};
