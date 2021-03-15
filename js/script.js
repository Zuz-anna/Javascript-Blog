'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink:  Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML),
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';
const optCloudClassCountAuthors = 4;
const optCloudClassPrefixAuthors = 'author-size-';


function titleClickHandler (event) {

  event.preventDefault();   //Disable default browser option for clicked links - go to ID

  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  const articleVisible = clickedElement.getAttribute('href');
  const articles = document.querySelectorAll(articleVisible);


  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  for (let article of articles) {
    article.classList.add('active');
  }
}



function generateTitleLinks (customSelector = '') {

  let html = '';
  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);


  clearList();

  function clearList() {
    titleList.innerHTML = '';
  }


  for (let article of articles) {
    const articleID = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleID, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();



function calculateTagsParams (tags) {

  const params = {max: 0, min: 999999};


  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}



function calculateTagClass (count, params) {

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);

  return optCloudClassPrefix + classNumber;
}



function generateTags() {

  let allTags = {};
  const allTagsData = {tags: []};
  const articles = document.querySelectorAll(optArticleSelector);
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);


  for (let article of articles) {
    let html = '';
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    const tagsNames = article.getAttribute('data-tags');
    const tags = tagsNames.split(' ');

    for (let tag of tags) {
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML =  templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      html = html + linkHTML;

      if (!allTags.hasOwnProperty (tag)) {  // eslint-disable-line no-prototype-builtins
        allTags[tag] = 1;

      } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  }

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  } console.log(allTagsData);

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();



function tagClickHandler (event) {

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
  const tagsLink = document.querySelectorAll('a[href="' + href + '"]');


  for (let tagActive of tagsActive) {
    tagActive.classList.remove('active');
  }

  for (let tagLink of tagsLink) {
    tagLink.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${ tag }"]`);
}



function addClickListenersToTags() {

  const links = document.querySelectorAll('.post-tags a');
  const cloudTagLinks = document.querySelectorAll('.tags.list a');


  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

  for (let cloudTagLink of cloudTagLinks) {
    cloudTagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();



function calculateAuthorParams (authors) {

  const params = {max: 0, min: 999999};

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;
}



function calculateAuthorClass (count, params) {

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCountAuthors + 1);

  return optCloudClassPrefixAuthors + classNumber;
}



function generateAuthor() {

  let allAuthors = {};
  let allAuthorsHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  const authorList = document.querySelector(optAuthorsListSelector);
  const authorsParams = calculateAuthorParams(allAuthors);


  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const authorName = article.getAttribute('data-author');
    const linkHTMLData = {id: authorName, title: authorName};
    const linkHTML = templates.authorLink(linkHTMLData);
    let html = '';

    html = html + linkHTML;

    if (!allAuthors.hasOwnProperty (authorName)) {  // eslint-disable-line no-prototype-builtins
      allAuthors[authorName] = 1;

    } else {
      allAuthors[authorName]++;
    }

    authorWrapper.innerHTML = html;
  }

  for (let authorName in allAuthors) {
    const authorLinkHTML = calculateAuthorClass(allAuthors[authorName], authorsParams);

    allAuthorsHTML += `<li><a href="#author-${ authorName }" class="${ authorLinkHTML }">${ authorName }</a></li>`;
  }

  authorList.innerHTML = allAuthorsHTML;
}

generateAuthor();



function authorClickHandler (event) {

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');
  const authorsLink = document.querySelectorAll('a[href="' + href + '"]');


  for (let authorActive of authorsActive) {
    authorActive.classList.remove('active');
  }

  for (let authorLink of authorsLink) {
    authorLink.classList.add('active');
  }

  generateTitleLinks(`[data-author="${ author }"]`);
}



function addClickListenersToAuthor() {

  const links = document.querySelectorAll('.post-author a');
  const cloudAuthorLinks = document.querySelectorAll('.authors.list a');


  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }

  for (let cloudAuthorLink of cloudAuthorLinks) {
    cloudAuthorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthor();




