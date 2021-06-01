$(document).ready(function() {
    const re = new RegExp('^[1-9][0-9]*$')
    const btn = $('#btn');
    let id = $('#idHero');
    btn.click((e) => {
        e.preventDefault();
        id = $('#idHero').val();
        console.log(id.toString());
        if (re.test(id)) {
            $.ajax({
                type: 'GET',
                url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`,
                dataType: 'json',
                success: function(data) {
                    addDescription(data);
                },
                error: function(err) {
                    alert('Hubo un problema al obtener el Super Héroe, intenta con otro ID');
                    id = $('#idHero').val(1);
                },
                async: true,
            })
        } else {
            alert("Ingrese un ID válido")
            id = $('#idHero').val(1);
        }
    })

})

const addDescription = (data) => {
    console.log(data);
    let name = data.name
    let img = data.images.lg
    let connections = data.connections.groupAffiliation
    let publisher = data.biography.publisher
    let occupation = data.work.occupation;
    let firstAppearance = data.biography.firstAppearance;
    let height = data.appearance.height;
    let weight = data.appearance.weight;
    let alias = data.biography.aliases;
    let description = $('#description')
    description.html('')
    description.append( /*HTML */
        `<div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${img}" alt="Heore" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Nombre : ${name}</h5>
                        <p class="card-text fs-6">Conexiones : ${connections} </p>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><span class="fw-bold">Editorial: </span>${publisher}</li>
                            <li class="list-group-item"><span class="fw-bold">Ocupación: </span>${occupation}</li>
                            <li class="list-group-item"><span class="fw-bold">Primera aparición: </span>${firstAppearance}</li>
                            <li class="list-group-item"><span class="fw-bold">Altura: </span>${height}</li>
                            <li class="list-group-item"><span class="fw-bold">Peso: </span>${weight}</li>
                            <li class="list-group-item"><span class="fw-bold">Apodos: </span>${alias}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `)
}

const addGraphics = (data) => {

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Desktop Browser Market Share in 2016"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 51.08, label: "Chrome" },
                { y: 27.34, label: "Internet Explorer" },
                { y: 10.62, label: "Firefox" },
                { y: 5.02, label: "Microsoft Edge" },
                { y: 4.07, label: "Safari" },
                { y: 1.22, label: "Opera" },
                { y: 0.44, label: "Others" }
            ]
        }]
    });
    chart.render();

}