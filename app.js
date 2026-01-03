const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            isMenuOpen: false,
            isScrolled: false,
            loading: false,
            error: null,
            allRepos: [],
            activities: [],
            // Static Data for Fallback
            projects: [
                {
                    title: "Automated Water Billing System",
                    description: "RFID-based smart water dispenser with a locally hosted web recharge portal using Arduino Mega and NodeMCU. Focuses on automated transactions for community water management.",
                    tech: ["Arduino Mega", "NodeMCU", "RFID", "Solenoid Valves"],
                    github: "https://github.com/am3lue/automated-water-billing",
                    demo: null,
                    owner: { login: 'am3lue' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "Automated Solar Irrigation System",
                    description: "Solar-powered controller for scalable irrigation in mixed cropping. Optimized for low-energy rural environments to ensure sustainable water usage.",
                    tech: ["Solar Power", "Embedded C++", "IoT"],
                    github: "https://github.com/am3lue/solar-irrigation",
                    demo: null,
                    owner: { login: 'am3lue' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "Timed & Moisture Irrigation",
                    description: "Precise watering controller using RTC and capacitive moisture sensors. Ideal for home gardens and small farms to prevent over-watering.",
                    tech: ["RTC Module", "Capacitive Sensors", "Automation"],
                    github: "https://github.com/am3lue/timed-moisture-irrigation",
                    demo: null,
                    owner: { login: 'am3lue' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "Local Refill Web App",
                    description: "Lightweight Wi-Fi UI hosted on port 8000 (NodeMCU) for topping up user balances and viewing logs locally without external servers.",
                    tech: ["NodeMCU", "C++", "Web Server", "Wi-Fi"],
                    github: "https://github.com/am3lue/local-refill-webapp",
                    demo: null,
                    owner: { login: 'am3lue' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "Metal Detector Door System",
                    description: "Prototype entry gate using inductive sensors for metal detection and alerts. Enhances security with simple, robust hardware.",
                    tech: ["Inductive Sensor", "Arduino", "Buzzer/LED"],
                    github: "https://github.com/am3lue/metal-detector-door",
                    demo: null,
                    owner: { login: 'am3lue' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "IoT Posture Monitor",
                    description: "ESP32-based wearable system with tilt sensors or MPU6050 to detect poor posture and trigger haptic/audio feedback.",
                    tech: ["ESP32", "MPU6050", "Wearable Tech"],
                    github: "https://github.com/francis-masanja/IoT-Posture-Monitor",
                    demo: null,
                    owner: { login: 'francis-masanja' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "Bluna-ai",
                    description: "Forked and customized AI project involving Julia-based tools, designed for data-driven automation tasks.",
                    tech: ["Julia", "AI", "Automation"],
                    github: "https://github.com/francis-masanja/Bluna-ai",
                    demo: null,
                    owner: { login: 'francis-masanja' },
                    updated_at: new Date().toISOString()
                },
                {
                    title: "MCQ Generator",
                    description: "A simple HTML-based tool to generate multiple-choice questions, aiding in rapid educational content creation.",
                    tech: ["HTML", "JavaScript", "CSS"],
                    github: "https://github.com/francis-masanja/mcq-gen",
                    demo: null,
                    owner: { login: 'francis-masanja' },
                    updated_at: new Date().toISOString()
                }
            ],
            skills: {
                "Software": [
                    "Genie.jl (Julia Web Framework)", "Plots.jl (Data Viz)", "Pandas (Python)", 
                    "Scikit-Learn (ML)", "TensorFlow (DL)", "Julia (Serial/Real-time)", "C++"
                ],
                "Hardware": [
                    "Arduino (Mega/Uno/Nano)", "Raspberry Pi", "ESP8266/NodeMCU", "ESP32",
                    "RFID RC522", "Capacitive Soil Moisture", "RTC Modules",
                    "Ultrasonic Sensors", "Inductive Sensors", "Actuators"
                ],
                "Other Tools": [
                    "Cybersecurity Practices", "Database Design", "Arduino IDE", "VS Codium", 
                    "JupyterLab", "Termux", "PCB Design"
                ]
            },
            form: { name: '', email: '', message: '' }
        }
    },
    created() {
        console.log("Vue App Created");
    },
    errorCaptured(err, instance, info) {
        console.error("Vue Error Captured:", err, info);
        this.error = "Application Error: " + err.message;
        return false; 
    },
    methods: {
        toggleMenu() { this.isMenuOpen = !this.isMenuOpen; },
        getCategoryIcon(category) {
            const icons = {
                "Software": "fas fa-code",
                "Hardware": "fas fa-microchip",
                "Other Tools": "fas fa-tools"
            };
            return icons[category] || "fas fa-star";
        },
        formatDate(dateString) {
            try { return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } 
            catch (e) { return dateString; }
        },
        isAm3lue(login) { return login && login.toLowerCase() === 'am3lue'; },
        getEventMessage(event) {
            if (!event || !event.repo) return 'Activity';
            const repoName = event.repo.name;
            switch (event.type) {
                case 'PushEvent': return `Pushed to ${repoName}`;
                case 'CreateEvent': return `Created repo ${repoName}`;
                case 'WatchEvent': return `Starred ${repoName}`;
                case 'ForkEvent': return `Forked ${repoName}`;
                default: return `Active in ${repoName}`;
            }
        },
        submitForm() { alert(`Message sent! (Demo)`); },
        handleScroll() { this.isScrolled = window.scrollY > 50; },
        
        async fetchUserRepos(username) {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
                if (!res.ok) throw new Error(res.status);
                return await res.json();
            } catch (e) {
                console.warn(`Repo fetch failed for ${username}: ${e.message}`);
                return []; // Return empty array on error
            }
        },

        async fetchUserEvents(username) {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/events?per_page=20`);
                if (!res.ok) throw new Error(res.status);
                return await res.json();
            } catch (e) {
                console.warn(`Event fetch failed for ${username}: ${e.message}`);
                return []; // Return empty array on error
            }
        },

        generateFallbackData() {
            console.log("⚠️ API LIMIT REACHED: Generating Fallback Data...");
            
            // Convert Projects to Repo Format
            this.allRepos = this.projects.map(p => ({
                id: Math.random(),
                name: p.title.replace(/\s+/g, '-'),
                description: p.description,
                html_url: p.github,
                homepage: p.demo,
                language: p.tech[0],
                stargazers_count: Math.floor(Math.random() * 10) + 1,
                forks_count: Math.floor(Math.random() * 5),
                updated_at: new Date().toISOString(),
                owner: p.owner
            }));

            // Generate Fake Activity
            this.activities = this.projects.slice(0, 5).map((p, i) => ({
                id: Math.random(),
                type: 'PushEvent',
                actor: p.owner,
                repo: { name: p.title.replace(/\s+/g, '-') },
                created_at: new Date(Date.now() - (i * 86400000)).toISOString()
            }));
            
            this.error = null; // Clear error
        },

        async initData() {
            this.loading = true;
            const users = ['am3lue', 'francis-masanja'];

            try {
                // Fetch Repos
                const repoResults = await Promise.all(users.map(u => this.fetchUserRepos(u)));
                const flatRepos = repoResults.flat();
                
                // Fetch Events
                const eventResults = await Promise.all(users.map(u => this.fetchUserEvents(u)));
                const flatEvents = eventResults.flat();

                // If no repos found (API error or empty), USE FALLBACK
                if (flatRepos.length === 0) {
                    this.generateFallbackData();
                } else {
                    // Success Path
                    this.allRepos = flatRepos
                        .filter(r => r.name)
                        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                    
                    this.activities = flatEvents
                        .filter(e => e.id)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 15);
                        
                    // Double check activities
                    if (this.activities.length === 0) {
                        this.generateFallbackData(); // Partially fallback for activities if needed
                    }
                }
            } catch (err) {
                console.error("Init Error:", err);
                this.generateFallbackData();
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.initData();
        window.addEventListener('scroll', this.handleScroll);
        if (typeof AOS !== 'undefined') setTimeout(() => AOS.init({ duration: 800, once: true }), 500);
        if ('serviceWorker' in navigator) {
             window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    }
});

app.mount('#app');