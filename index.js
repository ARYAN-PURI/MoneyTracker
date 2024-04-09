let records=document.getElementById('records');
let earning=document.getElementById('earning');
let getdata=async()=>{
    let data=await fetch('http://localhost:5000/');
    data=await data.json();
    return data;
}
let deletedata=async(id)=>{
    let requestOptions={
        method:"DELETE"
    }
    let result=await fetch(`http://localhost:5000/${id}`,requestOptions);
    result=await result.json();
    return result
}
getdata().then((data)=>{
    let ans=0;
    data.forEach(elm => {
        if(elm.type=="expense"){
            ans-=elm.amount;
        }
        else{
            ans+=elm.amount;
        }
        let button=document.createElement('button');
        button.innerText="Delete";
        button.setAttribute('id',elm._id);
        button.setAttribute('class','delbtn')
        let div=document.createElement('div');
        div.innerHTML=`<span class="title">${elm.title}</span> <span class="date">${elm.date}</span> <span class="amount">Rs.${elm.amount}</span>`;
        div.appendChild(button);
        div.setAttribute('id',elm._id);
        div.setAttribute('class',elm.type);
        records.appendChild(div);
    });
    if(ans<0){
        earning.setAttribute('class','loss');
    }
    else{
        earning.setAttribute('class','profit');
    }
    earning.innerText=`Rs. ${ans}`;
    let delbtn=document.getElementsByClassName('delbtn');
    for(let i=0;i<delbtn.length;i++){
        delbtn[i].addEventListener('click',(e)=>{
           deletedata(delbtn[i].getAttribute('id')).then((data)=>{
            if(data.deletedCount!=0){
                window.location.reload();
            }
           });
        })
    }
    
})