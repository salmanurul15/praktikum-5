document.addEventListener("DOMContentLoaded", function () {

    console.log("JS NYAMBUNG ✅");

    const form = document.getElementById("formPendaftaran");
    const hasil = document.getElementById("hasilPendaftaran");

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

        if (!email.includes("@")) {
            alert("Email tidak valid!");
            return;
        }

        hasil.innerHTML = `
            <div style="margin-top:20px; padding:15px; background:#f1f5f9; border-radius:10px;">
                <h3>Data Berhasil Dikirim ✅</h3>
                <p><strong>Nama:</strong> ${nama}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>No HP:</strong> ${nohp}</p>
                <p><strong>Kategori:</strong> ${kategori}</p>
                <p><strong>Pesan:</strong> ${pesan}</p>
            </div>
        `;

        alert("Pesan berhasil dikirim!");
        form.reset();
    });

    document.getElementById("nama").addEventListener("input", function () {
        console.log("User sedang mengetik nama...");
    });

    // === VISITOR COUNTER & GUESTBOOK ===
    
    // 1. Page View Counter
    let viewCount = localStorage.getItem("pageViews") || 0;
    viewCount++;
    localStorage.setItem("pageViews", viewCount);
    document.getElementById("view-count").innerText = viewCount;

    // 2. Load Visitors
    const visitorListEl = document.getElementById("visitorList");
    let visitors = JSON.parse(localStorage.getItem("visitorsData")) || [];

    function renderVisitors() {
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

    // 3. Add Visitor
    const formVisitor = document.getElementById("formVisitor");
    formVisitor.addEventListener("submit", function (e) {
        e.preventDefault();
        const visitorNameInput = document.getElementById("visitorName");
        const name = visitorNameInput.value.trim();

        if (name) {
            // Add new visitor to the beginning of the array
            visitors.unshift(name);
            // Limit to 20 recent visitors to save space
            if (visitors.length > 20) visitors.pop();
            
            localStorage.setItem("visitorsData", JSON.stringify(visitors));
            
            visitorNameInput.value = "";
            renderVisitors();
            
            // simple visual feedback
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

});