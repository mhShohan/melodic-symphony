import { Helmet } from 'react-helmet-async';

const HeadTitle = ({ children }) => {
  return (
    <Helmet>
      <title>{children} - MelodicSymphony</title>
    </Helmet>
  );
};

export default HeadTitle;
