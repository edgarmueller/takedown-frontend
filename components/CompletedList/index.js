import Tags from "../Tags";
import Done from "../Done";
import LinkDetails from "../LinkDetails";
import { List, ListItem, ListItemContainer } from "../LinkList/styles";

export default ({ links, tags }) => {
  return (
    <List>
      {links.map(link => (
        <ListItem key={link.id}>
          <ListItemContainer>
            <LinkDetails link={link} />
            <Tags link={link} tags={tags ? Array.from(tags) : []} />
            <Done link={link} />
          </ListItemContainer>
        </ListItem>
      ))}
    </List>
  );
};
