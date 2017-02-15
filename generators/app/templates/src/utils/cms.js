var Promise = require('bluebird');
var contentful = require('contentful');
var getJsonPromise = require('./get-json-promise');
var _ = require('lodash');

const SPACE_ID = 'osdalj1at9jn';
const ACCESS_TOKEN = '5574e259e687e63f7154f90e197afd464e5651bae6b1ea04a9670ef40b4e0b79';

// var Elemeno = require('elemeno');
// var elemeno = new Elemeno('8444d0ca-d7a4-11e6-ae17-c36aa72804af', {});
// elemeno.getSingle('about', function(err, response) {
//   console.log('about:', response);
// });
// elemeno.getCollectionItems('projects', function(err, response) {
//   console.log('projects:', response);
// });

var client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});

let data = null;

var controller = {

  loadData: function(){

    return new Promise((resolve, reject) => {
      client.getEntries({include:10, limit:1000}).then((response) => {
        data = response;
        console.log('cms data:', data);
        resolve(data);
      });
    });

  },

  getProjects: function(){

    var projectOrder = this.getEntriesByType('projectOrder');
    // console.log('projectOrder:', projectOrder);
    if (projectOrder){
      return _.get(projectOrder, '[0].fields.projects', '');
    }
    return [];

  },

  getProjectBySlug: function(slug){
    var projects = this.getProjects();
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].fields.slug == slug){
        return projects[i];
      }
    }
  },

  getGallery: function(){

    var gallery = this.getEntriesByType('gallery');
    console.log('gallery:', gallery);
    if (gallery){
      return _.get(gallery, '[0].fields.media');
    }
    return [];
  },



  getContact: function(){
    var contact = this.getEntriesByType('contact');
    if (contact){
      return _.get(contact, '[0].fields');
    }
    return {};
  },

  getEvents: function(){
    var events = this.getEntriesByType('events');
    if (events){
      return _.get(events, '[0].fields', {});
    }
    return {};
  },

  getEntriesByType: function(type){

    return _.filter(data.items, (entry) => {
      return entry.sys.contentType.sys.id == type;
    });

  },

  getCrew: function(){
    var crewOrder =  this.getEntriesByType('teamOrder');
    if (crewOrder) {
      return _.get(crewOrder, '[0].fields.teamMembers', []);
    }
    return [];
  }

}

module.exports = controller;
