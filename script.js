

let currentsong;
let api=[]
currentIndex=0;
async function song() {
    
    // attach for songcard
    Array.from(document.querySelectorAll(".songcards")).forEach(element => {
        console.log(element)
        element.addEventListener("click", async item => {
            console.log("clicked")

            api=[]
            currentIndex-0;

           let  a = await fetch(`/songs/${item.currentTarget.dataset.library}/`);
        //    console.log(a);

            let data = await a.text();
            
            let div = document.createElement("div");
            div.innerHTML = data;
            
            let links = div.getElementsByTagName("a");

            
            for (let element of links) {
                console.log(element)
                if (element.href.endsWith(".mp3")) {

                    api.push({
                        url : element.href ,
                        name: decodeURIComponent(element.href).split("\\").pop().replace(".mp3", "")       

                    })
                }   
    
            }


            // load whenever songcard is clicked 
                let ul = document.querySelector(".songlist ul");
                for (const songss of api) {
                    
                    let li = document.createElement("li");
                    
                    li.innerText = songss.name;
                    
                    ul.append(li);
                    
                    li.addEventListener("click",()=>{

                        currentsong = playmusic(api[currentIndex].url)
                        console.log(currentsong)
                        // return songss.url

                        
                        currentsong.addEventListener("loadedmetadata", () => {
                            console.log("metadata upload ")
                            currentsong.addEventListener("timeupdate", () => {
                
                                let minutess =
                                    Math.floor(currentsong.currentTime / 60);
                
                                let secs =
                                    Math.floor(currentsong.currentTime % 60);
                
                                let current =
                                    `${minutess.toString().padStart(2, "0")}:${secs
                                        .toString()
                                        .padStart(2, "0")}`;
                
                
                                let minutes =
                                    Math.floor(currentsong.duration / 60);
                
                                let sec =
                                    Math.floor(currentsong.duration % 60);
                
                                let duration =
                                    `${minutes}.${sec.toString().padStart(2, "0")}`;
                
                                console.log(duration);
                
                                document.querySelector(".songtime p").innerHTML =
                                    `${current} / ${duration}`;
                
                                document.querySelector(".circle").style.left =
                                    `${(currentsong.currentTime / currentsong.duration) * 100}%`;
                
                            });
                
                
                            document.querySelector(".seekbar").addEventListener("click", e => {
                
                                let percent =
                                    (e.offsetX /
                                        e.target.getBoundingClientRect().width) * 100;
                
                                let width =
                                    document.querySelector(".circle").style.left =
                                    percent + "%";
                
                                console.log(width);
                
                                currentsong.currentTime =
                                    (currentsong.duration * percent) / 100;
                            });
                
                        });  //close loadmatadata




                        document.getElementById("next").addEventListener("click", () => {
                        
                                        if (currentIndex < api.length) {
                        
                                            currentIndex++;
                        
                                            currentsong = playmusic(api[currentIndex].url);
                                            console.log("setdefault time ")
                                            printtim = document
                                                .querySelector(".songtime")
                                                .getElementsByTagName("p")
                                            .innerHTML = "00:00 / 00:00";


                        
                                currentsong.addEventListener("loadedmetadata", () => {
                                console.log("metadata upload ")
                                currentsong.addEventListener("timeupdate", () => {
                    
                                let minutess =
                                    Math.floor(currentsong.currentTime / 60);
                
                                let secs =
                                    Math.floor(currentsong.currentTime % 60);
                
                                let current =
                                    `${minutess.toString().padStart(2, "0")}:${secs
                                        .toString()
                                        .padStart(2, "0")}`;
                
                
                                let minutes =
                                    Math.floor(currentsong.duration / 60);
                
                                let sec =
                                    Math.floor(currentsong.duration % 60);
                
                                let duration =
                                    `${minutes}.${sec.toString().padStart(2, "0")}`;
                
                                console.log(duration);
                
                                document.querySelector(".songtime p").innerHTML =
                                    `${current} / ${duration}`;
                
                                document.querySelector(".circle").style.left =
                                    `${(currentsong.currentTime / currentsong.duration) * 100}%`;
                
                            });
                
                
                            document.querySelector(".seekbar").addEventListener("click", e => {
                
                                let percent =
                                    (e.offsetX /
                                        e.target.getBoundingClientRect().width) * 100;
                
                                let width =
                                    document.querySelector(".circle").style.left =
                                    percent + "%";
                
                                console.log(width);
                
                                currentsong.currentTime =
                                    (currentsong.duration * percent) / 100;
                            });
                
                        });  //close loadmatadata

                        
                            }
                        
                        });


                    })    
                }    

       
                        

            }); // addEventListener close    
            
            }); // forEach close
            
            } // songs() close
            
            
            song();

            //display all albums in page 
            // async function allalbums() {

            //     let alb = await fetch("http://127.0.0.1:3000/songs")
            //     response = await alb.text();
            //     let div=document.createElement("div");  
            //     // let cards = div.querySelector(".songcards")  
            //     // for (let index = 0; index < cards.length; index++) {
            //     //   cards.remove()
                    
            //     // }            
            //       div.innerHTML=response;
            //       let anchor = div.getElementsByTagName("a");
            //       console.log(anchor)
            //       Array.from(anchor).forEach( async e =>{
            //           if(e.href.includes("%5Csongs%5C")){
            //               let cardcontainer = document.querySelector(".spotify-playlist")

            //               let url = decodeURIComponent(e.href);
            //               let folder = url.split("\\")[2];
            //               console.log(folder)
            //               let a =   await fetch(`http://127.0.0.1:3000/songs/${folder}/infopage.json`)       
            //               let response = await a.json();
            //               console.log(response)          
            //               cardcontainer.innerHTML=   cardcontainer.innerHTML + `
            //                                           <div class="songcards"  data-library="${folder}">  
            //               <img src= "${response.cover}" alt="">
            //               <div class="play-button">
            //               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentcolor" fill="solid black" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
            //               <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"></path>
            //               </svg>                           
            //               </div>
            //               <h2>${response.title}	</h2>                            
            //                 <p>${response.description}</p>
            //                 </div>
            //                 `   
            //             }
            //         })

            // }

            // allalbums();
            

                
            

    
        

playmusic = (track) => {

    if (currentsong) {
        currentsong.pause();
    }

    let audio = new Audio(track);

    pause.src = "play.svg";
    audio.play();

    document
        .querySelector(".range")
        .getElementsByTagName("input")[0]
        .addEventListener("change", e => {

            audio.volume = parseInt(e.target.value) / 100;

            console.log(audio.volume);
        });

    return audio;
};


// attach event listener for play, prev, next song

let pause = document.getElementById("pause");

pause.addEventListener("click", () => {

    if (currentsong.paused) {

        currentsong.play();
        pause.src = "play.svg";

    } else {

        currentsong.pause();
        pause.src = "pause.svg";
    }
});


document.getElementById("prev").addEventListener("click", () => {

    if (currentIndex >= 0) {

        currentIndex--;

        currentsong = playmusic(api[currentIndex].url);
    }
});




// hamburger

document.querySelector(".hamburger").addEventListener("click", () => {

    document.querySelector(".left-border").style.left = "0px";

    console.log(
        document.querySelector(".left-border").style.left = "0px"
    );

});


document.querySelector(".close").addEventListener("click", () => {

    document.querySelector(".left-border").style.left = "-297px";

    console.log(
        document.querySelector(".left-border").style.left = "-297px"
    );

});