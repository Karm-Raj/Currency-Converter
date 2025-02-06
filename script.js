const base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
//fromselect give object with two keys
let fromSelect=document.querySelectorAll(".select-container select");
//button
let btn = document.querySelector(".btn button");
//input
const input=document.querySelector(".amount input");

const fromCur=document.querySelector(".from select");
const toCur=document.querySelector(".to select");

const textViwe=document.querySelector(".textViwe p");


for (const element of fromSelect) { //select one by one select tag
    for (const key in countryList){
        let createOption=document.createElement("option"); //create new option element
        createOption.innerText=key; 
        createOption.value=countryList[key];
        if(element.name==="from" && createOption.innerText==="USD"){
            createOption.selected="selected";
        }else if (element.name==="to" && createOption.innerText==="INR"){
            createOption.selected="selected";
        }
        element.append(createOption); //now adding to select tag
    }
    element.addEventListener("change",(eve)=>{
        flagUpdate(eve.target);
    })
}
const flagUpdate=(element)=>{
    const selectImg=element.parentElement.querySelector("img");
    const img_Url="https://flagsapi.com/"+element.value+"/flat/64.png";
      selectImg.src=img_Url;
    //   console.log(selectImg);
    
  }
btn.addEventListener("click", async (event)=>{
    event.defaultPrevented;
    if(input.value===""||input.value<0){
        input.value=1;
    }
    let optionFromS= fromCur.options[fromCur.selectedIndex].text;
    let optiontoS= toCur.options[toCur.selectedIndex].text;
    const newUlr=base_Url+optionFromS.toLowerCase()+".json";
    
    const response =await fetch(newUlr);
    const data= await response.json();
    const actualRate=data[optionFromS.toLowerCase()][optiontoS.toLowerCase()];
    
    // let a= optiontoS.toLowerCase();
    console.log(actualRate)
    textViwe.innerText=`${input.value} ${optionFromS} = ${actualRate*input.value} ${optiontoS}`
})