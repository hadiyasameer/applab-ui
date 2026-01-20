document.addEventListener("DOMContentLoaded", () => {

    // Hamburger menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Mobile dropdown toggle
    const dropdownToggles = document.querySelectorAll('.nav-list li.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parentLi = toggle.parentElement;
                parentLi.classList.toggle('active');
            }
        });
    });

    /* ================= HEADER SCROLL ================= */
    const header = document.querySelector(".site-header");
    const hero = document.querySelector(".hero");

    if (header && hero) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                header.classList.toggle("scrolled", !entry.isIntersecting);
            });
        }, {
            threshold: 0
        });

        requestAnimationFrame(() => {
            headerObserver.observe(hero);
        });
    }


    /* ================= SEARCH TOGGLE ================= */
    const searchBtn = document.querySelector(".search-btn");
    const searchWrapper = document.querySelector(".search-wrapper");

    if (searchBtn && searchWrapper) {
        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            searchWrapper.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!searchWrapper.contains(e.target)) {
                searchWrapper.classList.remove("active");
            }
        });
    }

    /* ================= WHY QATAR ================= */
    const featureItems = document.querySelectorAll(".features li");
    const rightGroups = document.querySelectorAll(".right-group");

    let currentIndex = 0;
    const cycleTime = 3000;
    let autoCycleInterval;

    function switchFeature(index) {
        rightGroups.forEach(group => group.classList.remove("active", "previous"));
        featureItems.forEach(item => item.classList.remove("active"));

        featureItems[index].classList.add("active");

        const currentGroup = rightGroups[index];
        currentGroup.classList.add("active");

        const previousIndex = index === 0 ? rightGroups.length - 1 : index - 1;
        rightGroups[previousIndex].classList.add("previous");

        currentIndex = index;
    }

    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % featureItems.length;
            switchFeature(nextIndex);
        }, cycleTime);
    }

    if (featureItems.length) {
        switchFeature(0);
        startAutoCycle();
    }

    featureItems.forEach((item, idx) => {
        item.addEventListener("mouseenter", () => {
            switchFeature(idx);
            clearInterval(autoCycleInterval);
        });
    });

    // profile Slides
    let teamCurrentIndex = 0;
    const teamColors = ["#008AAB", "#E87152", "#652F6C"];

    function nextSlide() {
        const track = document.querySelector('.profiles');
        const cards = document.querySelectorAll('.profile-card');
        const area = document.querySelector('.active-profile-area');
        const dots = document.querySelectorAll('.dot');
        const nextThumb = document.querySelector('.next-btn .thumb');

        if (!track || cards.length === 0) return;

        const totalCards = cards.length;

        teamCurrentIndex = (teamCurrentIndex + 1) % totalCards;

        const moveAmount = teamCurrentIndex * 80;
        track.style.transform = `translateX(-${moveAmount}%)`;

        if (area) {
            area.style.backgroundColor = teamColors[teamCurrentIndex % teamColors.length];
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === teamCurrentIndex);
        });

        const previewIndex = (teamCurrentIndex + 1) % totalCards;
        const previewImgSrc = cards[previewIndex].querySelector('img').src;
        if (nextThumb) {
            nextThumb.src = previewImgSrc;
        }
    }

    document.querySelector('.next-btn').addEventListener('click', nextSlide)
})