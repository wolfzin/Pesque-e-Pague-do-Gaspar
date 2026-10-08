/* Status (fuso de Gaspar) e reserva de grupo → WhatsApp (47) 99977-7913.
   Horário: Google Maps (08/10/2026), qua a dom 8h–18h; seg e ter fechado. */
(function(){
  var ABERTO={Wed:1,Thu:1,Fri:1,Sat:1,Sun:1};
  var st=document.getElementById('status');
  function atualiza(){
    var p={};new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
    var m=(+p.hour)*60+(+p.minute), t, sim=false;
    if(ABERTO[p.weekday]){ if(m>=480&&m<1080){t='Aberto hoje até 18h';sim=true;} else if(m<480){t='Abre hoje às 8h';} else {t=p.weekday==='Sun'?'Fechado · volta na quarta, 8h':'Fechado · abre amanhã às 8h';} }
    else t='Fechado hoje (seg e ter) · abre quarta, 8h';
    st.textContent=t; st.setAttribute('data-aberto',sim?'sim':'nao');
  }
  if(st){atualiza();setInterval(atualiza,60000);}

  var f=document.getElementById('grupo'); if(!f) return;
  var caixa=document.getElementById('g-erros'), data=document.getElementById('g-data'), pes=document.getElementById('g-pessoas');
  function hoje(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  data.min=hoje();
  var C=[['g-data','g-data-erro',true],['g-pessoas','g-pessoas-erro',true],['g-tipo-1','g-tipo-erro',false]];
  function valida(){
    var e={};
    if(!data.value)e['g-data-erro']=['g-data','Escolha a data.'];
    else if(data.value<hoje())e['g-data-erro']=['g-data','Escolha uma data a partir de hoje.'];
    else{var dw=new Date(data.value+'T12:00:00').getDay();if(dw===1||dw===2)e['g-data-erro']=['g-data','Segunda e terça o restaurante fecha. Escolha de quarta a domingo.'];}
    var n=Number(pes.value);if(!pes.value||!Number.isInteger(n)||n<2)e['g-pessoas-erro']=['g-pessoas','Informe quantas pessoas (2 ou mais).'];
    if(!f.querySelector('input[name=tipo]:checked'))e['g-tipo-erro']=['g-tipo-1','Escolha o tipo de grupo.'];
    return e;
  }
  function mostra(e,foca){
    var itens=[];
    C.forEach(function(c){var el=document.getElementById(c[0]),er=document.getElementById(c[1]),x=e[c[1]];
      if(c[2]){if(x)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');}
      er.hidden=!x;er.textContent=x?x[1]:'';if(x)itens.push('<li><a href="#'+x[0]+'">'+x[1]+'</a></li>');});
    if(!itens.length){caixa.hidden=true;return;}
    caixa.innerHTML='<p>Falta pouco:</p><ul>'+itens.join('')+'</ul>';caixa.hidden=false;
    caixa.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(ev){ev.preventDefault();document.getElementById(a.getAttribute('href').slice(1)).focus();});});
    if(foca)caixa.focus();
  }
  f.addEventListener('submit',function(ev){
    ev.preventDefault();var e=valida();mostra(e,true);if(Object.keys(e).length)return;
    var d=data.value.split('-');
    var txt='Olá! Gostaria de reservar para um grupo.\nData: '+d[2]+'/'+d[1]+'/'+d[0]+'\nPessoas: '+Number(pes.value)+'\nGrupo: '+f.querySelector('input[name=tipo]:checked').value;
    window.open('https://wa.me/5547999777913?text='+encodeURIComponent(txt),'_blank','noopener');
  });
  f.addEventListener('input',function(ev){if(ev.target.type!=='radio'&&!caixa.hidden)mostra(valida(),false);});
  f.addEventListener('change',function(ev){if(ev.target.type==='radio'&&!caixa.hidden)mostra(valida(),false);});
})();
