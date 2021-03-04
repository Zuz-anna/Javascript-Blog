'use strict';



function titleClickHandler(event){

  event.preventDefault();   //Disable default browser option for clicked links - go to ID
  
  const clickedElement = this;



  /* Remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active'); //select all active links
    
  for(let activeLink of activeLinks){     //remove class active from all article links 
    activeLink.classList.remove('active');

  }



  /* Add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  


  /* Remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');

  }



  //Rozwiązanie 1 
  /* get 'href' attribute from the clicked link */
  const articleVisible = clickedElement.getAttribute('href');



  /* find the correct article using the selector (value of 'href' attribute) */
  const articles = document.querySelectorAll(articleVisible);



  /* add class 'active' to the correct article */
  for(let article of articles){
    article.classList.add('active');

  } 

//Rozwiązanie 2  

/* get 'href' attribute from the clicked link */

//const articleSlector = clickedElement.getAttribute('href');



/* find the correct article using the selector (value of 'href' attribute) */

//const articleVisible = document.querySelector(articleSlector);



/* add class 'active' to the correct article */

//articleVisible.classList.add('active');

}



const links = document.querySelectorAll('.titles a');
console.log('links');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}











const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';




function generateTitleLinks(){
  


  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);  //Why optTitle (not '.titles') - like in scss, you can change class names in html, and its not a problem!  
  
  clearList();

  function clearList(){
    titleList.innerHTML = ''; 
  
  }



  /* find all the articles and save them to variable: articles*/

  const articles = document.querySelectorAll(optArticleSelector);
  

  let html = '';

  
  for(let article of articles){

    
    /* get the article id */
    const articleID = article.getAttribute('id');


    /* find the title element */  /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle +  '</span></a></li>';


    /* insert link into titleList */
    html = html + linkHTML;

  }


  titleList.innerHTML = html;
  
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
      link.addEventListener('click', titleClickHandler);

  }
  
}



generateTitleLinks();





