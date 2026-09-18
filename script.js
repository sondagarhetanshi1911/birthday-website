/* =========================================================
   ULTIMATE FRIEND BIRTHDAY WEBSITE
   script.js
   HTML + CSS + Vanilla JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let friendName = "";

const nameInput = document.getElementById("nameInput");
const intro = document.getElementById("intro");
const app = document.getElementById("app");
const reveal = document.getElementById("reveal");

const particlesContainer = document.getElementById("particles");
const heartsContainer = document.getElementById("hearts");

const friendNameElements = document.querySelectorAll(".friend-name");


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadSavedName();

    createParticles();
    createFloatingHearts();

    setupNameSystem();
    setupNavigation();
    setupMobileMenu();

    setupThemeToggle();
    setupGallery();
    setupLightbox();

    setupGift();
    setupCake();

    setupSecretMessage();
    setupConfetti();

    setupScrollReveal();
    setupTypingEffects();

    setupSmoothScroll();

    updateDynamicNames();

});


/* =========================================================
   NAME SYSTEM
   ========================================================= */

function setupNameSystem() {

    const startButton = document.getElementById("startButton");

    if (startButton) {
        startButton.addEventListener("click", startBirthdayExperience);
    }

    if (nameInput) {

        nameInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                startBirthdayExperience();
            }

        });

        nameInput.addEventListener("input", () => {

            const error = document.getElementById("nameError");

            if (error) {
                error.textContent = "";
                error.classList.remove("show");
            }

        });

    }

}


/* =========================================================
   START EXPERIENCE
   ========================================================= */

function startBirthdayExperience() {

    if (!nameInput) return;

    const name = nameInput.value.trim();

    const error = document.getElementById("nameError");

    if (name === "") {

        if (error) {
            error.textContent = "Please enter your name first 💖";
            error.classList.add("show");
        }

        nameInput.focus();

        shakeElement(nameInput);

        return;
    }

    friendName = name;

    localStorage.setItem("birthdayFriendName", friendName);

    updateDynamicNames();

    showCinematicReveal();

}


/* =========================================================
   CINEMATIC REVEAL
   ========================================================= */

function showCinematicReveal() {

    if (!intro || !reveal) return;

    intro.classList.add("hide");

    setTimeout(() => {

        reveal.classList.add("show");

        const revealName = document.getElementById("revealName");
        const revealText = document.getElementById("revealText");
        const revealButton = document.getElementById("revealButton");

        if (revealName) {
            revealName.textContent = friendName;
        }

        if (revealText) {
            revealText.textContent =
                "Something special is waiting for you...";
        }

        if (revealButton) {

            revealButton.addEventListener("click", openBirthdayWebsite, {
                once: true
            });

        }

    }, 700);

}


/* =========================================================
   OPEN MAIN WEBSITE
   ========================================================= */

function openBirthdayWebsite() {

    if (!reveal || !app) return;

    reveal.classList.remove("show");

    setTimeout(() => {

        reveal.style.display = "none";

        app.classList.add("active");

        document.body.classList.add("birthday-started");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        updateDynamicNames();

        launchConfetti();

        setTimeout(() => {
            launchConfetti();
        }, 1200);

    }, 600);

}


/* =========================================================
   LOAD SAVED NAME
   ========================================================= */

function loadSavedName() {

    const savedName = localStorage.getItem("birthdayFriendName");

    if (savedName) {

        friendName = savedName;

        if (nameInput) {
            nameInput.value = savedName;
        }

    }

}


/* =========================================================
   UPDATE ALL DYNAMIC NAMES
   ========================================================= */

function updateDynamicNames() {

    friendNameElements.forEach((element) => {

        element.textContent = friendName || "You";

    });

    const dynamicNameElements =
        document.querySelectorAll("[data-friend-name]");

    dynamicNameElements.forEach((element) => {

        element.textContent = friendName || "You";

    });

}


