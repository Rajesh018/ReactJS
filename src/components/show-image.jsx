import React, { Component } from "react";
import {isEmptyObject} from "../utilities/utilities-function";


/**
 * @description This component will show selected image with clear button, this also show author name
 */
class ShowImage extends Component{

  clearImage = (e) => {
    e.preventDefault();
    const { onClear } = this.props;
    onClear();
  }

  render() {
    const { image } = this.props;
    if(isEmptyObject(image)){
      return <React.Fragment/>
    };
    const { author, download_url, oid, width, height} = image;
    return (
      <div className={"image__show"}>
        <div className="image__author">
          <h4 className={"title"}>{author}</h4>
        </div>
        <div className="image__container">
          <img src={download_url} alt={author} className={"img-fluid"}/>
        </div>
        <div className="image__action">
          <button type={"button"} className={"btn btn-danger btn-sm"} onClick={(e) => this.clearImage(e)}>
            Clear
          </button>
        </div>

      </div>
    );
  }
}

export default ShowImage;
