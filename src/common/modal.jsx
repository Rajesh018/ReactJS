import React, {Component} from "react";
import PropTypes from "prop-types";
import $ from "jquery"
import "./modal.scss";


/**
 * @description Bootstrap modal component support bootstrap modal events.
 * This is not a good bootstrap modal. Initially i planned to create a modal which popup when
 * prop variable change (it is the correct method), one problem is, modal component will be always
 * in DOM/Virtual DOM, this can be replace with `<React.Fragment/>` ( i use React.Fragment, but not got this
 * when i first create Modal). Currently there are some issues and issues handled with modal events, and i update
 * state/reducer variables inside callback functions, i send some callback to modal which is a bad because those will
 * execute and component not in DOM/Virtual DOM. So it will better to update any state changes inside hidden/hide callback.
 * This modal will create some unnessary steps. Currently working on revised modal, which can fix these issues.
 * Customized modal require good knowledge in transition time, either use inbuild feature (not ir many browser), bootstrap
 * use a function which act like native browser transition.
 * @todo Use react-bootstrap/ react-strap's modal or create new modal
 */
export class BootstrapModalBasic extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.string,
    children: PropTypes.node,
    modalEvents: PropTypes.func,
    className: PropTypes.string
  };

  state = {
    error: false
  };

  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    const {current} = this.modalRef;
    const {modalEvents} = this.props;
    $(current).on("shown.bs.modal", () => {
      modalEvents("shown", current);
    }).on("show.bs.modal", () => {
      modalEvents("show", current);
    }).on("hidden.bs.modal", () => {
      modalEvents("hidden", current);
    }).on("hide.bs.modal", () => {
      modalEvents("hide", current);
    });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
  }

  /**
   * @description Close modal window
   * @param e
   */
  closeModal = (e) => {
    e.preventDefault();
    const {current} = this.modalRef;
    if (typeof $ !== "undefined") {
      $(current).modal("hide");
    }
  };

  render() {
    const {id, size, children, className} = this.props;
    const {error} = this.state;

    if (error) {
      return (
        <div className={`card`}>
          <div className="card-body">React component level error</div>
        </div>
      );
    }
    return (
      <div className={`modal fade ${className}`} tabIndex="-1" role="dialog" id={id} ref={this.modalRef}>
        <div className={`modal-dialog ${size}`} role="document">
          <div className="modal-content">
            <div className="modal__close">
              <button onClick={(e) => this.closeModal(e)} className={"btn-transparent btn__close close"}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}