document.addEventListener("DOMContentLoaded", function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4APB8S-Tbkz-kVK04D5Bow5grToTaW2LizCfYLGcLYPUxb4Wcdi4zYpWo_CfKRIWgHg/exec';
    const form = document.forms['google-sheet'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Get current language
        const language = getLanguage();

        // Show loading message
        const loadingMessage = document.createElement('div');
        loadingMessage.id = 'loadingMessage';
        loadingMessage.style.position = 'fixed';
        loadingMessage.style.top = '0';
        loadingMessage.style.left = '0';
        loadingMessage.style.width = '100%';
        loadingMessage.style.height = '100%';
        loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingMessage.style.color = 'white';
        loadingMessage.style.display = 'flex';
        loadingMessage.style.justifyContent = 'center';
        loadingMessage.style.alignItems = 'center';
        loadingMessage.style.zIndex = '1000';
        loadingMessage.innerHTML = `<h2>${translations[language].loading}</h2>`;
        document.body.appendChild(loadingMessage);

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // Redirect to thank you page
                window.location.href = 'thankyou.html';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Something went wrong. Please try again.');
                document.body.removeChild(loadingMessage);
            });
    });

    // Translation functions
    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        switchLanguage(lang);
    }

    function getLanguage() {
        return localStorage.getItem('language') || 'es';
    }

    function switchLanguage(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.innerText = translations[language][key];
        });
    }

    const translations = {
        es: {
            title: "Pan de la Sierra",
            slogan: "Haciendo pan del bueno",
            ultimo_pedido: "Próxima venta de pan: Sábado 17 de Agosto. Último día para pedidos: Viernes 16 de Agosto a las 7:00 p.m.",
            restante: "Tiempo restante para tomar pedidos: ",
            orders: "Haz tu Pedido",
            "order-title": "Comienza tu orden",
            "order-note": "**Estas órdenes se entregarán el Sábado 17 de Agosto.",
            "name-label": "Nombre y apellido para la Orden:",
            "NameLastName": "Nombre y appelido",
            "phone-label": "Número de teléfono: (Requerido para la confirmación del pedido)",
            "choose-breads": "Elegir panes ($2.00 cada pan)",
            bread1: "Pan Sencillo:",
            bread2: "Pan Azucarado (Cubierto con azúcar antes de hornear):",
            bread3: "Pan Revolcado (Metido en azúcar después de hornear):",
            bread4: "Pan con Barniz (Concha):",
            "special-instructions": "Instrucciones Especiales:",
            payment:"Pago en efectivo",
            Instructions1: "**Una vez que oprima el botón de [Enviar Orden], espere unos segundos para recibir un mensaje de confirmación**",
            loading: "Enviando Pedido...",
            submit: "Enviar Orden",
            reset: "Borrar Orden"
        },
        en: {
            title: "Pan de la Sierra",
            slogan: "Making that good bread",
            ultimo_pedido: "Next bread sale is: Saturday August 17th. Last day for orders: Friday, August 16, 7:00pm",
            restante: "Remaining time to take orders: ",
            orders: "Make an Order",
            "order-title": "Start Your Order",
            "order-note": "**These orders will be delivered on Saturday, August 17th",
            "name-label": "First and last name for Order:",
            "NameLastName": "Name and last name",
            "phone-label": "Phone Number: (Required for order confirmation)",
            "choose-breads": "Choose Bread ($2.00 per bread)",
            bread1: "Plain Bread:",
            bread2: "Sugared Bread (Topped with sugar before baking):",                
            bread3: "Rolled Bread (Dipped in sugar after baking):",
            bread4: "Glazed Bread (A Concha Bread):",
            "special-instructions": "Special Instructions:",
            payment:"Payment in cash",
            Instructions1: "**Once you press the -Submit Order- button, wait a few seconds to receive a confirmation message**",
            loading: "Sending Order...",
            submit: "Submit Order",
            reset: "Reset Order"
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const language = getLanguage();
        switchLanguage(language);
    });

    document.getElementById('language-switcher').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const language = event.target.innerText.toLowerCase() === 'english' ? 'en' : 'es';
            setLanguage(language);
        }
    });
    // Countdown Timer Script
    function updateCountdownMessage() {
        const language = getLanguage();
        let message;
        if (language === 'es') {
            message = "| AL MOMENTO NO ESTAMOS TOMANDO ÓRDENES |";
        } else {
            message = "| AT THIS MOMENT WE ARE NO LONGER TAKING ORDERS |";
        }
        document.getElementById("countdown-timer").innerHTML = message;
    }

    var countDownDate = new Date("August 16, 2024 19:00:00").getTime(); // Update to your actual end time

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown-timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            updateCountdownMessage(); // Update message when countdown ends
            document.querySelector('a[href="#orders"]').removeAttribute("href"); // Remove the href attribute
            document.querySelector('a[href="#orders"]').style.pointerEvents = 'none'; // Disable clicking
            document.querySelector('a[href="#orders"]').style.color = 'gray'; // Optional: Change color to indicate disabled state
        }
    }, 1000);
});