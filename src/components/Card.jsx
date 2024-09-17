import React from 'react';

const Card = ({headingProps, countProps, iconProps, onClick }) => {
    return (
        <div className="card w-25" style={{ minWidth: "290px" }} onClick={onClick}>
            <div className="card-body">
                <h6 className="text-muted font-weight-normal">{headingProps}</h6>
                <div className="row">
                    <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                            <h3 className="mb-0">
                                {countProps}
                            </h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="icon icon-box-success ">
                            <span className={`mdi mdi-${iconProps} icon-item`}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;