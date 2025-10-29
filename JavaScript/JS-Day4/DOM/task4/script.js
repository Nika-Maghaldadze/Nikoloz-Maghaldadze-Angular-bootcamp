'use strict'

const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach((img) => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const fullImg = document.createElement("img");
        fullImg.src = img.src.replace("/300/200", "/1000/600");
        fullImg.classList.add("modal-img");

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.innerHTML = "✕";

        overlay.appendChild(fullImg);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);

        const closeModal = () => overlay.remove();

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });
        closeBtn.addEventListener("click", closeModal);

        document.addEventListener("keydown", function escHandler(e) {
            if (e.key === "Escape") {
                closeModal();
                document.removeEventListener("keydown", escHandler);
            }
        });
    });
});
