document.addEventListener("DOMContentLoaded", function () {
  // Menargetkan form berdasarkan ID-nya
  const form = document.getElementById("aiProfileForm");

  // Menambahkan listener hanya pada event 'submit' form
  form.addEventListener("submit", function (event) {
    // Mencegah form mengirim data secara default (agar halaman tidak refresh)
    event.preventDefault();

    // Menghapus error style sebelumnya (jika ada)
    clearErrors();

    // Melakukan validasi, dan langsung mengambil tindakan berdasarkan hasilnya
    if (validateForm()) {
      // Jika validasi berhasil:
      // 1. Kumpulkan data dari form
      const formData = getFormData();

      // 2. Ubah objek data menjadi string kueri untuk URL
      // (Ini menangani nilai ganda seperti checkbox secara otomatis)
      const params = new URLSearchParams();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((value) => params.append(key, value));
        } else {
          params.append(key, formData[key]);
        }
      }
      const queryString = params.toString();

      // 3. Arahkan pengguna ke halaman profilling.html dengan membawa data
      window.location.href = `profilling.html?${queryString}`;
    } else {
      // Jika validasi gagal, beri peringatan kepada pengguna
      alert("Harap isi semua kolom yang wajib diisi (*).");
    }
  });

  // Fungsi untuk memvalidasi input form
  function validateForm() {
    let isValid = true;

    // 1. Validasi Usia Anak
    const childAge = document.getElementById("child-age");
    if (childAge.value === "") {
      isValid = false;
      childAge.classList.add("input-error");
    }

    // 2. Validasi Kondisi/Kebutuhan Khusus (minimal 1 dipilih)
    const conditions = document.querySelectorAll(
      'input[name="conditions"]:checked'
    );
    if (conditions.length === 0) {
      isValid = false;
      document
        .getElementById("conditions-wrapper")
        .classList.add("input-error");
    }

    // 3. Validasi Layanan Prioritas (minimal 1 dipilih)
    const services = document.querySelectorAll(
      'input[name="services"]:checked'
    );
    if (services.length === 0) {
      isValid = false;
      document.getElementById("services-wrapper").classList.add("input-error");
    }

    return isValid;
  }

  // Fungsi untuk mengumpulkan semua data dari form menjadi satu objek
  function getFormData() {
    const selectedConditions = Array.from(
      document.querySelectorAll('input[name="conditions"]:checked')
    ).map((cb) => cb.value);

    const selectedServices = Array.from(
      document.querySelectorAll('input[name="services"]:checked')
    ).map((cb) => cb.value);

    const data = {
      childAge: document.getElementById("child-age").value,
      location: document.getElementById("location").value,
      specialConditions: selectedConditions,
      budget: document.getElementById("budget").value,
      priorityServices: selectedServices,
    };

    return data;
  }

  // Fungsi untuk membersihkan semua highlight error dari form
  function clearErrors() {
    const errorElements = document.querySelectorAll(".input-error");
    errorElements.forEach((el) => el.classList.remove("input-error"));
  }
});
