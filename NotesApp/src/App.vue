<script setup>
import { ref } from "vue";

const showModal = ref(false);
const newNote = ref("");
const notesGroup = ref([]);

function toggleModal() {
  showModal.value = !showModal.value;
}

function getRandomLightColor() {
  // Define contrast threshold (e.g., WCAG recommends at least 4.5 for normal text)
  const threshold = 4.5;
  // Charcoal black defined as an RGB object for #333333
  const charcoal = { r: 51, g: 51, b: 51 };

  // Convert HSL to RGB (returns an object with r, g, b values in 0-255)
  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) {
      r = c; g = x; b = 0;
    } else if (h < 120) {
      r = x; g = c; b = 0;
    } else if (h < 180) {
      r = 0; g = c; b = x;
    } else if (h < 240) {
      r = 0; g = x; b = c;
    } else if (h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  // Calculate relative luminance based on sRGB values.
  function getRelativeLuminance({ r, g, b }) {
    function convert(channel) {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    const R = convert(r);
    const G = convert(g);
    const B = convert(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  // Contrast ratio between two relative luminances
  function getContrastRatio(lum1, lum2) {
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Precompute the luminance for charcoal black
  const charcoalLum = getRelativeLuminance(charcoal);

  let rgb, lum, contrast;
  do {
    // Generate a random HSL color that is light:
    // Hue: any value (0-360)
    // Saturation: between 70% and 100% (vivid colors)
    // Lightness: between 70% and 95% (ensures the color is light)
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 31) + 70; // 70 to 100%
    const l = Math.floor(Math.random() * 26) + 70; // 70 to 95%

    rgb = hslToRgb(h, s, l);
    lum = getRelativeLuminance(rgb);
    contrast = getContrastRatio(lum, charcoalLum);
  } while (contrast < threshold);

  // Convert RGB to hex string
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  return (
    "#" +
    componentToHex(rgb.r) +
    componentToHex(rgb.g) +
    componentToHex(rgb.b)
  );
}

function addNote() {
  if (newNote.value.length > 9) {
    notesGroup.value.push({
      id: Math.floor(Math.random() * 1000),
      text: newNote.value,
      date: new Date(),
      backgroundColor: getRandomLightColor()
    })
    showModal.value = false;
    newNote.value = "";
  }
  else {
    alert("Minimum of 10 characters required.")
  }

}
</script>

<template>
  <main>
    <div v-if="showModal" class="overlay">
      <div class="modal">
        <textarea v-model.trim="newNote" name="note" id="note" cols="30" rows="10"></textarea>
        <button @click="addNote">Add Note</button>
        <button @click="toggleModal" class="close">Close</button>
      </div>
    </div>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="toggleModal">+</button>
      </header>
      <div class="cards-container">
        <div v-for="note in notesGroup"
        :key="note.id"
        class="card"
        :style="{backgroundColor: note.backgroundColor}">
          <p class="main-text">{{ note.text }}</p>
          <p class="date">{{note.date.toLocaleDateString("en-US")}}</p>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    height: 100vh;
    width: 100vw
  }

  .container {
    max-width: 1000px;
    padding: 10px;
    margin: 0 auto
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 75px;
  }

  header button {
    border: none;
    padding: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: rgb(21,20,20);
    border-radius: 100%;
    color: white;
    font-size: 20px;
  }

  .card {
    width: 225px;
    height: 225px;
    background-color: rgb(237, 182, 44);
    color: rgb(20, 20, 20);
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .date {
    font-size: 12.5px;
    font-weight: bold;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.77);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    width: 750px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .modal button {
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
    background-color: blueviolet;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 15px
  }

  .modal .close {
    background-color: rgb(193, 15, 15);
    margin-top: 7px;
  }
</style>