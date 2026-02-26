function rsvpEvent(button) {
    const eventCard = button.closest('.event-card');
    const eventTitle = eventCard.querySelector('h3').textContent;
    
    if (button.textContent === 'RSVP Now') {
        button.textContent = 'RSVP Confirmed ✓';
        button.style.background = '#2a9d8f';
        showNotification(`You're registered for: ${eventTitle}`);
    } else {
        button.textContent = 'RSVP Now';
        button.style.background = '';
        showNotification('RSVP cancelled');
    }
}

function addToCalendar() {
    showNotification('Calendar event created! Check your calendar app.');
}

function toggleNotification(button) {
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        showNotification('Notifications enabled for this event');
    } else {
        showNotification('Notifications disabled');
    }
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
    const archiveCards = document.querySelectorAll('.archive-card');
    
    archiveCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`Playing: ${title}\n\nThis would open the video player.`);
        });
    });

    const chatForm = document.querySelector('.chat-input-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.chat-input');
            const message = input.value.trim();
            
            if (message) {
                const chatMessages = document.getElementById('chatMessages');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message';
                messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                input.value = '';
            }
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