/* =========================================================
   CHANGE NAME
   ========================================================= */

function changeName() {

    localStorage.removeItem("birthdayFriendName");

    friendName = "";

    if (app) {
        app.classList.remove("active");
    }

    if (reveal) {
        reveal.classList.remove("show");
        reveal.style.display = "";
    }

    if (intro) {
        intro.classList.remove("hide");
    }

    if (nameInput) {
        nameInput.value = "";
        nameInput.focus();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CHANGE NAME BUTTON
   ========================================================= */

document.addEventListener("click", (event) => {

    const button = event.target.closest("#changeName");

    if (button) {
        changeName();
    }

});


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    if (!particlesContainer) return;

    const fragment = document.createDocumentFragment();

    const totalParticles = window.innerWidth < 600 ? 30 : 55;

    for (let i = 0; i < totalParticles; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * 5}s`;

        particle.style.animationDuration =
            `${4 + Math.random() * 6}s`;

        particle.style.opacity =
            `${0.25 + Math.random() * 0.75}`;

        const size = 2 + Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        fragment.appendChild(particle);

    }

    particlesContainer.appendChild(fragment);

}


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

function createFloatingHearts() {

    if (!heartsContainer) return;

    const hearts = ["♡", "♥", "❤", "💗", "💖", "✨"];

    const totalHearts = window.innerWidth < 600 ? 12 : 22;

    for (let i = 0; i < totalHearts; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.animationDelay =
            `${Math.random() * 8}s`;

        heart.style.animationDuration =
            `${7 + Math.random() * 8}s`;

        heart.style.fontSize =
            `${12 + Math.random() * 18}px`;

        heartsContainer.appendChild(heart);

    }

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(".nav-link, [data-scroll]");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href") ||
                link.dataset.scroll;

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMobileMenu();

        });

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(".menu-btn");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuButton.classList.toggle("active");

    });

}


function closeMobileMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    const menuButton =
        document.querySelector(".menu-btn");

    if (navLinks) {
        navLinks.classList.remove("open");
    }

    if (menuButton) {
        menuButton.classList.remove("active");
    }

}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

function setupThemeToggle() {

    const themeButton =
        document.getElementById("themeToggle");

    if (!themeButton) return;

    const savedTheme =
        localStorage.getItem("birthdayTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

    updateThemeIcon(themeButton);

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "birthdayTheme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon(themeButton);

    });

}


function updateThemeIcon(button) {

    const isLight =
        document.body.classList.contains("light-mode");

    button.textContent =
        isLight ? "🌙" : "☀️";

}


/* =========================================================
   GALLERY
   ========================================================= */

function setupGallery() {

    const photoCards =
        document.querySelectorAll(".photo-card");

    photoCards.forEach((card) => {

        card.addEventListener("click", () => {

            const image =
                card.querySelector("img");

            if (!image) return;

            openLightbox(
                image.src,
                image.alt || "Beautiful memory"
            );

        });

    });

}


/* =========================================================
   LIGHTBOX
   ========================================================= */

function setupLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;

    const closeButton =
        lightbox.querySelector(".lightbox-close");

    if (closeButton) {

        closeButton.addEventListener("click", closeLightbox);

    }

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

}


function openLightbox(src, alt) {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;

    const image =
        lightbox.querySelector("img");

    if (image) {

        image.src = src;
        image.alt = alt;

    }

    lightbox.classList.add("show");

    document.body.classList.add("no-scroll");

}


function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;

    lightbox.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   GIFT BOX
   ========================================================= */

function setupGift() {

    const giftBox =
        document.querySelector(".gift-box");

    if (!giftBox) return;

    giftBox.addEventListener("click", () => {

        const alreadyOpen =
            giftBox.classList.contains("opened");

        if (alreadyOpen) return;

        giftBox.classList.add("opened");

        const giftMessage =
            document.querySelector(".gift-message");

        if (giftMessage) {

            giftMessage.classList.add("show");

        }

        launchMiniConfetti();

    });

}


/* =========================================================
   CAKE
   ========================================================= */

function setupCake() {

    const cake =
        document.querySelector(".cake");

    if (!cake) return;

    const candles =
        cake.querySelectorAll(".candle");

    candles.forEach((candle) => {

        candle.addEventListener("click", (event) => {

            event.stopPropagation();

            const flame =
                candle.querySelector(".flame");

            if (!flame) return;

            flame.classList.toggle("blown");

            const allBlown =
                [...candles].every((item) => {

                    const itemFlame =
                        item.querySelector(".flame");

                    return itemFlame &&
                        itemFlame.classList.contains("blown");

                });

            if (allBlown) {

                showWishResult();

                launchConfetti();

            }

        });

    });

}


function showWishResult() {

    const result =
        document.querySelector(".wish-result");

    if (!result) return;

    result.innerHTML =
        `✨ Wish made, ${escapeHTML(friendName)}! ✨`;

    result.classList.add("show");

}


/* =========================================================
   SECRET MESSAGE
   ========================================================= */

function setupSecretMessage() {

    const secretButton =
        document.getElementById("secretButton");

    const secretContent =
        document.querySelector(".secret-content");

    if (!secretButton || !secretContent) return;

    secretButton.addEventListener("click", () => {

        secretContent.classList.toggle("show");

        if (secretContent.classList.contains("show")) {

            secretButton.textContent =
                "💖 Hide Secret";

        } else {

            secretButton.textContent =
                "🔐 Open Secret";

        }

    });

}


/* =========================================================
   CONFETTI
   ========================================================= */

function setupConfetti() {

    const confettiButton =
        document.getElementById("confettiButton");

    if (!confettiButton) return;

    confettiButton.addEventListener(
        "click",
        launchConfetti
    );

}


function launchConfetti() {

    const container =
        document.getElementById("confetti");

    if (!container) return;

    const pieces = 90;

    for (let i = 0; i < pieces; i++) {

        const piece =
            document.createElement("span");

        piece.className = "confetti-piece";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;

        piece.style.animationDuration =
            `${2 + Math.random() * 3}s`;

        const rotation =
            Math.random() * 360;

        piece.style.transform =
            `rotate(${rotation}deg)`;

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);

    }

}


function launchMiniConfetti() {

    const container =
        document.getElementById("confetti");

    if (!container) return;

    for (let i = 0; i < 35; i++) {

        const piece =
            document.createElement("span");

        piece.className = "confetti-piece";

        piece.style.left =
            `${40 + Math.random() * 20}%`;

        piece.style.top =
            `${40 + Math.random() * 10}%`;

        piece.style.animationDelay =
            `${Math.random() * 0.4}s`;

        piece.style.animationDuration =
            `${1.5 + Math.random() * 2}s`;

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4000);

    }

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal-on-scroll, .timeline-item, .wish-card, .photo-card, .message-card"
        );

    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        obs.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    revealElements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function setupTypingEffects() {

    const typingElement =
        document.querySelector(".typing-message");

    if (!typingElement) return;

    const text =
        typingElement.dataset.text ||
        typingElement.textContent.trim();

    typingElement.textContent = "";

    let index = 0;
    let started = false;

    function typeText() {

        if (index < text.length) {

            typingElement.textContent +=
                text.charAt(index);

            index++;

            setTimeout(typeText, 35);

        }

    }

    const startTyping = () => {

        if (started) return;

        started = true;

        typeText();

    };

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            startTyping();

                            observer.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        observer.observe(typingElement);

    } else {

        startTyping();

    }

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function setupSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   SHAKE EFFECT
   ========================================================= */

function shakeElement(element) {

    element.classList.remove("shake");

    void element.offsetWidth;

    element.classList.add("shake");

    setTimeout(() => {

        element.classList.remove("shake");

    }, 500);

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   SCROLL TO TOP BUTTON
   ========================================================= */

const topButton =
    document.getElementById("topButton");

if (topButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ACTIVE NAV LINK
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

if (sections.length && navItems.length) {

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navItems.forEach((item) => {

            item.classList.remove("active");

            if (
                item.getAttribute("href") ===
                `#${currentSection}`
            ) {

                item.classList.add("active");

            }

        });

    });

}


