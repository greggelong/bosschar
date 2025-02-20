let img;
let vscale;
let cchrs = ["注", "意", "艺", "术", "工", "人", "们"];
let mic;
let micbutt;
let cnv;

function preload() {
  img = loadImage("worker.jpg");
}

function setup() {
  cnv = createCanvas(800, 800);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  vscale = width / 40;
  pixelDensity(1);
  img.resize(width / vscale, height / vscale); //
  print(vscale, width / vscale, img.width);
  frameRate(10);
  // Set up microphone input
  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start(); // Start capturing audio
  micbutt = createButton("Press to Start Mic");
  micbutt.style("font-size", "48px");
  micbutt.style("background-color", "yellow");

  micbutt.position(width / 2, height / 2);
  micbutt.mouseClicked(unlockAudioContext);
  textAlign(LEFT, TOP);
}

function draw() {
  background(40);

  //noStroke()

  // loop through the small image
  for (let y = 0; y < img.height; y++) {
    // for each y there are some x's
    for (let x = 0; x < img.width; x++) {
      let iclr = img.get(x, y);
      noStroke();
      fill(iclr);
      if ([22, 23].includes(y) & [21, 22, 23, 24, 25, 26, 27].includes(x)) {
        // Get the current volume level from the microphone
        let vol = mic.getLevel();

        // Map the volume to n between 1 and 5 (adjust these numbers to suit your needs)
        n = map(vol, 0, 0.1, 0, 255); // Adjust max volume threshold as needed

        fill(n, 0, 0);
      }

      //rect(x*vscale,y*vscale,vscale+1,vscale+1)
      textSize(vscale);
      text(random(cchrs), x * vscale, y * vscale);
    }
  }
  //noLoop()
}
function unlockAudioContext() {
  micbutt.hide();
  const audioCtx = getAudioContext();
  if (audioCtx.state === "suspended") {
    audioCtx
      .resume()
      .then(() => {
        console.log("Audio context unlocked");
      })
      .catch((err) => {
        console.error("Failed to unlock audio context:", err);
      });
  }
}
