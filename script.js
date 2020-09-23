    
    var carrito = []
    var ni= 0
    let arreglo = []
    function agregarItem( producto){
        var items = document.getElementById("Nitems") 
        ni++
        items.innerHTML = ni+" items"
        var cod=producto.getAttribute("id")
        var temp = cod.split(",") 
        var lista = arreglo[parseInt(temp[0])].products
        var p = lista[parseInt(temp[1])]
        if(carrito.find(x => x.des == p.name)==undefined){
            var prod = {item:ni, qty:1, des:p.name, up:p.price, total: p.price}
            carrito.push(prod)
        }
        else{
            var prod = carrito.find(x => x.des == p.name)
            prod.qty ++
            prod.total = prod.qty * prod.up
        }
    }

    function enviarpedido() {
        console.log(carrito)
    }

    function crearCarrito()
    {
        var compras = document.getElementById("compras")
        var total = document.getElementById("total")
        var tv = 0
        var tabla = document.getElementById("carrito")
        var thead = document.createElement("thead")
        var theadf = document.createElement("tr")
        for (let i = 0; i < 5; i++) {
            var celda = document.createElement("th")
            var temp = true
            i == 0 ? celda.textContent = "Item":temp=false;
            i == 1 ? celda.textContent = "qty": temp=false;
            i == 2 ? celda.textContent = "Description": temp=false;
            i == 3 ? celda.textContent = "Unit Price" : temp=false;
            i == 4 ? celda.textContent = "Amount": temp=false;
            theadf.appendChild(celda)
        }
        thead.appendChild(theadf)
        tabla.appendChild(thead)
        var tbody = document.createElement("tbody")
        for (let i = 0; i < carrito.length; i++) {
            let hilera = document.createElement("tr");
            for (let j = 0; j < 5; j++) {
                let celda = document.createElement("td");
                j == 0 ? celda.textContent = carrito[i].item:temp=false;
                j == 1 ? celda.textContent = carrito[i].qty: temp=false;
                j == 2 ? celda.textContent = carrito[i].des: temp=false;
                j == 3 ? celda.textContent = carrito[i].up: temp=false;
                j == 4 ? celda.textContent = carrito[i].total: temp=false;
                hilera.appendChild(celda)
            }
            tv+=carrito[i].total
            tbody.appendChild(hilera)
        }
        tabla.appendChild(tbody)
        var boton1 = document.createElement("button")
        var boton2 = document.createElement("button")
        var t = document.createElement("p")
        t.textContent="Total: $"+tv
        total.appendChild(t)
        boton1.setAttribute("type","button")
        boton1.setAttribute("class", "btn btn-danger col-6")
        boton1.setAttribute("data-toggle", "modal")
        boton1.setAttribute("data-target", "#CancelModal")
        boton1.textContent="Cancel"
        boton2.setAttribute("type","button")
        boton2.setAttribute("class", "btn btn-warning col-6")
        boton2.setAttribute("onclick","enviarpedido()")
        boton2.textContent="Confirm order"
        compras.appendChild(boton1)
        compras.appendChild(boton2)

    }
    const promesa= new Promise((resolve, reject) =>{
    let req =new XMLHttpRequest();
    req.open('GET', 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json ');
    req.onload =function(){
      if(req.status == 200){
        resolve(req.response)
    } else{
      reject(req.response)
      }
    }
    req.send();
    })

    .then((message) => {
        arreglo=JSON.parse(message)
        var tabs = []
        tabs[0] = document.getElementById("pills-burgers")
        tabs[1] = document.getElementById("pills-tacos")
        tabs[2] = document.getElementById("pills-salads")
        tabs[3] = document.getElementById("pills-desserts")
        tabs[4] = document.getElementById("pills-d_s")
        for (let i = 0; i < 5; i++) {
            var products = arreglo[i].products
            var nombre = arreglo[i].name
            var bnombre = document.createElement("h2")
            bnombre.setAttribute("class", "text-center")
            bnombre.innerHTML = nombre
            tabs[i].appendChild(bnombre)
            tabs[i].appendChild(document.createElement("hr"))
            console.log(i)
            var fila = document.createElement("div")
            fila.setAttribute("class","row")
            tabs[i].appendChild(fila)
            var j = 0
            products.forEach( p => {
                var card = document.createElement("div")
                card.setAttribute("class","card col-3")
                var imagen = document.createElement("img")
                imagen.setAttribute("src",p.image)
                imagen.setAttribute("alt","Plato del menu")
                imagen.setAttribute("height", "200")
                imagen.setAttribute("width", "200")
                var cuerpoC = document.createElement("div")
                cuerpoC.setAttribute("class","card-body")
                var titulo = document.createElement("h5")
                titulo.setAttribute("class", "card-title ")
                titulo.innerHTML = p.name
                var descripcion = document.createElement("p")
                descripcion.setAttribute("class","card-text")
                descripcion.innerHTML = p.description
                var precio = document.createElement("strong")
                precio.setAttribute("class","card-text")
                precio.innerHTML ="$" + p.price
                var espacio = document.createElement("br")
                var boton = document.createElement("a")
                boton.setAttribute("class","btn btn-dark")
                boton.setAttribute("id",i+","+j)
                boton.setAttribute("onclick","agregarItem(this)")
                boton.innerHTML = "Add to car"
                j++
                card.appendChild(imagen)
                cuerpoC.appendChild(titulo)
                cuerpoC.appendChild(descripcion)
                cuerpoC.appendChild(precio)
                cuerpoC.appendChild(espacio)
                cuerpoC.appendChild(boton)
                card.appendChild(cuerpoC)
                console.log(tabs[i])
                fila.appendChild(card)
            })            
        }
    })
