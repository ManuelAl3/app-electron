const pokemonsList = document.getElementById('pokemons-list')
const searchInput = document.getElementById('search-input')
const typeFilter = document.getElementById('type-filter')
const sortFilter = document.getElementById('sort-filter')

let currentPage = 1
const itemsPerPage = 20
let isLoading = false
let searchTimeout = null
let displayedPokemons = new Set()

const createPokemonCard = (pokemon) => {
  const card = document.createElement('div')
  card.className = 'pokemon-card'

  const image = document.createElement('img')
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
  image.alt = pokemon.name
  image.className = 'pokemon-image'

  const name = document.createElement('h2')
  name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  name.className = 'pokemon-name'

  const types = document.createElement('div')
  types.className = 'pokemon-types'
  pokemon.types.forEach(type => {
    const typeBadge = document.createElement('span')
    typeBadge.textContent = type.type.name
    typeBadge.className = `type-badge ${type.type.name}`
    types.appendChild(typeBadge)
  })

  const stats = document.createElement('div')
  stats.className = 'pokemon-stats'
  pokemon.stats.forEach(stat => {
    const statContainer = document.createElement('div')
    statContainer.className = 'stat-container'

    const statName = document.createElement('span')
    statName.textContent = stat.stat.name
    statName.className = 'stat-name'

    const statValue = document.createElement('span')
    statValue.textContent = stat.base_stat
    statValue.className = 'stat-value'

    statContainer.appendChild(statName)
    statContainer.appendChild(statValue)
    stats.appendChild(statContainer)
  })

  card.appendChild(image)
  card.appendChild(name)
  card.appendChild(types)
  card.appendChild(stats)

  return card
}

const createLoadingSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'loading-spinner'
  spinner.innerHTML = `
    <div class="spinner"></div>
    <p>Loading more Pokémon...</p>
  `
  return spinner
}

const showError = (message) => {
  pokemonsList.innerHTML = `
    <div class="no-results">
      <p>${message}</p>
      <p class="error-details">Please try again with a different search term</p>
    </div>
  `
}

const searchPokemon = async (searchTerm) => {
  if (!searchTerm) {
    pokemonsList.innerHTML = ''
    displayedPokemons.clear()
    currentPage = 1
    fetchPokemons(currentPage)
    return
  }

  try {
    searchInput.disabled = true
    pokemonsList.innerHTML = createLoadingSpinner().outerHTML

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        showError('No Pokémon found with that name or ID')
      } else {
        showError('Error searching Pokémon. Please try again later.')
      }
      return
    }

    const pokemonData = await response.json()
    pokemonsList.innerHTML = ''
    const pokemonCard = createPokemonCard(pokemonData)
    pokemonsList.appendChild(pokemonCard)
  } catch (error) {
    console.error('Error searching Pokémon:', error)
    showError('Error connecting to the server. Please check your internet connection.')
  } finally {
    searchInput.disabled = false
  }
}

const fetchPokemons = async (page = 1) => {
  if (isLoading) return

  isLoading = true

  try {
    const offset = (page - 1) * itemsPerPage
    const pokemons = await window.versions.fetchPokemons(offset, itemsPerPage)

    for (const pokemon of pokemons) {
      if (displayedPokemons.has(pokemon.name)) continue

      const pokemonData = await window.versions.fetchPokemonDetails(pokemon.url)
      displayedPokemons.add(pokemon.name)

      // Update type filter options
      pokemonData.types.forEach(type => {
        const typeName = type.type.name
        if (!Array.from(typeFilter.options).some(option => option.value === typeName)) {
          const option = document.createElement('option')
          option.value = typeName
          option.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1)
          typeFilter.appendChild(option)
        }
      })

      const pokemonCard = createPokemonCard(pokemonData)
      pokemonsList.appendChild(pokemonCard)
    }

    currentPage = page
  } catch (error) {
    console.error('Error fetching pokemons:', error)
    showError('Error loading Pokémon. Please try again later.')
  } finally {
    isLoading = false
  }
}

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && !searchInput.value) {
    fetchPokemons(currentPage + 1)
  }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    searchPokemon(e.target.value)
  }, 500)
})

typeFilter.addEventListener('change', () => {
  const selectedType = typeFilter.value.toLowerCase()
  const cards = document.querySelectorAll('.pokemon-card')

  cards.forEach(card => {
    const types = Array.from(card.querySelectorAll('.type-badge'))
      .map(badge => badge.textContent.toLowerCase())

    if (!selectedType || types.includes(selectedType)) {
      card.style.display = 'flex'
    } else {
      card.style.display = 'none'
    }
  })
})

sortFilter.addEventListener('change', () => {
  const cards = Array.from(document.querySelectorAll('.pokemon-card'))
  const sortValue = sortFilter.value

  cards.sort((a, b) => {
    const nameA = a.querySelector('.pokemon-name').textContent
    const nameB = b.querySelector('.pokemon-name').textContent
    const idA = parseInt(a.querySelector('img').src.split('/').pop().split('.')[0])
    const idB = parseInt(b.querySelector('img').src.split('/').pop().split('.')[0])

    switch (sortValue) {
      case 'name-asc':
        return nameA.localeCompare(nameB)
      case 'name-desc':
        return nameB.localeCompare(nameA)
      case 'id-asc':
        return idA - idB
      case 'id-desc':
        return idB - idA
      default:
        return 0
    }
  })

  pokemonsList.innerHTML = ''
  cards.forEach(card => pokemonsList.appendChild(card))
})

// Initialize
fetchPokemons(currentPage)
window.addEventListener('scroll', handleScroll)
