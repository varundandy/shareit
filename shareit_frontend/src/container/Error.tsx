import React from "react";
import PageContent from "../layouts/PageContent";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error: unknown = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.data.message;
    }

    if (error.status === 404) {
      title = "Not found!";
      message = "Could not find resource or page.";
    }
  }
  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
