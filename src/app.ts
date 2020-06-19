const container: HTMLElement | any = document.getElementById('app')
const pokemons: number = 500
let content = ''

interface IPokemon {
  id: number
  name: string
  image: string
  type: string
}

const fetchData = async (): Promise<void> => {
  container.innerHTML = '<div class="loader"></div>'
  let arr: number[] = []
  for (let i = 1; i < pokemons; i++) {
    arr.push(i)
  }
  await Promise.all(
    arr.map(
      (index: number): Promise<any> => {
        return getPokemon(index)
      }
    )
  )
  container.innerHTML = content
}

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: any = await data.json()
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(', ')

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  }

  showPokemon(transformedPokemon)
}

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
    <div class="card">
      <span class="card--id">#${pokemon.id}</span>
      <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
      <h1 class="card--name">${pokemon.name}</h1>
      <span class="card--details">${pokemon.type}</span>
    </div>
  `
  content += output
}

fetchData()
