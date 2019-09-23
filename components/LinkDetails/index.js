import { CloudinaryContext, Image } from "cloudinary-react";
import gql from "graphql-tag";
import { Button, List } from "antd";
import { useMutation } from "react-apollo";
import { allLinks } from "../AllLinks";
import Done from "../Done";

const DELETE_LINK = gql`
  mutation deleteLink($id: ID!, $deleted: Boolean) {
    deleteLink(id: $id, deleted: $deleted)
  }
`;

export default ({ link }) => {
  const [deleteLink, { loading, error }] = useMutation(DELETE_LINK, {
    variables: {
      id: link.id,
      deleted: !link.deleted
    },
    refetchQueries: [{ query: allLinks }]
  });
  return (
    <List.Item
      extra={
        <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
          <Image publicId={link.thumbnailId} />
        </CloudinaryContext>
      }
      title={link.title}
      actions={[
          <Button
            icon="delete"
            onClick={deleteLink}
          />,
          <Button
            icon="link"
            href={link.url}
            target="_blank"
          />,
          <Done link={link} />,
      ]}
      >
      <List.Item.Meta 
        title={<strong>{link.title}</strong>}
        description={link.updatedAt.substr(0, 10)} 
      />
    </List.Item>
  );
};
