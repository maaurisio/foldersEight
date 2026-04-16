// Función que simula pedir comida (asíncrona)
function pedirComida() {
    return new Promise((resolve) => {
        console.log("🧑‍🍳 Preparando tu hamburguesa...");

        // Simula tiempo de preparación (3 segundos)
        setTimeout(() => {
            resolve("🍔 Hamburguesa lista!");
        }, 3000);
    });
}

// Función principal
async function restaurante() {
    console.log("👤 Haciendo pedido...");

    // Esperamos la comida (sin bloquear todo el programa)
    const comida = await pedirComida();

    console.log(comida);
}

// Ejecutamos
restaurante();

console.log("💬 Mientras espero, puedo hacer otras cosas...");