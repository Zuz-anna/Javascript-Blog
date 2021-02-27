'use strict';




function titleClickHandler(event){

  event.preventDefault();   //Disable default browser option for clicked links - go to ID
  
  const clickedElement = this;

  console.log('Link was clicked!');




/* Remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active'); //select all active links
    
  for(let activeLink of activeLinks){     //remove class active from all article links 
  activeLink.classList.remove('active');

}




/* Add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  console.log('clickedElement:', clickedElement);
  



/* Remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');

  }




/* get 'href' attribute from the clicked link */

  const articleVisible = clickedElement.getAttribute('href');




/* find the correct article using the selector (value of 'href' attribute) */

  const articles = document.querySelectorAll(articleVisible);




/* add class 'active' to the correct article */

  for(let article of articles){
    article.classList.add('active');

  } 
}




const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}