/* =========================================================
   DOUBLE CLICK HEART EFFECT
   ========================================================= */

document.addEventListener("dblclick", (event) => {

    createHeartBurst(
        event.clientX,
        event.clientY
    );

});


function createHeartBurst(x, y) {

    const hearts = [
        "❤",
        "💖",
        "💗",
        "💕",
        "✨"
    ];

    for (let i = 0; i < 8; i++) {

        const heart =
            document.createElement("span");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.position = "fixed";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.zIndex = "99999";
        heart.style.pointerEvents = "none";
        heart.style.fontSize =
            `${14 + Math.random() * 18}px`;

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            40 + Math.random() * 80;

        const endX =
            Math.cos(angle) * distance;

        const endY =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0.4)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${endX}px),
                            calc(-50% + ${endY}px)
                         ) scale(1.3)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "cubic-bezier(.17,.67,.83,.67)"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);

    }

}


/* =========================================================
   MOUSE GLOW
   ========================================================= */

const mouseGlow =
    document.createElement("div");

mouseGlow.className = "mouse-glow";

document.body.appendChild(mouseGlow);

document.addEventListener("mousemove", (event) => {

    mouseGlow.style.left =
        `${event.clientX}px`;

    mouseGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================================
   PARALLAX HERO
   ========================================================= */

const hero =
    document.querySelector(".hero");

if (hero && window.innerWidth > 800) {

    window.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 2;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 2;

        const blobs =
            hero.querySelectorAll(".blob");

        blobs.forEach((blob, index) => {

            const strength =
                index === 0 ? 12 : -10;

            blob.style.transform =
                `translate(
                    ${x * strength}px,
                    ${y * strength}px
                )`;

        });

    });

}


