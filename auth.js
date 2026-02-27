// ========== AUTH.JS - Shared Auth & Live State Logic ==========

const AUTH = {

    // ---- Keys ----
    KEYS: {
        USERS: 'tje_users',
        USER_SESSION: 'tje_user_session',
        ADMIN_SESSION: 'tje_admin_session',
        LIVE_STATE: 'tje_live_state',
        NOTIFICATIONS: 'tje_notifications'
    },

    // ---- Admin credentials (hardcoded, change as needed) ----
    ADMIN: {
        username: 'james_admin',
        password: 'TJE@admin2024!'
    },

    // ---- Users ----
    getUsers() {
        return JSON.parse(localStorage.getItem(this.KEYS.USERS) || '[]');
    },
    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },
    registerUser(name, email, password) {
        const users = this.getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'An account with this email already exists.' };
        }
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password,
            joinedAt: new Date().toISOString(),
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        };
        users.push(user);
        this.saveUsers(users);
        this.addNotification({ type: 'signup', message: `New user signed up: ${name} (${email})`, time: new Date().toISOString() });
        return { success: true, user };
    },
    loginUser(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!user) return { success: false, error: 'Invalid email or password.' };
        localStorage.setItem(this.KEYS.USER_SESSION, JSON.stringify(user));
        return { success: true, user };
    },
    logoutUser() {
        localStorage.removeItem(this.KEYS.USER_SESSION);
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.KEYS.USER_SESSION) || 'null');
    },

    // ---- Admin ----
    loginAdmin(username, password) {
        if (username === this.ADMIN.username && password === this.ADMIN.password) {
            localStorage.setItem(this.KEYS.ADMIN_SESSION, JSON.stringify({ username, loginAt: new Date().toISOString() }));
            return { success: true };
        }
        return { success: false, error: 'Invalid admin credentials.' };
    },
    logoutAdmin() {
        localStorage.removeItem(this.KEYS.ADMIN_SESSION);
    },
    isAdminLoggedIn() {
        return !!localStorage.getItem(this.KEYS.ADMIN_SESSION);
    },

    // ---- Live State ----
    getLiveState() {
        return JSON.parse(localStorage.getItem(this.KEYS.LIVE_STATE) || JSON.stringify({
            isLive: false,
            title: '',
            description: '',
            platform: '',
            streamUrl: '',
            startedAt: null
        }));
    },
    setLive(title, description, platform, streamUrl) {
        const state = { isLive: true, title, description, platform, streamUrl, startedAt: new Date().toISOString() };
        localStorage.setItem(this.KEYS.LIVE_STATE, JSON.stringify(state));
        this.addNotification({ type: 'live', message: `Admin went LIVE: ${title}`, time: new Date().toISOString() });
    },
    endLive() {
        const state = { isLive: false, title: '', description: '', platform: '', streamUrl: '', startedAt: null };
        localStorage.setItem(this.KEYS.LIVE_STATE, JSON.stringify(state));
    },

    // ---- Notifications ----
    getNotifications() {
        return JSON.parse(localStorage.getItem(this.KEYS.NOTIFICATIONS) || '[]');
    },
    addNotification(n) {
        const notes = this.getNotifications();
        notes.unshift(n);
        localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(notes.slice(0, 100)));
    },
    clearNotifications() {
        localStorage.removeItem(this.KEYS.NOTIFICATIONS);
    }
};
