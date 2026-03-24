// random_article_blog.js

// Функция для получения одного случайного элемента
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const randomArticle = getRandomItem(articles);
const recommendationCard = document.querySelector('.card.rand-news');

if (recommendationCard) {
  // Очищаем карточку
  recommendationCard.innerHTML = '';

  // Создаём бейдж
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = 'Рекомендация';

  // Создаём заголовок
  const title = document.createElement('h3');
  title.className = 'random-title';
  title.style.marginBottom = '8px';
  title.textContent = randomArticle.title;

  // Создаём описание
  const desc = document.createElement('p');
  desc.className = 'random-desc';
  desc.textContent = randomArticle.description || 'Интересный материал для изучения.';

  // Создаём кнопку "Подробнее"
  const link = document.createElement('a');
  link.href = randomArticle.pageLink;
  link.className = 'btn btn-outline random_href';
  link.style.marginTop = '10px';
  link.style.width = '40%';
  link.textContent = 'Подробнее';

  // Создаём отступ
  const br = document.createElement('br');
  
  // Добавляем все элементы в карточку
  recommendationCard.appendChild(badge);
  recommendationCard.appendChild(title);
  recommendationCard.appendChild(desc);
  recommendationCard.appendChild(br);
  recommendationCard.appendChild(link);
} else {
  console.error('Элемент .card.rand-news не найден');
}