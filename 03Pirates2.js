function solve(input) {
    let catalog = {}
    let command = input.shift()

    while (command !== 'Sail') {
        let line = command.split('||')
        let town = line[0]
        let population = Number(line[1])
        let gold = Number(line[2])

        catalog[town] = {
            population,
            gold
        }

        command = input.shift()

    }
    command = input.shift()
    while (command !== 'End') {
        let tokens = command.split('=>')
        let action = tokens[0]

        if (action === 'Plunder') {
            let town = tokens[1]
            let people = Number(tokens[2])
            let gold = Number(tokens[3])
            catalog[town].population -= people
            catalog[town].gold -= gold
            console.log(`${town} plundered! ${gold} gold stolen, ${people} citizens killed.`)

            if (catalog[town].gold <= 0 || catalog[town].population <= 0) {
                console.log(`${town} has been wiped off the map!`)

                delete catalog[town]
            }
           

        } else if (action === 'Prosper') {
            let town = tokens[1]
            let gold = Number(tokens[2])
            if(gold >= 0){
            catalog[town].gold += gold
            console.log(`${gold} gold added to the city treasury. ${town} now has ${catalog[town].gold} gold.`)
            }else{
                console.log(`Gold added cannot be a negative number!`)
            }
        }

        command = input.shift()

    }
    
    let sorted = Object.entries(catalog).sort((a,b) => {
        return b[1].gold - a[1].gold || a[0].localeCompare(b[0])
    })
    console.log(`Ahoy, Captain! There are ${Object.keys(sorted).length} wealthy settlements to go to:`)
    sorted.forEach(line => console.log(`${line[0]} -> Population: ${line[1].population} citizens, Gold: ${line[1].gold} kg`))
}

solve((["Tortuga||345000||1250",
    "Santo Domingo||240000||630",
    "Havana||410000||1100",
    "Sail",
    "Plunder=>Tortuga=>75000=>380",
    "Prosper=>Santo Domingo=>180",
    "End"]))