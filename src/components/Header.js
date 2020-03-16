import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div
        className="main-header"
        style={this.props.shadow === false ? { boxShadow: "none" } : {}}
      >
        <div style={{ width: "30%" }}>{this.props.left}</div>
        <div style={{ width: "40%" }} className="text-center">
          {this.props.middle}
        </div>
        <div style={{ width: "30%" }} className="text-right">
          {this.props.right}
        </div>
      </div>
    );
  }
}

export default Header;
