//html containers
const container = document.getElementById('monster-container')
const monsterForm = document.getElementById("monstr-form")
const monsters = []


//page control
let page = 0
let start = 0
let end = 50

 const backButton = document.getElementById('back')
 const forwardButton =  document.getElementById('forward')



forwardButton.addEventListener("click", () => {
    if (page < (monsters.length/50)-1) {
    page++
    start = start + 50
    end = end + 50
    pageView = monsters.slice(start,end)
    container.innerHTML = ''
    pageView.forEach(monster => container.appendChild(monster))
    }
    else {alert("You are on the last page, you cannot go further")}
} )

backButton.addEventListener("click", () => {
    if (page !== 0) {
    page--
    start = start - 50
    end = end - 50
    pageView = monsters.slice(start,end)
    container.innerHTML = ''
    pageView.forEach(monster => container.appendChild(monster))

    }
    else {alert("You are on the first page, you cannot go back")}
})


const resetPage = () =>  {
page = 0 
start = 0
end = 50
monsters.slice(start,end).forEach(monster => container.appendChild(monster))
}





// create an individual monster, this can be directly used for a new creation or applied to the addMonsters method for a group addition
const addMonster = monster => {

    const monsterItem = document.createElement('div')
    
    monsterItem.className = 'monster-item'
    monsterItem.id = monster.id
    monsterItem.innerHTML = `
    <h3>${monster.name}</h3>
    <h2>${monster.age}</h2>
    <p>${monster.description}</h3>`
    monsters.push(monsterItem)
    resetPage()
   
    }
    
//add individual monster
    const addMonsters = (monsters) => {
        monsters.forEach(monster => addMonster(monster))
    }


//this occurs on page load and is called at the bottom of the page. it renders the first page of monsters
const getMonsters = () => {
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(res => addMonsters(res))
    
}






//takes input from form to create monster on server and on website view

monsterForm.addEventListener("submit", event => {

        event.preventDefault()

        const monster = {
            name: name.value,
            age: age.value,
            description: description.value
        }

        createMonster(monster)
        .then(serverMonster => addMonster(serverMonster))
        .catch(() => alert('Unable to create monster. Check your internet connection.'))
        monsterForm.reset()

})

//this creates monster form form input(above) and saves (posts) it to the server
const createMonster = monster =>
fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(monster)
}).then(resp => resp.json())


getMonsters()