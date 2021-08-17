import React from 'react';

import axios from 'axios';
import process from process

const API_KEY = process.env.WD_API_TOKET

export default class GetData extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`: https://suppliers-stats.wildberries.ru/api/v1/supplier/incomes?dateFrom=2017-03-25T21%3A00%3A00.000Z&key=${API_KEY}`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}