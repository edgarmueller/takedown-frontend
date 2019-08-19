import Done from "../Done";
import LinkDetails from "../LinkDetails";
import { ListItem, ListItemContainer } from "../LinkList/styles";

export default ({ links, tags }) => (
  <div>
    {links.map(link => (
      <ListItem key={link.id}>
        <ListItemContainer>
          <LinkDetails link={link} tags={tags} />
          <Done link={link} />
        </ListItemContainer>
      </ListItem>
    ))}
  </div>
);
