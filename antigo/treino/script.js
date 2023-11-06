class MyNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar">
            <div class="brand-title"><a href="#">Aprenda toki pona</a></div>
            <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
            <div class="navbar-links">
                <ul>
                    <li><a href="#">Página Inicial</a></li>
                    <li><a href="#">Lições</a></li>
                    <li><a href="#">Dicionário</a></li>
                    <li><a href="#">Sobre</a></li>
                </ul>
            </div>
        </nav>
        `
    }
}

customElements.define('my-navbar', MyNavbar);

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle('active');
});

