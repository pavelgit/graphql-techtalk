import React from 'react';
import Link from './link';
import Head from 'next/head';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Blognet</title>
          <meta charSet='utf-8' />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="/static/milligram.css"></link>
          <link rel="stylesheet" href="/static/styles.css"></link>
        </Head>
        <div className="container Page">
          <div className="row">
            <div className="column column-10">
              <div>
                <h4>Links</h4>
              </div>
              <div>
                <Link href="/">User list</Link>
              </div>
            </div>
            <div className="column column-10"/>
            <div className="column column-80">
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
}