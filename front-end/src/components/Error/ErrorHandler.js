import React, { useEffect, useState } from "react";
import "./errorHandler.css";

function ErrorHandler(props) {
const[show, setShow] = useState(false)
const[errorHandler, setErrorHandler] = useState()

  return (
    <div>
        {show ?  (<div className="d-flex alert alert-danger">
          <p className="mr-5">Lỗi</p>
          <button type="button" className="btn-close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        ):(""
        )}
    </div>
  );
}

export default ErrorHandler;