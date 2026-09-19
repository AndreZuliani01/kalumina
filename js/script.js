document.addEventListener("DOMContentLoaded", function () {
  // Fungsi ini akan dijalankan untuk setiap carousel di halaman
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const content = carousel.querySelector(".carousel-content");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    // Event listener untuk tombol 'next'
    nextButton.addEventListener("click", () => {
      // Geser konten sejauh lebar satu kartu + jaraknya
      const scrollAmount =
        content.querySelector(".expert-card, .testimonial-card").offsetWidth +
        20;
      content.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Event listener untuk tombol 'previous'
    prevButton.addEventListener("click", () => {
      const scrollAmount =
        content.querySelector(".expert-card, .testimonial-card").offsetWidth +
        20;
      content.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  });
});
