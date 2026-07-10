/*==================================================
  ADINEXIS
  script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
      STICKY HEADER
    ==========================================*/

    const header = document.querySelector(".header");

    function navbarScroll() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    navbarScroll();

    window.addEventListener("scroll", navbarScroll);



    /*==========================================
      MOBILE MENU
    ==========================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.classList.remove("active");

            });

        });

    }



    /*==========================================
      COUNTER ANIMATION
    ==========================================*/

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        const trustSection = document.querySelector(".trust");

        if (!trustSection) return;

        const trigger = trustSection.getBoundingClientRect().top;

        if (trigger < window.innerHeight - 100) {

            counterStarted = true;

            counters.forEach(counter => {

                const target = parseFloat(counter.dataset.target);

                const isDecimal = target % 1 !== 0;

                let current = 0;

                const increment = target / 120;

                const update = () => {

                    current += increment;

                    if (current < target) {

                        counter.textContent = isDecimal
                            ? current.toFixed(1)
                            : Math.floor(current);

                        requestAnimationFrame(update);

                    } else {

                        if (isDecimal) {

                            counter.textContent = target.toFixed(1) + "%";

                        } else {

                            counter.textContent = target + "+";

                        }

                    }

                };

                update();

            });

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();



    /*==========================================
      FADE ANIMATION
    ==========================================*/

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right,.zoom-in"

    ).forEach(el => observer.observe(el));



    /*==========================================
      PARALLAX BLOBS
    ==========================================*/

    const blob1 = document.querySelector(".gradient-one");
    const blob2 = document.querySelector(".gradient-two");
    const blob3 = document.querySelector(".gradient-three");

    window.addEventListener("mousemove", e => {

        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        if (blob1) {

            blob1.style.transform =
                `translate(${x}px,${y}px)`;

        }

        if (blob2) {

            blob2.style.transform =
                `translate(${-x}px,${-y}px)`;

        }

        if (blob3) {

            blob3.style.transform =
                `translate(${x/2}px,${-y/2}px)`;

        }

    });



    /*==========================================
      SMOOTH SCROLL
    ==========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(

                this.getAttribute("href")

            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });



    /*==========================================
      ACTIVE NAV LINK
    ==========================================*/

    const sections = document.querySelectorAll("section[id]");

    function activeMenu() {

        let scrollY = window.pageYOffset;

        sections.forEach(current => {

            const sectionHeight = current.offsetHeight;

            const sectionTop = current.offsetTop - 120;

            const sectionId = current.getAttribute("id");

            const link = document.querySelector(

                '.nav-links a[href="#' + sectionId + '"]'

            );

            if (!link) return;

            if (

                scrollY > sectionTop &&

                scrollY <= sectionTop + sectionHeight

            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    activeMenu();



    /*==========================================
      HERO BUTTON HOVER
    ==========================================*/

    document.querySelectorAll(".btn-primary").forEach(btn => {

        btn.addEventListener("mousemove", e => {

            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            btn.style.setProperty("--x", x + "px");
            btn.style.setProperty("--y", y + "px");

        });

    });



    /*==========================================
      CLIENT MARQUEE PAUSE
    ==========================================*/

    const marquee = document.querySelector(".client-track");

    if (marquee) {

        marquee.addEventListener("mouseenter", () => {

            marquee.style.animationPlayState = "paused";

        });

        marquee.addEventListener("mouseleave", () => {

            marquee.style.animationPlayState = "running";

        });

    }



    /*==========================================
      SCROLL PROGRESS BAR
    ==========================================*/

    const progress = document.createElement("div");

    progress.id = "scroll-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progressHeight =
            (window.pageYOffset / totalHeight) * 100;

        progress.style.width = progressHeight + "%";

    });



    /*==========================================
      HERO TEXT ENTRANCE
    ==========================================*/

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        heroContent.animate(

            [

                {

                    opacity:0,

                    transform:"translateY(60px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],

            {

                duration:1200,

                easing:"ease-out",

                fill:"forwards"

            }

        );

    }

    async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    const response = await fetch(file);
    const html = await response.text();

    element.innerHTML = html;
}

loadComponent("footer", "components/footer.html");


}); 
// Contact Form - Open Gmail Compose
document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const project = document.getElementById("project").value.trim();
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent(`New Project Inquiry - ${project}`);

            const body = encodeURIComponent(
`Hello Adinexis Team,

I would like to discuss a project with you.

━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Project Type: ${project}

Project Details:
${message}

━━━━━━━━━━━━━━━━━━━━━━

Regards,
${name}`
            );

            const recipient = "contact@adinexis.com";

const gmailURL =
`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

const mailtoURL =
`mailto:${recipient}?subject=${subject}&body=${body}`;

const isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);

if (isMobile) {
    window.location.href = mailtoURL;
} else {
    window.open(gmailURL, "_blank");
}
        });
    }

});
function openBusinessEmail() {

    const recipient = "contact@adinexis.com";

    const subject = "Business Inquiry";

    const body = `Hello Adinexis Team,

I am interested in your business software solutions.

Name:
Company:
Phone:
Requirements:

Thank you.`;

    const gmailURL =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const mailtoURL =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const isMobile =
        /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);

    if (isMobile) {
        window.location.href = mailtoURL;
    } else {
        window.open(gmailURL, "_blank");
    }
}