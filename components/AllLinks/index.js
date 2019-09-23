import { useEffect, useState, Fragment, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { notification, Button, Icon, Menu, Drawer } from "antd";
import LinkList from "../LinkList";
import Submit from "../Submit";

export const allLinks = gql`
  query {
    links {
      edges {
        id
        title
        description
        url
        createdAt
        updatedAt
        done
        tags
        thumbnailId
        deleted
      }
    }
    tags {
      edges {
        name
      }
    }
  }
`;

function AllLinks() {
  const { data, loading, error } = useQuery(allLinks);
  const [displayDone, setDisplayDone] = useState(false);
  const [current, setCurrent] = useState("todo");
  const [visible, setVisible] = useState(false);
  const handleClick = useCallback(
    e => {
      setCurrent(e.key);
    },
    [setCurrent]
  );
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Notification Title",
        description: error.message
      });
    }
  }, [error]);

  if (loading) return <div>loading...</div>;

  if (data && data.links && data.links.edges) {
    const allTags =
      (data.tags &&
        data.tags.edges.reduce((set, tag) => {
          set.add(tag);
          return set;
        }, new Set())) ||
      [];

    // TODO
    const todoLinks = data.links.edges.filter(
      link => !link.done && !link.deleted
    );
    const doneLinks = data.links.edges.filter(
      link => link.done === true && !link.deleted
    );
    const deletedLinks = data.links.edges.filter(link => link.deleted);

    return (
      <Fragment>
        <Button
          type="primary"
          icon="plus"
          style={{ margin: "0.5rem" }}
          onClick={() => setVisible(true)}
        >
          Add link
              </Button>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="todo">
            <Icon type="read" />
            TODO
          </Menu.Item>
          <Menu.Item key="done">
            <Icon type="check" />
            Done
          </Menu.Item>
          <Menu.Item key="deleted">
            <Icon type="delete" />
            Deleted
          </Menu.Item>
        </Menu>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {current == "todo" ? (
            <Fragment>
              <LinkList links={todoLinks} tags={allTags} />
              <Drawer
                title="Basic Drawer"
                placement="right"
                closable
                onClose={() => setVisible(false)}
                visible={visible}
              >
                <Submit onSubmit={() => setVisible(false)} />
              </Drawer>
            </Fragment>
          ) : current == "done" ? (
            <LinkList links={doneLinks} tags={allTags} />
          ) : (
            <LinkList links={deletedLinks} tags={allTags} />
          )}
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
}
export default AllLinks;
