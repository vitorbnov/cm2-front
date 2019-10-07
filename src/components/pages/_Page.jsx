import React from 'react'
import Header from '../ui/Header.jsx'
import './_Page.scss'
import { BANKS_INDEX, HOME, USERS_INDEX } from '../../routes'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.menus = [{
      label: 'Home',
      url: HOME()
    }, {
      label: 'Users',
      url: USERS_INDEX()
    }, {
      label: 'Banks',
      url: BANKS_INDEX()
    }]
  }

  render () {
    return (
      <div className="page">
        <Header menus={this.menus} />
        <section>
          <div className="page-title">{this.props.title}</div>
          <div className="page-content">
            {this.props.children}
          </div>
        </section>
      </div>
    )
  }
}
