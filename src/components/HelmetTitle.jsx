/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';
const HelmetTitle = ({ title }) => {
    return <Helmet><title>Contest Corner | {title}</title></Helmet>
};

export default HelmetTitle;