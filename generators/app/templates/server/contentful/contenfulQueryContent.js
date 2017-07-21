const client  = require('./contentfulClient').client;
const _       = require('lodash');

const itemNotFound = (model, slug) => {
  console.log(`The ${model} with slug: ${slug} could not be found.`);
  return;
}

const loadData = () => {
  return new Promise((resolve, reject) => {
    client.getEntries({
      limit: 1000
    }).then((response) => {
      resolve(response);
    })
  });
};

const queryAll = (data) => {

  console.log(`
    Entries: ${data.items.length}.
    Entry Limit Per Request: 1000.
    Entries before the limit is reached: ${1000 - data.items.length}.
  `);

  // Query contentful; get all data/content
  const getEntriesByType = (type) => {
    return _.filter(data.items, (entry) => {
      return entry.sys.contentType.sys.id == type;
    });
  }

  // Get project order content
  const getProjectOrder = () => {
    let projectOrder = getEntriesByType('projectOrder');

    if (projectOrder && projectOrder.length == 1) {
      return projectOrder[0].fields.projects
    } else {
      console.log(`Project order not found.`);
      return;
    }
  }

  // Get all projects
  const getProjects = () => {
    let projects = getEntriesByType('project');

    if (projects && projects.length > 0) {
      return projects;
    } else {
      console.log(`No projects found`);
      return;
    }
  }

  // Get single project
  const getProject = (slug) => {
    let projects = getProjects();

    let matchedProject = projects.filter((project) => {
      return project.fields.slug == slug;
    });

    if (matchedProject.length == 1) {
      return matchedProject[0];
    } else {
      console.log(`Project not found`);
      return;
    }
  }

  return {
    getProjectOrder,
    getProjects,
    getProject
  }
}

module.exports = {
  loadData : loadData,
  queryAll : queryAll
}

// loadData().then((results) => {
//   let project = queryAll(results).getProject('sensibill');
//   console.log(`project => ${project}`);
//   console.log(JSON.stringify(project, null, 2));
// }).catch(err => {
//   console.log(JSON.stringify(err, null, 2));
// })
