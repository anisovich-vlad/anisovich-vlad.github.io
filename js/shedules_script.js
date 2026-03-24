    // ==================== ФУНКЦИИ ГРУППИРОВКИ ====================
    function getWeekNumber(dateStr) {
        const d = new Date(dateStr);
        const dayOfWeek = d.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
        const monday = new Date(d);
        monday.setDate(d.getDate() + diffToMonday);
        return monday.toISOString().slice(0, 10);
    }

    function formatDateRange(lessons) {
        if (!lessons.length) return "";
        const first = new Date(lessons[0].date);
        const last = new Date(lessons[lessons.length - 1].date);
        const options = { day: 'numeric', month: 'short' };
        const firstStr = first.toLocaleDateString('ru-RU', options);
        const lastStr = last.toLocaleDateString('ru-RU', options);
        return firstStr === lastStr ? firstStr : `${firstStr} – ${lastStr}`;
    }

    function renderSchedule(lessonsData) {
        const root = document.getElementById('scheduleRoot');
        if (!root) return;

        if (!lessonsData || lessonsData.length === 0) {
            root.innerHTML = '<div style="text-align:center; padding:40px;">Нет данных для этой четверти</div>';
            return;
        }

        const weeksMap = new Map();
        lessonsData.forEach(lesson => {
            const weekKey = getWeekNumber(lesson.date);
            if (!weeksMap.has(weekKey)) weeksMap.set(weekKey, []);
            weeksMap.get(weekKey).push(lesson);
        });

        const weeks = Array.from(weeksMap.entries())
            .map(([weekStart, lessons]) => ({ weekStart, lessons }))
            .sort((a, b) => a.weekStart.localeCompare(b.weekStart));

        root.innerHTML = '';

        weeks.forEach((week, idx) => {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'week';
            if (idx === 0) weekDiv.classList.add('open');

            const header = document.createElement('div');
            header.className = 'week-header';

            const titleSpan = document.createElement('span');
            titleSpan.className = 'week-title';
            titleSpan.textContent = `Неделя ${idx + 1}`;

            const datesSpan = document.createElement('span');
            datesSpan.className = 'week-dates';
            datesSpan.textContent = formatDateRange(week.lessons);

            const iconSpan = document.createElement('span');
            iconSpan.className = 'toggle-icon';
            iconSpan.textContent = '▼';

            header.appendChild(titleSpan);
            header.appendChild(datesSpan);
            header.appendChild(iconSpan);

            header.addEventListener('click', () => {
                weekDiv.classList.toggle('open');
            });

            const contentDiv = document.createElement('div');
            contentDiv.className = 'week-content';

            week.lessons.forEach(lesson => {
                const card = document.createElement('div');
                card.className = 'lesson-card';

                const dateObj = new Date(lesson.date);
                const formattedDate = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' }).replace(/^./, match => match.toUpperCase());

                const dateDiv = document.createElement('div');
                dateDiv.className = 'lesson-date';
                dateDiv.textContent = formattedDate;

                const topicDiv = document.createElement('div');
                topicDiv.className = 'lesson-topic';
                topicDiv.textContent = lesson.topic;

                const homeworkDiv = document.createElement('div');
                homeworkDiv.className = 'lesson-homework';
                homeworkDiv.innerHTML = `<strong>📖 Домашнее задание:</strong> ${lesson.homework}`;

                card.appendChild(dateDiv);
                card.appendChild(topicDiv);
                card.appendChild(homeworkDiv);
                contentDiv.appendChild(card);
            });

            weekDiv.appendChild(header);
            weekDiv.appendChild(contentDiv);
            root.appendChild(weekDiv);
        });
    }

// ==================== ПЕРЕКЛЮЧЕНИЕ ЧЕТВЕРТЕЙ ====================
let currentQuarter = '1';

function setActiveButton(quarter) {
    document.querySelectorAll('.quarter-btn').forEach(btn => {
        if (btn.dataset.quarter === quarter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function switchQuarter(quarter) {
    currentQuarter = quarter;
    const data = quartersData[quarter];
    renderSchedule(data);
    setActiveButton(quarter);
}

// Навешиваем обработчики на кнопки
document.querySelectorAll('.quarter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const quarter = btn.dataset.quarter;
        if (quarter) {
            switchQuarter(quarter);
            // Обновляем URL без перезагрузки (опционально)
            const url = new URL(window.location);
            url.searchParams.set('quarter', quarter);
            window.history.pushState({}, '', url);
        }
    });
});

// Инициализация: читаем quarter из URL
const urlParams = new URLSearchParams(window.location.search);
const quarterFromUrl = urlParams.get('quarter');
if (quarterFromUrl && quartersData[quarterFromUrl]) {
    switchQuarter(quarterFromUrl);
} else {
    switchQuarter('1');
}