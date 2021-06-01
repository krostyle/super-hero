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
                    addGraphics(data);
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
    const powerStats = Object.keys(data.powerstats);
    let chart = new CanvasJS.Chart("graphics", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Estadísticas de Poder"
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
                { y: data.powerstats.combat, label: powerStats[0] },
                { y: data.powerstats.durability, label: powerStats[1] },
                { y: data.powerstats.intelligence, label: powerStats[2] },
                { y: data.powerstats.power, label: powerStats[3] },
                { y: data.powerstats.speed, label: powerStats[4] },
                { y: data.powerstats.strength, label: powerStats[5] },

            ]
        }]
    });
    chart.render();

}