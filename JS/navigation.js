<script>  
function mostrar(event,id){  
  
const paginas =  
document.querySelectorAll('.pagina');  
  
paginas.forEach(p=>{  
  
if(p.classList.contains('ativa')){  
p.style.opacity="0";  
p.style.transform="translateY(15px)";  
  
setTimeout(()=>{  
p.classList.remove('ativa');  
},200);  
  
}else{  
p.classList.remove('ativa');  
}  
  
});  
  
setTimeout(()=>{  
  
const pagina = document.getElementById(id);  
  
pagina.classList.add('ativa');  
pagina.style.opacity="1";  
pagina.style.transform="translateY(0)";  
  
if(id === "chat"){  
  setTimeout(()=>{  
    const chat = document.getElementById("mensagens");  
    if(chat){  
      chat.scrollTop = chat.scrollHeight;  
    }  
  },300);  
}  
  
},200);  
  
document  
.querySelectorAll('.tabs button')  
.forEach(b=>b.classList.remove('ativo'));  
  
event.currentTarget.classList.add('ativo');  
}  
  
function pesquisarMods() {  
  const texto = document.getElementById("pesquisa").value.toLowerCase();  
  const cards = document.querySelectorAll(".card");  
  
  cards.forEach(card => {  
    const nome = card.querySelector("h3").innerText.toLowerCase();  
  
    card.style.display =  
      texto === "" || nome.includes(texto) ? "block" : "none";  
  });  
}  
</script>  