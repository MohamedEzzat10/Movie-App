const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


let loader = document.querySelector(".loader")
let body =document.querySelector(".check-loader") 

    async function getDataFromApi(url) {
        fetch(url).then(res => res.json()).then(e=> {

          showMovies(e.results)
setTimeout(() => {
  loader.style.display ="none"
body.classList.remove("check-loader")
}, 2000);
          
        } );
      }
      getDataFromApi(APIURL);  
      let moiveEle= document.querySelector(".movie")
      function creatElement(e){
        return `
        <div class="item">
        <img src="${IMGPATH + e.poster_path }" alt=${e.title}>
        <div class="info">
        
            <div class="name">${e.title}</div>
            <div class="vote ${votedgetClass (e.vote_average)}"> ${e.vote_average}</div>

      
          </div>
          <div class="overview">
              <div class="title">Overview</div>
              ${e.overview}
          </div>
    </div>
        `
      }

      function votedgetClass (vote){
        if(vote >=8){
return "green"

} else if (vote >= 5) {
  return "orange";
} else {
  return "red";
}

      }
     function showMovies(movie){

       movie.forEach(element => {
        moiveEle.innerHTML+= creatElement(element)
       })


     }

    //  seach 

    let inputSearch = document.querySelector(".search")


    function seach(){
      if(inputSearch.value){
        moiveEle.innerHTML = ""
        getDataFromApi(SEARCHAPI+inputSearch.value);  

      }else{
        moiveEle.innerHTML = ""

        getDataFromApi(APIURL)
      }
    }

inputSearch.addEventListener("input",()=>{
  loader.style.display ="block"
  body.classList.add("check-loader")

  seach()
  setTimeout(()=>{
    loader.style.display ="none"
    body.classList.remove("check-loader")
  },2000)
  
})