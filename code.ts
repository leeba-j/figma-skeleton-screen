// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "duplicate-frame") {
    const nodes = figma.currentPage.selection;
    nodes.forEach((node) => {
     
      const frame = figma.createFrame();
      frame.x = node.width + node.x + 100;
      frame.y = node.y;
      frame.resize(node.width, node.height);

      if ("children" in node)
        node.children.forEach((child,index,array) => {
          const length = array.length;
          const colour = index/length;
          const skelement = figma.createRectangle();
          skelement.resize(child.width, child.height);
          skelement.x = child.x;
          skelement.y = child.y;
          skelement.cornerRadius = 6;
          skelement.fills = [
            {
              type: "GRADIENT_LINEAR",
              gradientTransform: [
                [0.71, -399, 0.17],
                [0.006, 0.23, 0.4],
              ],
              gradientStops: [
                {
                  color: {
                    r: colour,
                    g: 0,
                    b: 0,
                    a: 1,
                  },
                  position: 0,
                },
                {
                  color: {
                    r: colour,
                    g: 1,
                    b: 0,
                    a: 0.5,
                  },
                  position: 0.53125,
                },
                {
                  color: {
                    r: colour,
                    g: 0,
                    b: 1,
                    a: 1,
                  },
                  position: 0.99,
                },
              ],
            },
          ];
          frame.appendChild(skelement)
        });
    });
  }
  figma.closePlugin();
};

// If the plugins isn't run in Figma, run this code
