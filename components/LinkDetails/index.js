import { CloudinaryContext, Image } from "cloudinary-react";
import gql from "graphql-tag";
import { LinkDetails } from "./styles";
import Tags from "../Tags";
import { Button } from "antd";
import { useMutation } from "react-apollo";
import { allLinks } from "../AllLinks";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DELETE_LINK = gql`
  mutation deleteLink($id: ID!, $deleted: Boolean) {
    deleteLink(id: $id, deleted: $deleted)
  }
`;

export default ({ link, tags }) => {
  const [deleteLink, { loading, error }] = useMutation(DELETE_LINK, {
    variables: {
      id: link.id,
      deleted: !link.deleted
    },
    refetchQueries: [{ query: allLinks }]
  });
  return (
    <LinkDetails>
      <strong style={{ width: "15rem", overflowWrap: "break-word" }}>
        {link.title}
      </strong>
      <div style={{ marginLeft: "0.5rem", marginRight: "0.5rem", flex: 1 }}>
        <div style={{ textDecoration: "underline" }}>{link.description}</div>
        <div>{link.description}</div>
        <div>{link.updatedAt.substr(0, 10)}</div>
      </div>
      <Button
        type="primary"
        shape="circle"
        icon="delete"
        onClick={deleteLink}
        style={{ margin: "0.5rem" }}
      />
      <div style={{ flex: 1 }}>
        <CloudinaryContext
          cloudName={publicRuntimeConfig.CLOUDINARY_CLOUD_NAME}
        >
          <Image publicId={link.thumbnailId} />
        </CloudinaryContext>
      </div>
    </LinkDetails>
  );
};
