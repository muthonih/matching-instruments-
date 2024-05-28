const instruments = document.querySelectorAll('#instruments .item');
const tribes = document.querySelectorAll('#tribes .item');
let draggedItem = null;

instruments.forEach(item => {
    item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => {
            item.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });
});

tribes.forEach(tribe => {
    tribe.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tribe.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
            tribe.appendChild(draggedItem);
        }
    });
});

document.getElementById('checkButton').addEventListener('click', () => {
    const correctMatches = {
        olwika: 'luhya',
        abu: 'luo',
        chivoti: 'mijikenda'
    };

    tribes.forEach(tribe => {
        const instrument = tribe.querySelector('.item');
        const feedback = document.createElement('span');
        feedback.classList.add('feedback');

        if (instrument && correctMatches[instrument.id] === tribe.dataset.tribe) {
            feedback.textContent = '✓';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = '✗';
            feedback.style.color = 'red';
        }

        // Remove previous feedback if any
        const existingFeedback = tribe.querySelector('.feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        tribe.appendChild(feedback);
    });
});

document.getElementById('resetButton').addEventListener('click', () => {
    // Move all items back to the instruments column
    instruments.forEach(item => {
        document.getElementById('instruments').appendChild(item);
    });

    // Remove all feedback symbols
    const feedbacks = document.querySelectorAll('.feedback');
    feedbacks.forEach(feedback => {
        feedback.remove();
    });
});
