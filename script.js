if (window.location.pathname.includes("index.html")) {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        if (!nome || !email || !usuario || !senha) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nome.match(/^[a-zA-Z\s]+$/)) {
            alert("O nome deve conter apenas letras e espaços.");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (usuario.length < 3) {
            alert("O usuário deve ter pelo menos 3 caracteres.");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuarios.find(u => u.usuario === usuario || u.email === email);
        if (usuarioExistente) {
            alert("Usuário ou e-mail já cadastrado. Por favor, utilize outros dados.");
            return;
        }

        const novoUsuario = { nome, email, usuario, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "contaCriada.html";
    });
}


if (window.location.pathname.includes("contaCriada.html")) {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

        if (usuarioEncontrado) {
            alert("Login realizado com sucesso!");
            window.location.href = "paginaInicial.html";
        } else {
            alert("Usuário ou senha incorretos.");
        }
    });
}