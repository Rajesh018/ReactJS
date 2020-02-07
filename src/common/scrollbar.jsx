import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import "./scrollbar.scss";


/**
 * @description Customized scrollbar
 */
export class CustomScrollbars extends Component {
  render() {
    const {renderViewId = null} = this.props;
    // const requiredProps = omit(this.props, "renderViewId");
    let requiredProps = this.props;
    try{
      delete requiredProps.renderViewId;
    }catch (e) {
    }
    return (
      <Scrollbars {...requiredProps} className={"scrollbars"}
                  renderView={props => <div {...props} id={renderViewId} className={"scrollbar__view"}></div>}
                  renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                  renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                  renderTrackHorizontal={props => <div {...props} className={`track-horizontal`}></div>}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
