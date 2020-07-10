import React from 'react';
import { Link } from 'react-router-dom';
import phoneSVG from '../../img/phone.svg';
import donutSVG from '../../img/donut.svg';
import womanSVG from '../../img/womanchecking.svg';
import Searchbar from '../layout/Searchbar';

const Landing = () => {
    return (
        <section className="landing">
            <div className="banner">
                <div className="dark-overlay">
                    <div className="banner-inner">
                        <h1 className="text-xl">What you had today?</h1>
                        <Searchbar fromLanding={true} />
                    </div>
                </div>
            </div>
            <div className="lead text-md text-light">Meet Adough</div>
            <div className="line"></div>
            <div className="cards">
                <div className="card bg-light">
                    <div className="text">
                        <div className="text-md">
                            Add your meal to the diary
                        </div>
                        <Link to="/dashboard">Learn more</Link>
                    </div>
                    <img src={phoneSVG} alt="" />
                </div>
                <div className="card bg-light">
                    <div className="text">
                        <div className="text-md">
                            Enjoy every bite to the fullest
                        </div>
                        <Link to="/register">Join today</Link>
                    </div>
                    <img src={donutSVG} alt="" />
                </div>
                <div className="card bg-light">
                    <div className="text">
                        <div className="text-md">
                            Meet your nutrition goal with ease
                        </div>
                        <Link to="/dashboard">Start now</Link>
                    </div>
                    <img src={womanSVG} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Landing;
