// footer.js
document.addEventListener("DOMContentLoaded", function() {
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-6 col-sm-12" style="margin-bottom: 20px;">
                            <p>© 2026 Анисович Владислав Дмитриевич<br>Персональный сайт учителя математики</p>
                        </div>
                        <div class="col-6 col-sm-12" style="text-align: right;">
                            <a href="#" style="margin: 0 10px;"><i class="fab fa-vk"></i></a>
                            <a href="#" style="margin: 0 10px;"><i class="fab fa-youtube"></i></a>
                            <a href="#" style="margin: 0 10px;"><i class="fab fa-telegram"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
});