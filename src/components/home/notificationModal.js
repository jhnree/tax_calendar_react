import React, { Component } from 'react';

class NotificationModal extends Component {
    constructor(props){
        super(props)

        
    }

    render() {
        return (
            <div class="modal fade show" id="notificationModal" role="dialog" aria-modal="true" style="padding-right: 10px; display: block;">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header f-default letter-space-1">
                            <h4 class="modal-title">January 01, 2020</h4>
                            <button type="button" class="close mx-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
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