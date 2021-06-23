const searchInp = document.getElementById('search')
let updateDiv = document.getElementById('update')

const sendRequest = (e) => {
    let request = new XMLHttpRequest()
    let data ;
    let value = e.target.value 
    
    request.open('GET' , './content/js/data.json')
    
    request.onreadystatechange = () => {
        if ( request.status === 200 && request.readyState === 4 ) {
            data = JSON.parse(request.responseText)
            updateDiv.innerHTML = ''
            // filter data json
            Array.from(data).forEach(person => {
                if ( person.name.toLowerCase().includes( value.toLowerCase() ) ) {
                    let box = createBox(person.name.toLowerCase().split(' ') , person.body) 
                    document.getElementById('update').appendChild((box))
                }
            })
            
        }
    }
    
    request.send()
}

const createBox = (name , text) => {

    let box = document.createElement('div');
    box.className = 'col-12 person-box d-flex mt-5'
    
    let profileBox = document.createElement('div')
    profileBox.className = 'col-4'
    
    let img = document.createElement('img') ;
    img.className = 'img-fluid person-profile'
    img.src = `content/img/${name[0]}_${name[1]}.jpg` ;
    
    profileBox.appendChild(img)

    let personTextBox = document.createElement('div')
    personTextBox.className = 'col-8'

    let h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode(`${name[0]} ${name[1]}`))
    h1.className = 'person-box-name'
    
    let p = document.createElement('p')
    p.className = 'person-box-text mt-4'
    p.appendChild(document.createTextNode(text)) 
    
    personTextBox.appendChild(h1) ; personTextBox.appendChild(p)
    box.appendChild(profileBox); box.appendChild(personTextBox)
    
    return box
}

searchInp.addEventListener('keyup' , sendRequest)

window.onload = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET' , 'content/js/data.json')
    xhr.onload = () => {
        Array.from(JSON.parse(xhr.response)).forEach(person => {
            let box = createBox(person.name.toLowerCase().split(' ') , person.body) 
            document.getElementById('update').appendChild((box))
        })
    }
    xhr.send()
}