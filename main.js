// Data Mockups
const currentUser = {
    name: "Rúvel Maneiro",
    role: "Consultor IT / Ventas Industriales",
    company: "Oterventas",
    handle: "@Oterventas",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ruvel"
};

const recentContacts = [
    { id: 1, name: "Félix Aranzábal", company: "Logística Global S.A.", time: "Hoy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
    { id: 2, name: "Elena Valdés", company: "Innovation Hub", time: "Ayer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
    { id: 3, name: "Oscar Mendoza", company: "Sistemas Industriales S.L.", time: "12 Oct", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar" }
];

const allContacts = [
    { id: 4, name: "Elena Rodriguez", role: "Chief Product Officer", company: "STARLIGHT FINTECH", linkedin: "linkedin.com/in/elena-rod", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR" },
    { id: 5, name: "Marcus Thorne", role: "Head of Investment", company: "VORTEX CAPITAL", linkedin: "linkedin.com/in/mthorne", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
    { id: 6, name: "Sophia Chen", role: "Creative Director", company: "PIXEL & GRAIN", linkedin: "linkedin.com/in/schen", synced: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" },
    { id: 7, name: "David Kim", role: "Full Stack Engineer", company: "HYPERION LABS", linkedin: "linkedin.com/in/dkim", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }
];

// State
let currentScreen = 'my-qard';

// DOM Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

// Screens
const screens = {
    'my-qard': () => `
        <div class="screen-fade">
            <header class="top-bar">
                <div class="top-left">
                    <button class="btn-hamburger">
                        <i data-lucide="menu"></i>
                    </button>
                    <span class="logo-q">Qard</span>
                </div>
                <div class="user-avatar-mini">
                    <img src="${currentUser.avatar}" alt="User">
                </div>
            </header>

            <div class="qr-card-container">
                <div class="qr-frame">
                    <div class="qr-code-display">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://qard.app/ruvel-maneiro" alt="QR Code">
                    </div>
                    <div class="qr-user-info">
                        <h2>${currentUser.name}</h2>
                        <p class="role">${currentUser.role}</p>
                        <p class="company">${currentUser.company}</p>
                        <div class="handle-pill">${currentUser.handle}</div>
                    </div>
                    <button class="btn-linkedin-sync" style="background:#0077b5; margin-top:20px; width:auto; padding: 10px 20px;">
                        <i data-lucide="linkedin"></i>
                        Perfil LinkedIn
                    </button>
                </div>
            </div>

            <div class="main-action-area">
                <button class="btn-scan">
                    <i data-lucide="scan"></i>
                    ESCANEAR QARD
                </button>
            </div>

            <section class="contact-list-section">
                <div class="list-header">
                    <h3>Contactos Recientes</h3>
                    <button class="btn-view-all" onclick="renderScreen('contacts')">Ver todos</button>
                </div>
                
                <div class="contacts-grid">
                    ${recentContacts.map(c => `
                        <div class="contact-card" onclick="window.showContactDetail(${c.id})">
                            <div class="contact-avatar">
                                <img src="${c.avatar}" alt="${c.name}">
                            </div>
                            <div class="contact-info">
                                <div class="name">${c.name}</div>
                                <div class="meta">${c.company}</div>
                            </div>
                            <div class="contact-time">
                                <span class="time">${c.time}</span>
                                <i data-lucide="chevron-right" size="16"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `,
    'contacts': () => `
        <div class="screen-fade">
            <header class="top-bar">
                <div class="top-left">
                    <button class="btn-hamburger">
                        <i data-lucide="menu"></i>
                    </button>
                    <span class="logo-q">Qard</span>
                </div>
                <div class="user-avatar-mini">
                    <img src="${currentUser.avatar}" alt="User">
                </div>
            </header>

            <h1 class="section-title">Network</h1>
            <p class="section-subtitle">Gestiona tu red profesional y sincroniza con LinkedIn.</p>

            <div class="search-container">
                <div class="search-bar">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Buscar por nombre, empresa o cargo">
                </div>
            </div>

            <div class="filters-scroll">
                <button class="filter-chip active">Qard Network</button>
                <button class="filter-chip">Phone Sync</button>
                <button class="filter-chip">Industria</button>
            </div>

            <div class="contacts-detailed-list">
                ${allContacts.map(c => `
                    <div class="contact-card-large" onclick="window.showContactDetail(${c.id})">
                        <div class="card-top">
                            <img src="${c.avatar}" class="large-avatar" alt="${c.name}">
                            <div class="card-top-info">
                                <h4>${c.name} ${c.synced ? '<span class="sync-badge">SYNCED</span>' : ''}</h4>
                                <p class="role-tag">${c.role}</p>
                                <div class="company-line">
                                    <i data-lucide="building-2" size="14"></i>
                                    <span>${c.company}</span>
                                </div>
                            </div>
                            <button class="btn-menu-dot">
                                <i data-lucide="share-2"></i>
                            </button>
                        </div>
                        <div class="action-buttons-grid">
                            <button class="btn-contact-action" style="background:#0077b5; color:white;">
                                <i data-lucide="linkedin" style="color:white"></i>
                                <span>LinkedIn</span>
                            </button>
                            <button class="btn-contact-action">
                                <i data-lucide="mail"></i>
                                <span>Email</span>
                            </button>
                            <button class="btn-contact-action">
                                <i data-lucide="phone"></i>
                                <span>Whatsapp</span>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="contact-overlay" class="detail-overlay"></div>
        </div>
    `,
    'scan': () => `
        <div class="screen-fade" id="scan-view" style="height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center;">
            <div id="scan-frame" style="width: 250px; height: 250px; border: 2px solid var(--electric-blue); border-radius: 30px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer;">
                <div id="scan-line" style="position: absolute; top: 0; width: 100%; height: 2px; background: var(--electric-blue); box-shadow: 0 0 20px var(--electric-blue); animation: scanning 2s ease-in-out infinite;"></div>
                <i data-lucide="scan" size="80" style="color: rgba(59, 130, 246, 0.3)"></i>
            </div>
            
            <div id="scan-status-container" style="margin-top: 32px;">
                <h2 style="font-family: var(--font-heading);">Buscando Qard...</h2>
                <p style="color: var(--text-muted); margin-top: 8px;">Alinea el código QR dentro del recuadro.</p>
            </div>

            <div id="new-contact-result" style="display: none; width: 100%;">
                <div class="contact-card-large" style="margin: 0; background: var(--navy); border: 1px solid var(--electric-blue);">
                    <div class="card-top">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alejandro" class="large-avatar" alt="Found Contact">
                        <div class="card-top-info" style="text-align: left;">
                            <h4>Alejandro Sanz</h4>
                            <p class="role-tag">Director de Proyectos</p>
                            <div class="company-line">
                                <i data-lucide="building-2" size="14"></i>
                                <span>Construcciones Modernas</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-scan" id="btn-save-contact" style="height: 50px; font-size: 14px; margin-top:16px;">
                        <i data-lucide="user-plus"></i>
                        GUARDAR EN QARD
                    </button>
                    <button class="btn-linkedin-sync" style="background:#0077b5; margin-top:10px;">
                        <i data-lucide="linkedin"></i>
                        Vincular LinkedIn
                    </button>
                </div>
            </div>

            <style>
                @keyframes scanning {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
                .scan-success {
                    animation: pulse-blue 0.5s ease-out;
                    border-color: #4ade80 !important;
                }
            </style>
        </div>
    `,
    'config': () => `
        <div class="screen-fade" style="padding: 24px;">
            <h1 class="section-title" style="padding: 0;">Configuración</h1>
            <div style="margin-top: 32px;">
                <div style="background: var(--card-bg); border-radius: 20px; padding: 20px; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(255,255,255,0.05);">
                    <img src="${currentUser.avatar}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--electric-blue);">
                    <div>
                        <h4 style="font-size: 18px;">${currentUser.name}</h4>
                        <p style="color: var(--text-gray); font-size: 14px;">Cuenta Sincronizada con LinkedIn</p>
                    </div>
                </div>
            </div>
            <div style="margin-top:20px; background:var(--card-bg); border-radius:20px; padding:20px;">
                <h3 style="font-size:16px; margin-bottom:12px;">Sincronización Automática</h3>
                <p style="font-size:13px; color:var(--text-muted);">Actualizar datos de contactos automáticamente cuando cambien su perfil en Qard o LinkedIn.</p>
            </div>
        </div>
    `
};

// Functions
window.showContactDetail = (contactId) => {
    const contact = [...recentContacts, ...allContacts].find(c => c.id === contactId);
    if (!contact) return;

    const overlay = document.getElementById('contact-overlay') || document.querySelector('.detail-overlay');
    if (!overlay) return;

    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <button class="btn-close-detail" onclick="this.parentElement.style.display='none'">
            <i data-lucide="x"></i>
        </button>
        
        <div class="contact-card-large" style="margin-top: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
            <div class="card-top">
                <img src="${contact.avatar}" class="large-avatar" alt="${contact.name}">
                <div class="card-top-info">
                    <h2 style="font-size: 24px; font-family: var(--font-heading);">${contact.name}</h2>
                    <p class="role-tag">${contact.role || 'Contacto de Agenda'}</p>
                    <div class="company-line">
                        <i data-lucide="building-2" size="14"></i>
                        <span>${contact.company}</span>
                    </div>
                </div>
            </div>
            
            <div class="share-qr-section" style="background: rgba(255,255,255,0.02); padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
                <h3 style="font-size:11px; letter-spacing:1px;">COMPARTIR TARJETA DIGITAL</h3>
                <div class="mini-qr" style="margin: 10px 0;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QardID:${contact.id}" alt="Contact QR">
                </div>
                <p style="font-size: 11px; color: var(--text-muted); text-align: center;">Muestra este QR para que otros agreguen a ${contact.name.split(' ')[0]} vía Qard.</p>
            </div>

            <button class="btn-linkedin-sync" style="background:#0077b5; margin-top:20px;">
                <i data-lucide="linkedin"></i>
                Ver Perfil LinkedIn
            </button>
            <p style="text-align: center; color: #4ade80; font-size: 11px; margin-top: 16px; font-weight: 600;">
                <i data-lucide="refresh-cw" size="10" style="margin-right:4px;"></i>
                Sincronización en tiempo-real activa
            </p>
        </div>
    `;
    lucide.createIcons();
};

function renderScreen(screenId) {
    currentScreen = screenId;
    mainContent.innerHTML = screens[screenId]();
    lucide.createIcons();
    
    // Update active nav state
    navItems.forEach(nav => {
        if (nav.dataset.screen === screenId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    mainContent.scrollTop = 0;

    // Actions for scan screen
    if (screenId === 'scan') {
        const frame = document.getElementById('scan-frame');
        frame.addEventListener('click', () => {
            frame.classList.add('scan-success');
            document.getElementById('scan-line').style.display = 'none';
            document.getElementById('scan-status-container').style.display = 'none';
            setTimeout(() => {
                document.getElementById('new-contact-result').style.display = 'block';
                lucide.createIcons();
                document.getElementById('btn-save-contact').addEventListener('click', () => {
                    alert('¡Contacto guardado y sincronizado!');
                    renderScreen('contacts');
                });
            }, 600);
        });
    }
}

// Nav Listeners
navItems.forEach(nav => {
    nav.addEventListener('click', () => {
        renderScreen(nav.dataset.screen);
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderScreen('my-qard');
});
