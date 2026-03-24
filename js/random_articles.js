// random-articles.js

// Функция для получения случайных элементов из массива
function getRandomItems(arr, count) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

// Функция для создания HTML карточки
function createCard(article) {
  const card = document.createElement('a');
  card.href = article.pageLink;
  card.className = 'related-card';

  const img = document.createElement('img');
  img.src = article.imgSrc;
  img.alt = article.imgAlt;
  img.className = 'related-img';

  const title = document.createElement('p');
  title.textContent = article.title;

  card.appendChild(img);
  card.appendChild(title);
  return card;
}

// Выбираем три случайные статьи
const randomArticles = getRandomItems(articles, 3);

// Находим контейнер
const container = document.querySelector('.related-grid');
if (!container) {
  console.error('Контейнер с классом related-grid не найден');
} else {
  container.innerHTML = '';
  randomArticles.forEach(article => {
    container.appendChild(createCard(article));
  });
}