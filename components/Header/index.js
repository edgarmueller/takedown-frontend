import Link from "next/link";
import { withRouter } from "next/router";
import { Container, LinkText } from "./styles";
import Login from "../Login";
import Logout from "../Logout";
import Submit from "../Submit";

const Header = ({ router: { pathname } }) => (
  <Container>
    <Login />
    <Submit />
  </Container>
);

export default withRouter(Header);
