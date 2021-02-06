const view = {
    render(data, el) {
        el.innerHTML = '<ol>' + data.map((item, i) => {
            console.log(i + item.keyword)
            return `<li>${item.keyword}</li>`
        }).join('') + '</ol>'
    }
}

export default view;