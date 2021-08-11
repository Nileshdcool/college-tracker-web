import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import College from "./pages/college";
import Student from "./pages/student";
import { Badge } from 'reactstrap';
import ComingSoon from "./pages/comingsoon";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <nav style={{ paddingBottom: '0.1rem', paddingTop: '0.5rem' }} className="navbar navbar-expand navbar-dark bg-dark">
        <h6 style={{ marginLeft: '10px' }}><Badge color="secondary">Total Colleges:<span style={{ color: "rgb(97, 136, 255)" }}>10,945</span></Badge></h6>
        <h6><Badge color="secondary">Total Students:<span style={{ color: "rgb(97, 136, 255)" }}>385</span></Badge></h6>
        <h6><Badge color="secondary">Total Courses: <span style={{ color: "rgb(97, 136, 255)" }}>$1,294,743,573,277</span></Badge></h6>
        </nav>
      <hr style={{ margin: '0.01rem' }}></hr>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a style={{ marginLeft: '20px' }} href="/college" className="navbar-brand">
         College Tracker
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/college"} className="nav-link">
              Colleges
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/students"} className="nav-link">
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              About US
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Contact US
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Learn
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">

        <Switch>
          <Route exact path={["/", "/dashboard"]} component={Dashboard} />
          <Route exact path={["/college"]} component={College} />
          <Route exact path="/students" component={Student} />
          <Route path="/comingsoon" component={ComingSoon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;