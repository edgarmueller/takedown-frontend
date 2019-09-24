import LinkDetails from "../LinkDetails";
import { List } from "antd";

export default ({ links }) => (
  <List bordered itemLayout="vertical" size="large">
    {links.map(link => (<LinkDetails link={link} />))}
  </List>
);
