

<body>
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html">DevConnector</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="profiles.html"> Developers
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="register.html">Sign Up</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login.html">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div className="profiles">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4 text-center">Developer Profiles</h1>
          <p className="lead text-center">Browse and connect with developers</p>

          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-2">
                <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>John Doe</h3>
                <p>Developer at Microsoft</p>
                <p>Seattle, WA</p>
                <a href="profile.html" className="btn btn-info">View Profile</a>
              </div>
              <div className="col-md-4 d-none d-lg-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>HTML</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>CSS</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>JavaScript</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>Python</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>C#</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-2">
                <img className="rounded-circle" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>John Doe</h3>
                <p>Developer at Microsoft</p>
                <p>Seattle, WA</p>
                <a href="profile.html" className="btn btn-info">View Profile</a>
              </div>
              <div className="col-md-4 d-none d-lg-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>HTML</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>CSS</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>PHP</li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1"></i>MySQL</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</body>

