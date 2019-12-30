import React from "react";

function Alert({ children }) {
  console.log(children)
  return (
    <div class="alert alert-info" role="alert">
      Running on core {children}
    </div>
  );
}

export default Alert;
