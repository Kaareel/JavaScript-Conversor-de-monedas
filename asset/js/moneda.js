const form = document.getElementById("calculadora")
let myChart;
form.addEventListener("submit", (event) => {
    console.log("text")
    event.preventDefault()
    const value = form.elements["valor"].value
    const moneda = form.elements["moneda"].value

    if (!value) {
        alert("Ingrese un valor")
        return
    }
    if (!moneda) {
        alert("Seleccione una moneda")
        return
    }
    calculadora(value, moneda)
})
async function calculadora(value, moneda) {
    try {
        console.log("text")
        const valores = await fetch(`https://mindicador.cl/api/${moneda}`)
        const resultados = await valores.json()
        const datos = resultados.serie
        const total = value / datos[0].valor
        document.getElementById("total-valor").innerHTML = Math.round(total * 100) / 100

        const labels = datos.map((item) => new Date(item.fecha).toLocaleDateString("en-US"));
        const values = datos.map((item) => item.valor);

        const datasets = [{
            label: "Moneda",
            borderColor: "rgb(255, 99, 132)",
            data: values
        }]

        const config = {
            type: "line",
            data: {labels, datasets}
        };

        if (myChart) {
            myChart.destroy();
        }

        const chart = document.getElementById("myChart");
        chart.style.backgroundColor = "white";
        myChart = new Chart(chart, config);

    } catch (error) {
        alert(error.message)
    }
}