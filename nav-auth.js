// nav-auth.js — injects Sign In / My Account button into navbar on every page
(function () {
    const user = AUTH.getCurrentUser();
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    // Remove any previously injected auth li to avoid duplicates
    const existing = document.getElementById('navAuthItem');
    if (existing) existing.remove();

    const li = document.createElement('li');
    li.id = 'navAuthItem';

    if (user) {
        li.innerHTML = `<a href="user-portal.html" style="display:flex;align-items:center;gap:0.4rem;background:rgba(244,162,97,0.13);border:1px solid rgba(244,162,97,0.25);border-radius:50px;padding:0.35rem 0.9rem;font-weight:600;color:var(--dark-color,#264653);">
            <i class="fa-solid fa-circle-user" style="color:#f4a261;"></i>
            <span>${user.name.split(' ')[0]}</span>
        </a>`;
    } else {
        li.innerHTML = `<a href="user-auth.html" style="display:flex;align-items:center;gap:0.4rem;background:rgba(244,162,97,0.1);border:1px solid rgba(244,162,97,0.2);border-radius:50px;padding:0.35rem 0.9rem;font-weight:600;color:var(--dark-color,#264653);">
            <i class="fa-solid fa-right-to-bracket" style="color:#f4a261;"></i>
            <span>Sign In</span>
        </a>`;
    }

    // Insert at the end (after Contact)
    navMenu.appendChild(li);

    // Live banner injection on all pages
    const liveState = AUTH.getLiveState();
    if (liveState.isLive) {
        const existing = document.getElementById('globalLiveBanner');
        if (!existing) {
            const banner = document.createElement('div');
            banner.id = 'globalLiveBanner';
            banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;text-align:center;padding:0.45rem 1rem;font-size:0.78rem;font-weight:700;letter-spacing:0.02em;display:flex;align-items:center;justify-content:center;gap:0.5rem;';
            banner.innerHTML = `
                <span style="width:7px;height:7px;border-radius:50%;background:#fff;animation:glb 1.2s infinite;flex-shrink:0;"></span>
                <span>🔴 LIVE NOW: ${liveState.title} on ${liveState.platform}</span>
                <a href="live.html" style="color:#fff;text-decoration:underline;font-size:0.72rem;margin-left:0.5rem;">Watch →</a>
                <style>@keyframes glb{0%,100%{opacity:1}50%{opacity:0.35}}</style>`;
            document.body.prepend(banner);
            document.body.style.paddingTop = '34px';
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.style.top = '34px';
        }
    }
})();
