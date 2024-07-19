function iniciarRecomendador() {
    let nombre = prompt("¡Que onda che! Bienvenido a este test sobre de que podrias comer hoy, te voy a guiar a la cocina con unos platillos excelentes. Por favor, ingresa tu nombre:");
    
    if (nombre === null || nombre === '') {
        alert("Por favor, ingresa un nombre válido para continuar.");
        return;
    }
    
    alert("Hola, " + nombre + " " + "te voy a ayudar a elegir el plato del dia.");
    
    let preferencia = prompt("¿Que preferís comer hoy? Por favor, elige una opción:\n1. Carne\n2. Pollo\n3. Comida vegetariana");
    
    let platoRecomendado;
    switch (preferencia) {
        case '1':
            platoRecomendado = 'Milangas con pastas (obviamente las pastas tienen que ir con crema y queso)';
            break;
        case '2':
            platoRecomendado = 'Pollo al horno con papas (tenes que ponerle vino siosi al pollo)';
            break;
        case '3':
            platoRecomendado = 'Tortilla de acelga (UN MANJAR)';
            break;
        default:
            alert('Opcion no válida. Por favor, tenes que elegir una opción del 1 al 3.');
            return;
    }
    
    alert("Perfecto" + " " + nombre + " " + "te recomiendo hacer este plato el dia de hoy: " + platoRecomendado + " " + "(espero que lo hagas hoy eh)");
}