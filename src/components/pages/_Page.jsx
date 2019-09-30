import React from 'react'
import Header from '../ui/Header.jsx'
import './_Page.scss'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.menus = [{
      label: 'Home',
      url: '/'
    }, {
      label: 'Users',
      url: '/users'
    }, {
      label: 'Banks',
      url: '/banks'
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
