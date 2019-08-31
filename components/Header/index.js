import { withRouter } from "next/router";
import { Container, LinkText } from "./styles";
import Login from "../Login";

const Header = ({ router: { pathname } }) => (
  <Container>
    <Login />
  </Container>
);

export default withRouter(Header);
