const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data.js");
const audioDir = path.join(root, "audio", "sentences");
const tmpDir = path.join(root, ".audio-tmp");
const voice = process.env.CANTONESE_VOICE || "Sinji";
const day = process.env.DAY || "";

fs.mkdirSync(audioDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), sandbox);

const sentences = sandbox.window.STUDY_ITEMS.filter(
  (item) => item.questionTypes?.includes("sentenceJyutping") && (!day || (item.day || "day1") === day)
);

for (const item of sentences) {
  const text = item.cantonese || item.traditional;
  const aiffPath = path.join(tmpDir, `${item.id}.aiff`);
  const m4aPath = path.join(audioDir, `${item.id}.m4a`);

  if (fs.existsSync(m4aPath) && fs.statSync(m4aPath).size > 0) {
    console.log(`${item.id}: skipped existing audio`);
    continue;
  }

  execFileSync("say", ["-v", voice, "-o", aiffPath, "--", text], { stdio: "ignore" });
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", aiffPath, m4aPath], { stdio: "ignore" });
  fs.rmSync(aiffPath, { force: true });
  console.log(`${item.id}: ${text}`);
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log(`Generated ${sentences.length} audio files in ${path.relative(root, audioDir)} using ${voice}.`);
