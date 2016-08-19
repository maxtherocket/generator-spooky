require('./<%= className %>.scss');

import React, { Component } from 'react';

export default class <%= className %> extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="ui-<%= dashedName %>">

      </div>
    );
  }

}

