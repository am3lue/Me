const { createApp } = Vue;

createApp({
    data() {
        return {
            isMenuOpen: false,
            isScrolled: false,
            skills: {
                "Software": [
                    "Genie.jl (Julia Web Framework)", "Plots.jl (Data Viz)", "Pandas (Python)", 
                    "Scikit-Learn (ML)", "TensorFlow (DL)", "Julia (Serial/Real-time)", "C++ (Microcontrollers)"
                ],
                "Hardware": [
                    "Arduino (Mega/Uno/Nano)", "ESP8266/NodeMCU", "ESP32",
                    "RFID RC522", "Capacitive Soil Moisture", "RTC Modules",
                    "Ultrasonic Sensors", "Inductive Sensors (LJ12A3-4-Z/BX)", 
                    "Tilt/MPU6050", "Actuators (Solenoids/Relays)", "Solar Systems"
                ],
                "Other Tools": [
                    "Arduino IDE", "VS Codium", "JupyterLab", 
                    "Termux (Julia on Android)", "Breadboard to PCB Design"
                ]
            },
            projects: [
                {
                    title: "Automated Water Billing System",
                    description: "RFID-based smart water dispenser with a locally hosted web recharge portal using Arduino Mega and NodeMCU. Focuses on automated transactions for community water management. Setup: Clone repo, configure Arduino IDE, and test hardware pins.",
                    tech: ["Arduino Mega", "NodeMCU", "RFID", "Solenoid Valves"],
                    github: "https://github.com/am3lue/automated-water-billing",
                    demo: null
                },
                {
                    title: "Automated Solar Irrigation System",
                    description: "Solar-powered controller for scalable irrigation in mixed cropping. Optimized for low-energy rural environments to ensure sustainable water usage. Setup: Deploy code to controller, verify solar input.",
                    tech: ["Solar Power", "Embedded C++", "IoT"],
                    github: "https://github.com/am3lue/solar-irrigation",
                    demo: null
                },
                {
                    title: "Timed & Moisture Irrigation",
                    description: "Precise watering controller using RTC and capacitive moisture sensors. Ideal for home gardens and small farms to prevent over-watering. Setup: Calibrate moisture thresholds in code.",
                    tech: ["RTC Module", "Capacitive Sensors", "Automation"],
                    github: "https://github.com/am3lue/timed-moisture-irrigation",
                    demo: null
                },
                {
                    title: "Local Refill Web App",
                    description: "Lightweight Wi-Fi UI hosted on port 8000 (NodeMCU) for topping up user balances and viewing logs locally without external servers. Setup: Connect to NodeMCU AP, access 192.168.4.1:8000.",
                    tech: ["NodeMCU", "C++", "Web Server", "Wi-Fi"],
                    github: "https://github.com/am3lue/local-refill-webapp",
                    demo: null
                },
                {
                    title: "Metal Detector Door System",
                    description: "Prototype entry gate using inductive sensors for metal detection and alerts. Enhances security with simple, robust hardware. Setup: Mount sensor on frame, adjust sensitivity.",
                    tech: ["Inductive Sensor", "Arduino", "Buzzer/LED"],
                    github: "https://github.com/am3lue/metal-detector-door",
                    demo: null
                },
                {
                    title: "IoT Posture Monitor",
                    description: "ESP32-based wearable system with tilt sensors or MPU6050 to detect poor posture and trigger haptic/audio feedback. Setup: Wear device, calibrate 'good' posture zero-point.",
                    tech: ["ESP32", "MPU6050", "Wearable Tech"],
                    github: "https://github.com/francis-masanja/IoT-Posture-Monitor",
                    demo: null
                },
                {
                    title: "Bluna-ai",
                    description: "Forked and customized AI project involving Julia-based tools, designed for data-driven automation tasks. Setup: Run Julia environment, instantiate packages.",
                    tech: ["Julia", "AI", "Automation"],
                    github: "https://github.com/francis-masanja/Bluna-ai",
                    demo: null
                },
                {
                    title: "MCQ Generator",
                    description: "A simple HTML-based tool to generate multiple-choice questions, aiding in rapid educational content creation. Setup: Open index.html in browser.",
                    tech: ["HTML", "JavaScript", "CSS"],
                    github: "https://github.com/francis-masanja/mcq-gen",
                    demo: null
                }
            ],
            // New Data Properties
            allRepos: [],
            activities: [],
            loading: false,
            error: null,
            form: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        getCategoryIcon(category) {
            const icons = {
                "Software": "fas fa-code",
                "Hardware": "fas fa-microchip",
                "Other Tools": "fas fa-tools"
            };
            return icons[category] || "fas fa-star";
        },
        async fetchGitHubData() {
            this.loading = true;
            this.error = null;
            const users = ['am3lue', 'francis-masanja'];
            
            try {
                // Helper to fetch safely
                const fetchSafe = (url) => fetch(url).then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                });

                // 1. Fetch Repositories
                const repoPromises = users.map(user => 
                    fetchSafe(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`)
                );
                
                // 2. Fetch Events (Activity)
                const eventPromises = users.map(user => 
                    fetchSafe(`https://api.github.com/users/${user}/events?per_page=20`)
                );

                const [reposResults, eventsResults] = await Promise.all([
                    Promise.allSettled(repoPromises),
                    Promise.allSettled(eventPromises)
                ]);

                // Process Repos
                let combinedRepos = [];
                reposResults.forEach((result, index) => {
                    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
                        combinedRepos = [...combinedRepos, ...result.value];
                    } else {
                        console.warn(`Failed or invalid repos for ${users[index]}:`, result.reason || result.value);
                    }
                });
                
                // Sanitize and Sort Repos
                this.allRepos = combinedRepos
                    .filter(repo => repo && repo.name && repo.owner) // Filter invalid objects
                    .map(repo => ({
                        ...repo,
                        homepage: (repo.homepage && typeof repo.homepage === 'string' && repo.homepage.startsWith('http')) ? repo.homepage : null
                    }))
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                console.log("Processed Repos:", this.allRepos);

                // Process Activities
                let combinedEvents = [];
                eventsResults.forEach((result, index) => {
                    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
                        combinedEvents = [...combinedEvents, ...result.value];
                    } else {
                        console.warn(`Failed or invalid events for ${users[index]}:`, result.reason || result.value);
                    }
                });

                this.activities = combinedEvents
                    .filter(event => 
                        event && event.type && event.actor && event.repo && // Basic validation
                        (event.type === 'PushEvent' || 
                        event.type === 'CreateEvent' || 
                        event.type === 'WatchEvent' ||
                        event.type === 'ForkEvent' ||
                        event.type === 'PublicEvent' ||
                        event.type === 'PullRequestEvent')
                    )
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 10);
                
                console.log("Processed Activities:", this.activities);

                if (this.allRepos.length === 0 && this.activities.length === 0) {
                     this.error = "Could not load GitHub data. Please check your connection.";
                }

            } catch (err) {
                console.error("Critical Error fetching GitHub data:", err);
                this.error = "Failed to load latest GitHub updates.";
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        },
        isAm3lue(login) {
            return login && login.toLowerCase() === 'am3lue';
        },
        getEventMessage(event) {
            if (!event || !event.repo) return 'Activity';
            
            const repoName = event.repo.name || 'a repo';
            const payload = event.payload || {};

            if (event.type === 'PushEvent') {
                return `Pushed to ${repoName}`;
            } else if (event.type === 'CreateEvent') {
                return `Created ${payload.ref_type || 'resource'} in ${repoName}`;
            } else if (event.type === 'WatchEvent') {
                return `Starred ${repoName}`;
            } else if (event.type === 'ForkEvent') {
                return `Forked ${repoName}`;
            } else if (event.type === 'PublicEvent') {
                return `Made ${repoName} public`;
            } else if (event.type === 'PullRequestEvent') {
                return `${payload.action || 'Updated'} PR in ${repoName}`;
            }
            return 'Active on GitHub';
        },
        submitForm() {
            // Here you would typically handle form submission
            // For a static site, you might use Formspree or just alert
            alert(`Thanks ${this.form.name}! Your message has been "sent" (this is a demo).`);
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50;
        }
    },
    mounted() {
        this.fetchGitHubData();
        window.addEventListener('scroll', this.handleScroll);
        
        // Initialize Animate On Scroll
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }

        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('Service Worker registered!', reg))
                    .catch(err => console.log('Service Worker registration failed:', err));
            });
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}).mount('#app');