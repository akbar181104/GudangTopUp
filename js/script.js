// toggle class active hamburgermenu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hambergermenu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// toggle class active searchform
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

const sb = document.querySelector("#search-button");
document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// klik luar untuk menghilangkan menu

const hm = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
// klik luar untuk menghilangkan menu

// checkout box 

const itemCheckout = document.querySelector("#checkout-detail");

const itemProduct = document.querySelector(".menu-card-img1");


itemProduct.onclick = (e) => {
  itemCheckout.style.display = "flex";
  e.preventDefault();
};

document.querySelector(".menu-card-img2").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img3").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img4").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img5").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img6").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img7").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");
document.querySelector(".menu-card-img8").onclick = () => alert("Belum bisa di akses bang, cari toko lain!");

//Input user id dan zone id hanya angka
document.addEventListener("DOMContentLoaded", () => {
  const checkout = document.querySelector("#checkout-detail"); // Ambil elemen checkout
  if (checkout) {
    checkout.querySelectorAll("input[type='text']").forEach((input) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, ""); // Hanya angka
      });
    });
  }
});


// klik tombol close
document.querySelector(".checkout .close-icon").onclick = (e) => {
  itemCheckout.style.display = "none";
  
  // Sembunyikan QR Code dan reset QR
  document.getElementById("qr-container").style.display = "none";
  document.getElementById("qr-code").src = "";

  // Reset total harga
  document.getElementById("total-amount").innerHTML = "Rp. - <br /><span>*Termasuk PPN</span>";

  // Hilangkan highlight pilihan UC (pastikan semua UC tidak terpilih)
  document.querySelectorAll(".voucher-total").forEach((item) => {
    item.classList.remove("selected"); // Hapus class 'selected' jika ada
  });

  e.preventDefault();
};


document.addEventListener("DOMContentLoaded", () => {
  const vouchers = document.querySelectorAll(".voucher-total");
  const totalAmount = document.getElementById("total-amount");
  const buyButton = document.getElementById("buy-now-btn");
  const qrContainer = document.getElementById("qr-container");
  const qrCode = document.getElementById("qr-code");
  const checkoutClose = document.querySelector(".checkout .close-icon");
  const userIdInput = document.querySelector(".id-akun");
  const zoneIdInput = document.querySelector(".id-zona");

  let selectedPrice = 0;

  // Pilih paket UC dan update total harga
  const PPN = 0.11; // PPN 11%

  vouchers.forEach((voucher) => {
    voucher.addEventListener("click", () => {
      const priceText = voucher.querySelector("span").innerText;
      let basePrice = parseInt(priceText.replace("Rp. ", "").replace(".", "")); 
  
      let finalPrice = basePrice + (basePrice * PPN); // Hitung harga setelah PPN
      finalPrice = Math.round(finalPrice); // Bulatkan ke angka terdekat
  
      selectedPrice = finalPrice;
      selectedUC = voucher.querySelector("h3").innerText.split("\n")[0]; // Ambil teks UC
  
      totalAmount.innerHTML = `Rp. ${finalPrice.toLocaleString("id-ID")} <br /><span>*Termasuk PPN</span>`;
  
      checkFormValidity();
    });
  });
  

  // Validasi input hanya angka tanpa panah atas-bawah
  [userIdInput, zoneIdInput].forEach((input) => {
    input.setAttribute("type", "text");
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, ""); // Hanya angka
      checkFormValidity();
    });
  });

  // Saat klik "Beli Sekarang", munculkan QR Code
  buyButton.addEventListener("click", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (selectedPrice > 0) {
        const qrMessage = `Pembayaran Berhasil!\n` +
                          `─────────────────────\n` +
                          `💰 Pembelian : ${selectedUC}\n` +
                          `💵 Total           : Rp. ${selectedPrice}\n` +
                          `─────────────────────\n` +
                          `Terima kasih telah berbelanja!`;

        const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrMessage)}`;
        qrCode.src = qrURL;
        qrContainer.style.display = "block";
    } else {
        alert("Pilih jumlah UC terlebih dahulu!");
    }
});


  // Saat checkout ditutup, reset form
  checkoutClose.addEventListener("click", (e) => {
    e.preventDefault();
    qrContainer.style.display = "none";
    qrCode.src = "";
    selectedPrice = 0;
    totalAmount.innerHTML = `Rp. - <br /><span>*Termasuk PPN</span>`;
    userIdInput.value = "";
    zoneIdInput.value = "";
    checkFormValidity();
  });

  checkFormValidity();
});


// Agar input hanya huruf di Nama
const nameInput = document.getElementById("name-input");

nameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, ""); // Hanya huruf dan spasi
});

// Tombol Topup Sekarang
document.getElementById("topup-sekarang").addEventListener("click", function (e) {
  e.preventDefault(); // Mencegah perilaku default link
  window.location.href = "#menu"; // Arahkan ke daftar game
});

// Kolom Pencarian
document.getElementById("search-button").addEventListener("click", function (e) {
  e.preventDefault(); // Mencegah perilaku default link
  window.location.href = "#menu"; // Arahkan ke daftar game
});
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const menuCards = document.querySelectorAll(".menu-card");

  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase(); // Ambil input dan ubah ke huruf kecil

    menuCards.forEach((card) => {
      const title = card.querySelector(".menu-card-tittle").textContent.toLowerCase();

      if (title.includes(query)) {
        card.style.display = "block"; // Tampilkan jika cocok
      } else {
        card.style.display = "none"; // Sembunyikan jika tidak cocok
      }
    });
  });
});