/* =========================================================
   COUNTDOWN / BIRTHDAY MESSAGE
   ========================================================= */

function personalizeMessages() {

    document
        .querySelectorAll("[data-personal-message]")
        .forEach((element) => {

            const template =
                element.dataset.personalMessage;

            if (!template) return;

            element.textContent =
                template.replace(
                    /\{name\}/gi,
                    friendName
                );

        });

}

personalizeMessages();


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.title =
            "Come back... 💖";

    } else {

        document.title =
            friendName
                ? `Happy Birthday ${friendName}! 🎂❤️`
                : "A Special Birthday Surprise 💖";

    }

});


/* =========================================================
   FINAL PERSONALIZED TITLE
   ========================================================= */

function updateDocumentTitle() {

    if (friendName) {

        document.title =
            `Happy Birthday ${friendName}! 🎂❤️`;

    } else {

        document.title =
            "A Special Birthday Surprise 💖";

    }

}

updateDocumentTitle();


/* =========================================================
   CONFETTI ON FINAL SECTION
   ========================================================= */

const finalSection =
    document.querySelector(".final-section");

if (finalSection) {

    let finalTriggered = false;

    const finalObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !finalTriggered
                    ) {

                        finalTriggered = true;

                        setTimeout(() => {
                            launchConfetti();
                        }, 400);

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

    finalObserver.observe(finalSection);

}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
        closeMobileMenu();
    }

});


/* =========================================================
   PERFORMANCE FRIENDLY REDUCED MOTION
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (reducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


/* =========================================================
   CONSOLE BRANDING
   ========================================================= */

console.log(
    "%c🎂 Birthday Surprise Website",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%cMade with HTML + CSS + JavaScript ❤️",
    "font-size:14px;"
);

console.log(
    "%cBuilt by Hetanshi ✨",
    "font-size:13px;"
);