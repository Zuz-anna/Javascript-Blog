'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';


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



function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);  //Why optTitle (not '.titles') - like in scss, you can change class names in html, and its not a problem!

  clearList();

  function clearList(){
    titleList.innerHTML = '';

  }

  /* find all the articles and save them to variable: articles*/
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

function calculateTagsParams(tags){

  const params = {max: 0, min: 999999};

  for(let tag in tags){

    params.max = Math.max(tags[tag], params.max);

    params.min = Math.min(tags[tag], params.min);

  }

  return params;

}



function calculateTagClass(count, params){

  /*
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  */

  //skąd program wie, którą count jest liczbą (jaką ma wartość skoro nigdzie jej nie określaliśmy)

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);

  return optCloudClassPrefix + classNumber;

}


function generateTags(){

  /* create a new variable allTags with an empty object */
  let allTags = {};

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

      /* check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){  // eslint-disable-line no-prototype-builtins

        /* add generated code to allTags object */
        allTags[tag] = 1;

      } else {
        allTags[tag]++;

      }

    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  }

  /* find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* create variable for all links HTML code */
  let allTagsHTML = '';

  const tagsParams = calculateTagsParams(allTags);

  /* START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

    /* generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagLinkHTML + '">' + tag + '</a></li>';
    console.log(allTagsHTML);

  }

  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

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
  //const tag = document.querySelectorAll(href); //- first idea
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let tagActive of tagsActive){

    /* remove class active */
    tagActive.classList.remove('active');

  }
  /* END LOOP: for each found tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLink = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagsLink){

    /* add class active */
    tagLink.classList.add('active');

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  const cloudTagLinks = document.querySelectorAll('.tags.list a');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }

  for(let cloudTagLink of cloudTagLinks){

    /* add tagClickHandler as event listener for that link */
    cloudTagLink.addEventListener('click', tagClickHandler);
  }

}

addClickListenersToTags();




function generateAuthor(){

  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const authorName = article.getAttribute('data-author');

    /* generate HTML of the author */
    //const linkHTML = '<p class="post-author">' + authorName + '</p>';
    const linkHTML = '<a href="#author-' + authorName + '" class="post-author">' + authorName + '</a>';

    /* add generated code to html variable */
    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(authorName)){  // eslint-disable-line no-prototype-builtins
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
    console.log(allAuthors);
    /* insert HTML of link into the author wrapper */
    authorWrapper.innerHTML = html;

    /* END LOOP: for every article */
  }

}

generateAuthor();



function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for(let authorActive of authorsActive){

    /*remove class active */
    authorActive.classList.remove('active');

  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorsLink = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for(let authorLink of authorsLink){

    /* add class active */
    authorLink.classList.add('active');

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}



function addClickListenersToAuthor(){

  /* find all links to tags */
  const links = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  }

}

addClickListenersToAuthor();




