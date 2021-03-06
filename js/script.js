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




const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';



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

  titleList.innerHTML = html; //Wewnątrz konkretnego elementu wrzuca nam dany element

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);

  }

}

generateTitleLinks();



function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tagsNames = article.getAttribute('data-tags');

    /* split tags into array */
    const tags = tagsNames.split(' ');

    /* START LOOP: for each tag */
    for(let tag of tags){

      /* generate HTML of the link */
      const linkHTML = '<li><a href ="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  }
}

generateTags();



function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = document.querySelectorAll(href);
  console.log(tag);

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}



function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
