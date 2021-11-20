const languages_state = document.getElementById('languages_state') as HTMLDivElement
const languages_name  = document.getElementById('languages_name' ) as HTMLDivElement
const languages_ratio = document.getElementById('languages_ratio') as HTMLDivElement
const languages_graph = document.getElementById('languages_graph') as HTMLDivElement
const languages_display = async () => {
    const lines = await languages_get()
    const fragment_name  = document.createDocumentFragment()
    const fragment_ratio = document.createDocumentFragment()
    const fragment_graph = document.createDocumentFragment()
    for (const line of lines) {
        const [language, ratio] = line.split('\t')
        fragment_name.appendChild(languages_name_item(language as string))
        fragment_ratio.appendChild(languages_ratio_item(ratio as string))
        fragment_graph.appendChild(languages_graph_item(ratio as string))
    }
    languages_state.remove()
    languages_name .appendChild(fragment_name)
    languages_ratio.appendChild(fragment_ratio)
    languages_graph.appendChild(fragment_graph)
}
const languages_get = async () => {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyPFGif1YEIeRKlEZ97ZdMTtZS9QK4WL-Rw7qjJBLQ-L_NjxcBCRnCabApOAGCEjKFf/exec')
    const text     = await response.text()
    const lines    = text.split('\n')
    return lines
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
languages_display()
