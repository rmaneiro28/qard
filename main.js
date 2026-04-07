// Data Mockups
const currentUser = {
    name: "Rúvel Maneiro",
    role: "Consultor IT / Ventas Industriales",
    company: "Oterventas",
    handle: "@Oterventas",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ruvel",
    phone: "+584120000000",
    linkedin: "ruvel-maneiro",
    whatsapp: "584120000000"
};

const recentContacts = [
    { id: 1, name: "Félix Aranzábal", company: "Logística Global S.A.", time: "Hoy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", phone: "+584141112233", whatsapp: "584141112233", linkedin: "felix-a" },
    { id: 2, name: "Elena Valdés", company: "Innovation Hub", time: "Ayer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", phone: "+584144445566", whatsapp: "584144445566", linkedin: "elena-v" },
    { id: 3, name: "Oscar Mendoza", company: "Sistemas Industriales S.L.", time: "12 Oct", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar", phone: "+584167778899", whatsapp: "584167778899", linkedin: "oscar-m" }
];

let allContacts = [
    { id: 4, name: "Elena Rodriguez", role: "Chief Product Officer", company: "STARLIGHT FINTECH", linkedin: "elena-rod", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR", phone: "+123456789", whatsapp: "123456789" },
    { id: 5, name: "Marcus Thorne", role: "Head of Investment", company: "VORTEX CAPITAL", linkedin: "mthorne", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus", phone: "+198765432", whatsapp: "198765432" },
    { id: 6, name: "Sophia Chen", role: "Creative Director", company: "PIXEL & GRAIN", linkedin: "schen", synced: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", phone: "+1122334455", whatsapp: "1122334455" },
    { id: 7, name: "David Kim", role: "Full Stack Engineer", company: "HYPERION LABS", linkedin: "dkim", synced: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", phone: "+1555666777", whatsapp: "1555666777" }
];

// State
let currentScreen = 'my-qard';
let cameraStream = null;

// DOM Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

// Utils
const generateVCard = (contact) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.company}
TITLE:${contact.role || ''}
TEL;TYPE=CELL:${contact.phone || ''}
URL:https://linkedin.com/in/${contact.linkedin || ''}
END:VCARD`;
};

const downloadVCard = (contact) => {
    const vCardData = generateVCard(contact);
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contact.name.replace(' ', '_')}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
};

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
                <div class="user-avatar-mini" onclick="renderScreen('config')">
                    <img src="${currentUser.avatar}" alt="User">
                </div>
            </header>

            <div class="qr-card-container">
                <div class="qr-frame">
                    <div class="qr-code-display">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BEGIN:VCARD%0AVERSION:3.0%0AFN:${currentUser.name}%0AORG:${currentUser.company}%0ATEL:${currentUser.phone}%0AEND:VCARD" alt="QR Code">
                    </div>
                    <div class="qr-user-info">
                        <h2>${currentUser.name}</h2>
                        <p class="role">${currentUser.role}</p>
                        <p class="company">${currentUser.company}</p>
                    </div>
                    
                    <div class="action-grid-full">
                        <button class="btn-premium-social whatsapp" onclick="window.open('https://wa.me/${currentUser.whatsapp}')">
                            <i data-lucide="phone"></i>
                            WhatsApp
                        </button>
                        <button class="btn-premium-social linkedin" onclick="window.open('https://linkedin.com/in/${currentUser.linkedin}')">
                            <i data-lucide="linkedin"></i>
                            LinkedIn
                        </button>
                    </div>
                </div>
            </div>

            <div class="main-action-area">
                <button class="btn-scan" onclick="renderScreen('scan')">
                    <i data-lucide="scan"></i>
                    ESCANEAR CÓDIGO
                </button>
            </div>

            <section class="contact-list-section">
                <div class="list-header">
                    <h3>Recientes</h3>
                    <button class="btn-view-all" onclick="renderScreen('contacts')">Ver todos</button>
                </div>
                
                <div class="contacts-grid">
                    ${recentContacts.slice(0, 2).map(c => `
                        <div class="contact-card" onclick="window.showContactDetail(${c.id})">
                            <div class="contact-avatar">
                                <img src="${c.avatar}" alt="${c.name}">
                            </div>
                            <div class="contact-info">
                                <div class="name">${c.name}</div>
                                <div class="meta">${c.company}</div>
                            </div>
                            <i data-lucide="chevron-right" size="16" style="color:var(--text-muted)"></i>
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
                <div class="user-avatar-mini" onclick="renderScreen('config')">
                    <img src="${currentUser.avatar}" alt="User">
                </div>
            </header>

            <h1 class="section-title">Network</h1>
            <p class="section-subtitle">Tus contactos industriales sincronizados.</p>

            <div class="search-container">
                <div class="search-bar">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Buscar profesional...">
                </div>
            </div>

            <div class="filters-scroll">
                <button class="filter-chip active">Todos</button>
                <button class="filter-chip" onclick="window.syncPhoneContacts()">Sincronizar Teléfono</button>
                <button class="filter-chip">LinkedIn</button>
            </div>

            <div class="contacts-detailed-list">
                ${allContacts.map(c => `
                    <div class="contact-card-large" onclick="window.showContactDetail(${c.id})">
                        <div class="card-top">
                            <img src="${c.avatar}" class="large-avatar" alt="${c.name}">
                            <div class="card-top-info">
                                <h4>${c.name}</h4>
                                <p class="role-tag">${c.role || 'Partner Industrial'}</p>
                                <div class="company-line">
                                    <i data-lucide="building-2" size="14"></i>
                                    <span>${c.company}</span>
                                </div>
                            </div>
                            <i data-lucide="chevron-right" style="color:var(--text-muted)"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    'scan': () => `
        <div id="camera-view" class="screen-fade">
            <div id="video-placeholder">
                <video id="webcam" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>
                <div class="scan-overlay">
                    <div class="scan-box" id="scan-target"></div>
                </div>
                
                <div style="position:absolute; bottom:40px; left:0; width:100%; text-align:center; padding: 0 40px;">
                    <p style="color:white; font-size:14px; margin-bottom:20px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">Alinea el código QR de Qard para conectar</p>
                    <button class="btn-scan" style="background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); width:auto; padding:0 30px; border: 1px solid rgba(255,255,255,0.3);" onclick="renderScreen('my-qard')">
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    `,
    'config': () => `
        <div class="screen-fade" style="padding: 24px;">
            <header class="top-bar" style="padding:0; margin-bottom:30px;">
                <button class="btn-hamburger" onclick="renderScreen('my-qard')">
                    <i data-lucide="arrow-left"></i>
                </button>
                <span class="logo-q">Perfil</span>
                <div style="width:44px"></div>
            </header>

            <div style="background: var(--card-bg); border-radius: 28px; padding: 30px; text-align: center; border: 1px solid var(--glass-border);">
                <img src="${currentUser.avatar}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid var(--electric-blue); margin-bottom:16px;">
                <h2 style="font-family: var(--font-heading);">${currentUser.name}</h2>
                <p style="color: var(--text-gray); margin-bottom:24px;">${currentUser.role}</p>
                
                <button class="btn-premium-social linkedin" style="width:100%; justify-content:center;">
                    <i data-lucide="linkedin"></i>
                    Sincronizado con LinkedIn
                </button>
            </div>

            <div style="margin-top:30px; display:grid; gap:16px;">
                 <div style="background:var(--glass-bg); padding:20px; border-radius:20px; display:flex; justify-content:space-between; align-items:center;">
                    <span>Privacidad del Perfil</span>
                    <i data-lucide="chevron-right"></i>
                 </div>
                 <div style="background:var(--glass-bg); padding:20px; border-radius:20px; display:flex; justify-content:space-between; align-items:center;" onclick="window.syncPhoneContacts()">
                    <span>Sincronizar Contactos</span>
                    <i data-lucide="refresh-cw"></i>
                 </div>
            </div>
        </div>
    `
};

// Global Functions
window.showContactDetail = (contactId) => {
    const contact = [...recentContacts, ...allContacts].find(c => c.id === contactId);
    if (!contact) return;

    const overlay = document.getElementById('contact-overlay');
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <button class="btn-close-detail" onclick="this.parentElement.style.display='none'">
            <i data-lucide="x"></i>
        </button>
        
        <div class="screen-fade" style="width:100%; max-width:400px; margin:auto;">
            <div class="contact-card-large" style="background: var(--card-bg); border: 1px solid var(--glass-border);">
                <div class="card-top">
                    <img src="${contact.avatar}" class="large-avatar" alt="${contact.name}">
                    <div class="card-top-info">
                        <h2 style="font-family: var(--font-heading); font-size: 24px;">${contact.name}</h2>
                        <p class="role-tag">${contact.role || 'Consultor Técnico'}</p>
                        <div class="company-line">
                            <i data-lucide="building-2" size="14"></i>
                            <span>${contact.company}</span>
                        </div>
                    </div>
                </div>

                <div class="action-grid-full">
                    <button class="btn-premium-social whatsapp" onclick="window.open('https://wa.me/${contact.whatsapp}')">
                        <i data-lucide="message-circle"></i>
                        WhatsApp
                    </button>
                    <button class="btn-premium-social linkedin" onclick="window.open('https://linkedin.com/in/${contact.linkedin}')">
                        <i data-lucide="linkedin"></i>
                        LinkedIn
                    </button>
                    <button class="btn-premium-social" onclick="window.open('tel:${contact.phone}')" style="grid-column: span 2;">
                        <i data-lucide="phone"></i>
                        Llamar a ${contact.name.split(' ')[0]}
                    </button>
                </div>

                <button class="btn-save-vcard" onclick="window.downloadContact(${contact.id})">
                    <i data-lucide="user-plus"></i>
                    AGREGAR A CONTACTOS
                </button>
                
                <div style="margin-top:30px; text-align:center;">
                    <p style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Qard Industrial ID</p>
                    <div style="background:white; padding:10px; border-radius:16px; display:inline-block;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(generateVCard(contact))}" style="width:150px;">
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
};

window.downloadContact = (id) => {
    const contact = [...recentContacts, ...allContacts].find(c => c.id === id);
    if (contact) {
        downloadVCard(contact);
        alert('VCard generada para ' + contact.name);
    }
};

window.syncPhoneContacts = async () => {
    try {
        if ('contacts' in navigator && 'select' in navigator.contacts) {
            const props = ['name', 'tel', 'email'];
            const opts = { multiple: true };
            const contacts = await navigator.contacts.select(props, opts);
            
            if (contacts.length > 0) {
                contacts.forEach((c, index) => {
                    const newContact = {
                        id: 100 + index,
                        name: c.name[0],
                        company: "Contacto Teléfono",
                        phone: c.tel ? c.tel[0] : "",
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name[0]}`,
                        synced: true,
                        whatsapp: c.tel ? c.tel[0].replace(/\D/g, '') : "",
                        linkedin: ""
                    };
                    allContacts.push(newContact);
                });
                alert(`${contacts.length} contactos sincronizados exitosamente.`);
                renderScreen('contacts');
            }
        } else {
            // Mock simulation for desktop/browsers without API
            const mockNames = ["Andrés García", "Beatriz López", "Carlos Ruiz"];
            mockNames.forEach((name, i) => {
                allContacts.push({
                    id: 200 + i,
                    name: name,
                    company: "Importado de Teléfono",
                    phone: "+58412" + Math.floor(1000000 + Math.random() * 9000000),
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                    synced: true,
                    whatsapp: "58412000000" + i,
                    linkedin: ""
                });
            });
            alert('Sincronización simulada completada (Usa un móvil compatible para la API real de contactos). Cada contacto tiene ahora su propio Qard QR.');
            renderScreen('contacts');
        }
    } catch (err) {
        console.error("Error sincronizando contactos:", err);
    }
};

async function startCamera() {
    const video = document.getElementById('webcam');
    if (!video) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        cameraStream = stream;
        video.srcObject = stream;
        
        // Simulation of QR detection
        setTimeout(() => {
            if (currentScreen === 'scan') {
                const target = document.getElementById('scan-target');
                if (target) target.style.borderColor = "#4ade80";
                setTimeout(() => {
                    if (currentScreen === 'scan') {
                        const randomId = Math.floor(Math.random() * allContacts.length);
                        window.showContactDetail(allContacts[randomId].id);
                    }
                }, 1000);
            }
        }, 3000);
    } catch (err) {
        console.error("Error acceso cámara:", err);
        alert("No se pudo acceder a la cámara. Asegúrate de dar permisos en tu navegador.");
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

function renderScreen(screenId) {
    stopCamera();
    currentScreen = screenId;
    mainContent.innerHTML = screens[screenId]();
    lucide.createIcons();
    
    navItems.forEach(nav => {
        if (nav.dataset.screen === screenId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    if (screenId === 'scan') {
        startCamera();
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
