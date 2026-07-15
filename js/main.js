/* ==========================================================================
   DATABASE RASIO KOMPOSISI MENU KOPI
   ========================================================================== */
const brewData = {
  flatwhite: {
    name: "Flat White",
    desc: "Kombinasi klasik dengan lapisan susu berbusa sangat tipis (microfoam) yang menjaga kekuatan rasa espresso.",
    espresso: 30,
    milk: 60,
    foam: 10
  },
  latte: {
    name: "Caffè Latte",
    desc: "Minuman susu dominan bertekstur manis alami berkat proses pemanasan susu uap yang berlimpah dan foam tebal.",
    espresso: 20,
    milk: 70,
    foam: 10
  },
  cortado: {
    name: "Cortado",
    desc: "Minuman khas Spanyol dengan komposisi seimbang yang kuat guna meredam keasaman tinggi espresso tanpa menyembunyikan rasanya.",
    espresso: 50,
    milk: 50,
    foam: 0
  }
};

/* ==========================================================================
   FUNGSI UPDATE LAYER GELAS
   ========================================================================== */
function updateBrew(menuKey) {
  const data = brewData[menuKey];
  if (!data) return;
  
  // Update nilai numerik teks di layar
  document.getElementById('ratio-name').innerText = data.name;
  document.getElementById('ratio-desc').innerText = data.desc;
  document.getElementById('val-espresso').innerText = data.espresso + "%";
  document.getElementById('val-milk').innerText = data.milk + "%";
  document.getElementById('val-foam').innerText = data.foam + "%";

  // Animasi transisi tinggi lapisan gelas fisik CSS
  document.getElementById('layer-espresso').style.height = data.espresso + "%";
  document.getElementById('layer-milk').style.height = data.milk + "%";
  document.getElementById('layer-foam').style.height = data.foam + "%";
}

/* ==========================================================================
   INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Set Default Gelas Pertama Kali (Flat White)
  document.getElementById('layer-espresso').style.height = "30%";
  document.getElementById('layer-milk').style.height = "60%";
  document.getElementById('layer-foam').style.height = "10%";

  // 2. Event Listener untuk Menu Selector
  const menuButtons = document.querySelectorAll('.menu-item');
  menuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Hilangkan class active dari tombol lama
      menuButtons.forEach(btn => btn.classList.remove('active'));
      
      // Tambahkan class active ke tombol yang sedang diklik
      const currentButton = event.currentTarget;
      currentButton.classList.add('active');
      
      // Update data visualizer berdasarkan attribute "data-menu"
      const menuKey = currentButton.getAttribute('data-menu');
      updateBrew(menuKey);
    });
  });

  // 3. Mekanisme Scroll Reveal (Fade-In-Up)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1 // Terpicu ketika 10% elemen masuk viewport
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
});
