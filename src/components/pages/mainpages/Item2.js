import React, { Component } from 'react';

export default class Item2 extends Component {
  render() {
    return (
      <div>
        <div className="container list-article">
          <div className="btn-group pull-right">
            <button className="btn btn-danger">
              <i className="fas fa-list" />
            </button>
            <button className="btn btn-danger">
              <i className="fas fa-th" />
            </button>
          </div>
          <div className="clearfix" />

          <div className="mt-5">
            <article className="">
              <img
                id="item-image"
                className="itemInversePair"
                src="http://lorempixel.com/150/150/fashion"
                alt=""
              />
              <div id="item-body" className="itemInversePair">
                <h5>Iphonx</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                  ducimus totam quasi nam porro sed.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
}
