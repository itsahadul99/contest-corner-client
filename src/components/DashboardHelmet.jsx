/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';
const DashboardHelmet = ({ title }) => {
    return <Helmet><title>Dashboard | {title}</title></Helmet>
};

export default DashboardHelmet;