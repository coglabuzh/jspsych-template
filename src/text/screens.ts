import { config } from "@settings";
import { translateText } from "@text/helpers";
import type { LocalizedText } from "@text/types";

const welcome: LocalizedText = {
  en: `<div class='main'>
    <h1 class='title'>Welcome!</h1>
    <p class='fb-text'>
      Thank you very much for participating in this experiment.
    </p>
    </div>`,
  de: `<div class='main'>
    <h1 class='title'>Willkommen!</h1>
    <p class='fb-text'>
      Vielen Dank für Ihre Teilnahme an diesem Experiment.
    </p>
    </div>`,
  cn: `<div class='main'>
    <h1 class='title'>欢迎您参与本实验!</h1>
    </div>`,
};

const startTrial: LocalizedText = {
  en: ` <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the space bar to start directly.</p>`,
  de: ` <p>Der nächste Durchgang beginnt in <span id="clock" style="color:red">10</span> Sekunden.</p>
    <p>Drücken Sie die Leertaste, um direkt zu beginnen.</p>`,
  cn: ` <p>下一个试次将在 <span id="clock" style="color:red">10</span> 秒后开始。</p>
    <p>按下空格键后将直接开始</p>`,
};

const fullScreen: LocalizedText = {
  en: "The experiment will switch to full screen",
  de: "Das Experiment wechselt in den Vollbildmodus",
  cn: "即将进入全屏模式",
};

export const SCREEN_INFO = {
  welcome,
  startTrial,
  blockBreak(blockID: number, nBlock: number, lang: string) {
    return translateText(
      {
        cn: `<div class='main'>
          <h1 class='title'>休息一下吧</h1>
          <p class='fb-text'>
            你已经完成了 ${blockID}/${nBlock} 的实验,
            实验将在 <span id='break' style='color:red'>${config.TIMING.BREAK}</span> 秒后继续。
          </p>
          <p class="fb-text">你可以按下空格键直接开始</p>
          <br>
        </div>`,
        en: `<div class='main'>
          <h1 class='title'>Take a break</h1>
          <p class='fb-text'>
            You have completed ${blockID}/${nBlock} blocks. 
            The next block will start in <span id='break' style='color:red'>${config.TIMING.BREAK}</span> seconds.
          </p>
          <p class="fb-text">Press the space bar to skip the break</p>
          <br>
        </div>`,
      },
      lang
    );
  },
  fullScreen,
  feedback(accuracy: number, nTest: number, lang: string) {
    return translateText(
      {
        en: `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`,
        de: `<div class='fb-text'>Sie haben ${accuracy} von ${nTest} Buchstaben korrekt erinnert.</div>`,
        cn: `<div class='fb-text'>您正确回忆了${accuracy}/${nTest}个字符。</div>`,
      },
      lang
    );
  },
};
