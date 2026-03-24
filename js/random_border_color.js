// random_border_color.js
document.querySelectorAll('.rand-bord-color').forEach(el => {
  // Генерируем случайный HEX-цвет
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  el.style.borderColor = randomColor;
});