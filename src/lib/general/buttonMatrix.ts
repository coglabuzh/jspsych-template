/**
 * Button-matrix HTML helpers.
 *
 * Use this file for reusable button layouts that are created dynamically during
 * the experiment.
 */
import jss from "jss-browserify";

var winW = Math.min(window.innerWidth, window.innerHeight * 1.5);
var Width = Math.min(winW * 0.95, 1200);
var fontSize = Width * 0.02;

/**
 * Creates a matrix of absolute-positioned button HTML snippets and injects
 * corresponding CSS classes via JSS.
 *
 * @param nrow Number of rows in the button matrix.
 * @param ncol Number of columns in the button matrix.
 * @param mWidth Horizontal span, in percentage units, occupied by the matrix.
 * @param mHeight Vertical span, in percentage units, occupied by the matrix.
 * @returns Array of button HTML strings, one per position.
 */
export function createChoiceButtonMatrix(
  nrow: number,
  ncol: number,
  mWidth: number = 30,
  mHeight: number = 40,
) {
  const nTotal = nrow * ncol;

  let buttonCSS: string[] = [];

  for (let i = 0; i < nTotal; i++) {
    let button_name = `.alter-button${i + 1}`;
    let class_name = `alter-button${i + 1}`;

    let button_row = Math.floor(i / ncol);
    let button_col = i % ncol;

    let button_x = (mWidth / (ncol - 1)) * button_col + 75 - mWidth / 2;
    let button_y = (mHeight / (nrow - 1)) * button_row + 50 - mHeight / 2;

    jss.set(button_name, {
      position: "absolute",
      top: `${button_y}%`,
      left: `${button_x}%`,
      width: "6%",
      "-webkit-transform": "translate(-50%,-50%)",
      "-moz-transform": "translate(-50%,-50%)",
      transform: "translate(-50%,-50%)",
      "font-size": `${fontSize * 2.5}px`,
      "font-family": "Arial",
      "text-align": "center",
      padding: "0.3em 0.3em",
      "border-radius": "15px",
      "background-color": "#FFFFFF",
      border: "2px solid #1E1E1E",
      "justify-content": "center",
      "margin-bottom": "50px",
    });

    buttonCSS.push(`<button class=${class_name}>%choice%</button>`);
  }

  return buttonCSS;
}
