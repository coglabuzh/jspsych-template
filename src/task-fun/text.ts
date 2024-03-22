import { expInfo } from "../settings";

export const TEXT = {
  correctFeedback: {
    en: "Correct :)",
    de: "Richtig :)",
  },

  incorrectFeedback: {
    en: "Incorrect :(",
    de: "Falsch :(",
  },

  startPractice: {
    en: `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Übung</h1>
        <p class='fb-text'>Wir werden nun einige Übungen machen, damit Sie mit dem Experiment vertraut werden.</p>
      </div>`,
  },

  startExperiment: {
    en: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Gut gemacht! Jetzt beginnen wir mit dem Experiment.</p>
      </div>`,
  },

  startTrial: {
    en: ` <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the space bar to start directly.</p>`,
    de: ` <p>Der nächste Durchgang beginnt in <span id="clock" style="color:red">10</span> Sekunden.</p>
    <p>Drücken Sie die Leertaste, um direkt zu beginnen.</p>`,
  },

  continueButton: {
    en: ["Continue"],
    de: ["Weiter"],
  },

  prevButton: {
    en: ["Previous"],
    de: ["Zurück"],
  },

  nextButton: {
    en: ["Next"],
    de: ["Weiter"],
  },

  fullScreen: {
    en: "The experiment will switch to full screen",
    de: "Das Experiment wechselt in den Vollbildmodus",
  },

  repeatedPart: {},

  failedOnline: {
    en: `<div class="main">
    <h1 class="title">Failed Attention Check </h1>
    <p>
        Unfortunately, you have left the tab or browser window more often than allowed.
        As we told you at the beginning of the experiment,
        we therefore have to end this experiment prematurely and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Fehlgeschlagener Aufmerksamkeitstest</h1>
    <p>
        Leider haben Sie das Browser-Tab oder das Browserfenster öfter verlassen als erlaubt.
        Wie wir Ihnen zu Beginn des Experiments mitgeteilt haben,
        müssen wir das Experiment daher vorzeitig beenden und können Ihnen keine Versuchspersonenstunden gutschreiben.
        Wenn Sie Fragen haben, wenden Sie sich bitte an die Studienleitung.
    </p>
    </div>`,
  },

  failedOffline: {
    en: `<div class="main">
    <h1 class="title">Failed Attention Check </h1>
    <p>
        Unfortunately, you have left the tab or browser window more often than allowed.
        As we told you at the beginning of the experiment,
        we therefore have to end this experiment prematurely and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Fehlgeschlagener Aufmerksamkeitstest</h1>
    <p>
        Leider haben Sie das Browser-Tab oder das Browserfenster öfter verlassen als erlaubt.
        Wie wir Ihnen zu Beginn des Experiments mitgeteilt haben,
        müssen wir das Experiment daher vorzeitig beenden und können Ihnen keine Versuchspersonenstunden gutschreiben.
        Wenn Sie Fragen haben, wenden Sie sich bitte an die Studienleitung.
    </p>
    </div>`,
  },

  completedOnline: {
    en: `<div class="main">
    <h1 class="title">Congratulation!</h1>
    <p>
        You have completed the experiment successfully.
        If you want to receive participant hours, please copy the completion code below
        and paste it into the Google Form along with your personal information.
    </p>
    <li>Completion Code: ${expInfo.CODES.SUCCESS}/li>
    <li>Google Form: <a href="https://forms.gle/kVYYkSZKZBswxSMa6">https://forms.gle/kVYYkSZKZBswxSMa6</a></li>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Herzlichen Glückwunsch!</h1>
    <p>
        Sie haben das Experiment erfolgreich abgeschlossen.
        Wenn Sie Versuchspersonenstunden erhalten möchten, kopieren Sie bitte den Abschlusscode unten
        und fügen Sie ihn zusammen mit Ihren persönlichen Informationen im Google-Formular ein.
    </p>
    <li>Abschlusscode: ${expInfo.CODES.SUCCESS}</li>
    <li>Google Formular: <a href="https://forms.gle/kVYYkSZKZBswxSMa6">https://forms.gle/kVYYkSZKZBswxSMa6</a></li>
    </div>`,
  },

  completedOffline: {
    en: `<div class="main">
          <p class="body-center">Congratulation!(Offline Mode)</p>
          <p class="body-center">
          You have successfully completed the experiment while in offline mode.
          The data is automatically downloaded and can be found in your download folder.
          Please sent the data to the researcher via email.
          If you want to receive participant hours, please copy the completion code below
          and paste it into the Google Form along with your personal information.</p>
          <li>Completion Code: ${expInfo.CODES.OFFLINE}</li>
          <li>Google Form: <a href="https://forms.gle/kVYYkSZKZBswxSMa6">https://forms.gle/kVYYkSZKZBswxSMa6</a></li>
          </div>`,
    de: `<div class="main" lang="de">
          <p class="body-center">Herzlichen Glückwunsch!(Offline-Modus)</p>
          <p class="body-center">
          Sie haben das Experiment erfolgreich im Offline-Modus abgeschlossen.
          Die Daten werden automatisch heruntergeladen und können in Ihrem Download-Ordner gefunden werden.
          Bitte senden Sie die Daten per E-Mail an die Studienleitung.
          Wenn Sie Versuchspersonenstunden erhalten möchten, kopieren Sie bitte den Abschlusscode unten
          und fügen Sie ihn zusammen mit Ihren persönlichen Informationen im Google-Formular ein.</p>
          <li>Abschlusscode: ${expInfo.CODES.OFFLINE}</li>
          <li>Google Formular: <a href="https://forms.gle/kVYYkSZKZBswxSMa6">https://forms.gle/kVYYkSZKZBswxSMa6</a></li>
          </div>`,
  },
};