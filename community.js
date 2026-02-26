function vote(element, percentage) {
    const pollOptions = element.parentElement.querySelectorAll('.poll-option');
    
    pollOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.7';
    });
    
    element.style.opacity = '1';
    element.style.transform = 'scale(1.02)';
    
    showNotification('Vote recorded! Thank you for participating.');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2a9d8f;
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const forumCategories = document.querySelectorAll('.forum-category .btn');
    forumCategories.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.forum-category').querySelector('h3').textContent;
            alert(`Opening ${category} forum...\n\nThis would navigate to the forum section.`);
        });
    });

    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentCount = parseInt(this.textContent.trim());
            this.textContent = ` ${currentCount + 1}`;
            this.style.background = '#e76f51';
            this.style.color = 'white';
            this.style.borderColor = '#e76f51';
            showNotification('Liked!');
        });
    });

    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Comment section would open here');
        });
    });

    const quizButton = document.querySelector('.quiz-card .btn');
    if (quizButton) {
        quizButton.addEventListener('click', function() {
            alert('Quiz starting...\n\nThis would launch the interactive quiz.');
        });
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
