
const studio = document.getElementById("studio");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const resetBtn = document.getElementById("resetBtn");

// =========================
// FUNGSI UNGGAH GAMBAR
// =========================


function pasangUpload(inputId, gambarId, teksId) {
    const input = document.getElementById(inputId);
    const gambar = document.getElementById(gambarId);
    const teks = document.getElementById(teksId);

    if (!input || !gambar) {
        console.error("Elemen tidak ditemukan:", inputId, gambarId);
        return;
    }

    input.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Silakan pilih file gambar.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            gambar.src = e.target.result;
            gambar.hidden = false;

            if (teks) {
                teks.hidden = true;
            }
        };

        reader.readAsDataURL(file);
    });
}

// Upload logo hanya mengubah logo
pasangUpload("inputLogo", "logoPreview", "logoText");

// Upload landscape hanya mengubah foto landscape
pasangUpload("inputFoto", "fotoPreview", "fotoText");

// =========================
// FUNGSI FULLSCREEN
// =========================

fullscreenBtn.addEventListener("click", async function () {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else if (studio.requestFullscreen) {
            await studio.requestFullscreen();
        } else {
            alert("Browser ini tidak mendukung fullscreen.");
        }
    } catch (error) {
        console.error("Fullscreen gagal:", error);
        alert(
            "Fullscreen tidak berhasil dibuka. " +
            "Coba jalankan halaman melalui browser Chrome."
        );
    }
});

// Update tulisan tombol fullscreen
function updateFullscreenButton() {
    if (document.fullscreenElement === studio) {
        fullscreenBtn.innerHTML =
            "<span>⛶</span><strong>Keluar Fullscreen</strong>";
    } else {
        fullscreenBtn.innerHTML =
            "<span>⛶</span><strong>Fullscreen</strong>";
    }
}

document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
);

// =========================
// FUNGSI RESET
// =========================

resetBtn.addEventListener("click", function () {
    const konfirmasi = confirm(
        "Yakin ingin menghapus logo dan foto yang dipilih?"
    );

    if (!konfirmasi) return;

    const daftarGambar = [
        {
            input: "inputLogo",
            gambar: "logoPreview",
            teks: "logoText"
        },
        {
            input: "inputFoto",
            gambar: "fotoPreview",
            teks: "fotoText"
        }
    ];

    daftarGambar.forEach(function (item) {
        const input = document.getElementById(item.input);
        const gambar = document.getElementById(item.gambar);
        const teks = document.getElementById(item.teks);

        input.value = "";
        gambar.removeAttribute("src");
        gambar.hidden = true;
        teks.hidden = false;
    });
});
