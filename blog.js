document.addEventListener('DOMContentLoaded', function() {

    // ========== READ MORE EXPAND/COLLAPSE ==========
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.blog-card');
            const para = card.querySelector('.blog-content p');
            const isExpanded = para.classList.toggle('expanded');
            this.textContent = isExpanded ? 'Read Less ↑' : 'Read More →';
        });
    });
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            blogCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    const paginationNumbers = document.querySelectorAll('.pagination-number');
    paginationNumbers.forEach(number => {
        number.addEventListener('click', function() {
            paginationNumbers.forEach(num => num.classList.remove('active'));
            this.classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
