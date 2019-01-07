window.onload = function () {
    let input = document.getElementsByTagName('input')[0]

    function changeStyle() {
        let pl = document.getElementById('pl')
        if(input.value === '') {
            pl.style.display = 'block'
        }else {
            pl.style.display = 'none'
        }
    }

    if(!('placeholder' in document.createElement('input'))) {
        let span = document.createElement('span')
        span.id = 'pl'
        span.style.color='#ccc'
        span.innerHTML = '用户名'
        input.parentNode.insertBefore(span,input.nextElementSibling)
        input.onfocus = function() {
            changeStyle()
        }
        input.onblur = function() {
            changeStyle()
        }
        input.onkeyup = function() {
            changeStyle()
        }
        input.onkeydown = function() {
            changeStyle()
        }
    }
}