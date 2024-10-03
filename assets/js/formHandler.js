document.addEventListener("DOMContentLoaded", function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4APB8S-Tbkz-kVK04D5Bow5grToTaW2LizCfYLGcLYPUxb4Wcdi4zYpWo_CfKRIWgHg/exec';
    const form = document.forms['google-sheet'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const language = getLanguage();

        const name = form['name'].value.trim();
        const phone = form['phone'].value.trim();
        const bread1 = parseInt(form['bread1'].value, 10);
        const bread2 = parseInt(form['bread2'].value, 10);
        const bread3 = parseInt(form['bread3'].value, 10);
        const bread4 = parseInt(form['bread4'].value, 10);

        if (!name) {
            alert(translations[language].nameValidation);
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert(translations[language].phoneValidation);
            return;
        }

        if (bread1 === 0 && bread2 === 0 && bread3 === 0 && bread4 === 0) {
            alert(translations[language].breadValidation);
            return;
        }

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
                window.location.href = `thankyou.html?lang=${language}`;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert(translations[language].errorMessage);
                document.body.removeChild(loadingMessage);
            });
    });

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
        updateDates(language); // Update the formatted dates
    }

    const translations = {
        es: {
            title: "Pan de la Sierra",
            slogan: "Haciendo pan del bueno",
            ultimo_pedido: "Próxima venta de pan: Sábado 28 de Septiembre. Último día para pedidos: Viernes 27 de Septiembre a las 6:00 p.m.",
            restante: "Tiempo restante para tomar pedidos: ",
            orders: "Haz tu Pedido",
            "order-title": "Comienza tu orden",
            "order-note": "**Estas órdenes se entregarán el Sábado 28 de Septiembre.",
            "name-label": "Nombre y apellido para la Orden:",
            "NameLastName": "Nombre y appelido",
            "phone-label": "Número de teléfono: (Requerido para la confirmación del pedido)",
            "choose-breads": "Elegir panes ($2.00 cada pan)",
            bread1: "Pan Sencillo:",
            bread2: "Pan Azucarado:",
            breaddesc2: "Cubierto con azúcar antes de hornear",  
            bread3: "Pan Revolcado:",
            breaddesc2: "Metido en azúcar después de hornear", 
            bread4: "Pan con Barniz:",
            breaddesc4: "Mejor conocida como Concha", 
            "special-instructions": "Instrucciones Especiales:",
            payment:"Pago solo en efectivo",
            Quantity: "Cantidad",
            Instructions1: "**Una vez que oprima el botón de [Enviar Orden], espere unos segundos para recibir un mensaje de confirmación**",
            loading: "Enviando Pedido...",
            submit: "Enviar Orden",
            reset: "Borrar Orden",
            imagebtn: "VER IMAGEN",
            nameValidation: "Por favor ingresa tu nombre y apellido.",
            phoneValidation: "Por favor ingrese un número de teléfono válido de 10 dígitos.",
            breadValidation: "Por favor seleccione al menos un pan para ordenar.",
            errorMessage: "Algo salió mal. Por favor, inténtelo de nuevo."
        },
        en: {
            title: "Pan de la Sierra",
            slogan: "Making that good bread",
            ultimo_pedido: "Next bread sale is: Saturday September 28th. Last day for orders: Friday, September 27, 6:00pm",
            restante: "Remaining time to take orders: ",
            orders: "Make an Order",
            "order-title": "Start Your Order",
            "order-note": "**These orders will be ready on Saturday, September 28th",
            "name-label": "First and last name for Order:",
            "NameLastName": "Name and last name",
            "phone-label": "Phone Number: (Required for order confirmation)",
            "choose-breads": "Choose Bread ($2.00 per bread)",
            bread1: "Plain Bread:",
            bread2: "Sugared Bread:",
            breaddesc2: "Topped with sugar before baking",                
            bread3: "Rolled Bread:",
            breaddesc3: "Dipped in sugar after baking",
            bread4: "Glazed Bread:",
            breaddesc4: "Better known as Concha Bread", 
            "special-instructions": "Special Instructions:",
            payment:"Payment only in cash",
            Quantity: "Quantity",
            Instructions1: "**Once you press the -Submit Order- button, wait a few seconds to receive a confirmation message**",
            loading: "Sending Order...",
            submit: "Submit Order",
            reset: "Reset Order",
            imagebtn: "VIEW IMAGE",
            nameValidation: "Please enter your full name.",
            phoneValidation: "Please enter a valid 10-digit phone number.",
            breadValidation: "Please select at least one bread to order.",
            errorMessage: "Something went wrong. Please try again."
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
            switchLanguage(language);  
            updateCountdownMessage();  
        }
    });

    // Countdown Timer Script
    var countDownDate = localStorage.getItem('countDownDate') 
        ? parseInt(localStorage.getItem('countDownDate')) 
        : new Date("September 27, 2024 18:00:00").getTime(); 

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
            updateCountdownMessage(); 
            document.querySelector('a[href="#orders"]').removeAttribute("href"); 
            document.querySelector('a[href="#orders"]').style.pointerEvents = 'none'; 
            document.querySelector('a[href="#orders"]').style.color = 'gray'; 
        }
    }, 1000);

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

    // Fetch the stored dates from localStorage
    const savedCountDownDate = localStorage.getItem('countDownDate');
    const savedNextBreadSellDate = localStorage.getItem('nextBreadSellDate');

    function formatDate(timestamp, locale) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12:true };
        return new Date(parseInt(timestamp)).toLocaleDateString(locale, options); 
    }

    function updateDates(language) {
        const locale = language === 'es' ? 'es-ES' : 'en-US';

        if (savedNextBreadSellDate) {
            document.getElementById('next-bread-sell').innerHTML = language === 'es'
                ? `Próxima venta de pan: ${formatDate(savedNextBreadSellDate, locale)}`
                : `Next bread sale is: ${formatDate(savedNextBreadSellDate, locale)}`;
        }

        if (savedCountDownDate) {
            document.getElementById('last-day-orders').innerHTML = language === 'es'
                ? `Último día para pedidos: ${formatDate(savedCountDownDate, locale)}`
                : `Last day for orders: ${formatDate(savedCountDownDate, locale)}`;
        }
    }

    // Initialize with the current language
    updateDates(getLanguage());
});
