import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../store/actions/userActions";
import { openModal } from "../../store/actions/modalActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function(ComposedClass, reload, adminRoute = null) {
  class Authentication extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
        this.props.dispatch(auth()).then(res => {
          let authedUser = this.props.authedUser;
            if(!authedUser.isAuth) {
              if(reload) {
                this.props.history.push('/')
                setTimeout(() => {
                  this.props.dispatch(openModal())
                }, 200)
              } 
            } else {
              if (adminRoute && !authedUser.isAdmin) {
                this.props.history.push('/user/dashboard')
              } else {
                if(reload === false) {
                  this.props.history.push('/user/dashboard')
                }
              }
            }
            this.setState({
              loading: false
            })
        })
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress
              style={{
                color: "#f3b169"
              }}
              thickness={7}
            />
          </div>
        );
      }
      return (
          <ComposedClass {...this.props} user={this.props.user} />
      )
    }
  }

  const mapStateToProps = state => ({
    authedUser: state.users.authedUser
  });

  return connect(mapStateToProps)(Authentication);
}
