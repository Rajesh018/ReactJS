import React, { Component } from "react";
import {connect} from "react-redux";

import {FETCH_GALLERY_IMAGES} from "../action/gallery.action.js"
import {SELECT_IMAGE} from "../action/index"

import ImageItem from "./image-item";
import {isArrayNotEmpty} from "../utilities/utilities-function";


/**
 * @description Gallery list component
 * This will display images from api
 */
class GalleryList extends Component{
  componentDidMount() {
    const {FETCH_GALLERY_IMAGES} = this.props;
    FETCH_GALLERY_IMAGES();
  }

  onImageSelect = (item) => {
    try{
      this.props.SELECT_IMAGE(item)
    }catch (e) {

    }
  }

  render() {
    const { gallery_images} = this.props;

    return (
      <div className={"gallery__list__outer"}>
        {
          isArrayNotEmpty(gallery_images) && (
            <div className={"gallery__list"}>
              {
                gallery_images.map((item, index) => {
                  return <ImageItem item={item} key={index} onSelect={this.onImageSelect}/>
                })
              }
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({gallery_images, selected_image}) => {
  return {
    gallery_images,
    selected_image
  }
};

const mapDispatchToProps = {FETCH_GALLERY_IMAGES, SELECT_IMAGE}


export default connect(mapStateToProps, mapDispatchToProps)(GalleryList);
