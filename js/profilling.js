document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.getElementById("profileResultContainer");

  // Ambil data dari parameter URL
  const params = new URLSearchParams(window.location.search);

  // Konversi parameter menjadi objek yang mudah digunakan
  const profileData = {
    childAge: params.get("childAge") || "Not provided",
    location: params.get("location") || "Not provided",
    specialConditions: params.getAll("specialConditions"), // getAll untuk mengambil semua nilai dengan nama yang sama
    budget: params.get("budget") || "Not provided",
    priorityServices: params.getAll("priorityServices"),
  };

  // Fungsi untuk menampilkan data ke dalam HTML
  function renderProfile(data) {
    // Hapus loader
    profileContainer.innerHTML = "";

    // Buat daftar layanan dan kondisi
    const conditionsList =
      data.specialConditions.length > 0
        ? `<ul>${data.specialConditions
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`
        : "None selected";

    const servicesList =
      data.priorityServices.length > 0
        ? `<ul>${data.priorityServices
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`
        : "None selected";

    // Buat HTML untuk ditampilkan
    const profileHTML = `
            <h2>Child & Family Information</h2>
            <div class="profile-item">
                <div class="profile-item-label">Child's Age:</div>
                <div class="profile-item-value">${data.childAge.replace(
                  "-",
                  " - "
                )} years old</div>
            </div>
            <div class="profile-item">
                <div class="profile-item-label">Location:</div>
                <div class="profile-item-value">${data.location}</div>
            </div>
            <div class="profile-item">
                <div class="profile-item-label">Monthly Budget:</div>
                <div class="profile-item-value">${data.budget}</div>
            </div>
            <h2>Identified Needs & Services</h2>
            <div class="profile-item">
                <div class="profile-item-label">Special Conditions:</div>
                <div class="profile-item-value">${conditionsList}</div>
            </div>
            <div class="profile-item">
                <div class="profile-item-label">Priority Services:</div>
                <div class="profile-item-value">${servicesList}</div>
            </div>
        `;

    profileContainer.innerHTML = profileHTML;
  }

  // Tampilkan data setelah sedikit jeda untuk mensimulasikan "AI" bekerja
  setTimeout(() => {
    renderProfile(profileData);
  }, 1000); // Jeda 1 detik
});
