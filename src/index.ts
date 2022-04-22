const languages_state = document.getElementById('languages_state') as HTMLDivElement
const languages_name  = document.getElementById('languages_name' ) as HTMLDivElement
const languages_ratio = document.getElementById('languages_ratio') as HTMLDivElement
const languages_graph = document.getElementById('languages_graph') as HTMLDivElement

const getObject = async () => {
    const response = await fetch('https://raw.githubusercontent.com/shikatan0/languages-ratio/master/languages-ratio.json')
    const object = await response.json()
    return object
}

const languages_display = async () => {
    const object = await getObject()
    const fragment_name  = document.createDocumentFragment()
    const fragment_ratio = document.createDocumentFragment()
    const fragment_graph = document.createDocumentFragment()
    for (const [language, ratio] of Object.entries(object)) {
        fragment_name.appendChild(languages_name_item(language as string))
        fragment_ratio.appendChild(languages_ratio_item(ratio as string))
        fragment_graph.appendChild(languages_graph_item(ratio as string))
    }
    languages_state.remove()
    languages_name .appendChild(fragment_name)
    languages_ratio.appendChild(fragment_ratio)
    languages_graph.appendChild(fragment_graph)
}

const languages_name_item = (language: string) => {
    const name = document.createElement('div')
    name.textContent = language
    name.classList.add('languages_name_item')
    return name
}

const languages_ratio_item = (value: string) => {
    const ratio = document.createElement('div')
    ratio.textContent = `${Number(value).toFixed(2)}%`
    ratio.classList.add('languages_ratio_item')
    return ratio
}

const languages_graph_item = (ratio: string) => {
    const graph = document.createElement('div')
    graph.classList.add('languages_ratio_item')
    graph.appendChild(languages_graph_item_bar(ratio))
    return graph
}

const languages_graph_item_bar = (ratio: string) => {
    const bar = document.createElement('div')
    bar.classList.add('languages_graph_bar')
    bar.appendChild(languages_graph_item_value(ratio))
    return bar
}

const languages_graph_item_value = (ratio: string) => {
    const value = document.createElement('div')
    value.classList.add('languages_graph_value')
    value.style.width = `${ratio}%`
    return value
}

//main
languages_display()
