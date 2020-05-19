var applicazioni;
var serverName;

window.addEventListener("load", async function(event)
{
    checkCoockies();
    var responseGetapplicazioni=await getApplicazioni();
    serverName=responseGetapplicazioni.serverName;
    applicazioni=responseGetapplicazioni.applicazioni;
});
async function checkCoockies()
{
    var username=await getCookie("username");
    if(username!="")
    {
        document.getElementById("username").value=username;
    }
    var password=await getCookie("password");
    if(password!="")
    {
        document.getElementById("password").value=password;
    }
}
function login(button,autoLogin)
{
    var error=false;

    document.getElementById("username").style.borderBottomColor="gray";
    document.getElementById("password").style.borderBottomColor="gray";
    document.getElementById("error-container").innerHTML="";
    $("#error-container").hide("fast","swing");

    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var ricorda=document.getElementById("ricorda").checked;

    if(username=="")
    {
        error=true;

        document.getElementById("username").style.borderBottomColor="#DA6969";
    }
    if(password=="")
    {
        error=true;
        
        document.getElementById("password").style.borderBottomColor="#DA6969";
    }

    if(!error)
    {
        if(autoLogin)
            button.innerHTML='Auto login<i class="fad fa-spinner-third fa-spin" style="margin-left:10px"></i>';
        else
            button.innerHTML='<i class="fad fa-spinner-third fa-spin"></i>';
        $.post("login.php",
        {
            username,
            password,
            ricorda
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    button.innerHTML='Conferma';
                    Swal.fire
                    ({
                        icon: 'error',
                        title: 'Errore',
                        text: "Se il problema persiste contatta l' amministratore"
                    });
                    console.log(response);
                }
                else
                {
                    if(response.indexOf("ok")>-1)
                    {
                        button.innerHTML='<i class="far fa-check-circle" style="color:green"></i>';
                        getElencoApplicazioni();
                        //setTimeout(function(){ button.innerHTML='Conferma'; }, 3000);
                    }
                    else
                    {
                        button.innerHTML='Conferma';
                        document.getElementById("error-container").innerHTML='<i class="far fa-exclamation-triangle" style="margin-right:10px"></i>Username o password errati';
                        $("#error-container").show("fast","swing");
                    }
                }
            }
            else
            {
                button.innerHTML='Conferma';
                Swal.fire
                ({
                    icon: 'error',
                    title: 'Errore',
                    text: "Se il problema persiste contatta l' amministratore"
                });
                console.log(status);
            }
        });
    }
    else
    {
        document.getElementById("error-container").innerHTML='<i class="far fa-exclamation-triangle" style="margin-right:10px"></i>Compila tutti i campi';
        $("#error-container").show("fast","swing");
    }
}
function getElencoApplicazioni()
{
    var container=document.getElementById("inputContainer");
    container.innerHTML="";
    container.setAttribute("style","padding-bottom:30px");
    
    var inputContainerTitle=document.createElement("div");
    inputContainerTitle.setAttribute("class","input-container-title");
    inputContainerTitle.setAttribute("style","margin-bottom:30px");

    var i=document.createElement("i");
    i.setAttribute("class","fad fa-sign-in-alt");
    inputContainerTitle.appendChild(i);

    var span=document.createElement("span");
    span.innerHTML="Scegli applicazione";
    inputContainerTitle.appendChild(span);

    container.appendChild(inputContainerTitle);

    var x=0;
    applicazioni.forEach(function(applicazione)
    {
        var a=document.createElement("a");
        a.setAttribute("class","applicazione-a");
        if(x==0)
            a.setAttribute("style","border-top:1px solid #ddd");
        a.setAttribute("href",location.protocol+"//"+serverName+"/"+applicazione.percorsoIndex);
        
        var i=document.createElement("i");
        i.setAttribute("class",applicazione.icona);
        a.appendChild(i);

        var span=document.createElement("span");
        span.innerHTML=applicazione.descrizione;
        a.appendChild(span);

        container.appendChild(a);
        x++;
    });
}
function getApplicazioni()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getApplicazioni.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve([]);
            }
        });
    });
}
window.addEventListener("keydown", windowKeydown, false);
function windowKeydown(e)
{
    var keyCode = e.keyCode;
    switch(keyCode) 
    {
        case 13:e.preventDefault();document.getElementById("login-button").click();break;
    }
}