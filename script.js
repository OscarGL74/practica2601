let mazo = [] 
let figuras = ["C", "D", "H", "S"]
let alfabeticos = ["A", "J", "Q", "K"]
let cartas_jugador =[]
let valores_jugador = []
let puntucion_jugador = 0

const boton_iniciar_juego = document.getElementById("boton_juego_nuevo");
const boton_pedir = document.getElementById("boton_pedir_carta")
const mesa_jugador = document.getElementById("cartas_jugador")

const suma = (cartas_suma)=>{
    //v_carta = cartas_suma[0]
    let bandera_as = 0
    let valores_suma = 0
    cartas_suma.map((carta)=>{
        let valor = parseInt(carta)

        if(valor){
            console.log(valor)
            valores_suma = valores_suma + valor
        }
        else{
            if (carta[0]=='A'){
                bandera_as = 1
                }else{
                console.log("EL valor no es númerico")
                valores_suma = valores_suma + 10
            }
        }
        if(bandera_as==1){
            if ((valores_suma+11)<21)
                valores_suma = valores_suma + 11
            else
                valores_suma = valores_suma + 1
        }
        console.log(`la suma es ${valores_suma}`)
    })
    return valores_suma
}
const crear_mazo = ()=>{
    mazo = []
    for (let figura of figuras) {
        for(let valor=2; valor<=10; valor++){
            mazo.push(`${valor}${figura}`)
            //console.log(`${valor}${figura}`)
        }
    }
    for (let figura of figuras) {
        for(let alfabetico of alfabeticos){
            mazo.push(`${alfabetico}${figura}`)
        }
    }
    console.log(_.shuffle(mazo))
    mazo = _.shuffle(mazo)
    valores_jugador.map((carta_mesa)=>{
     const carta_eliminar = document.getElementById(carta_mesa)
     console.log(carta_mesa)
     carta_eliminar.remove()
    })
    cartas_jugador =[]
    valores_jugador = []
    //mesa_jugador.remove();
    return mazo
}

const pedir_carta =()=>{
    //ToDo: Dibujar la carta.
    carta = mazo.pop()
    valores_jugador.push(carta)
    const carta_img = document.createElement("img");
    carta_img.setAttribute ("src", `assets/cartas/${carta}.png`)
    carta_img.setAttribute("id",`${carta}`)
    carta_img.setAttribute("class","carta")
    mesa_jugador.append(carta_img);
    puntucion_jugador = suma(valores_jugador)
    if (puntucion_jugador>21){
        alert("Has perdido!!!")
    }
    //console.log(mazo);
    //console.log(valores_jugador);
}

boton_iniciar_juego.addEventListener("click",crear_mazo);
boton_pedir.addEventListener("click", pedir_carta);

