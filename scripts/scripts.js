let tools;
let isNotMore=true;
let isAccuracy=false;
let toolsMain= new Array();
 
const loadData = async (
  url = "https://openapi.programming-hero.com/api/ai/tools"
) => {
    
  const res = await fetch(url);
  const data = await res.json();
  tools= data.data.tools;
  toolsMain=[...tools];
  tools=tools.slice(0,6);
  
  showData(tools);
};

    loadData();



const createCard= (imgUrl,feature, name,date,id )=> {
    const card=`<div class="max-w-96 border-2 rounded-md p-6 mx-auto">
    <img class="rounded-lg" src="${imgUrl}" alt=""style="height: 200px; width:100%; max-width: 437px;">
    <br>
    <p class=" font-bold text-xl">Features</p>
    <br>
    <ol style="list-style-type: decimal; padding-left: 28px;">
        <li>${feature[0]}</li>
        <li>${feature[1]}</li>
        <li>${feature[2] || "No Data Found"}</li>
    </ol>
    <br>
    <hr>
    <br>
    <div class="flex  justify-between items-center">
        
        <div class=""><h1 class="font-bold text-xl ">${name}</h1>
            <br>
            <div class="flex gap-3"> 
                <img src="./images/date.png" alt="">
                <h3>${date}</h3>
        
            </div></div>
            <label for="my-modal-5"  class="bg-red-200 p-2 rounded-full" onclick="viewDetails('${id}')"><img src="./images/arrow.png" alt="" ></label>
    </div>
 </div>`;
     return  card;
}

const appendCard= (cardString)=> {
    const gridContainer= document.getElementById('grid-container');
    
    const card= document.createElement('div');
    card.innerHTML=cardString;
    hideLoader();
    gridContainer.appendChild(card);


}

const showData = (data) => {
    
  for(item of data) {
  
    const id= item.id;
    const imgUrl= item.image;
    const name= item.name;
    const feature= item.features;
    const date=item.published_in;
    const cardString= createCard(imgUrl,feature, name,date,id);
   
   
    appendCard(cardString);




  }
};

function sortByDate() {
    const gridContainer= document.getElementById('grid-container');
    gridContainer.innerHTML='';
    toolsMain.sort(customSort);
    
    if(isNotMore)  showData(toolsMain.slice(0,6));
     else showData(toolsMain);
    

}
const customSort= (a,b) => {
    const dateA= new Date(a.published_in);
    const dateB= new Date(b.published_in);
    if(dateA> dateB) return 1;
    else if( dateA< dateB) return -1;
    return 0;
}

function seeMore() {
    isNotMore=false;
    const gridContainer= document.getElementById('grid-container');
    gridContainer.innerHTML=' ';
    showLoader();
    setTimeout(showData, 500,toolsMain);
    //showData(toolsMain);


}

