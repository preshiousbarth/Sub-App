import React from "react";
import  Hero  from "../innerPage/Hero";
import Metrics from '../innerPage/Metrics'

import Services from '../innerPage/Services'
import Subindex from '../innerPage/SubIndex'
import  SubPlans  from  '../innerPage/SubPlans'

const Home = () => {
    return (
        <div>
            <Hero />
            <Metrics />
            <Services />
            <Subindex />
            <SubPlans />
        </div>
        );
        };


        export default Home
