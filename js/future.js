
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function generateTitleLinks(){
  
  console.log();




  /* remove contents of titleList */

  clearList();
  

  function clearList(){

    const titleList = document.querySelector(optTitleListSelector);  //Why optTitle (not '.titles') - like in scss, you can change class names in html, and its not a problem!  
    titleList.innerHTML = ''; 
  
  }




  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);
  



  /* get the article id */

  const articleID = articles.getAttribute('id');




  /* find the title element */  /* get the title from the title element */


  const articleTitle = article.querySelector(optTitleSelector).innerHTML;




  /* create HTML of the link */

  const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle +  '</span></a></li>';

  console.log();




  /* insert link into titleList */
  
  titleList.innerHTML = titleList.innerHTML + linkHTML;

}

  generateTitleLinks();



