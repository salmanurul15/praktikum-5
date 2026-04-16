document.addEventListener("DOMContentLoaded", function () {
    console.log("JS NYAMBUNG ✅");

    // === 1. FITUR DARK MODE ===
    const btnToggle = document.getElementById("darkModeToggle");
    
    if (btnToggle) {
        // Cek penyimpanan lokal saat halaman dimuat
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
            btnToggle.innerText = "☀️ Mode Terang";
        }

        btnToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                btnToggle.innerText = "☀️ Mode Terang";
            } else {
                localStorage.setItem("theme", "light");
                btnToggle.innerText = "🌙 Mode Gelap";
            }
        });
    }

    // === 2. FORM PENDAFTARAN ===
    const form = document.getElementById("formPendaftaran");
    const hasil = document.getElementById("hasilPendaftaran");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const nohp = document.getElementById("nohp").value.trim();
            const kategori = document.getElementById("kategori").value;
            const pesan = document.getElementById("pesan").value.trim();

            if (nama === "" || email === "" || nohp === "" || kategori === "") {
                alert("Semua field wajib diisi!");
                return;
            }

            hasil.innerHTML = `
                <div style="margin-top:20px; padding:20px; background:#e2ecd3; color:#1f280f; border-radius:10px; border-left:6px solid #889063; box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity:0; transform:translateY(15px); transition:all 0.5s ease-out;" id="hasilAnim">
                    <h3 style="margin-bottom:10px; color:#354024;">🎉 Data Berhasil Dikirim 🎉</h3>
                    <p><strong>Nama:</strong> ${nama}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>No HP:</strong> ${nohp}</p>
                    <p><strong>Kategori:</strong> ${kategori}</p>
                    <p><strong>Pesan:</strong> ${pesan}</p>
                </div>
            `;

            setTimeout(() => {
                const hasilAnim = document.getElementById("hasilAnim");
                if (hasilAnim) {
                    hasilAnim.style.opacity = "1";
                    hasilAnim.style.transform = "translateY(0)";
                }
            }, 50);

            form.reset();
        });
    }

    // === 3. VISITOR COUNTER & GUESTBOOK ===
    
    // Page View Counter
    let viewCount = localStorage.getItem("pageViews") || 0;
    viewCount++;
    localStorage.setItem("pageViews", viewCount);
    const viewCountEl = document.getElementById("view-count");
    if (viewCountEl) viewCountEl.innerText = viewCount;

    // Load Visitors
    const visitorListEl = document.getElementById("visitorList");
    let visitors = JSON.parse(localStorage.getItem("visitorsData")) || [];

    function renderVisitors() {
        if (!visitorListEl) return;
        visitorListEl.innerHTML = "";
        if (visitors.length === 0) {
            visitorListEl.innerHTML = "<li style='font-style: italic; font-weight: normal'>Belum ada pengunjung. Jadilah yang pertama!</li>";
        } else {
            visitors.forEach(visitor => {
                const li = document.createElement("li");
                li.innerText = "👋 " + visitor;
                visitorListEl.appendChild(li);
            });
        }
    }

    renderVisitors();

    // Add Visitor
    const formVisitor = document.getElementById("formVisitor");
    if (formVisitor) {
        formVisitor.addEventListener("submit", function (e) {
            e.preventDefault();
            const visitorNameInput = document.getElementById("visitorName");
            const name = visitorNameInput.value.trim();

            if (name) {
                visitors.unshift(name);
                if (visitors.length > 20) visitors.pop();
                localStorage.setItem("visitorsData", JSON.stringify(visitors));
                visitorNameInput.value = "";
                renderVisitors();

                const btn = formVisitor.querySelector("button");
                const originalText = btn.innerText;
                btn.innerText = "Sukses!";
                btn.style.background = "#4CAF50";
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "";
                }, 1000);
            }
        });
    }
});