function  viewDetails  (id) {
    
   
    
    
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    showLoader();
    setTimeout(detailedData, 200,url);
   // detailedData(url) ;  
        
     
   
}
const detailedData= (url)=> {
    const modalContainer= document.getElementById('moda-container');
    modalContainer.innerHTML="";
   
   
        
    fetch(url)
      .then(res => res.json())
      .then(dataObj => {
        dataObj=dataObj.data;
       
        const tAccuracy=dataObj.accuracy.score;
        const integration=dataObj.integrations;
        const ioexample=dataObj.input_output_examples;
        const pricing=dataObj.pricing;
        hideLoader();
        const modalSection= document.getElementById('modal-Section');
        modalSection.style.display='block';
        const overley= document.getElementById('modalOverlay');
        overley.style.display='block';
       
        
        
       

        let intgr1;
        let intgr2;
        let intgr3;
        let ioIn;
        let ioOut;
        let pricing1;
        let pricing2;
        let pricing3;
       if(pricing===null) {
        pricing1=`Free of Cost/
        Basic`;
        pricing2=`Free of Cost/
        Pro`;
        pricing3=`Free of Cost/
        Enterprice`;

       }
       else {
        pricing1=`${dataObj.pricing[0].price} ${dataObj.pricing[0].plan}`;
        pricing2=`${dataObj.pricing[1].price} ${dataObj.pricing[1].plan}`;
        pricing3=`${dataObj.pricing[2].price} ${dataObj.pricing[2].plan}`;
        

       }

        if(integration===null) {
            intgr1="No Data Found";
            intgr2="No Data Found";
            intgr3="No Data Found";
        }
        else {
            intgr1=dataObj.integrations[0] ;
            intgr2=dataObj.integrations[1] ;
            intgr3=dataObj.integrations[2] ;

        }
         if(ioexample===null){
            ioIn="Can you give any example?";
            ioOut="No! Not Yet! Take a break!!!";

         }
         else {
            ioIn=dataObj.input_output_examples[0].input;
            ioOut=dataObj.input_output_examples[0].output;

         }
        
        if(tAccuracy=== null) {
            isAccuracy=false;

        }
        else {
            isAccuracy=true;

        }


        const modalString= `
       
        
                    
                  <div class="flex gap-x-5 gap-y-5 justify-center items-center flex-col-reverse lg:flex-row p-4 mx-2">  
                    <div style="min-height: 650px;" class="border-2 rounded-xl p-8 max-w-lg bg-red-50">
                        <h1 class="font-bold text-2xl">${dataObj.description}</h1>
                        <br>
                        <div class="flex gap-2 justify-center items-center flex-col fd">

                            <div class="w-32 font-bold text-green-700 px-7 py-3 text-center rounded-3xl bg-white flex items-center " style="height: 120px">${pricing1}</div>

                            <div class="w-32 font-bold text-orange-600 px-7 py-3 text-center rounded-3xl bg-white flex items-center" style="height: 120px">${pricing2}</div>
                            
                            
                            <div class="w-32 font-bold text-red-600 px-7 py-3 text-center rounded-3xl bg-white" style="height: 120px; text-align:center;">${pricing3}</div>
                        </div>
                        <br>
                        <div class="flex gap-7 flex-col fd">
                            <div class="">
                                <h1 class="font-bold text-2xl">Feaatures</h1>
                                <br>
                                <ul style="list-style-type: disc;" class="pl-7">
                                    <li>${dataObj.features[1].feature_name}</li>
                                    <li>${dataObj.features[2].feature_name}</li>
                                    <li>${dataObj.features[3].feature_name}</li>
                                </ul>
                            </div>
    
                            <div class="">
                                <h1 class="font-bold text-2xl">Integrations</h1>
                                <br>
                                <ul style="list-style-type: disc;" class="pl-7">
                                    <li>${intgr1 || 'No Data Found'}</li>
                                    <li>${intgr2 || 'No Data Found'}</li>
                                    <li>${intgr3 || 'No Data Found'}</li>
                                </ul>
                            </div>
    
    
                        </div>
                        
                      
                      
                            
                        
                    </div>
                    <div class="border-2 rounded-xl p-8 max-w-lg mol" style="min-height: 650px;position:relative;">
                    <div id="accuracy" class="bg-red-600 w-32 text-white font-semibold p-1 text-center rounded-lg accuracypos">${dataObj.accuracy.score}% accuracy</div>
                        <img class="rounded-xl" style="max-height:300px; width:100%; max-width: 440px;" src="${dataObj.image_link[0]}" alt="">
                        <br>
                        <h1 class="font-bold text-center text-2xl">${ioIn}</h1>
                        
                        <p class="text-center text-sm p-4">${ioOut}</p>
                    </div>
    
    
                   </div>
              
       
           
           
        `;

        const div= document.createElement('div');
        div.innerHTML=modalString;
        modalContainer.appendChild(div);
        const accId= document.getElementById('accuracy');
        if(isAccuracy) {
            accId.style.display='block';
        }
        else  accId.style.display='none';

       


      }).catch((error)=>{

        console.log(error);
      })

      ;
      

}


function closeBtnFunction() {
    const modalSection= document.getElementById('modal-Section');
    modalSection.style.display='none';
    const overley= document.getElementById('modalOverlay');
    overley.style.display='none';
    

}

const showLoader= ()=>{
    const loader=document.getElementById('loader');
    loader.style.display='block';
    

}
const hideLoader= ()=>{
    const loader=document.getElementById('loader');
    loader.style.display='none';

}
