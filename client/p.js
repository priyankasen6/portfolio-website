  // Dark mode toggle
    const toggleBtn = document.getElementById("theme-toggle");
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Light" : "Dark";
    });

    // Scroll Reveal
    const sections = document.querySelectorAll("section");
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.2 });
    sections.forEach(s => reveal.observe(s));

    // Smooth scroll & nav highlight
    const navLinks = document.querySelectorAll("nav a");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.clientHeight;
        if (scrollY >= top && scrollY < top + height) current = section.getAttribute("id");
      });
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) link.classList.add("active");
      });
    });

    // Contact Form submission
    document.getElementById("contact-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      try {
        const res = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();
        if (data.success) {
          alert("Message sent successfully!");
          e.target.reset();
        } else {
          alert("Something went wrong, please try again!");
        }
      } catch (error) {
        alert("Server not responding. Please check your backend.");
        console.error(error);
      }
    });