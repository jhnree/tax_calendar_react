import React, { Component } from 'react';

class NotificationModal extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="modal fade" id="notificationModal" role="dialog" aria-modal="true" style={{paddingRight: '10px'}}>
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header f-default letter-space-1">
                            <h4 className="modal-title">January 01, 2020</h4>
                            <button type="button" className="close mx-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span id="titles">New Years Day</span>
                            <br/>
                            <span id="descriptions">
                                <p></p>
                                <p></p>
                            </span>
                            <br/>
                            <span id="remark">Remarks: Fooods</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationModal;