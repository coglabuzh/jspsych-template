type stimObj = {
  image: string;
  color: string;
  width: number;
  rotation: number;
};

/**
 * Generates an array of screen elements (rectangles and text) for displaying stimuli.
 * @param {Array} content - The content to display in the item boxes.
 * @param {Array} center - The (x, y) coordinates of the center of the display area.
 * @param {number} radius - The radius of the display area.
 * @returns {Array} An array of screen elements (rectangles and text).
 */
export function stimArrange(
  content: stimObj[] = [],
  center: number[],
  radius: number
) {
  let nStim = content.length;
  // Calculate the angle between adjacent screen elements.
  let theta = (2 / nStim) * Math.PI;

  // Initialize an empty array to store the screen elements.
  var screen_elements: any[] = [];

  // Generate the screen elements.
  content.forEach((stim, i) => {
    // Calculate the (x, y) coordinates of the current screen element.
    const posX = Math.sin(theta * (-i - 0.5)) * radius + center[0];
    const posY = Math.cos(theta * (-i - 0.5)) * radius + center[1];

    var image_object = {
      obj_type: "image", // means a rectangle
      file: stim.image,
      pixi_angle: stim.rotation,
      image_width: stim.width,
      startX: posX,
      startY: posY,
    };

    var rect_object = {
      obj_type: "circle",
      radius: stim.width * 0.48,
      fill_color: stim.color,
      line_color: stim.color,
      startX: posX,
      startY: posY,
    };

    // Push the word into the slide
    screen_elements.push(rect_object);
    screen_elements.push(image_object);
  });

  // Return the array of screen elements.
  return screen_elements;
}


export function cueColorScreen(
  color: string,
  condition: string,
  size: number = 100
) {

  

  let displaySign: string = "";
  switch (condition) {
    case "positive":
      displaySign = "+";
      break;
    case "negative":
      displaySign = "–";
      break;
    case "neutral":
      displaySign = "=";
      break;
    default:
      console.error("Invalid condition");
  }

  let colorElement = {
    obj_type: "circle",
    radius: size * 1.5,
    line_color: "black",
    fill_color: color,
  };

  let signElement = {
    obj_type: "text",
    content: displaySign,
    font: `${size}px Arial`,
    color: "black",
  };

  return [colorElement, signElement];
}

export function cueLocationScreen(
    location: string,
    condition: string,
    width: number = 100
) {

  let imageName = condition === "neutral" ? 
  "assets/images/stimuli/neutral.png" : 
  `assets/images/stimuli/${condition}-${location}.png`;

    let locationElement = {
      obj_type: "image", // means a rectangle
      file: imageName,
      image_width: width
    };

    return [locationElement];
}
