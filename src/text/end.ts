import { config } from "@settings";

const { CODES } = config;

export const END_INFO = {
  failedResize: {
    en: `<div class="main">
    <h1 class="title">Experiment discontinued</h1>
    <p>
        Unfortunately, your window size is too small to continue the experiment.
        we therefore have to end this experiment and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，您的窗口尺寸过小，无法继续实验。
        我们不得不结束此实验，无法为您提供任何课程学分。
        如果您有任何问题，请联系研究人员。
    </p>
    </div>`,
  },

  failed: {
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
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，由于您离开标签或浏览器窗口的次数超过了最大值，实验被迫中止。
        您将无法获得实验时长或被试费。如果您有任何问题，请联系主试。
    </p>
    </div>`,
  },

  completedOnline: {
    en: `<div class="main">
    <h1 class="title">Congratulations!</h1>
    <p>
        You have successfully completed the experiment! 
        We are now transferring data to the server. 
        Please copy the following completion code: ${CODES.SUCCESS}. 
        If the window is not redirected to Prolific after 5 minutes, 
        you can just close it and submit the completion code to Prolific.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验结束</h1>
    <p>
        恭喜你顺利完成实验！我们正在将数据上传至服务器。
        请复制以下完成代码：${CODES.SUCCESS}。
        如果窗口在5分钟内未重定向到Prolific，请直接关闭窗口并将完成代码提交至Prolific。
    </p>
    </div>`,
  },

  completedOffline: {
    en: `<div class="main">
          <p h1 class="title">Congratulation!(Offline Mode)</h1>
          <p class="body-center">
          You have successfully completed the experiment while in offline mode.
          Your data failed to transfer to the server due to network issues.
          It has been automatically downloaded to your "Downloads" folder.
          Please contact the researcher for further assistance.
          </p>
          </div>`,
    cn: `<div class="main">
          <p h1 class="title">恭喜你！（离线模式）</h1>
          <p class="body-center">
          您已成功完成了实验，但是由于网络问题，您的数据未能上传至服务器。
          数据已自动下载至您的“下载”文件夹，请联系研究人员以获取进一步的帮助。
          </p>
          </div>`,
  },
};
