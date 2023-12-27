function filter(value) {
    console.log("filter: " + value);
    const block = document.getElementsByClassName('name');
    Array.from(block).forEach((element) => {
        if (value === "all") {
            element.classList.remove("hide");
        } else if (element.querySelector("span").innerText === value) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }


    })
}

//chama a API (spells)
document.addEventListener("DOMContentLoaded", function () {
    /*This code was slow async function fetchData(url) { 
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
    }
    async function fetchSpellInfo(url) {
        const resposta = await fetch(url);
        const spellInfo = await resposta.json();
        return spellInfo;
    }
    fetchData('https://www.dnd5eapi.co/api/spells').then(async projects => {
        console.log(projects);
        const grid = document.querySelector('.grid');
        const wishspell = document.getElementsByClassName('name');

        for (let project of projects) {
            let set = project.name;
            const objectIndex = project.index;
            const link = `spell.html?id=${objectIndex}`;
            const spellInfo = await fetchSpellInfo("https://www.dnd5eapi.co/api/spells/" + objectIndex);
            const schoolName = spellInfo.school.name;
            grid.insertAdjacentHTML('beforeend', `<div class="name"> <a href="${link}"><h3>${set} |</h3><span>${schoolName}<span></a></div>`);
        }*/

    /*Work it
    Make it
    Do it
    Makes us
    Harder
    Better
    Faster
    Stronger
    <3*/
    const query= 
    `query ExampleQuery {
        spells(limit:319) {
            school {
                name
            }
            name
            index
        }
    }`;
    fetch("https://www.dnd5eapi.co/graphql", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        body: JSON.stringify({
            query
        }),
    }).then(response => {
        return response.json();
    }).then(data => {
        const projects = data.data;
        const grid = document.querySelector('.grid');
        const wishspell = document.getElementsByClassName('name');
        for (let project of projects.spells) {
            let set = project.name;
            const objectIndex = project.index;
            const link = `spell.html?id=${objectIndex}`;
            const schoolName = project.school.name;
            grid.insertAdjacentHTML('beforeend', `<div class="name"> <a href="${link}"><h3>${set} |</h3><span>${schoolName}<span></a></div>`);
        }
    
        //SearchBar -RESULTA SIM SENHORA
        const searchBar = document.forms['search-spells'].querySelector('input');

        searchBar.addEventListener('keyup', function (e) {
            const search = e.target.value.toLowerCase();

            Array.from(wishspell).forEach(function (feitico) {
                const titulo = feitico.firstElementChild.textContent;
                if (titulo.toLowerCase().indexOf(search) != -1) {
                    feitico.style.display = 'block';
                } else {
                    feitico.style.display = 'none';
                }
            })

        })
    });

});




//Sorting A-Z - RESULTA PARA TUDO
const sortButton = document.querySelector('.sort');
let flag = false;

const sortThem = (name, selector) => {
    const divs = [...document.querySelectorAll(".grid .name")];
    divs.forEach(div => div.remove());

    if (!flag) {
        divs.sort((a, b) => (a.querySelector("h3").innerText < b.querySelector("h3").innerText) ? 1 : -1);
        flag = !flag;
    } else if (flag) {
        divs.sort((a, b) => (a.querySelector("h3").innerText > b.querySelector("h3").innerText) ? 1 : -1);
        flag = !flag;
    }

    divs.forEach(div => document.querySelector(".grid").append(div));

}


sortButton.addEventListener("click", function () {
    sortThem('.grid', '.name');
});

