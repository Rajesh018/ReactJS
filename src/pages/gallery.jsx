import React, { Component } from "react";
import {connect} from "react-redux";
import $ from "jquery"
import "bootstrap"
import ImageUploader from "react-images-upload"
import GalleryList from "../components/gallery-list";
import ShowImage from "../components/show-image";

import {SELECT_IMAGE, CLEAR_IMAGE} from "../action/index"
import {ADD_IMAGE_GALLERY} from "../action/gallery.action";
import {CustomScrollbars} from "../common/scrollbar";
import {BootstrapModalBasic} from "../common/modal";
import {isEmptyObject} from "../utilities/utilities-function";


/**
 * @description This component use as a page, this includes gallery lists, gallery show etc
 */
class Gallery extends Component{

  state = {
    show_add_popup: false,
    add_image:{
      author:"",
      download_url:""
    }
  }

  onClear = () => {
    const { CLEAR_IMAGE } = this.props;
    CLEAR_IMAGE();
  }

  addImage = (e) => {
    e.preventDefault();
    this.setState({show_add_popup: true}, () => {
      $("#add-image-gallery").modal();
    })
  }

  handleModalEvents = (event) => {
    if(event === "hidden"){
      this.setState({show_add_popup: false})
    }
  }

  onDrop = (files, dataUrls) => {
    console.log(files)
    console.log(dataUrls)
    let { add_image} = this.state;
    try{
      add_image["download_url"] = dataUrls[0];
      this.setState({add_image})
    }catch (e) {

    }

  }

  updateValue = (e, key) => {
    e.preventDefault();
    let {add_image} = this.state;
    add_image[key] = e.currentTarget.value;
    this.setState({add_image})
  }

  submitImage = (e) => {
    e.preventDefault();
    const {add_image} = this.state;
    if(!isEmptyObject(add_image)){
      // Save data
      let image_data = {...add_image, id: ((new Date()).getTime())}
      this.props.ADD_IMAGE_GALLERY(image_data)
      $("#add-image-gallery").modal("hide")
    }
    return false;
  }

  render() {
    const { selected_image } = this.props;
    const { show_add_popup, add_image} = this.state;
    return (
      <div className={"gallery page"}>
        <div className="gallery__header bg-grey gallery__margin__info">
          <h3 className="text-white h-title">Technical Exercise</h3>
        </div>
        <div className="gallery__content">
        <div className="container-fluid-full">
          <div className="row no-gutters">
            <div className="col-12">
              <div className="gallery__content">
                <div className="row no-gutters">
                  <div className="col-12 col-md-6">
                    <div className="gallery__grid gallery__list__wrapper">
                      <div className="gallery__add text-center">
                        <p className={"text-white mr-2"}>
                          Please click the button
                        </p>
                        <button onClick={(e) => this.addImage(e)} className={"btn btn-primary"}>
                          Add Image
                        </button>
                        {
                          show_add_popup && (
                            <BootstrapModalBasic
                              modalEvents={ this.handleModalEvents }
                              id={"add-image-gallery"}>
                              <div className="modal-body">
                                <form action="" onSubmit={(e) => this.submitImage(e)}>
                                  <div className="form-group">
                                    <label htmlFor="">Author Name</label>
                                    <input type="text" name={"author_name"} placeholder={"Enter author name"}
                                           value={add_image.author}
                                           onChange={ (e) => this.updateValue(e, "author")}
                                           className={"form-control"}/>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Images</label>
                                    <ImageUploader
                                      withIcon={true}
                                      onChange={ this.onDrop}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button type={"submit"} className={"btn btn-primary"}>
                                      Add image
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </BootstrapModalBasic>
                          )
                        }
                      </div>
                      <div className="gallery__list">
                        <CustomScrollbars style={{
                          height: `calc(100vh - 200px)`
                        }}
                        autoHide={true}
                        >
                          <GalleryList/>
                        </CustomScrollbars>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="gallery__grid gallery__show">
                      <div className="gallery__selection">
                        <ShowImage onClear={ this.onClear} image={selected_image}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="gallery__footer bg-grey gallery__margin__info">
          <h3 className={"h-title text-white"}>Built by: (Insert Your Name)</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({selected_image}) => {
    return {
    selected_image
  }
}

const mapDispatchToProps = {SELECT_IMAGE , CLEAR_IMAGE, ADD_IMAGE_GALLERY};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
