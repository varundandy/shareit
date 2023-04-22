import React, { ReactNode } from "react";

type PageContentProps = {
  title: string;
  children: ReactNode;
};

function PageContent(props: PageContentProps) {
    const { title, children } = props;
  return (
    <div className=''>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
