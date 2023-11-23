import { Helmet } from 'react-helmet';

const HelmateTittle = ({helmetTittle}) => {
    return (
        <Helmet>
        <title>{helmetTittle}</title>
      </Helmet>
    );
};

export default HelmateTittle;